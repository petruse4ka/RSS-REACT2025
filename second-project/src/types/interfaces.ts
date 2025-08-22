export interface ErrorTexts {
  title: string;
  message: string;
  buttonText: string;
}

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: string;
  country: string;
}

export interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  acceptTerms?: string;
  picture?: string;
  country?: string;
}

export interface Country {
  country: string;
  code: string;
  iso: string;
}
