export default {
    description: 'noop... it does nothing!',
    args: [],
    returns: ['URL', 'String'],
    accepts: ['URL', 'String'],
    apply(url) {
        return url;
    }
}
