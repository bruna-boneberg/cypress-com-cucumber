
And(/^desejo realizar uma "([^"]*)"$/, (operacaoDesejada) => {

	let operador;

	switch (operacaoDesejada) {
		case 'soma':
			operador = '+'
			break;
		case 'subtração':
			operador = '–'
			break;
		case 'multiplicação':
			operador = '×'
			break;
		case 'divisão':
			operador = '/'
			break;

	}
	Cypress.env('operador', operador)
});

And(/^informar os valores "([^"]*)" e "([^"]*)"$/, (primeiroValor, segundoValor) => {
	cy.get('span[class="scinm"]').as('valores')
	cy.get('span[class="sciop"]').as('operadores')

	cy.get('@valores').contains(primeiroValor).click()
	cy.get('@operadores').contains(`${Cypress.env('operador')}`).click()
	cy.get('@valores').contains(segundoValor).click()

});

When(/^finalizar a conta$/, () => {
	cy.get('span[class="scieq"]').contains('=').click()
});

Then(/^devo obter o resultado "([^"]*)"$/, (resultadoEsperado) => {
	cy.get('#sciOutPut').as('resultado')

	cy.get('@resultado')
	.invoke('text')
	.should('contain', resultadoEsperado)
});



