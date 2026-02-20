import { PageFrame } from '@/components/page-frame';
import { ApiActionPanel } from '@/components/api-action-panel';

export default function Page() {
  return (
    <PageFrame title="League">
      <ApiActionPanel />
    </PageFrame>
  );
}
