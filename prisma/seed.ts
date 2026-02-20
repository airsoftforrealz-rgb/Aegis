import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({ where: { email: 'commish@aegis.gg' }, update: {}, create: { id: 'seed-user-1', email: 'commish@aegis.gg', name: 'Commissioner', role: 'COMMISSIONER' } });
  await prisma.user.upsert({ where: { email: 'player@aegis.gg' }, update: {}, create: { id: 'seed-user-2', email: 'player@aegis.gg', name: 'Player One' } });

  await prisma.scoringPreset.upsert({
    where: { key: 'default-v1' },
    update: {},
    create: {
      key: 'default-v1',
      version: 1,
      name: 'Default Scoring',
      rulesJson: { kills: 2, assists: 1, deaths: -1, firstBlood: 2, plants: 1, defuses: 2, clutch: 3, mapWin: 2 },
    },
  });

  const college = await prisma.event.upsert({ where: { id: 'event-college' }, update: {}, create: { id: 'event-college', name: 'College Clash', tier: 'COLLEGE', region: 'NA', startAt: new Date(), endAt: new Date(Date.now() + 86400000), status: 'UPCOMING' } });
  const vct = await prisma.event.upsert({ where: { id: 'event-vct' }, update: {}, create: { id: 'event-vct', name: 'VCT Masters', tier: 'VCT', region: 'EMEA', startAt: new Date(), endAt: new Date(Date.now() + 172800000), status: 'UPCOMING' } });

  const team = await prisma.team.create({ data: { name: 'Sentinels', shortName: 'SEN', region: 'NA', logoUrl: 'https://example.com/sen.png' } });
  await prisma.player.createMany({ data: [
    { ign: 'TenZ', role: 'DUELIST', teamId: team.id, headshotUrl: 'https://example.com/tenz.png', externalIdsJson: { vlr: 'tenz' } },
    { ign: 'Zellsis', role: 'FLEX', teamId: team.id, headshotUrl: 'https://example.com/zellsis.png', externalIdsJson: { vlr: 'zellsis' } },
  ]});

  const league = await prisma.league.create({ data: { name: 'Prime Circuit', code: 'PRIME123', commissionerId: 'seed-user-1', settingsJson: { rounds: 10 } } });
  const preset = await prisma.scoringPreset.findUniqueOrThrow({ where: { key: 'default-v1' } });
  const le = await prisma.leagueEvent.create({ data: { leagueId: league.id, eventId: college.id, scoringPresetId: preset.id, draftStartsAt: new Date(), draftEndsAt: new Date(Date.now()+3600000), rosterLockAt: new Date(Date.now()+7200000) } });
  await prisma.period.create({ data: { leagueEventId: le.id, name: 'Week 1', startsAt: new Date(), endsAt: new Date(Date.now()+86400000), lockAt: new Date(Date.now()+3600000) } });
  await prisma.draft.create({ data: { leagueEventId: le.id, status: 'PENDING', roundCount: 10, pickSeconds: 60 } });

  console.log({ college: college.name, vct: vct.name, seeded: true });
}

main().finally(() => prisma.$disconnect());
