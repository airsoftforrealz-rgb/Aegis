import { withJson } from '@/lib/http';
import { enqueueJob } from '@/server/jobs/queue';

export async function POST() {
  return withJson(async () => enqueueJob('recomputeScores'));
}
