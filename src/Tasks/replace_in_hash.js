export default {

    description: 'replace in #hash',
    args: [{name: 'search', hint: 'empty to replace all, single ^ to prepend, single $ to append'}, {name: 'replace'}],
    returns: 'URL',
    accepts: ['URL'],

    apply(url, search, replace) {

        if (search && "^" === search.trim()) {
            url.hash = replace + url.hash.replace(/^#/, '');
            return url;
        }

        if (search && "$" === search.trim()) {
            url.hash = url.hash + replace;
            return url;
        }


        if ([undefined, null, ''].includes(search) && ![undefined, null, ''].includes(replace)) {
            url.hash = replace;
        } else {
            url.hash = url.hash.replace(search, replace);
        }
        return url;
    }
}