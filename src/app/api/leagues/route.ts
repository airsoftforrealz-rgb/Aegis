import { withJson } from '@/lib/http';
import { prisma } from '@/lib/prisma';
import { createLeagueSchema } from '@/lib/validators';

export async function POST(request: Request) {
  return withJson(async () => {
    const payload = createLeagueSchema.parse(await request.json());
    return prisma.league.create({ data: { ...payload, code: 'PRIME123', settingsJson: { mode: 'snake' } } });
  });
}
