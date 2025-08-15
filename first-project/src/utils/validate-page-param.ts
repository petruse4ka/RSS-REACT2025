import { redirect } from '@/i18n/navigation';

export default function validatePageParam(param: string | null, locale: string): number {
  if (!param || param.trim() === '') return 1;

  const parsedPageParam = parseInt(param, 10);
  if (isNaN(parsedPageParam) || parsedPageParam < 1) {
    redirect({ href: '/not-found', locale: locale });
  }
  return parsedPageParam;
}
