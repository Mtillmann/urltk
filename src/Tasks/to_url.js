export default {
    description: 'convert to URL',
    args: [],
    returns: ['URL'],
    accepts: ['URL', 'String'],
    apply(input) {
        return new URL(input);
    }
}