export default {

    description: 'set GET parameters',
    args: [{name: 'key-value pairs', hint: 'key=value[,foo=bar,...]'}],
    returns: 'URL',
    accepts: ['URL'],
    apply(url, pairs) {
        if ([undefined, null, ''].includes(pairs)) {
            return url;
        }

        pairs = pairs.split(',').map(pair => pair.split('='));
        for (const [key, value] of pairs) {
            url.searchParams.set(key.trim(), value.trim());
        }
        return url;
    }
}