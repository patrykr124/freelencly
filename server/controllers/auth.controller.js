const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const { generateTokken } = require("../middleware/token");
const { OAuth2Client } = require('google-auth-library');

const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/adventurer/svg?seed=default";


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
        name,
        avatarUrl: DEFAULT_AVATAR,
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
    const {name, } = req.body;
    let avatarUrl = req.body.avatarUrl;
    const userId = req.userId;
    if (req.file?.path) {
      avatarUrl = req.file.path;
    } else if (avatarUrl) {
      avatarUrl = avatarUrl;
    }
    const updateUser = await prisma.user.update({
      where: {id: userId},
      data: {
        avatarUrl: req.file?.path,
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
        avatarUrl: true,
      },
    });
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMe  = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        CreatedTask: true,
        AssignedTask: true,
        jobs: true,
        orders: true,
        // Auth: true,
        Freelencer: {
          include: {
            task: true,
            offers: true,
          }
        },
      },
    });
    if(user){
      delete user.password
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
}


const googleLogin = async (req, res )=>{
  

  try {
    const {credential} = req.body;
    const client  = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    const payload = ticket.getPayload();
    const {email, name, sub} = payload;

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if(!user){
      user = await prisma.user.create({
        data: {
          email,
          name,
          password: "",
          avatarUrl: DEFAULT_AVATAR,
          googleId: sub
        },
      })
    } else if (!user.googleId){
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId: sub },
      });
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
}

module.exports = { signUp, singIn, updateUser, currentUser,getMe,googleLogin };
