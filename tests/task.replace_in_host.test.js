import replace_in_host from '../src/Tasks/replace_in_host';

describe('replace_in_host transformer', () => {
    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => replace_in_host.apply(url)).not.toThrow(Error);
    });

    it('returns an url', () => {
        const url = new URL('https://example.com');
        const result = replace_in_host.apply(url);
        expect(result).toBeInstanceOf(URL);
    });

    it('replaces the host when no search is given but only replace', () => {
        const url = new URL('https://example.com');
        const result = replace_in_host.apply(url, '', 'foobar.com');
        expect(result.host).toBe('foobar.com');
    });

    it('replaces the host when search is given', () => {
        const url = new URL('https://example.com');
        const result = replace_in_host.apply(url, 'example.com', 'foobar.com');
        expect(result.host).toBe('foobar.com');
    });

    it('replaces inside the host', () => {
        const url = new URL('https://example.com');
        const result = replace_in_host.apply(url, 'exa', 'qux');
        expect(result.host).toBe('quxmple.com');
    });

    it('prepends to the host when search is ^', () => {
        const url = new URL('https://example.com');
        const result = replace_in_host.apply(url, '^', 'foo');
        expect(result.host).toBe('fooexample.com');
    });

    it('appends the to host when search is $', () => {
        const url = new URL('https://example.com');
        const result = replace_in_host.apply(url, '$', 'bar');
        expect(result.host).toBe('example.combar');
    });
});