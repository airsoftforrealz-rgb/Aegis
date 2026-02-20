import { withJson } from '@/lib/http';
import { enqueueJob } from '@/server/jobs/queue';

export async function POST() {
  return withJson(async () => ({
    events: await enqueueJob('ingestEvents'),
    matches: await enqueueJob('ingestMatches'),
    stats: await enqueueJob('ingestStats'),
  }));
}
