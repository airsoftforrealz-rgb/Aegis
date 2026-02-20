import { withJson } from '@/lib/http';
import { prisma } from '@/lib/prisma';

export async function GET() {
  return withJson(async () => ({ users: await prisma.user.count(), events: await prisma.event.count() }));
}
