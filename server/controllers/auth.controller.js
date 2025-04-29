const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const { generateTokken } = require("../middleware/token");

const signUp = async (req, res) => {
  try {
    const { email, password,name } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already existss" });
    }
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const bcryptHash = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, bcryptHash);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        name
      },
    });
    if (newUser) {
      const token = generateTokken(newUser.id, res);
      res.status(200).json({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        token: token,
      });
    } else {
      res.status(400).json({
        error: "Create user failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const singIn = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const passwordValid = bcrypt.compareSync(password, user.password);
    if (!passwordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateTokken(user.id, res);
    res.status(200).json({
      id: user.id,
      email: user.email,
      token,
      name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const {name} = req.body;
    const userId = req.userId;
    const updateUser = await prisma.user.update({
      where: {id: userId},
      data: {
        name,
      },
    })
    res.status(200).json(updateUser)
  } catch (error) {
    console.log(error);
  }
};

const currentUser = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signUp, singIn, updateUser, currentUser };
