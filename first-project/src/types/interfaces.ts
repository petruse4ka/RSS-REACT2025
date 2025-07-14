export interface ErrorTexts {
  title: string;
  message: string;
  buttonText: string;
}

export interface CardResponse {
  id: string;
  created_at: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
  };
  likes: number;
  user: {
    id: string;
    username: string | null;
    name: string | null;
    bio: string | null;
  };
}

export interface CardData {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}
