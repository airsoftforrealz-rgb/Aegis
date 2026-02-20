import { withJson } from '@/lib/http';
import { prisma } from '@/lib/prisma';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  return withJson(async () => prisma.draft.update({ where: { id: params.id }, data: { status: 'LIVE', startsAt: new Date() } }));
}
