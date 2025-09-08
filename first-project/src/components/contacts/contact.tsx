import Image from 'next/image';
import { Link } from '@/i18n/navigation';

type Props = {
  href: string;
  imageSrc: string;
  alt: string;
  contactInfo: string;
  contactType: string;
  target?: string;
};

export default function Contact({ href, imageSrc, alt, contactInfo, contactType, target }: Props) {
  return (
    <Link
      data-testid="contact-link"
      href={href}
      className="group rounded-lg bg-cyan-700 p-4 transition-all duration-300 hover:scale-105 hover:bg-cyan-600 dark:bg-indigo-900 dark:hover:bg-indigo-800"
      target={target}
    >
      <div data-testid="contact-item" className="flex items-center gap-5">
        <Image
          data-testid="contact-image"
          src={imageSrc}
          alt={alt}
          className="rounded-lg text-white"
          width={48}
          height={48}
        />
        <div data-testid="contact-info-container">
          <p
            data-testid="contact-info"
            className="font-semibold text-white group-hover:text-fuchsia-400 dark:group-hover:text-cyan-400"
          >
            {contactInfo}
          </p>
          <p data-testid="contact-type" className="text-sm text-gray-200 dark:text-gray-400">
            {contactType}
          </p>
        </div>
      </div>
    </Link>
  );
}
