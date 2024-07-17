export default {

    description: 'Extract path',
    args: [{name: 'segment', hint: 'zero-based segment, list of segments or empty to get whole path'}],
    returns: 'String',
    accepts: ['URL'],
    apply(url, segment = null) {
        const path = url.pathname.replace(/^\//, '');
        const pathSegments = path.split('/');
        if (String(segment).includes(',')) {
            return segment.split(',').map(s => pathSegments[s.trim()]).join('/');
        }
        return ['', null, undefined].includes(segment) ? path : pathSegments[segment];
    }
}