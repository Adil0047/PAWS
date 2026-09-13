import { PrismaClient } from '@prisma/client'

/**
 * Production-ready Prisma client for Vercel serverless.
 *
 * In development, we cache the client on `globalThis` to avoid
 * creating new connections on every hot-reload.
 *
 * In production (Vercel), each serverless function invocation
 * may create a new client, but Prisma handles connection pooling
 * internally. The global cache prevents connection exhaustion
 * during development only.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
