import { redirect } from '@/i18n/navigation';
import { CARDS_PER_PAGE } from '@/constants';

export default function validateIdParam(param: string | null, locale: string): number | null {
  if (!param || param.trim() === '') return null;

  const parsedIdParam = parseInt(param, 10);
  if (isNaN(parsedIdParam) || parsedIdParam < 1 || parsedIdParam > CARDS_PER_PAGE) {
    redirect({ href: '/not-found', locale: locale });
  }
  return parsedIdParam;
}
