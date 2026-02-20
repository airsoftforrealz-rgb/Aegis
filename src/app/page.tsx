import { AppShell } from '@/components/app-shell';
import Link from 'next/link';

export default function HomePage() {
  return (
    <AppShell
      center={
        <div className="space-y-6">
          <h2 className="font-heading text-3xl">Command Center</h2>
          <p className="text-muted">Premium fantasy esports for collegiate tournaments and VCT events.</p>
          <Link className="btn-primary inline-block" href="/dashboard">Launch Dashboard</Link>
        </div>
      }
    />
  );
}
