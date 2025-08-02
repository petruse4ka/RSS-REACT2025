import { useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import type { CardData } from '@/types/interfaces';
import { useLocale } from '@/hooks/use-locale';

type Props = {
  cards: CardData[];
  filename: string;
  children: ReactNode;
};

export function DownloadLink({ cards, filename, children }: Props) {
  const [downloadUrl, setDownloadUrl] = useState('');
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const translations = useLocale();

  const createCsvContent = (items: CardData[]): string => {
    const headers = ['Title', 'Description', 'Image URL', 'ID'];
    const csvHeaders = headers.join(',') + '\n';

    const csvRows = items.map((item) => {
      const rowData = [item.title, item.description, item.imageUrl, item.id];
      return rowData.join(',');
    });

    return csvHeaders + csvRows.join('\n');
  };

  const handleDownload = (e: MouseEvent) => {
    e.stopPropagation();

    const csvContent = createCsvContent(cards);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);

    setTimeout(() => {
      if (downloadRef.current) {
        downloadRef.current.click();
        URL.revokeObjectURL(url);
        setDownloadUrl('');
      }
    }, 0);
  };

  return (
    <>
      <div data-testid="download-link" onClick={handleDownload}>
        {children}
      </div>
      <a
        ref={downloadRef}
        href={downloadUrl}
        download={filename}
        className="hidden"
        data-testid="download-link-anchor"
      >
        {translations.selectedCards.download}
      </a>
    </>
  );
}
