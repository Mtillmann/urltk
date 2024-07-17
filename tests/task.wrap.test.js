import wrap from "../src/Tasks/wrap";

describe('wrap transformer', () => {
    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => wrap.apply(null, url)).not.toThrow(Error);
    });

    it('accepts a string', () => {
        const url = 'https://example.com';
        expect(() => wrap.apply(null, url)).not.toThrow(Error);
    });

    it('returns a string when it can\'t parse url', () => {
        const url = 'nonurlstring';
        const result = wrap.apply("CoerceToString$1", url);
        expect(typeof result).toBe('string');
    });
/*
    it('returns an url when it can parse', () => {
        const url = 'https://example.com';
        const result = wrap.apply("$1", url);
        expect(result.constructor.name).toBe('URL');
    });
*/

    it('wraps a string value into a string', () => {
        const url = 'https://example.com/$1';
        const result = wrap.apply('test', url);
        expect(result).toBe('https://example.com/test');
    });

    it('wraps an url value into a string', () => {
        const url = 'https://example.com/$1';
        const input = new URL('https://example.com/test');
        const result = wrap.apply(input, url);
        expect(result).toBe('https://example.com/https%3A%2F%2Fexample.com%2Ftest');
    });

    it('encodes the value before wraping', () => {
        const url = 'https://example.com/$1';
        const result = wrap.apply('test test', url);
        expect(result).toBe('https://example.com/test%20test');
    });

    it('does not encode the value before wraping when returns string', () => {
        const url = '@$1';
        const result = wrap.apply('test test', url, false);
        expect(result).toBe('@test test');
    });

    it('works with arg arrays', () => { 
        const url = 'https://example.com/$1';
        const result = wrap.apply('test test', ...[url, false]);
        expect(result).toBe('https://example.com/test test');
    });

    it('works with sparse arg arrays', () => { 
        const url = 'https://example.com/$1';
        const result = wrap.apply('test test', ...[url]);
        expect(result).toBe('https://example.com/test%20test');
    });

    it('removes the $1 placeholder if no value is provided', () => {
        const url = 'https://example.com/$1';
        const result = wrap.apply(null, url);
        expect(result).toBe('https://example.com/');
    });

});