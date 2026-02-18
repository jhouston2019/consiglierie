import { useEffect } from 'react';

export function useKeyboardShortcuts(handlers: {
  onSubmit?: () => void;
  onClear?: () => void;
  onEscape?: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && handlers.onSubmit) {
        e.preventDefault();
        handlers.onSubmit();
      }
      
      if ((e.metaKey || e.ctrlKey) && e.key === 'k' && handlers.onClear) {
        e.preventDefault();
        handlers.onClear();
      }
      
      if (e.key === 'Escape' && handlers.onEscape) {
        e.preventDefault();
        handlers.onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}
