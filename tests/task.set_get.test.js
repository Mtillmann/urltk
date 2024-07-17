import set_get from "../src/Tasks/set_get";

describe('set_get transformer', () => {
    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => set_get.apply(url)).not.toThrow(Error);
    });

    it('returns an url', () => {
        const url = new URL('https://example.com');
        const result = set_get.apply(url);
        expect(result).toBeInstanceOf(URL);
    });

    it('sets a value', () => {
        const url = new URL('https://example.com');
        const result = set_get.apply(url, 'foo=bar');
        expect(result.search).toBe('?foo=bar');
    });

    it('replaces a value', () => {
        const url = new URL('https://example.com?foo=bar');
        const result = set_get.apply(url, 'foo=baz');
        expect(result.search).toBe('?foo=baz');
    });

    it('adds multiple values', () => {
        const url = new URL('https://example.com');
        const result = set_get.apply(url, 'foo=bar,baz=qux');
        expect(result.search).toBe('?foo=bar&baz=qux');
    });

    it('replaces multiple values', () => {
        const url = new URL('https://example.com?foo=bar&baz=qux');
        const result = set_get.apply(url, 'foo=baz,baz=foo');
        expect(result.search).toBe('?foo=baz&baz=foo');
    });

    it('replaces and adds multiple values', () => {
        const url = new URL('https://example.com?foo=bar&baz=qux');
        const result = set_get.apply(url, 'foo=baz,qux=foo');
        expect(result.search).toBe('?foo=baz&baz=qux&qux=foo');
    });

    it('sanitizes the given pairs', () => {
        const url = new URL('https://example.com');
        const result = set_get.apply(url, 'foo=bar, baz=qux    , bar = foo');
        expect(result.search).toBe('?foo=bar&baz=qux&bar=foo');
    });
});