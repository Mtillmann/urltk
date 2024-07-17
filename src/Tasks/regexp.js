export default {

    description: 'regexp replace',
    args: [
        {name: 'regular expression', hint: 'ECMA-RegExp-compat., no delimiters'},
        {name: 'replace'},
        {name: 'flags'}
    ],
    returns: 'URL',
    accepts: ['URL'],
    apply(url, search, replace, flags = 'i') {
        const regex = new RegExp(search, flags);
        return new URL(url.href.replace(regex, replace));
    }
}