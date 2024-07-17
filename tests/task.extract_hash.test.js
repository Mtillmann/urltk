import extract_hash from '../src/Tasks/extract_hash';

describe('extract_hash transformer', () => {
    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => extract_hash.apply(url)).not.toThrow(Error);
    });

    it('returns a string', () => {
        const url = new URL('https://example.com');
        const result = extract_hash.apply(url);
        expect(typeof result).toBe('string');
    });

    it('extracts the whole hash', () => {
        const url = new URL('https://example.com#hash');
        const result = extract_hash.apply(url);
        expect(result).toBe('hash');
    });

    it('does not break when no hash is present', () => {
        const url = new URL('https://example.com');
        const result = extract_hash.apply(url);
        expect(result).toBe('');
    });

    it('keeps the hash symbol when requested', () => {
        const url = new URL('https://example.com#hash');
        const result = extract_hash.apply(url, true);
        expect(result).toBe('#hash');
    });
    
});