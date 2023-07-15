import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
let pass = '';

async function hashPassword() {
  pass = await bcrypt.hash('12345678', 10);
}

hashPassword().then(async () => {
  main(pass)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});

const main = async (password) => {
  const rolesPromises = [
    prisma.user.upsert({
      where: { email: 'administrador@pontodosabor.com' },
      update: {},
      create: {
        name: 'Administrador',
        email: 'administrador@pontodosabor.com',
        password,
        role: {
          connectOrCreate: {
            create: {
              name: 'Administrador',
              isAdmin: true,
            },
            where: {
              name: 'Administrador',
            },
          },
        },
      },
    }),
  ];

  const productsPromises = [
    prisma.product.upsert({
      where: { name: 'Pastel de Frango com Queijo' },
      update: {},
      create: {
        name: 'Pastel de Frango com Queijo',
        description: 'Frango, Queijo, Orégano',
        cost: 2.15,
        price: 6.9,
        category: {
          connectOrCreate: {
            create: {
              name: 'Pastel',
            },
            where: {
              name: 'Pastel',
            },
          },
        },
      },
    }),
    prisma.product.upsert({
      where: { name: 'Pastel de Calabresa com Queijo' },
      update: {},
      create: {
        name: 'Pastel de Calabresa com Queijo',
        description: 'Frango, Calabresa, Orégano',
        cost: 2.15,
        price: 6.9,
        category: {
          connectOrCreate: {
            create: {
              name: 'Pastel',
            },
            where: {
              name: 'Pastel',
            },
          },
        },
      },
    }),
    prisma.product.upsert({
      where: { name: 'Café Expresso' },
      update: {},
      create: {
        name: 'Café Expresso',
        description: 'Café',
        cost: 1.25,
        price: 4.75,
        category: {
          connectOrCreate: {
            create: {
              name: 'Café',
            },
            where: {
              name: 'Café',
            },
          },
        },
      },
    }),
  ];

  const promises = [...rolesPromises, ...productsPromises];

  await Promise.all(promises);
};
