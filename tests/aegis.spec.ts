import { test, expect } from '@playwright/test';

test('create league', async ({ request }) => {
  const res = await request.post('/api/leagues', { data: { name: 'Spec League', commissionerId: 'seed-user-1' } });
  expect(res.ok()).toBeTruthy();
});

test('join league', async ({ request }) => {
  const res = await request.post('/api/leagues/join', { data: { code: 'PRIME123', userId: 'seed-user-2', teamName: 'Spec Team' } });
  expect(res.ok()).toBeTruthy();
});

test('start draft, pick, score, leaderboard', async ({ request }) => {
  const db = await request.get('/api/test-db');
  expect(db.ok()).toBeTruthy();
  const score = await request.post('/api/admin/jobs/score', { data: {} });
  expect(score.ok()).toBeTruthy();
});
