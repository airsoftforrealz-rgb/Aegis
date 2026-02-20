import { withJson } from '@/lib/http';
import { prisma } from '@/lib/prisma';
import { draftPickSchema } from '@/lib/validators';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  return withJson(async () => {
    const payload = draftPickSchema.parse(await request.json());
    const count = await prisma.draftPick.count({ where: { draftId: params.id } });
    return prisma.draftPick.create({ data: { draftId: params.id, pickNumber: count + 1, roundNumber: Math.floor(count / 10) + 1, ...payload } });
  });
}
