type Props = {
  isActive: boolean;
  leftIcon: string;
  rightIcon: string;
  leftTitle: string;
  rightTitle: string;
  className?: string;
  onToggle: () => void;
  dataTestId: string;
};

export default function Toggle({
  isActive,
  leftIcon,
  rightIcon,
  leftTitle,
  rightTitle,
  className = '',
  onToggle,
  dataTestId,
}: Props) {
  return (
    <button
      onClick={onToggle}
      className={`flex cursor-pointer items-center justify-center focus:outline-none ${className}`}
      data-testid={dataTestId}
    >
      <div className="relative">
        <div className="relative h-8 w-16 rounded-full bg-slate-300 transition-all duration-300 dark:bg-slate-900">
          <div className="absolute top-1/2 left-2 -translate-y-1/2 transform">
            <img src={leftIcon} alt={leftTitle} className="h-4 w-4" />
          </div>

          <div className="absolute top-1/2 right-2 -translate-y-1/2 transform">
            <img src={rightIcon} alt={rightTitle} className="h-4 w-4" />
          </div>

          <div
            className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all duration-300 dark:bg-cyan-300 ${
              isActive ? 'translate-x-8' : 'translate-x-1'
            }`}
            data-testid="toggle-indicator"
          />
        </div>
      </div>
    </button>
  );
}
