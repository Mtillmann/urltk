export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function keysToRegex(keys) {
    keys = escapeRegExp(keys.replaceAll('*', 'W_I_L_D_C_A_R_D'));
    keys = keys.replace(/\s*,\s*/g, '|').trim().replaceAll('W_I_L_D_C_A_R_D', '.*');
    return new RegExp(keys);
}

export default {

    description: 'remove GET parameters',
    args: [{name: 'keys', hint: 'comma-separated keys. Use * as wildcard, e.g. utm_*. Empty value removes all.'}],
    returns: ['URL'],
    accepts: ['URL'],
    apply(url, keys) {
        if ([undefined, null, ''].includes(keys)) {
            keys = '*';
        }

        const params = [...new URLSearchParams(url.search)].map(([key]) => key);
        const regex = keysToRegex(keys);
        for (const param of params) {
            if (regex.test(param)) {
                url.searchParams.delete(param);
            }
        }

        return url;
    }
}