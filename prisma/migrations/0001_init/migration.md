# PAWS — Prisma Migration: Initial Schema

This migration creates the initial PostgreSQL schema for the PAWS website.

## Models Created:
- **Order** — Customer quote/order requests
- **Contact** — Contact form submissions
- **Newsletter** — Email subscriptions
- **Review** — Customer reviews (requires admin approval)
- **ChatSession** — Live chat conversations
- **Referral** — Referral/affiliate tracking

## How to Apply:

### For Local Development:
```bash
# Make sure your .env has a valid PostgreSQL DATABASE_URL
# Then run:
npx prisma migrate deploy
# OR (for fresh setup):
npx prisma db push
```

### For Vercel Production:
```bash
# After deploying, run this to create the schema:
npx prisma migrate deploy
# OR use prisma db push for initial setup:
npx prisma db push
```
