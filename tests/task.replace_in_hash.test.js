import replace_in_hash from '../src/Tasks/replace_in_hash';

describe('replace_in_hash transformer', () => {
    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => replace_in_hash.apply(url)).not.toThrow(Error);
    });

    it('returns an url', () => {
        const url = new URL('https://example.com');
        const result = replace_in_hash.apply(url);
        expect(result).toBeInstanceOf(URL);
    });

    it('replaces the hash when no search is given but only replace', () => {
        const url = new URL('https://example.com#hash');
        const result = replace_in_hash.apply(url, '', 'new_hash');
        expect(result.hash).toBe('#new_hash');
    });

    it('replaces the hash when search is given', () => {
        const url = new URL('https://example.com#hash');
        const result = replace_in_hash.apply(url, 'hash', 'new_hash');
        expect(result.hash).toBe('#new_hash');
    });

    it('replaces the hash when search is given and replace is empty', () => {
        const url = new URL('https://example.com#hash');
        const result = replace_in_hash.apply(url, 'hash', '');
        expect(result.hash).toBe('');
    });

    it('replaces inside the hash', () => {
        const url = new URL('https://example.com#foobarbaz');
        const result = replace_in_hash.apply(url, 'bar', 'qux');
        expect(result.hash).toBe('#fooquxbaz');
    });

    it('prepends to the hash when search is ^', () => {
        const url = new URL('https://example.com#hash');
        const result = replace_in_hash.apply(url, '^', 'foo');
        expect(result.hash).toBe('#foohash');
    });

    it('appends the to hash when search is $', () => {
        const url = new URL('https://example.com#hash');
        const result = replace_in_hash.apply(url, '$', 'bar');
        expect(result.hash).toBe('#hashbar');
    });
});