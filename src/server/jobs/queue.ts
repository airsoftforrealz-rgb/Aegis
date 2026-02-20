import { Queue } from 'bullmq';
import { StubProvider } from '../providers/stub-provider';
import { recomputeScores } from '../scoring/engine';

const provider = new StubProvider();
const redisUrl = process.env.REDIS_URL;

async function runInline(name: string) {
  if (name === 'ingestEvents') await provider.ingestEvents();
  if (name === 'ingestMatches') await provider.ingestMatches();
  if (name === 'ingestStats') await provider.ingestStats();
  if (name === 'recomputeScores') await recomputeScores();
  return { mode: 'inline', name };
}

export async function enqueueJob(name: 'ingestEvents' | 'ingestMatches' | 'ingestStats' | 'recomputeScores') {
  if (!redisUrl) return runInline(name);
  const queue = new Queue('aegis-jobs', { connection: { url: redisUrl } as never });
  const job = await queue.add(name, {});
  return { mode: 'bullmq', id: job.id, name };
}
