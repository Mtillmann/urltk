export default {

    description: 'replace in host (domain)',
    args: [
        {name: 'search', hint: 'empty to replace all, single ^ to prepend, single $ to append'},
        {name: 'replace'},
        {name: 'replace all', type: 'checkbox', default: true}
    ],
    returns: ['URL'],
    accepts: ['URL'],
    apply(url, search, replace, all) {

        if (search && "^" === search.trim()) {
            url.hostname = replace + url.hostname;
            return url;
        }

        if (search && "$" === search.trim()) {
            url.hostname = url.hostname + replace;
            return url;
        }

        if ([undefined, null, ''].includes(search) && ![undefined, null, ''].includes(replace)) {
            url.hostname = replace;
        } else {
            if (all) {
                url.hostname = url.hostname.replaceAll(search, replace);
            } else {
                url.hostname = url.hostname.replace(search, replace);
            }
        }

        return url;
    }
}