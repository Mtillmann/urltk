import remove_hash from '../src/Tasks/remove_hash';

describe('remove_hash transformer', () => {
    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => remove_hash.apply(url)).not.toThrow(Error);
    });

    it('returns an url', () => {
        const url = new URL('https://example.com');
        const result = remove_hash.apply(url);
        expect(result).toBeInstanceOf(URL);
    });

    it('removes the hash', () => {
        const url = new URL('https://example.com#hash');
        const result = remove_hash.apply(url);
        expect(result.hash).toBe('');
    });

    it('removes the hash when it is empty', () => {
        const url = new URL('https://example.com#');
        const result = remove_hash.apply(url);
        expect(result.hash).toBe('');
    });
    
    it('removes the hash when it is null', () => {
        const url = new URL('https://example.com');
        url.hash = null;
        const result = remove_hash.apply(url);
        expect(result.hash).toBe('');
    });
});