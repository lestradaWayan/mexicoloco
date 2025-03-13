import type { AVAILABLE_LENGUAGES } from '../constants';

export const Dictionary = Object.freeze<
    Record<keyof typeof AVAILABLE_LENGUAGES, Record<string, unknown>>
>({
    EN: {},
    ES: {}
});
