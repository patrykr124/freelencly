const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      standardPrice,
      standardRevision,
      standardDesc,
      mediumPrice,
      mediumRevision,
      mediumDesc,
      premiumPrice,
      premiumRevision,
      premiumDesc,
      servicesPerHourPrice,
      technologySelected,
    } = req.body;

    const userId = req.userId;
    const imgFile = req.file?.filename || null;
    if (!technologySelected) {
      return res.status(400).json({ error: "No technology selected" });
    }
    const newJob = await prisma.job.create({
      data: {
        title,
        description,
        category,
        technologies: {
          connect: { name: technologySelected },
        },
        img: imgFile,
        postedById: userId,
        taskPerHours: servicesPerHourPrice
          ? {
              create: {
                hourlyRate: parseFloat(servicesPerHourPrice),
              },
            }
          : undefined,
        packages: {
          create: [
            {
              type: "BASIC",
              price: parseFloat(standardPrice),
              revisions: parseInt(standardRevision),
              description: standardDesc,
            },
            {
              type: "STANDARD",
              price: parseFloat(mediumPrice),
              revisions: parseInt(mediumRevision),
              description: mediumDesc,
            },
            {
              type: "PREMIUM",
              price: parseFloat(premiumPrice),
              revisions: parseInt(premiumRevision),
              description: premiumDesc,
            },
          ],
        },
      },
      include: {
        packages: true,
        taskPerHours: true,
        technologies: true,
      },
    });

    res.status(200).json("Job created", newJob);
  } catch (error) {
    console.log("Create controller error ", error);
    res.status(500).json({ error: error.message });
  }
};

const allJobs = async (req, res) => {
  try {
    const { technology } = req.query;
    const jobs = await prisma.job.findMany({
      where: {
        technologies: {
          some: {
            name: technology,
          },
        },
      },
      include: {
        postedBy: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        packages: true,
        technologies: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.log("Create controller error ", error);
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        postedBy: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        packages: true,
        taskPerHours: true,
      },
    });
    if (!job) {
      res.status(404).json({ error: "Job not found" });
    }
    return res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editJob = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      standardPrice,
      standardRevision,
      standardDesc,
      mediumPrice,
      mediumRevision,
      mediumDesc,
      premiumPrice,
      premiumRevision,
      premiumDesc,
      servicesPerHourPrice,
    } = req.body;

    const userId = req.userId;
    const imgFile = req.file?.filename || null;
    const jobId = req.params.id;

    const jobCurrent = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!jobCurrent || jobCurrent.postedById !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const editeJob = await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        title,
        description,
        category,
        img: imgFile,
        postedById: userId,
        taskPerHours: servicesPerHourPrice
          ? {
              create: {
                hourlyRate: parseFloat(servicesPerHourPrice),
              },
            }
          : undefined,
        packages: {
          create: [
            {
              type: "BASIC",
              price: parseFloat(standardPrice),
              revisions: parseInt(standardRevision),
              description: standardDesc,
            },
            {
              type: "STANDARD",
              price: parseFloat(mediumPrice),
              revisions: parseInt(mediumRevision),
              description: mediumDesc,
            },
            {
              type: "PREMIUM",
              price: parseFloat(premiumPrice),
              revisions: parseInt(premiumRevision),
              description: premiumDesc,
            },
          ],
        },
      },
      include: {
        packages: true,
        taskPerHours: true,
      },
    });

    res.status(200).json("Job Edited", editeJob);
  } catch (error) {
    console.log("Edit controller error ", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createJob, allJobs, getJobById, editJob };
