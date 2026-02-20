'use client';

import { PageFrame } from '@/components/page-frame';
import { socket } from '@/lib/socket';
import { useEffect, useState } from 'react';

export default function DraftPage() {
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    socket.connect();
    socket.on('draft:update', (payload) => setEvents((prev) => [JSON.stringify(payload), ...prev].slice(0, 5)));
    return () => {
      socket.off('draft:update');
      socket.disconnect();
    };
  }, []);

  return (
    <PageFrame title="Draft Room">
      <button className="btn-primary" onClick={() => socket.emit('draft:pick', { player: 'TenZ', ts: Date.now() })}>Simulate Pick Broadcast</button>
      <ul className="mt-3 space-y-2 text-sm text-muted">{events.map((e, i) => <li key={i} className="panel p-2">{e}</li>)}</ul>
    </PageFrame>
  );
}
