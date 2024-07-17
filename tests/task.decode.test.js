import decode from "../src/Tasks/decode"

describe('decode transformer', () => {

    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => decode.apply(url)).not.toThrow(Error);
    });

    it('accepts a string', () => {
        const url = 'https://example.com';
        expect(() => decode.apply(url)).not.toThrow(Error);
    });

    it('decodes a string', () => {
        const result = decode.apply('some%20string%20with%20%25%2C%20%26%20and%20%3F');
        expect(result).toBe('some string with %, & and ?');
    });

    it('decodes an url', () => {
        const url = new URL('https://example.com?url=https%3A%2F%2Fexample.com%2F');
        const result = decode.apply(url);
        expect(result).toBe('https://example.com/?url=https://example.com/');
    });

})