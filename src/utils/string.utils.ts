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

/**
 * Generates a game URL in the format `/game/{slug}-{id}`
 */
export const generateGameUrl = (title: string, id: number): string => {
    const slug = slugify(title);
    return `/game/${slug}-${id}`;
};

/**
 * Extracts the game ID from a slugified URL parameter (e.g. "candy-crush-123" -> 123)
 */
export const extractGameId = (slugParam: string | undefined): number | null => {
    if (!slugParam) return null;
    // Just grab the ID which is appended with a hyphen at the end. Or fallback if it's a direct ID.
    const parts = slugParam.split('-');
    const lastPart = parts[parts.length - 1];
    const parsed = parseInt(lastPart, 10);
    return isNaN(parsed) ? null : parsed;
};
