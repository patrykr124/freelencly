const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const createJob = async (req, res) => {
    try {
        const {title, description, category, standardPrice, standardRevision, standardDesc, mediumPrice, mediumRevision, mediumDesc, premiumPrice, premiumRevision, premiumDesc} = req.body

        const userId = req.userId;
        const imgFile = req.file?.filename || null
        
        const newJob = await prisma.job.create({
            data: {
                title,
                description,
                category,
                img: imgFile,
                postedById: userId,
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
              },
        })

        res.status(200).json("Job created", newJob)
    } catch (error) {
        console.log("Create controller error ", error);
        res.status(500).json({error: error.message})
    }
}

const allJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        postedBy: {
          select: {
            id: true,
            name: true,
          },
        },
        packages: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    res.status(200).json(jobs)
  } catch (error) {
    console.log("Create controller error ", error);
  }
}

const getJobById = async (req,res) =>{
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
            },
          },
          packages: true,
        },
      })
      if(!job){
        res.status(404).json({error: "Job not found"})
      }
      res.json(job)
    } catch (err) {
      res.status(500).json({message: err.message})      
    }
}




module.exports = {createJob, allJobs,getJobById}