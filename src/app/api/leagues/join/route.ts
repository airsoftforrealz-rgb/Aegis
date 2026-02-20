import { withJson } from '@/lib/http';
import { prisma } from '@/lib/prisma';
import { joinLeagueSchema } from '@/lib/validators';

export async function POST(request: Request) {
  return withJson(async () => {
    const payload = joinLeagueSchema.parse(await request.json());
    const league = await prisma.league.findUniqueOrThrow({ where: { code: payload.code } });
    return prisma.leagueMember.create({ data: { leagueId: league.id, userId: payload.userId, teamName: payload.teamName } });
  });
}
