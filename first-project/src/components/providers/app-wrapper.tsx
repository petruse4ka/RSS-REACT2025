import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../../router/routes.tsx';
import { LanguageContext } from '../../context/context.ts';
import { getDefaultLanguage } from '../../utils/get-default-language.ts';

export default function AppWrapper() {
  const [language, setLanguage] = useState(getDefaultLanguage());

  return (
    <LanguageContext value={{ language, setLanguage }}>
      <RouterProvider router={router} />
    </LanguageContext>
  );
}
