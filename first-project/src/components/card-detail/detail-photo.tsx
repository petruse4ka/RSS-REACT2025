type Props = {
  imageUrl: string;
  title: string;
  description: string;
};

export default function DetailPhoto({ imageUrl, title, description }: Props) {
  return (
    <div className="mt-2 sm:mt-6">
      <div className="mb-4 sm:mb-6">
        <img
          src={imageUrl}
          alt={title}
          className="w-full rounded-lg shadow-lg"
          data-testid="detail-image"
        />
      </div>

      <div className="mb-2 sm:mb-5">
        <h3
          className="mb-2 text-xl leading-relaxed font-semibold text-cyan-300"
          data-testid="detail-title"
        >
          {title}
        </h3>
        <p data-testid="detail-description">{description}</p>
      </div>
    </div>
  );
}
