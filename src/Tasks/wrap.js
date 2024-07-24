export default {
    description: 'wrap value in string',
    args: [{name: 'target string', hint: '$1 is replaced with previous output'}, {
        name: 'encode',
        type: 'checkbox',
        default: true,
        hint: 'encode the input'
    }],
    returns: ['String'],
    accepts: ['String', 'URL'],
    apply(replace, targetString, encode = true) {
        targetString = String(targetString);
        if ([undefined, null].includes(replace)) {
            replace = '';
        }
        replace = String(replace);
        replace = encode ? encodeURIComponent(replace) : replace;

        return targetString.replace('$1', replace);
    }
}