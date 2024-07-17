export default {
    description: 'replace in path',
    args: [{name: 'search', hint: 'empty to replace all, single ^ to prepend, single $ to append'}, {name: 'replace'}],
    returns: 'URL',
    accepts: ['URL'],

    apply(url, search, replace) {

        if (search && "^" === search.trim()) {
            url.pathname = replace + url.pathname.replace(/^\//, '');
            return url;
        }

        if (search && "$" === search.trim()) {
            url.pathname = url.pathname + replace;
            return url;
        }


        if ([undefined, null, ''].includes(search) && ![undefined, null, ''].includes(replace)) {
            url.pathname = replace;
        } else {
            url.pathname = url.pathname.replace(search, replace);
        }

        return url;
    }
}