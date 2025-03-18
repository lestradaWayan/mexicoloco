import { useEffect, useState } from 'react';
import usePathname from './usePathname';
import { AVAILABLE_LANGUAGES } from '../constants';
import { DICTIONARY, type TDictionary } from '../dictionaries';

const useLanguage = () => {
    const pathname = usePathname();

    const [language, setLanguage] = useState<
        keyof typeof AVAILABLE_LANGUAGES | undefined
    >();

    const [dictionary, setDictionary] = useState<TDictionary>(DICTIONARY['EN']);

    useEffect(() => {
        if (pathname) {
            const lang = pathname
                .split('/')[1]
                .toUpperCase() as keyof typeof AVAILABLE_LANGUAGES;

            const foundedLang = Object.keys(AVAILABLE_LANGUAGES).find(
                (l) => l === lang
            ) as keyof typeof AVAILABLE_LANGUAGES | undefined;

            setLanguage(() => foundedLang || 'EN');
        }
    }, [pathname]);

    useEffect(() => {
        if (language) {
            setDictionary(() => DICTIONARY[language || 'EN']);
        }
    }, [language]);

    return { language, dictionary };
};

export default useLanguage;
