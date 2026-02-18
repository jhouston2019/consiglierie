export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-4 text-center text-xs text-gray-600">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div>
          Cognitive Console © 2026
        </div>
        <div className="flex gap-4">
          <span>Cmd/Ctrl+Enter: Submit</span>
          <span>Cmd/Ctrl+K: Clear</span>
          <span>Esc: Reset</span>
        </div>
      </div>
    </footer>
  );
}
