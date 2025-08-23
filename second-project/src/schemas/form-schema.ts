import { z } from 'zod';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/constants';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'nameRequired')
      .max(30, 'nameMaxLength')
      .regex(/^[А-ЯA-Z]/, 'nameFirstLetter')
      .regex(/^[А-Яа-яA-Za-z\s]+$/, 'nameOnlyLetters'),
    age: z
      .string()
      .min(1, 'ageRequired')
      .refine((val) => !isNaN(Number(val)), 'ageNumber')
      .refine((val) => Number(val) >= 18, 'ageMin')
      .refine((val) => Number(val) <= 100, 'ageMax'),
    email: z.email({ message: 'emailInvalid' }).max(45, 'emailMaxLength'),
    password: z
      .string()
      .min(1, 'passwordRequired')
      .max(30, 'passwordMaxLength')
      .regex(/\d/, 'passwordStrength')
      .regex(/[А-ЯA-Z]/, 'passwordStrength')
      .regex(/[а-яa-z]/, 'passwordStrength')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'passwordStrength'),
    confirmPassword: z
      .string()
      .min(1, 'passwordRequired')
      .max(30, 'passwordMaxLength')
      .regex(/\d/, 'passwordStrength')
      .regex(/[А-ЯA-Z]/, 'passwordStrength')
      .regex(/[а-яa-z]/, 'passwordStrength')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'passwordStrength'),
    gender: z.string().min(1, 'genderRequired'),
    picture: z
      .instanceof(File, { message: 'pictureRequired' })
      .refine((file) => file.size <= MAX_FILE_SIZE, 'pictureSize')
      .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), 'pictureFormat'),
    country: z.string().min(1, 'countryRequired').max(30, 'countryMaxLength'),
    acceptTerms: z.boolean().refine((val) => val === true, 'termsRequired'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordsMismatch',
    path: ['confirmPassword'],
  });
