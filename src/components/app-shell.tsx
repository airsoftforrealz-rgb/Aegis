import Link from 'next/link';

const nav = [
  ['Dashboard', '/dashboard'],
  ['Events', '/events'],
  ['League Hub', '/league'],
  ['Draft Room', '/draft'],
  ['Players', '/players'],
  ['My Team', '/my-team'],
  ['Leaderboards', '/leaderboards'],
  ['Admin', '/admin'],
];

export function AppShell({ center }: { center: React.ReactNode }) {
  return (
    <main className="grid min-h-screen grid-cols-[260px_1fr_360px] gap-4 p-4">
      <aside className="panel p-4">
        <h1 className="font-heading text-xl">Aegis</h1>
        <div className="mt-4 rounded-input border border-border p-2">League: Prime Circuit</div>
        <nav className="mt-4 flex flex-col gap-2">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-input px-3 py-2 hover:bg-surfaceAlt">
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="panel p-4">{center}</section>
      <aside className="panel sticky top-4 h-[calc(100vh-2rem)] space-y-4 overflow-auto p-4">
        <div><h3 className="font-heading">Draft Queue</h3><p className="text-sm text-muted">No players queued.</p></div>
        <div><h3 className="font-heading">Roster Panel</h3><p className="text-sm text-muted">Set starters and bench.</p></div>
        <div><h3 className="font-heading">Best Available</h3><p className="text-sm text-muted">Live ranked picks via projections.</p></div>
      </aside>
    </main>
  );
}
