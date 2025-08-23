import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLocale } from '@/hooks/use-locale';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Checkbox from '@/components/ui/checkbox';
import Field from '@/components/ui/field';
import Select from '@/components/ui/select';
import { COUNTRIES } from '@/constants';
import { formSchema } from '@/schemas/form-schema';
import type { FormData, FormErrors } from '@/types/interfaces';
import { isFormField } from '@/types/guards';
import convertToBase64 from '@/utils/convert-to-base64';
import { getPasswordStrength, getPasswordStrengthColor } from '@/utils/get-password-strength';
import type { PasswordStrength } from '@/types/types';
import { FORM_INPUT_CLASSNAME } from '@/constants';

type Props = {
  onSubmit: (data: FormData) => void;
};

export default function UncontrolledForm({ onSubmit }: Props) {
  const translations = useLocale();
  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('');
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);

  const getErrorMessage = (field: keyof FormErrors) => {
    const error = errors[field];
    return error
      ? translations.forms.validation[error as keyof typeof translations.forms.validation]
      : undefined;
  };

  const handlePasswordChange = () => {
    const password = passwordRef.current?.value || '';
    setPasswordStrength(getPasswordStrength(password));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName('');
    }
  };

  const validateForm = (): boolean => {
    const formData = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value || '',
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      acceptTerms: acceptTermsRef.current?.checked || false,
      picture: pictureRef.current?.files?.[0] || null,
      country: countryRef.current?.value || '',
    };

    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const currentErrors: FormErrors = {};
      result.error.issues.forEach((error) => {
        const field = error.path[0];
        if (isFormField(field)) {
          currentErrors[field] = error.message;
        }
      });
      setErrors(currentErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    let uploadedPicture = '';
    const file = pictureRef.current?.files?.[0];

    if (file) {
      uploadedPicture = await convertToBase64(file);
    }

    const formData: FormData = {
      id: Date.now().toString(),
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      acceptTerms: acceptTermsRef.current?.checked || false,
      picture: uploadedPicture,
      country: countryRef.current?.value || '',
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Field
        label={translations.forms.name}
        htmlFor="name"
        error={getErrorMessage('name')}
        dataTestId="name-field"
      >
        <Input
          ref={nameRef}
          type="text"
          id="name"
          placeholder={translations.forms.namePlaceholder}
          className={FORM_INPUT_CLASSNAME}
          dataTestId="name-input"
          autoComplete="name"
          autoFocus={true}
        />
      </Field>

      <Field
        label={translations.forms.age}
        htmlFor="age"
        error={getErrorMessage('age')}
        dataTestId="age-field"
      >
        <Input
          ref={ageRef}
          type="number"
          id="age"
          placeholder={translations.forms.agePlaceholder}
          className={FORM_INPUT_CLASSNAME}
          dataTestId="age-input"
        />
      </Field>

      <Field
        label={translations.forms.email}
        htmlFor="email"
        error={getErrorMessage('email')}
        dataTestId="email-field"
      >
        <Input
          ref={emailRef}
          type="email"
          id="email"
          placeholder={translations.forms.emailPlaceholder}
          className={FORM_INPUT_CLASSNAME}
          dataTestId="email-input"
          autoComplete="email"
        />
      </Field>

      <Field
        label={translations.forms.password}
        htmlFor="password"
        error={getErrorMessage('password')}
        dataTestId="password-field"
      >
        <Input
          ref={passwordRef}
          type="password"
          id="password"
          placeholder={translations.forms.passwordPlaceholder}
          onChange={handlePasswordChange}
          className={FORM_INPUT_CLASSNAME}
          dataTestId="password-input"
          autoComplete="new-password"
        />
        <div className="mt-1 flex items-center justify-between">
          <span className={`text-sm ${getPasswordStrengthColor(passwordStrength)}`}>
            {
              translations.forms.passwordStrength[
                passwordStrength as keyof typeof translations.forms.passwordStrength
              ]
            }
          </span>
        </div>
      </Field>

      <Field
        label={translations.forms.confirmPassword}
        htmlFor="confirmPassword"
        error={getErrorMessage('confirmPassword')}
        dataTestId="confirm-password-field"
      >
        <Input
          ref={confirmPasswordRef}
          type="password"
          id="confirmPassword"
          placeholder={translations.forms.confirmPasswordPlaceholder}
          className={FORM_INPUT_CLASSNAME}
          dataTestId="confirm-password-input"
          autoComplete="new-password"
        />
      </Field>

      <Field
        label={translations.forms.gender}
        htmlFor="gender"
        error={getErrorMessage('gender')}
        dataTestId="gender-field"
      >
        <Select
          ref={genderRef}
          id="gender"
          className={FORM_INPUT_CLASSNAME}
          dataTestId="gender-select"
        >
          <option value="">{translations.forms.selectGender}</option>
          <option value="male">{translations.forms.male}</option>
          <option value="female">{translations.forms.female}</option>
          <option value="other">{translations.forms.other}</option>
        </Select>
      </Field>

      <Field
        label={translations.forms.country}
        htmlFor="country"
        error={getErrorMessage('country')}
        dataTestId="country-field"
      >
        <Input
          ref={countryRef}
          type="text"
          id="country"
          list="countries"
          placeholder={translations.forms.countryPlaceholder}
          className={FORM_INPUT_CLASSNAME}
          dataTestId="country-input"
          autoComplete="country"
        />
        <datalist id="countries">
          {COUNTRIES.map((country) => (
            <option key={`${country.code}-${country.iso}`} value={country.name} />
          ))}
        </datalist>
      </Field>

      <Field
        label={translations.forms.picture}
        htmlFor="picture"
        error={getErrorMessage('picture')}
        dataTestId="picture-field"
      >
        <div className="mt-1 flex items-center">
          <Input
            ref={pictureRef}
            type="file"
            id="picture"
            accept="image/png,image/jpeg"
            onChange={handleFileChange}
            className="hidden"
            dataTestId="picture-input"
          />
          <label
            htmlFor="picture"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'NumpadEnter') {
                e.preventDefault();
                document.getElementById('picture')?.click();
              }
            }}
            className="flex-shrink-0 cursor-pointer rounded-sm border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-yellow-200 focus:border-yellow-300 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:border-cyan-400 dark:focus:border-cyan-500"
          >
            {translations.forms.chooseFile}
          </label>
          <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
            {selectedFileName || translations.forms.noFileChosen}
          </span>
        </div>
      </Field>

      <Field
        label=""
        htmlFor="acceptTerms"
        error={getErrorMessage('acceptTerms')}
        dataTestId="accept-terms-field"
      >
        <div className="mt-1 flex items-start">
          <Checkbox
            ref={acceptTermsRef}
            id="acceptTerms"
            checkboxClassName="border-gray-300 hover:border-yellow-200 focus:border-yellow-300 dark:text-cyan-300 text-yellow-300 dark:hover:border-cyan-400 dark:focus:border-cyan-500 dark:border-gray-600 dark:bg-gray-700"
            dataTestId="accept-terms-checkbox"
          />

          <div className="ml-3 text-sm text-black dark:text-white">
            <label htmlFor="acceptTerms" className="font-medium">
              {translations.forms.acceptTerms}
            </label>
          </div>
        </div>
      </Field>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-full bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:focus:bg-cyan-400"
          text={translations.forms.submit}
          dataTestId="uncontrolled-form-submit"
        />
      </div>
    </form>
  );
}
