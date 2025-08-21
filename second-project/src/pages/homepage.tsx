import { useLocale } from '../hooks/use-locale';
import Button from '../components/ui/button';

export default function HomePage() {
  const translations = useLocale();

  const handleUncontrolledForm = () => {
    console.log('Open uncontrolled form modal');
  };

  const handleReactHookForm = () => {
    console.log('Open React Hook Form modal');
  };

  return (
    <div data-testid="homepage" className="flex w-full flex-col items-center p-4">
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <Button
          onClick={handleUncontrolledForm}
          className="w-full bg-cyan-500 hover:bg-cyan-400"
          text={translations.buttons.uncontrolledForm}
          dataTestId="uncontrolled-form-btn"
        />
        <Button
          onClick={handleReactHookForm}
          className="w-full bg-yellow-300 hover:bg-yellow-400"
          text={translations.buttons.reactHookForm}
          dataTestId="react-hook-form-btn"
        />
      </div>
    </div>
  );
}
