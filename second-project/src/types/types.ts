import { z } from 'zod';
import { formSchema } from '@/schemas/form-schema';
import type { UseFormRegister } from 'react-hook-form';

export type ModalType = 'uncontrolled' | 'reactHookForm' | null;
export type FormSchema = z.infer<typeof formSchema>;
export type PasswordStrength = '' | 'weak' | 'medium' | 'strong';
export type FormRegister = UseFormRegister<FormSchema>;
