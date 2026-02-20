import { withJson } from '@/lib/http';
import { prisma } from '@/lib/prisma';
import { lineupSchema } from '@/lib/validators';

export async function POST(request: Request, { params }: { params: { leagueEventId: string; periodId: string } }) {
  return withJson(async () => {
    const payload = lineupSchema.parse(await request.json());
    return prisma.lineup.create({ data: { ...payload, leagueEventId: params.leagueEventId, periodId: params.periodId } });
  });
}
