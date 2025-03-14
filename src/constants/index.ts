export const AVAILABLE_LENGUAGES = Object.freeze<{
    EN: string;
    ES: string;
}>({
    EN: 'en',
    ES: 'es'
});

export const MENU_LINKS = Object.freeze<{label: string, path: string}[]>([
    {
        label: 'ABOUT',
        path: '#about'
    },
    {
        label: 'OUR MENU',
        path: '#menu'
    },
    {
        label: 'GALLERY',
        path: '#gallery'
    },
    {
        label: 'LOCATION',
        path: '#location'
    }
])