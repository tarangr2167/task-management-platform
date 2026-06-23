import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();

  await prisma.project.create({
    data: {
      name: "Website Redesign",
      description: "Refresh the marketing site with a modern layout.",
      tasks: {
        create: [
          {
            title: "Audit current pages",
            description: "Review existing content and identify gaps.",
            priority: "HIGH",
            status: "DONE",
          },
          {
            title: "Create wireframes",
            priority: "MEDIUM",
            status: "OPEN",
          },
          {
            title: "Implement homepage",
            priority: "LOW",
            status: "OPEN",
          },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      name: "Mobile App Launch",
      description: "Prepare iOS and Android apps for release.",
      tasks: {
        create: [
          {
            title: "Finalize app store listings",
            priority: "HIGH",
            status: "OPEN",
          },
          {
            title: "Run beta testing",
            priority: "MEDIUM",
            status: "OPEN",
          },
        ],
      },
    },
  });

  console.log("Seed complete: 2 projects, 5 tasks.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
