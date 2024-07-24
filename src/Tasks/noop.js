export default {
    description: 'noop... it does nothing!',
    args: [],
    returns: ['URL'],
    accepts: ['URL', 'String'],
    apply(url) {
        return url;
    }
}
