type Props = {
  isActive: boolean;
  leftIcon: string;
  rightIcon: string;
  leftTitle: string;
  rightTitle: string;
  activeSide: 'left' | 'right';
  className?: string;
  onToggle: () => void;
};

export default function Toggle({
  isActive,
  leftIcon,
  rightIcon,
  leftTitle,
  rightTitle,
  activeSide,
  className = '',
  onToggle,
}: Props) {
  const isLeftSideActive = isActive === (activeSide === 'left');

  return (
    <button
      onClick={onToggle}
      className={`flex cursor-pointer items-center justify-center focus:outline-none ${className}`}
    >
      <div className="relative">
        <div className="relative h-8 w-16 rounded-full bg-gray-300 transition-all duration-300">
          <div className="absolute top-1/2 left-2 -translate-y-1/2 transform">
            <img src={leftIcon} alt={leftTitle} className="h-4 w-4" />
          </div>

          <div className="absolute top-1/2 right-2 -translate-y-1/2 transform">
            <img src={rightIcon} alt={rightTitle} className="h-4 w-4" />
          </div>

          <div
            className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all duration-300 ${
              isLeftSideActive ? 'translate-x-1' : 'translate-x-8'
            }`}
          />
        </div>
      </div>
    </button>
  );
}
