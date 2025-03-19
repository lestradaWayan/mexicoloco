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
    },
    about: {
        title: 'ABOUT US',
        text: 'Mexico Loco is an authentic experience of Mexican food and atmosphere, feel welcome with our restaurant and relax with the music of the mariachi accompanied by one of our traditional dishes or drinks.'
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
        },
        about: {
            title: 'SOBRE NOSOTROS',
            text: 'México Loco es una experiencia autentica de comida y ambiente mexicanos, siéntete bienvenido con nuestro restaurante y relájate con la música del mariachi, acompañado con uno de nuestros platillos tradicionales o bebidas.'
        }
    }
} satisfies DictionaryType<typeof ENGLISH_DICTIONARY>;

// #endregion
