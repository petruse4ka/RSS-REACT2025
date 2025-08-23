export interface ErrorTexts {
  title: string;
  message: string;
  buttonText: string;
}

export interface FormData {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  picture: string;
  acceptTerms: boolean;
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
  name: string;
  code: string;
  iso: string;
}

export interface CountriesState {
  countries: Country[];
}

export interface UserListState {
  count: number;
  users: FormData[];
}
