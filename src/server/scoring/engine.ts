import { prisma } from '@/lib/prisma';

const defaultRules = { kills: 2, assists: 1, deaths: -1, firstBlood: 2, plants: 1, defuses: 2, clutch: 3, mapWin: 2 };

export async function recomputeScores() {
  const stats = await prisma.playerMatchStat.findMany();
  for (const s of stats) {
    const stat = s.statsJson as Record<string, number>;
    const breakdown = Object.fromEntries(Object.entries(defaultRules).map(([k,v]) => [k, (stat[k] ?? 0) * v]));
    const total = Object.values(breakdown).reduce((a,b)=>a+b,0);
    await prisma.playerMatchStat.update({ where: { id: s.id }, data: { fantasyPoints: total } });
  }
  const leagueEvent = await prisma.leagueEvent.findFirst();
  const period = await prisma.period.findFirst();
  const users = await prisma.user.findMany();
  if (!leagueEvent || !period) return;
  for (const u of users) {
    const points = await prisma.playerMatchStat.aggregate({ _sum: { fantasyPoints: true } });
    await prisma.score.upsert({
      where: { id: `${leagueEvent.id}-${u.id}-${period.id}` },
      update: { points: points._sum.fantasyPoints ?? 0, breakdownJson: { source: 'aggregate' } },
      create: { id: `${leagueEvent.id}-${u.id}-${period.id}`, leagueEventId: leagueEvent.id, userId: u.id, periodId: period.id, points: points._sum.fantasyPoints ?? 0, breakdownJson: { source: 'aggregate' } }
    });
  }
}
