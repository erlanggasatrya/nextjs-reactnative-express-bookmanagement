import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.book.create({
    data: {
      title: 'The Hitchhiker\'s Guide to the Galaxy',
      author: 'Douglas Adams',
      year: '1979',
      description: 'A hilarious science fiction comedy series.',
      publisher: 'Pan Books',
      cover_img: 'https://example.com/hitchhikers.jpg',
    },
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
