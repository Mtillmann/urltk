export default {

    description: 'extract domain',
    args: [{name: 'segment', hint: 'zero-based segment, list of segments or empty to get whole domain'}],
    returns: 'String',
    accepts: ['URL'],

    apply(url, segment = null) {
        const host = url.hostname;
        const hostSegments = host.split('.');
        if (String(segment).includes(',')) {
            return segment.split(',').map(s => hostSegments[s.trim()]).join('.');
        }

        return ['', null, undefined].includes(segment) ? host : hostSegments[segment]
    }
}