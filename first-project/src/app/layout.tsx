import { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'First React Project - Konstantin Petrov',
  description: 'First React Project - Konstantin Petrov',
  keywords:
    'React Project, Konstantin Petrov, Unsplashed, Gallery, API, Next, Redux ToolKit, RTK Query, ErrorBoundary, ',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
