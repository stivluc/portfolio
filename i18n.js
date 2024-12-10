import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ lang }) => {
  // Validate that the incoming `lang` parameter is valid
  if (lang !== 'en' && lang !== 'fr') {
    return { messages: {} };
  }

  return {
    messages: (await import(`./locales/${lang}/common.json`)).default,
  };
});
