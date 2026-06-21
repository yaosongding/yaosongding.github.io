import { translations, type Locale } from "./translations";

export function getLocaleFromUrl(url: URL): Locale {
  const path = url.pathname;
  if (path.startsWith("/en/") || path === "/en") return "en";
  return "zh";
}

type NestedKeyOf<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, unknown>
    ? `${K}.${NestedKeyOf<T[K]>}`
    : K
  : never;

type TranslationPath = NestedKeyOf<(typeof translations)["zh"]>;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  return path.split(".").reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return acc;
  }, obj) as string;
}

export function t(locale: Locale, path: TranslationPath): string {
  return getNestedValue(
    translations[locale] as unknown as Record<string, unknown>,
    path,
  );
}

export function getLangPath(currentLocale: Locale, targetPath: string): string {
  const otherLocale = currentLocale === "zh" ? "en" : "zh";
  return `/${otherLocale}${targetPath}`;
}
