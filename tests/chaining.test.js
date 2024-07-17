import Transformer from '../src/Transformer';

describe('go from imdb url to ddg search', () => {
    const url = new URL('https://www.imdb.com/title/tt0111161/');
    const expectedURL = 'https://duckduckgo.com/?q=tt0111161'
    const chain = [
        {
            name : 'extract_path',
            args : [1]
        },
        {
            name: 'wrap',
            args: ['https://duckduckgo.com/?q=$1']
        }
    ]

    it('runs as expected', () => {
        expect(Transformer.run(url, chain).url).toBe(expectedURL);
    });
});

describe('change language of wikipedia article', () => {

    const url = new URL('https://de.wikipedia.org/wiki/Bratwurst');
    const expectedURL = 'https://en.wikipedia.org/wiki/Bratwurst';

    const chain = [
        {
            name: 'replace_in_host',
            args: ['de.', 'en.']
        }
    ]

    it('runs as expected', () => {
        expect(Transformer.run(url, chain).url.href).toBe(expectedURL);
    });

});

describe('check page domain dns', () => {

    const url = new URL('https://example.com');
    const expectedURL = 'https://dns.google/resolve?name=example.com';

    const chain = [
        {
            name: 'extract_host'
        },
        {
            name: 'wrap',
            args: ['https://dns.google/resolve?name=$1']
        }
    ];

    it('runs as expected', () => {
        expect(Transformer.run(url, chain).url).toBe(expectedURL);
    });

});

describe('just encode domain', () => {

    const url = new URL('https://example.com');
    const expectedURL = 'https%3A%2F%2Fexample.com%2F';

    const chain = [
        {
            name: 'wrap',
            args: ['$1']
        }
    ];

    it('runs as expected', () => {
        expect(Transformer.run(url, chain).url).toBe(expectedURL);
    });

});