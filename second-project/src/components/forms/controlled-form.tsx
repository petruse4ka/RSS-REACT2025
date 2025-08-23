import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from '@/hooks/use-locale';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Checkbox from '@/components/ui/checkbox';
import Field from '@/components/ui/field';
import Select from '@/components/ui/select';
import { useAppSelector } from '@/store/hooks';
import { selectCountries } from '@/store/selectors';
import { formSchema } from '@/schemas/form-schema';
import type { FormData, FormErrors } from '@/types/interfaces';
import { getPasswordStrength, getPasswordStrengthColor } from '@/utils/get-password-strength';
import convertToBase64 from '@/utils/convert-to-base64';
import type { PasswordStrength, FormSchema as FormSchemaType } from '@/types/types';
import { FORM_INPUT_CLASSNAME } from '@/constants';

type Props = {
  onSubmit: (data: FormData) => void;
};

export default function ControlledForm({ onSubmit }: Props) {
  const translations = useLocale();
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [passwordState, setPasswordState] = useState<string>('');
  const [confirmPasswordState, setConfirmPasswordState] = useState<string>('');

  const countries = useAppSelector(selectCountries);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    trigger,
    watch,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      country: '',
      acceptTerms: false,
      picture: undefined,
    },
  });

  const getErrorMessage = (field: keyof FormErrors) => {
    const error = errors[field as keyof FormSchemaType];
    return error?.message
      ? translations.forms.validation[error.message as keyof typeof translations.forms.validation]
      : undefined;
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPasswordState(password);
    setPasswordStrength(getPasswordStrength(password));
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = event.target.value;
    setConfirmPasswordState(confirmPassword);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setValue('picture', file);
      trigger('picture');
    } else {
      setSelectedFileName('');
      setValue('picture', undefined as unknown as File);
    }
  };

  const onFormSubmit = async (data: FormSchemaType) => {
    let uploadedPicture = '';

    if (data.picture) {
      uploadedPicture = await convertToBase64(data.picture);
    }

    const formData: FormData = {
      id: Date.now().toString(),
      name: data.name,
      age: Number(data.age),
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      gender: data.gender,
      acceptTerms: data.acceptTerms,
      picture: uploadedPicture,
      country: data.country,
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <Field
        label={translations.forms.name}
        htmlFor="name"
        error={getErrorMessage('name')}
        dataTestId="name-field"
      >
        <Input
          type="text"
          id="name"
          placeholder={translations.forms.namePlaceholder}
          className={FORM_INPUT_CLASSNAME}
          dataTestId="name-input"
          autoComplete="name"
          register={register}
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
          type="number"
          id="age"
          placeholder={translations.forms.agePlaceholder}
          className={FORM_INPUT_CLASSNAME}
          dataTestId="age-input"
          autoComplete="bday-year"
          register={register}
        />
      </Field>

      <Field
        label={translations.forms.email}
        htmlFor="email"
        error={getErrorMessage('email')}
        dataTestId="email-field"
      >
        <Input
          type="email"
          id="email"
          placeholder={translations.forms.emailPlaceholder}
          className={FORM_INPUT_CLASSNAME}
          dataTestId="email-input"
          autoComplete="email"
          register={register}
        />
      </Field>

      <Field
        label={translations.forms.password}
        htmlFor="password"
        error={getErrorMessage('password')}
        dataTestId="password-field"
      >
        <Input
          type="password"
          id="password"
          placeholder={translations.forms.passwordPlaceholder}
          className={FORM_INPUT_CLASSNAME}
          dataTestId="password-input"
          autoComplete="new-password"
          register={register}
          onChangeCapture={(e) => {
            handlePasswordChange(e);
            trigger('confirmPassword');
          }}
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
          type="password"
          id="confirmPassword"
          placeholder={translations.forms.confirmPasswordPlaceholder}
          className={FORM_INPUT_CLASSNAME}
          dataTestId="confirm-password-input"
          autoComplete="new-password"
          register={register}
          onChangeCapture={handleConfirmPasswordChange}
        />
        {!errors.confirmPassword?.message &&
          passwordState &&
          confirmPasswordState &&
          passwordState !== confirmPasswordState && (
            <p className="mt-1 text-sm text-red-500">
              {translations.forms.validation.passwordsMismatch}
            </p>
          )}
      </Field>

      <Field
        label={translations.forms.gender}
        htmlFor="gender"
        error={getErrorMessage('gender')}
        dataTestId="gender-field"
      >
        <Select
          id="gender"
          className={FORM_INPUT_CLASSNAME}
          dataTestId="gender-select"
          register={register}
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
          type="text"
          id="country"
          list="countries"
          placeholder={translations.forms.countryPlaceholder}
          className={FORM_INPUT_CLASSNAME}
          dataTestId="country-input"
          autoComplete="country"
          register={register}
        />
        <datalist id="countries">
          {countries.map((country) => (
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
            checkboxClassName="border-gray-300 hover:border-yellow-200 focus:border-yellow-300 dark:text-cyan-300 text-yellow-300 dark:hover:border-cyan-400 dark:focus:border-cyan-500 dark:border-gray-600 dark:bg-gray-700"
            dataTestId="accept-terms-checkbox"
            id="acceptTerms"
            register={register}
            checked={watch('acceptTerms')}
            onClick={() => {
              const currentValue = watch('acceptTerms');
              const newValue = !currentValue;
              setValue('acceptTerms', newValue);
              trigger('acceptTerms');
            }}
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
          className="w-full bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:focus:bg-cyan-400"
          text={translations.forms.submit}
          dataTestId="controlled-form-submit"
          disabled={!isValid || isSubmitting}
        />
      </div>
    </form>
  );
}
