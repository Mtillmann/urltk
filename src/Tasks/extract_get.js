export default {

    description: 'extract GET parameter value',
    args: [{name: 'parameter', hint: 'name of the parameter'}],
    returns: 'String',
    accepts: ['URL'],
    apply(url, paramToExtract) {
        return String(url.searchParams.get(paramToExtract) ?? '');
    }
}