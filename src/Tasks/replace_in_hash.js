export default {

    description: 'replace in #hash',
    args: [{
        name: 'search',
        hint: 'empty to replace all, single ^ to prepend, single $ to append'
    }, {name: 'replace'},
        {name: 'replace all', type: 'checkbox', default: true}],
    returns: 'URL',
    accepts: ['URL'],

    apply(url, search, replace, all) {

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
            if (all) {
                url.hash = url.hash.replaceAll(search, replace);
            } else {
                url.hash = url.hash.replace(search, replace);
            }
        }
        return url;
    }
}