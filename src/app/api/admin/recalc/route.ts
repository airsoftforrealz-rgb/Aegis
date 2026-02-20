import { withJson } from '@/lib/http';
import { recomputeScores } from '@/server/scoring/engine';

export async function POST() {
  return withJson(async () => {
    await recomputeScores();
    return { ok: true };
  });
}
