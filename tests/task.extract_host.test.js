import extract_host from '../src/Tasks/extract_host';

describe('extract_host transformer', () => {
    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => extract_host.apply(url)).not.toThrow(Error);
    });

    it('returns a string', () => {
        const url = new URL('https://example.com');
        const result = extract_host.apply(url);
        expect(typeof result).toBe('string');
    });

    it('extracts the whole host when no segment is given', () => {
        const url = new URL('https://example.com');
        const result = extract_host.apply(url);
        expect(result).toBe('example.com');
    });

    it('extracts subdomain when 0 is given', () => {
        const url = new URL('https://www.example.com');
        const result = extract_host.apply(url, 0);
        expect(result).toBe('www');
    });

    it('extracts tld when 2 is given', () => {
        const url = new URL('https://www.example.com');
        const result = extract_host.apply(url, 2);
        expect(result).toBe('com');
    });

    it('extracts multiple segments when comma-separated', () => {
        const url = new URL('https://www.example.com');
        const result = extract_host.apply(url, '1,2');
        expect(result).toBe('example.com');
    });

});