const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const technologies = ['React', 'Wordpress', 'JavaScript', 'Vue', 'HTML', 'Java', 'Python', 'Angular']
  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { name: tech },
      update: {},
      create: { name: tech },
    })
  }
}

main()
  .catch(e => { throw e })
  .finally(async () => { await prisma.$disconnect() })