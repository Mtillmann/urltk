export default {

    description: 'remove the entire #hash',
    returns: ['URL'],
    accepts: ['URL'],
    args: [],
    apply(url) {
        url.hash = '';
        return url;
    }
}