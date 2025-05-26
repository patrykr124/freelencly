const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getTechnologies = async (req, res) => {
    const technologies = await prisma.technology.findMany();
    res.json(technologies);
  };

module.exports = { getTechnologies };
