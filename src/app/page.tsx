import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Dashboard />
      </main>
    </div>
  );
}
