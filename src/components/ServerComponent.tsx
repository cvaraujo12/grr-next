import { ReactNode } from 'react';

interface ServerComponentProps {
  children: ReactNode;
  title: string;
}

export default function ServerComponent({ children, title }: ServerComponentProps) {
  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
} 