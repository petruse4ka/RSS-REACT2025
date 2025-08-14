import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import AppWrapper from '@/components/providers/app-wrapper';
import '@/styles/index.css';

export const metadata: Metadata = {
  title: 'First React Project - Konstantin Petrov',
  description: 'First React Project - Konstantin Petrov',
  keywords:
    'React Project, Konstantin Petrov, Unsplashed, Gallery, API, Next, Redux ToolKit, RTK Query, ErrorBoundary, ',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppWrapper>{children}</AppWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
