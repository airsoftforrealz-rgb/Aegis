import { prisma } from '@/lib/prisma';
import type { EventProvider, MatchProvider, StatProvider } from './types';

export class StubProvider implements EventProvider, MatchProvider, StatProvider {
  async ingestEvents() {
    await prisma.event.upsert({ where: { id: 'event-college' }, update: {}, create: { id: 'event-college', name: 'College Clash', tier: 'COLLEGE', region: 'NA', startAt: new Date(), endAt: new Date(Date.now()+86400000), status: 'UPCOMING' } });
    await prisma.event.upsert({ where: { id: 'event-vct' }, update: {}, create: { id: 'event-vct', name: 'VCT Masters', tier: 'VCT', region: 'EMEA', startAt: new Date(), endAt: new Date(Date.now()+172800000), status: 'UPCOMING' } });
  }
  async ingestMatches() {
    await prisma.match.create({ data: { eventId: 'event-vct', startsAt: new Date(), status: 'SCHEDULED', rawJson: { bestOf: 3 } } });
  }
  async ingestStats() {
    const player = await prisma.player.findFirst();
    const match = await prisma.match.findFirst();
    if (!player || !match) return;
    await prisma.playerMatchStat.create({ data: { playerId: player.id, matchId: match.id, statsJson: { kills: 18, assists: 9, deaths: 11, firstBlood: 1, plants: 1, defuses: 0, clutch: 1, mapWin: 1 } } });
  }
}
