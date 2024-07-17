import detrack from '../src/Tasks/detrack';

describe('detrack transformer', () => {
    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => detrack.apply(url)).not.toThrow(Error);
    });

    it('returns a URL', () => {
        const url = new URL('https://example.com');
        const result = detrack.apply(url);
        expect(result instanceof URL).toBe(true);
    });

    it('removes tracking parameters from url', () => {
        const url = new URL('https://example.com?utm_source=google');
        const result = detrack.apply(url);
        expect(result.href).toBe('https://example.com/');
    });

    it('removes multiple tracking parameters from url', () => {
        const url = new URL('https://example.com?utm_source=google&gclid=123');
        const result = detrack.apply(url);
        expect(result.href).toBe('https://example.com/');
    });

    it('keeps unsuspicious get parameters intact', () => {
        const url = new URL('https://example.com?utm_source=google&utm_medium=cpc&keep=me');
        const result = detrack.apply(url);
        expect(result.href).toBe('https://example.com/?keep=me');
    });

});