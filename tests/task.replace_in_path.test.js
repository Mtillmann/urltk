import replace_in_path from '../src/Tasks/replace_in_path';

describe('replace_in_path transformer', () => {
    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => replace_in_path.apply(url)).not.toThrow(Error);
    });

    it('returns an url', () => {
        const url = new URL('https://example.com');
        const result = replace_in_path.apply(url);
        expect(result).toBeInstanceOf(URL);
    });

    it('replaces the path when no search is given but only replace', () => {
        const url = new URL('https://example.com/path/to/somewhere');
        const result = replace_in_path.apply(url, '', 'a/new/path');
        expect(result.pathname).toBe('/a/new/path');
    });

    it('replaces the path when search is given', () => {
        const url = new URL('https://example.com/path/to/somewhere');
        const result = replace_in_path.apply(url, '/path/to/somewhere', 'a/new/path');
        expect(result.pathname).toBe('/a/new/path');
    });

    it('replaces the path when search is given and replace is empty', () => {
        const url = new URL('https://example.com/path/to/somewhere');
        const result = replace_in_path.apply(url, '/path/to/somewhere', '');
        expect(result.hash).toBe('');
    });

    it('replaces inside the path', () => {
        const url = new URL('https://example.com/foo/bar/baz');
        const result = replace_in_path.apply(url, 'bar', 'qux');
        expect(result.pathname).toBe('/foo/qux/baz');
    });

    it('prepends to the path when search is ^', () => {
        const url = new URL('https://example.com/foo/bar/baz');
        const result = replace_in_path.apply(url, '^', 'qux');
        expect(result.pathname).toBe('/quxfoo/bar/baz');
    });

    it('appends the to path when search is $', () => {  
        const url = new URL('https://example.com/foo/bar/baz');
        const result = replace_in_path.apply(url, '$', 'qux');
        expect(result.pathname).toBe('/foo/bar/bazqux');
    });
});