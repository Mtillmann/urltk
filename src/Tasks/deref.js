export default {
    description: 'remove referrer',
    args: [],
    returns: ['URL'],
    accepts: ['URL', 'String'],
    apply(input) {
        const url = typeof window !== "undefined" ? new URL(window.location) : new URL('http://localhost:5173')
        url.hash = '';
        url.hash = '#/deref/?url=' + encodeURIComponent(String(input));
        return url;
    }
}