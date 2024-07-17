import encode from "../src/Tasks/encode"

describe('encode transformer', () => {

    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => encode.apply(url)).not.toThrow(Error);
    });

    it('accepts a string', () => {
        const url = 'https://example.com';
        expect(() => encode.apply(url)).not.toThrow(Error);
    });

    it('encodes a string', () => {
        const result = encode.apply('some string with %, & and ?');
        expect(result).toBe('some%20string%20with%20%25%2C%20%26%20and%20%3F');
    });

    it('encodes an url', () => {
        const url = new URL('https://example.com');
        const result = encode.apply(url);
        expect(result).toBe('https%3A%2F%2Fexample.com%2F');
    });

})