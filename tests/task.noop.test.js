import noop from '../src/Tasks/noop';

describe('noop transformer', () => {
    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => noop.apply(url)).not.toThrow(Error);
    });

    it('returns a URL', () => {
        const url = new URL('https://example.com');
        const result = noop.apply(url);
        expect(result instanceof URL).toBe(true);
    });

    it('does absolutely nothing', () => {
        const url = new URL('https://example.com?utm_source=google');
        const result = noop.apply(url);
        expect(result.href).toBe(url.href);
    });

});