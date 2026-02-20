import { z } from 'zod';

export const createLeagueSchema = z.object({ name: z.string().min(3), commissionerId: z.string().min(3) });
export const joinLeagueSchema = z.object({ code: z.string().min(4), userId: z.string().min(3), teamName: z.string().min(2) });
export const leagueEventSchema = z.object({ leagueId: z.string(), eventId: z.string(), scoringPresetId: z.string() });
export const draftPickSchema = z.object({ userId: z.string(), playerId: z.string(), autoPicked: z.boolean().optional() });
export const lineupSchema = z.object({ userId: z.string(), lineupJson: z.record(z.any()) });
