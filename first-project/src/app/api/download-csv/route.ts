import { NextRequest, NextResponse } from 'next/server';
import type { CardData } from '@/types/interfaces';

export async function POST(request: NextRequest) {
  try {
    const { cards, filename } = (await request.json()) as {
      cards: CardData[];
      filename: string;
    };

    if (!cards) {
      return NextResponse.json({ error: 'Invalid cards data' }, { status: 400 });
    }

    const headers = ['Title', 'Description', 'Image URL', 'ID'];
    const csvHeaders = headers.join(',') + '\n';

    const formatCsvValue = (value: string): string => {
      const formattedValue = value.replace(/"/g, '""');
      return `"${formattedValue}"`;
    };

    const csvRows = cards.map((item) => {
      const rowData = [
        formatCsvValue(item.title),
        formatCsvValue(item.description),
        formatCsvValue(item.imageUrl),
        formatCsvValue(item.id),
      ];
      return rowData.join(',');
    });

    const csvContent = csvHeaders + csvRows.join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv;charset=utf-8;',
        'Content-Disposition': `attachment; filename="${filename}.csv"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: `Failed to generate CSV: ${error}` }, { status: 500 });
  }
}
