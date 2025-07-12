export interface CardData {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

export interface ErrorTexts {
  title: string;
  message: string;
  buttonText: string;
}

export interface CardResponse {
  id: string;
  alt_description: string;
  description: string | null;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    username: string;
  };
  likes: number;
  created_at: string;
}

export interface CardData {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}
