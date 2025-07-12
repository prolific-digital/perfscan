import DashboardView from '@/components/dashboard/DashboardView';
import RequireAuth from '@/components/auth/RequireAuth';

export const metadata = {
  title: 'Dashboard - PerfScan',
  description: 'Real-time system monitoring dashboard',
};

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardView />
    </RequireAuth>
  );
}