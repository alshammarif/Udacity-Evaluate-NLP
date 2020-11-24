const formHandler = require('../src/client/js/formHandler');


describe('Testing submit functionality', () => {
    test('handleSubmit() test', () => { 
        expect(formHandler.handleSubmit).toBeDefined();
    })
    test('when input is empty', () => {
        //when a user hits submit with no text or URL inputed in the textarea
        let checker = formHandler.inputEmptyChecker('');
        const output = JSON.stringify({boolean: false, error: 'Please input some text or a valid URL in the text area.'});

        expect(JSON.stringify(checker)).toBe(output);
    })

    test('url or text path/returns url path when url is inputed', () => {
        let checker = formHandler.txtOrUrl('https://www.tor.com/2020/06/29/the-gift-that-keeps-on-giving-growing-up-with-percy-jackson/');

        expect(checker).toBe('&url=https://www.tor.com/2020/06/29/the-gift-that-keeps-on-giving-growing-up-with-percy-jackson/')
    })

    test('url or text path/returns text path when it is NOT a URL', () => {
        let checker = formHandler.txtOrUrl('Harry Potter, the boy who lived, was sitting with his best friend Hermione. They were discussing what to tell Ron when their elusive friend shows up at the great hall.');

        expect(checker).toBe('&txt=Harry Potter, the boy who lived, was sitting with his best friend Hermione. They were discussing what to tell Ron when their elusive friend shows up at the great hall.');
    })
})
