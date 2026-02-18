interface ResponseSectionProps {
  title: string;
  content: string;
  highlight?: boolean;
}

export function ResponseSection({ title, content, highlight = false }: ResponseSectionProps) {
  return (
    <div className={`bg-primary border rounded p-6 ${
      highlight ? 'border-red-900 border-2' : 'border-border'
    }`}>
      <h2 className={`text-lg font-bold mb-3 ${
        highlight ? 'text-red-400' : 'text-gray-300'
      }`}>
        {title}
      </h2>
      <p className={`whitespace-pre-wrap ${
        highlight ? 'font-medium' : ''
      }`}>
        {content}
      </p>
    </div>
  );
}
