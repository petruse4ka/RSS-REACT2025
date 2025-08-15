import { notFound } from 'next/navigation';

export default function validatePageParam(param: string | null): number {
  if (!param || param.trim() === '') return 1;

  const parsedPageParam = parseInt(param, 10);
  if (isNaN(parsedPageParam) || parsedPageParam < 1) {
    notFound();
  }
  return parsedPageParam;
}
