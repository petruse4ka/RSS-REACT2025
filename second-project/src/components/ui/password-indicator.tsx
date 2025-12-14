import getSliderPosition from '@/utils/get-slider-position';
import { useLocale } from '@/hooks/use-locale';

export default function PasswordStrengthIndicator({ strength }: { strength: number }) {
  const translations = useLocale();
  return (
    <div className="mt-2">
      <div className="relative h-2 w-full rounded-md bg-gradient-to-r from-red-600 from-0% via-yellow-500 via-50% to-green-600 to-100%">
        <div
          className={`absolute top-0 h-2 w-2 ${getSliderPosition(
            strength
          )} $} rounded-full border-2 border-white transition-all duration-300`}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs">
        <span className="text-red-500">{translations.forms.passwordStrength.weak}</span>
        <span className="text-green-500">{translations.forms.passwordStrength.strong}</span>
      </div>
    </div>
  );
}
