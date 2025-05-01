const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createFreelencerManagment = async (req, res) => {
  const { userId } = req.body;
  try {
    const existingFreelencer = await prisma.freelencer.findUnique({
      where: {
        userId,
      },
    });
    if (existingFreelencer) {
      return res.status(200).json({ message: "Freelencer already exists" });
    }
    const freelencer = await prisma.freelencer.create({
      data: {
        userId,
      },
      include: {
        offers: true,
        user: true,
      },
    });
    res.status(201).json(freelencer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFreelencerManagment = async (req, res) => {
  try {
    const freelencer = await prisma.freelencer.findMany({
      include: {
        offers: true,
        user: true,
      },
    });
    res.status(200).json(freelencer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTaskByFreelencer = async (req, res) => {
  const { jobId } = req.params;
  const {userId} = req.userId;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        jobId,
        createdById: userId
      },
      include: {
        createdBy: true,
        assignedTo: true,
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFreelencerManagment,
  getFreelencerManagment,getAllTaskByFreelencer
};
