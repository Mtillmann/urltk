import regexp from '../src/Tasks/regexp.js';

describe('deref', () => {

    it('executes a simple regexp on an url', () => {
        const url = new URL('https://example.com/');
        const result = regexp.apply(url, 'exa', 'test');
        expect(result.href).toEqual('https://testmple.com/');
    });

    it('executes a slightly complex regexp on an url', () => {
        const url = new URL('https://example.com/');
        const result = regexp.apply(url, '(e).(a)', '$1$2');
        expect(result.href).toEqual('https://eample.com/');
    });

    it('replaces only first occurence without flag', () => {
        const url = new URL('https://example.com/');
        const result = regexp.apply(url, 't', '0');
        expect(result.href).toEqual('h0tps://example.com/');
    });

    it('replaces only all occurence with g flag', () => {
        const url = new URL('https://example.com/');
        const result = regexp.apply(url, 't', '0' , 'g');
        expect(result.href).toEqual('h00ps://example.com/');
    });

    it('fails to replace when single backslash is used', () => {
        const url = new URL('https://example.com/');
        const result = regexp.apply(url, '\w', '0' );
        expect(result.href).toEqual('https://example.com/');
    });

    it('replaces when double backslash is used', () => {
        const url = new URL('https://example.com/');
        const result = regexp.apply(url, '\\/\\w', '0' );
        expect(result.href).toEqual('https://0xample.com/');
    });

    

});