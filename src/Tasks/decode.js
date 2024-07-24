export default {
    description: 'decode',
    args: [],
    returns: ['String'],
    accepts: ['String', 'URL'],
    apply(input) {
        return decodeURIComponent(input.href ?? input);
    }
}