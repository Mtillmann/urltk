import extract_get from '../src/Tasks/extract_get';

describe('extract_get transformer', () => {
    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => extract_get.apply(url)).not.toThrow(Error);
    });

    it('returns a string', () => {
        const url = new URL('https://example.com');
        const result = extract_get.apply(url);
        expect(typeof result).toBe('string');
    });

    it('extracts a single get parameter', () => {
        const url = new URL('https://example.com?param=value');
        const result = extract_get.apply(url, 'param');
        expect(result).toBe('value');
    });

    it('does not break when extracting a non-existing parameter', () => {
        const url = new URL('https://example.com?param=value');
        const result = extract_get.apply(url, 'nonexisting');
        expect(result).toBe('');
    });
    
});