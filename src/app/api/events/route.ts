import { withJson } from '@/lib/http';
import { prisma } from '@/lib/prisma';

export async function GET() {
  return withJson(async () => prisma.event.findMany({ orderBy: { startAt: 'asc' } }));
}
