import { PrismaClient } from '@prisma/client'

// need to run `npx prisma migrate dev --name init` to create the client
// and also change .env.example to .env and update url

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production')
  global.prisma = prisma