import { z } from 'zod';
import { formSchema } from '@/schemas/form-schema';

export type ModalType = 'uncontrolled' | 'reactHookForm' | null;
export type FormSchema = z.infer<typeof formSchema>;
export type PasswordStrength = '' | 'weak' | 'medium' | 'strong';
