import Transformer from '../src/Transformer';

describe('MatchFilter', () => {
    it('matches any url with empty filter', () => {
        const url = 'https://www.example.com';
        const actions = [
            {
                filter: ''
            }
        ];
        expect(Transformer.filter(url, actions)).toBe(true);
    });

    it('matches any url with asterik', () => {
        const url = 'https://www.example.com';
        const actions = [
            {
                filter: '*'
            }
        ];
        expect(Transformer.filter(url, actions)).toBe(true);
    });


    it('matches any url with empty filter of at least one action', () => {
        const url = 'https://www.example.com';
        const actions = [
            {
                filter: 'nomatch'
            },
            {
                filter: ''
            }
        ];
        expect(Transformer.filter(url, actions)).toBe(true);
    });

    it('does not match when string doesnt match', () => {
        const url = 'https://www.example.com';
        const actions = [
            {
                filter: 'nomatch'
            }
        ];

        expect(Transformer.filter(url, actions)).toBe(false);
    });


    it('matches url when substring applies', () => {
        const url = 'https://www.example.com';
        const actions = [
            {
                filter: 'examp'
            }
        ];
        expect(Transformer.filter(url, actions)).toBe(true);
    });

    it('matches url when substring from list applies', () => {
        const url = 'https://www.example.com';
        const actions = [
            {
                filter: 'examp,lol'
            }
        ];
        expect(Transformer.filter(url, actions)).toBe(true);
    });

    it('does not match when no substring from list applies', () => {
        const url = 'https://www.example.com';
        const actions = [
            {
                filter: 'foo,bar'
            }
        ];
        expect(Transformer.filter(url, actions)).toBe(false);
    });

    it('matches url when regex applies', () => {
        const url = 'https://www.example.com';
        const actions = [
            {
                filter: 're:example'
            }
        ];
        expect(Transformer.filter(url, actions)).toBe(true);
    });

    it('matches url when complex regex applies', () => {
        const url = 'https://www.example.com';
        const actions = [
            {
                filter: 're:[exa]{3}..le\\.\\w{2}[^n]'
            }
        ];
        expect(Transformer.filter(url, actions)).toBe(true);
    });

    it('matches url regexp from documentation applies', () => {
        const url = 'https://imdb.com/title/tt1234567/';
        const actions = [
            {
                filter: 're:^https:\\/\\/[\w.]*imdb.com'
            }
        ];
        expect(Transformer.filter(url, actions)).toBe(true);
    });

    it('matches url regexp from documentation applies with subdomain', () => {
        const url = 'https://www.imdb.com/title/tt1234567/';
        const actions = [
            {
                filter: 're:^https:\\/\\/[\w.]*imdb.com'
            }
        ];
        expect(Transformer.filter(url, actions)).toBe(true);
    });



});