import { ui } from './ui';
import { home } from './pages/home';
import { saas } from './pages/saas';
import { teeqode } from './pages/teeqode';
import { kuck } from './pages/kuck';

export type Locale = 'fr' | 'en' | 'de' | 'lu';

const pageTranslations = { home, saas, teeqode, kuck } as const;
export type PageKey = keyof typeof pageTranslations;

export const locales: Locale[] = ['fr', 'en', 'de', 'lu'];
export const defaultLocale: Locale = 'fr';

export const localeNames: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
  de: 'DE',
  lu: 'LU',
};

export const localeLabels: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  de: 'Deutsch',
  lu: 'Lëtzebuergesch',
};

export const ogLocales: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_GB',
  de: 'de_DE',
  lu: 'lb_LU',
};

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (locales.includes(lang as Locale) && lang !== defaultLocale) {
    return lang as Locale;
  }
  return defaultLocale;
}

export function t(key: keyof typeof ui, lang: Locale): string {
  return ui[key]?.[lang] ?? ui[key]?.['fr'] ?? key;
}

export function tp(page: PageKey, key: string, lang: Locale): any {
  const translations = pageTranslations[page];
  const entry = (translations as any)[key];
  if (!entry) return key;
  return entry[lang] ?? entry['fr'] ?? key;
}

export function getLocalizedPath(path: string, lang: Locale): string {
  // Remove existing locale prefix if present
  let cleanPath = path;
  for (const locale of locales) {
    if (cleanPath.startsWith(`/${locale}/`)) {
      cleanPath = cleanPath.slice(locale.length + 1);
      break;
    }
    if (cleanPath === `/${locale}`) {
      cleanPath = '/';
      break;
    }
  }

  // FR is at root (no prefix)
  if (lang === defaultLocale) {
    return cleanPath;
  }

  // Other locales get prefix
  if (cleanPath === '/') {
    return `/${lang}`;
  }
  return `/${lang}${cleanPath}`;
}

export function getPageKeyFromUrl(url: URL): string {
  const lang = getLangFromUrl(url);
  let path = url.pathname;

  // Remove locale prefix
  if (lang !== defaultLocale) {
    path = path.replace(`/${lang}`, '') || '/';
  }

  // Map path to page key
  const pageMap: Record<string, string> = {
    '/': 'home',
    '/saas': 'saas',
    '/teeqode': 'teeqode',
    '/kuck': 'kuck',
  };

  return pageMap[path] ?? 'home';
}
