import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from '@/hooks/use-locale';
import Input from '@/components/ui/input';
import Checkbox from '@/components/ui/checkbox';
import Field from '@/components/ui/field';
import Select from '@/components/ui/select';
import PasswordStrengthIndicator from '@/components/ui/password-indicator';
import SubmitButton from '@/components/forms-ui/submit-button';
import AcceptTerms from '@/components/forms-ui/accept-terms';
import FileUploadField from '@/components/forms-ui/file-upload-field';
import CountryField from '@/components/forms-ui/country-field';
import { useAppSelector } from '@/store/hooks';
import { selectCountries } from '@/store/selectors';
import { formSchema } from '@/schemas/form-schema';
import type { FormData, FormErrors } from '@/types/interfaces';
import { getPasswordStrength } from '@/utils/get-password-strength';
import convertToBase64 from '@/utils/convert-to-base64';
import type { FormSchema as FormSchemaType } from '@/types/types';
import { FORM_INPUT_CLASSNAME } from '@/constants';

type Props = {
  onSubmit: (data: FormData) => void;
};

export default function ControlledForm({ onSubmit }: Props) {
  const translations = useLocale();
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
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
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
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
        <PasswordStrengthIndicator strength={passwordStrength} />
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
          <option value={translations.forms.male}>{translations.forms.male}</option>
          <option value={translations.forms.female}>{translations.forms.female}</option>
          <option value={translations.forms.other}>{translations.forms.other}</option>
        </Select>
      </Field>

      <CountryField
        label={translations.forms.country}
        error={getErrorMessage('country')}
        dataTestId="country-field"
        countries={countries}
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
      </CountryField>

      <FileUploadField
        label={translations.forms.picture}
        error={getErrorMessage('picture')}
        dataTestId="picture-field"
        chooseFileText={translations.forms.chooseFile}
        noFileChosenText={translations.forms.noFileChosen}
        selectedFileName={selectedFileName}
      >
        <Input
          type="file"
          id="picture"
          accept="image/png,image/jpeg"
          onChange={handleFileChange}
          className="hidden"
          dataTestId="picture-input"
        />
      </FileUploadField>

      <Field
        label=""
        htmlFor="acceptTerms"
        error={getErrorMessage('acceptTerms')}
        dataTestId="accept-terms-field"
      >
        <AcceptTerms label={translations.forms.acceptTerms}>
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
        </AcceptTerms>
      </Field>

      <SubmitButton
        text={translations.forms.submit}
        disabled={!isValid || isSubmitting}
        dataTestId="controlled-form-submit"
      />
    </form>
  );
}
