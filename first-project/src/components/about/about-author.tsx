import authorImage from '@/assets/images/author.png';
import { ABOUT_TEXTS } from '@/constants';

export default function AboutAuthor() {
  return (
    <div className="flex flex-col gap-10 xl:flex-row xl:gap-16">
      <div data-testid="about-author-image" className="flex justify-center xl:justify-start">
        <img
          src={authorImage}
          alt="Konstantin Petrov photo"
          className="rounded-lg object-cover xl:w-90"
        />
      </div>
      <div data-testid="about-author-description" className="flex flex-1 flex-col justify-start">
        <div className="space-y-6">
          <p data-testid="about-author-description-1" className="leading-relaxed text-gray-300">
            {ABOUT_TEXTS.BACKGROUND_DESCRIPTION_1}
          </p>
          <p data-testid="about-author-description-2" className="leading-relaxed text-gray-300">
            {ABOUT_TEXTS.BACKGROUND_DESCRIPTION_2}
          </p>
          <p data-testid="about-author-description-3" className="leading-relaxed text-gray-300">
            {ABOUT_TEXTS.BACKGROUND_DESCRIPTION_3}
          </p>
        </div>
      </div>
    </div>
  );
}
