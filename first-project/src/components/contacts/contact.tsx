type Props = {
  href: string;
  imageSrc: string;
  alt: string;
  contactInfo: string;
  contactType: string;
  target?: string;
  rel?: string;
};

export default function Contact({
  href,
  imageSrc,
  alt,
  contactInfo,
  contactType,
  target,
  rel,
}: Props) {
  return (
    <a
      data-testid="contact-link"
      href={href}
      className="group rounded-lg bg-indigo-900 p-4 transition-all duration-300 hover:scale-105 hover:bg-indigo-800"
      target={target}
      rel={rel}
    >
      <div data-testid="contact-item" className="flex items-center gap-5">
        <img
          data-testid="contact-image"
          src={imageSrc}
          alt={alt}
          className="h-12 w-12 rounded-lg text-white"
        />
        <div data-testid="contact-info-container">
          <p
            data-testid="contact-info"
            className="font-semibold text-white group-hover:text-cyan-300"
          >
            {contactInfo}
          </p>
          <p data-testid="contact-type" className="text-sm text-gray-400">
            {contactType}
          </p>
        </div>
      </div>
    </a>
  );
}
