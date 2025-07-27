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
  downloads?: number;
  views?: number;
  user: {
    id: string;
    username: string | null;
    name: string | null;
    bio: string | null;
    profile_image?: {
      medium: string;
    };
  };
}

export interface CardData {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

export interface SearchResponse {
  results: CardResponse[];
  total: number;
  total_pages: number;
}

export interface CardDetailResponse {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  author: {
    name: string;
    username: string;
    bio: string;
    profileImage: string;
  };
  stats: {
    likes: number;
    downloads: number;
    views: number;
  };
  links: {
    html: string;
  };
}
