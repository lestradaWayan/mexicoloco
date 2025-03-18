import { useEffect, useState } from 'react';

const usePathname = () => {
    const [pathname, setPathname] = useState<string | undefined>();

    useEffect(() => {
        setPathname(() => window.location.pathname);
    }, []);

    useEffect(() => {
        const handleRouteChange = () => setPathname(window.location.pathname);

        window.addEventListener('popstate', handleRouteChange);
        window.addEventListener('pushstate', handleRouteChange);
        window.addEventListener('replacestate', handleRouteChange);

        return () => {
            window.removeEventListener('popstate', handleRouteChange);
            window.removeEventListener('pushstate', handleRouteChange);
            window.removeEventListener('replacestate', handleRouteChange);
        };
    }, []);

    return pathname;
};

export default usePathname;
