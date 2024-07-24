export default {

    description: 'regexp replace',
    args: [
        {name: 'regular expression', hint: 'ECMA-RegExp-compat., no delimiters'},
        {name: 'replace'},
        {name: 'flags'}
    ],
    returns: ['URL', 'String'],
    accepts: ['URL', 'String'],
    apply(input, search, replace, flags = 'i') {
        const regex = new RegExp(search, flags);
        try {
            return new URL(input.href.replace(regex, replace));
        }
        catch (e) {
            return String(input).replace(regex, replace);
        }
    }
}