import { useRouter } from 'next/navigation';

interface NavigationProps {
  title: string;
  onSignOut?: () => void;
  showDashboard?: boolean;
  showHistory?: boolean;
  showConsole?: boolean;
  showPrivacy?: boolean;
}

export function Navigation({
  title,
  onSignOut,
  showDashboard = true,
  showHistory = true,
  showConsole = false,
  showPrivacy = true,
}: NavigationProps) {
  const router = useRouter();

  return (
    <nav className="border-b border-border px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex items-center gap-4">
        {showConsole && (
          <button
            onClick={() => router.push('/console')}
            className="text-sm text-gray-400 hover:text-foreground"
          >
            Console
          </button>
        )}
        {showDashboard && (
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-gray-400 hover:text-foreground"
          >
            Dashboard
          </button>
        )}
        {showHistory && (
          <button
            onClick={() => router.push('/history')}
            className="text-sm text-gray-400 hover:text-foreground"
          >
            History
          </button>
        )}
        {showPrivacy && (
          <button
            onClick={() => router.push('/privacy')}
            className="text-sm text-gray-400 hover:text-foreground"
          >
            Privacy
          </button>
        )}
        {onSignOut && (
          <button
            onClick={onSignOut}
            className="text-sm text-gray-400 hover:text-foreground"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}
