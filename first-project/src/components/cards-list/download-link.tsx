import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import type { CardData } from '@/types/interfaces';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

type Props = {
  cards: CardData[];
  filename: string;
  text: string;
  className: string;
  dataTestId: string;
};

export function DownloadLink({ cards, filename, text, className, dataTestId }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const t = useTranslations();

  const handleDownload = async (e?: MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    setIsDownloading(true);

    const response = await fetch('/api/download-csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cards, filename }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      if (downloadRef.current) {
        downloadRef.current.href = url;
        downloadRef.current.download = filename;
        downloadRef.current.click();

        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 100);
      }
    }

    setIsDownloading(false);
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleDownload}
        className={className}
        text={isDownloading ? t('selectedCards.generating') : text}
        dataTestId={dataTestId}
        disabled={isDownloading || cards.length === 0}
      />
      <Link ref={downloadRef} href="url" className="hidden" data-testid="download-link-anchor" />
    </>
  );
}
