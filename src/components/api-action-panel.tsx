'use client';

import { useState } from 'react';

type Action = { label: string; path: string; method: 'GET' | 'POST'; body?: Record<string, unknown> };

const actions: Action[] = [
  { label: 'Fetch Events', path: '/api/events', method: 'GET' },
  { label: 'Create League', path: '/api/leagues', method: 'POST', body: { name: 'Ranked Friends', commissionerId: 'seed-user-1' } },
  { label: 'Join League', path: '/api/leagues/join', method: 'POST', body: { code: 'PRIME123', userId: 'seed-user-2', teamName: 'Neon Rush' } },
  { label: 'Queue Ingest Job', path: '/api/admin/jobs/ingest', method: 'POST', body: {} },
  { label: 'Queue Score Job', path: '/api/admin/jobs/score', method: 'POST', body: {} },
];

export function ApiActionPanel() {
  const [status, setStatus] = useState('Idle');

  return (
    <div className="space-y-3">
      {actions.map((a) => (
        <button
          key={a.label}
          className="btn-primary mr-2"
          onClick={async () => {
            setStatus(`${a.label} loading...`);
            try {
              const res = await fetch(a.path, {
                method: a.method,
                headers: { 'Content-Type': 'application/json' },
                body: a.method === 'POST' ? JSON.stringify(a.body ?? {}) : undefined,
              });
              const data = await res.json();
              setStatus(`${a.label} ${res.ok ? 'success' : 'error'}: ${JSON.stringify(data)}`);
            } catch (e) {
              setStatus(`${a.label} error: ${(e as Error).message}`);
            }
          }}
        >
          {a.label}
        </button>
      ))}
      <div className="panel p-3 text-sm text-muted">{status}</div>
    </div>
  );
}
