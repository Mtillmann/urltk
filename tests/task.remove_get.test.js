import remove_get from '../src/Tasks/remove_get';

describe('remove_get transformer', () => {
    it('accepts an url', () => {
        const url = new URL('https://example.com');
        expect(() => remove_get.apply(url)).not.toThrow(Error);
    });

    it('returns an url', () => {
        const url = new URL('https://example.com');
        const result = remove_get.apply(url);
        expect(result).toBeInstanceOf(URL);
    });

    it('removes the query string when no keys are given', () => {
        const url = new URL('https://example.com?param=value');
        const result = remove_get.apply(url);
        expect(result.search).toBe('');
    });

    it('removes the query string when * is given', () => {
        const url = new URL('https://example.com?param=value');
        const result = remove_get.apply(url, '*');
        expect(result.search).toBe('');
    });

    it('removes the query string when empty string is given', () => {
        const url = new URL('https://example.com?param=value');
        const result = remove_get.apply(url, '');
        expect(result.search).toBe('');
    });

    it('removes the query string when null is given', () => {
        const url = new URL('https://example.com?param=value');
        const result = remove_get.apply(url, null);
        expect(result.search).toBe('');
    });

    it('removes the query string when undefined is given', () => {
        const url = new URL('https://example.com?param=value');
        const result = remove_get.apply(url, undefined);
        expect(result.search).toBe('');
    });

    it('removes the query string when a single key is given', () => {
        const url = new URL('https://example.com?param=value');
        const result = remove_get.apply(url, 'param');
        expect(result.search).toBe('');
    });

    it('removes the query string when multiple keys are given', () => {
        const url = new URL('https://example.com?param=value&other=thing');
        const result = remove_get.apply(url, 'param, other');
        expect(result.search).toBe('');
    });

    it('removes the query string when multiple keys are given with spaces', () => {
        const url = new URL('https://example.com?param=value&other=thing');
        const result = remove_get.apply(url, '  param , other ');
        expect(result.search).toBe('');
    });

    it('removes the query string when multiple keys are given with spaces and *', () => {
        const url = new URL('https://example.com?param=value&other=thing');
        const result = remove_get.apply(url, '  param , * ');
        expect(result.search).toBe('');
    });

    it('removes the query string when brackets are used', () => {
        const url = new URL('https://example.com?param[value]=value');
        const result = remove_get.apply(url, 'param[value]');
        expect(result.search).toBe('');
    });

    it('removes the query string when brackets are used and param exists multiple times', () => {
        const url = new URL('https://example.com?param[]=value&param[]=value2');
        const result = remove_get.apply(url, 'param[]');
        expect(result.search).toBe('');
    });

    it('removes params with wildcards', () => {
        const url = new URL('https://example.com?param=value&param2=value2');
        const result = remove_get.apply(url, 'param*');
        expect(result.search).toBe('');
    });

    it('does not remove params that do not match the wildcard', () => {
        const url = new URL('https://example.com?param=value&param2=value2');
        const result = remove_get.apply(url, 'param2*');
        expect(result.search).toBe('?param=value');
    });

    
});