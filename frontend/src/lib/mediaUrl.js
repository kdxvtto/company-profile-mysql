const DEFAULT_MEDIA_ORIGIN = import.meta.env.DEV ? 'http://localhost:3000' : '';

const trimTrailingSlash = (value = '') => value.replace(/\/+$/, '');

const MEDIA_ORIGIN = trimTrailingSlash(
    (import.meta.env.VITE_MEDIA_ORIGIN || DEFAULT_MEDIA_ORIGIN).trim()
);

export const getMediaUrl = (mediaPath) => {
    if (!mediaPath) return null;

    if (/^(https?:)?\/\//i.test(mediaPath) || mediaPath.startsWith('data:')) {
        return mediaPath;
    }

    const normalizedPath = mediaPath.startsWith('/') ? mediaPath : `/${mediaPath}`;
    return MEDIA_ORIGIN ? `${MEDIA_ORIGIN}${normalizedPath}` : normalizedPath;
};
