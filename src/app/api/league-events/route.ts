import { withJson } from '@/lib/http';
import { prisma } from '@/lib/prisma';
import { leagueEventSchema } from '@/lib/validators';

export async function POST(request: Request) {
  return withJson(async () => {
    const payload = leagueEventSchema.parse(await request.json());
    return prisma.leagueEvent.create({ data: { ...payload, draftStartsAt: new Date(), draftEndsAt: new Date(Date.now() + 3600000), rosterLockAt: new Date(Date.now() + 7200000) } });
  });
}
