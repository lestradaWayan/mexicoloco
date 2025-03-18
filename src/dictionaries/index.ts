import type { AVAILABLE_LANGUAGES } from '../constants';

// #region TYPES

type AvailableLanguagesWithoutEN = Exclude<
    keyof typeof AVAILABLE_LANGUAGES,
    'EN'
>;

type DeepDictionaryType<T> = {
    [K in keyof T]: T[K] extends Record<string, unknown>
        ? DeepDictionaryType<T[K]>
        : unknown;
};

type DictionaryType<T> = {
    EN: T;
} & {
    [K in AvailableLanguagesWithoutEN]: DeepDictionaryType<T>;
};

export type TDictionary = typeof ENGLISH_DICTIONARY;

// #endregion

// #region DICTIONARIES

const ENGLISH_DICTIONARY = {
    navigation: {
        links: {
            home: 'Home'
        }
    },
    hero: {
        title: 'Pure mischief to eat and drink'
    }
};

export const DICTIONARY = {
    EN: ENGLISH_DICTIONARY,
    ES: {
        navigation: {
            links: {
                home: 'Inicio'
            }
        },
        hero: {
            title: 'Picardia pura para comer y beber'
        }
    }
} satisfies DictionaryType<typeof ENGLISH_DICTIONARY>;

// #endregion
