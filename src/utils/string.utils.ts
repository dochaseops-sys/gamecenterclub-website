/**
 * Converts a string to a URL-friendly slug.
 * Example: "Action Games" -> "action-games"
 */
export const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')   // Remove all non-word chars
        .replace(/--+/g, '-');     // Replace multiple - with single -
};

/**
 * Converts a slug back to a readable title (approximate).
 * Example: "action-games" -> "Action Games"
 */
export const unslugify = (slug: string): string => {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
