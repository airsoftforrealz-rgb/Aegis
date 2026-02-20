import { withJson } from '@/lib/http';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { leagueEventId: string } }) {
  return withJson(async () => prisma.score.findMany({ where: { leagueEventId: params.leagueEventId }, orderBy: { points: 'desc' } }));
}
