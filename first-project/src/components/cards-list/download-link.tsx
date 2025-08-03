import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import type { CardData } from '@/types/interfaces';
import { useLocale } from '@/hooks/use-locale';
import Button from '@/components/ui/button';

type Props = {
  cards: CardData[];
  filename: string;
  text: string;
  className: string;
  dataTestId: string;
};

export function DownloadLink({ cards, filename, text, className, dataTestId }: Props) {
  const [downloadUrl, setDownloadUrl] = useState('');
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const translations = useLocale();

  const createCsvContent = (items: CardData[]): string => {
    const headers = ['Title', 'Description', 'Image URL', 'ID'];
    const csvHeaders = headers.join(',') + '\n';

    const formatCsvValue = (value: string): string => {
      const formattedValue = value.replace(/"/g, '""');
      return `"${formattedValue}"`;
    };

    const csvRows = items.map((item) => {
      const rowData = [
        formatCsvValue(item.title),
        formatCsvValue(item.description),
        formatCsvValue(item.imageUrl),
        formatCsvValue(item.id),
      ];
      return rowData.join(',');
    });

    return csvHeaders + csvRows.join('\n');
  };

  const handleDownload = (e?: MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

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
      <Button
        type="button"
        onClick={handleDownload}
        className={className}
        text={text}
        dataTestId={dataTestId}
      />
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
