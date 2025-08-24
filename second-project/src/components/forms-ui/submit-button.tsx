import Button from '@/components/ui/button';

type Props = {
  text: string;
  disabled?: boolean;
  dataTestId: string;
};

export default function SubmitButton({ text, disabled = false, dataTestId }: Props) {
  return (
    <div className="flex justify-end">
      <Button
        type="submit"
        className="my-4 w-full bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:focus:bg-cyan-400"
        text={text}
        dataTestId={dataTestId}
        disabled={disabled}
      />
    </div>
  );
}
