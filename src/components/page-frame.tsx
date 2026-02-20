import { AppShell } from '@/components/app-shell';

export function PageFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <AppShell
      center={
        <div className="space-y-4">
          <h2 className="font-heading text-2xl">{title}</h2>
          {children}
        </div>
      }
    />
  );
}
