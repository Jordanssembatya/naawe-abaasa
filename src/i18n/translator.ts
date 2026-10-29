import { Fragment, createElement, type ReactNode } from 'react';
import type { Locale } from './config';
import { en, type Messages } from './messages/en';
import { lg } from './messages/lg';
import { nyn } from './messages/nyn';
import { sw } from './messages/sw';

export const catalogs: Record<Locale, Messages> = { en, lg, sw, nyn };

type Join<P extends string, K extends string> = P extends '' ? K : `${P}.${K}`;

/** Every dotted path to a string in the catalog, e.g. "home.title". */
type Paths<T, P extends string = ''> = {
  [K in keyof T & string]: T[K] extends string ? Join<P, K> : Paths<T[K], Join<P, K>>;
}[keyof T & string];

export type MessageKey = Paths<Messages>;
export type Vars = Record<string, string | number>;
export type Translate = (key: MessageKey, vars?: Vars) => string;
export type TranslateRich = (key: MessageKey, values: Record<string, ReactNode>) => ReactNode;

const PLACEHOLDER = /\{(\w+)\}/g;

function lookup(messages: Messages, key: string): string | undefined {
  let node: unknown = messages;
  for (const part of key.split('.')) {
    if (typeof node !== 'object' || node === null) return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === 'string' ? node : undefined;
}

export function createTranslator(locale: Locale): Translate {
  const messages = catalogs[locale];
  return (key, vars) => {
    // Fall back to English, then to the key itself, so a gap never blanks the UI.
    const template = lookup(messages, key) ?? lookup(en, key) ?? key;
    if (!vars) return template;
    return template.replace(PLACEHOLDER, (match, name: string) => (name in vars ? String(vars[name]) : match));
  };
}

/** Like `t`, but placeholders can be React elements, e.g. a glossary term or a link inside a sentence. */
export function createRichTranslator(t: Translate): TranslateRich {
  return (key, values) =>
    t(key)
      .split(/(\{\w+\})/)
      .map((part, index) => {
        const name = /^\{(\w+)\}$/.exec(part)?.[1];
        return name !== undefined && name in values ? createElement(Fragment, { key: index }, values[name]) : part;
      });
}

/** Placeholder names in a template, for checking that translations keep them. */
export function placeholdersOf(template: string): string[] {
  return [...template.matchAll(PLACEHOLDER)].map((m) => m[1]!).sort();
}
