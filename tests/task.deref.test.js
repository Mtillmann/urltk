import deref from '../src/Tasks/deref.js';

describe('deref', () => {

    it('should return a URL object with the href of the input', () => {
        const url = new URL('https://whatsmyreferer.com/');
        const result = deref.apply(url);
        expect(result.href).toEqual('http://localhost:5173/#/deref/?url=https%3A%2F%2Fwhatsmyreferer.com%2F');
    });


    it('works when the given url is complex', () => {
        const url = new URL('https://whatsmyreferer.com/?a=1&b=2#hash');
        const result = deref.apply(url);
        expect(result.href).toEqual('http://localhost:5173/#/deref/?url=https%3A%2F%2Fwhatsmyreferer.com%2F%3Fa%3D1%26b%3D2%23hash');
    });


    it('works when the given url contains another url', () => {
        const url = new URL('https://whatsmyreferer.com/?a=1&b=2&c=' + encodeURIComponent('https://whatsmyreferer.com/?a=1&b=2#hash') + '#hash');
        const result = deref.apply(url);
        expect(result.href).toEqual('http://localhost:5173/#/deref/?url=https%3A%2F%2Fwhatsmyreferer.com%2F%3Fa%3D1%26b%3D2%26c%3Dhttps%253A%252F%252Fwhatsmyreferer.com%252F%253Fa%253D1%2526b%253D2%2523hash%23hash');
    });


});