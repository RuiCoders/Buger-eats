import signupPage from '../pages/SignupPage'
import SignupFactory from '../factories/SignupFactory'
describe('signup', () => {
  
    /*before(() => {
        cy.log('Tudo aqui é executado uma única vez "ANTES" de TODOS os casos de Testes')
    });
    beforeEach(() => {
        cy.log('Tudo aqui é executado sempre "ANTES" de CADA caso de Teste')
    });
    after(() => {
        cy.log('Tudo aqui é executado uma única vez "DEPOIS" de TODOS os casos de Testes')
    });
    afterEach(() => {
        cy.log('Tudo aqui é executado sempre "DEPOIS" de CADA caso de Teste')
    });*/

    it('Usuario deve ser se tornar um entregador', function () {

        var deliver = SignupFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        // Foi criando uma constante para receber a msg de texto 
        //Botão de confirmação
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)
    })
    it('CPF incorreto', function () {

        var deliver = SignupFactory.deliver()
        deliver.cpf = '000000141AA'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! CPF inválido')
    })
    it('Email incorreto', function () {

        var deliver = SignupFactory.deliver()
        deliver.email = 'rui.com.br'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')

    })
    context('Required fields', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery-method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]
        before(function(){
            signupPage.go()
            signupPage.submit()
        })
        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShouldBe(msg.output)
            })
        })
    })
    
})