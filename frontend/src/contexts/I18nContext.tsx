'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from '@/i18n/en';
import th from '@/i18n/th';

export type Locale = 'en' | 'th';

type Dict = Record<string, any>;

const dictionaries: Record<Locale, Dict> = { en, th };

function getByPath(dict: Dict, path: string): string {
  return path.split('.').reduce((acc: any, key: string) => (acc ? acc[key] : undefined), dict) ?? path;
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('th');

  useEffect(() => {
    const saved = (typeof window !== 'undefined' ? localStorage.getItem('gt-locale') : null) as Locale | null;
    if (saved) setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== 'undefined') localStorage.setItem('gt-locale', l);
  };

  const t = (key: string, fallback?: string) => getByPath(dictionaries[locale], key) ?? fallback ?? key;

  const value = useMemo(() => ({ locale, setLocale, t }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};


