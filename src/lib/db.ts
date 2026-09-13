import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaSchemaVersion?: string
}

// Bump this version whenever the Prisma schema changes. The global cache
// stores the version of the client that was instantiated; if it doesn't
// match, we discard the stale client and create a fresh one. This lets
// schema changes take effect without a full dev server restart.
const SCHEMA_VERSION = 'v5-referral'

let cached = globalForPrisma.prisma
if (cached && globalForPrisma.prismaSchemaVersion !== SCHEMA_VERSION) {
  // Stale client from a previous schema version — discard it.
  try {
    void cached.$disconnect?.()
  } catch {}
  cached = undefined
  globalForPrisma.prisma = undefined
}

// Also probe for a recently-added model as a safety net.
if (cached) {
  const probe = cached as unknown as { chatSession?: unknown; order?: { create?: unknown } }
  if (typeof probe.chatSession === 'undefined') {
    try {
      void cached.$disconnect?.()
    } catch {}
    cached = undefined
    globalForPrisma.prisma = undefined
  }
}

export const db =
  cached ??
  new PrismaClient({
    log: ['query'],
  })

globalForPrisma.prisma = db
globalForPrisma.prismaSchemaVersion = SCHEMA_VERSION
