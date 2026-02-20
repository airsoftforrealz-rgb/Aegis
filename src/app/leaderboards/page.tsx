'use client';

import { PageFrame } from '@/components/page-frame';
import { useQuery } from '@tanstack/react-query';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function LeaderboardsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const events = await fetch('/api/events').then((r) => r.json());
      return events;
    },
  });

  return (
    <PageFrame title="Leaderboards">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">Failed to load.</p>}
      <div className="h-64 w-full panel p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={(data ?? []).map((e: any, i: number) => ({ name: e.name, points: (i + 1) * 10 }))}>
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Line dataKey="points" stroke="#FF4655" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-2 text-xs text-muted"><span>League</span><span>Global</span><span>College</span></div>
    </PageFrame>
  );
}
