import extract_path from '../src/Tasks/extract_path';

describe('extract_path transformer', () => {
    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => extract_path.apply(url)).not.toThrow(Error);
    });

    it('returns a string', () => {
        const url = new URL('https://example.com');
        const result = extract_path.apply(url);
        expect(typeof result).toBe('string');
    });

    it('extracts the whole path when no segment is given', () => {
        const url = new URL('https://example.com/path/to/somewhere');
        const result = extract_path.apply(url);
        expect(result).toBe('path/to/somewhere');
    });

    it('extracts first segment when 0 is given', () => {
        const url = new URL('https://www.example.com/path/to/somewhere');
        const result = extract_path.apply(url, 0);
        expect(result).toBe('path');
    });

    it('extracts third segment when 2 is given', () => {
        const url = new URL('https://www.example.com/path/to/somewhere');
        const result = extract_path.apply(url, 2);
        expect(result).toBe('somewhere');
    });

    it('extracts multiple segments when comma-separated', () => {
        const url = new URL('https://www.example.com/path/to/somewhere');
        const result = extract_path.apply(url, '1,2');
        expect(result).toBe('to/somewhere');
    });

});