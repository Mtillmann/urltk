export default {

    description: 'extract hash',
    args: [],
    returns: 'String',
    accepts: ['URL'],

    apply(url, keepHashSymbol = false) {
        return keepHashSymbol ? url.hash : url.hash.slice(1);
    }
}