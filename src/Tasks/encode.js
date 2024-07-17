export default {
    description: 'encode',
    args: [],
    returns: 'String',
    accepts: ['String', 'URL'],
    apply(input) {
        return encodeURIComponent(input.href ?? input);
    }
}