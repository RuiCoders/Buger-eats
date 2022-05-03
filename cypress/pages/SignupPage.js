
class SignupPage {
    //função go acessar a pagina do formulario do entregador 
    go() {
        //viewport redimencionar o tamnaho da tela para o padrão–>
        cy.viewport(1440, 900)

        //visit apresenta a pagina alvo do teste–>
        cy.visit('/')

        //Get busca exatamente o caminho botão solicitado depois foi criada um sub funcao de click para ver ser o botão esta funciaonado corretamente–>
        cy.get('a[href="/deliver"]').click()

        // Criado um check point para que seja garatido o local correto 
        //BUG**referente ao espaço no texto pode ser reportador com nivel baixo de bug –>
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }// função fillForm vai preencher todo formulario
    fillForm(deliver) {
        //inserir o caminho exato montando o localizador.  subfunçao para preencher o campo comdados da massa de test
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)
        //Endereço
        cy.get('input[name="postalcode"]').type(deliver.address.postalCode)
        cy.get('input[type="button"][value="Buscar CEP"]').click()
        //Buscar pelo elemento depois verificar 
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        cy.get('img[alt="Moto"]').click()
        //cy.get('deliver-method li', deliver.metodo_entrega).click()
        //cy.get('img[alt="Bicicleta"]').click()
        // cy.get('img[alt="Van/Carro"]').click()

        // Localizador tiver ^ inicializar a buscar pelo começo do texto da propriedade e com $ pesquisa no final  da propriedade
        //inserir o caminho exato montando o localizador. sub função da bliblioteca importadada attachFile buscando a imagem na subpasta 
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)

    }
    submit() {
        cy.get('form button[type="submit"]').click()
    }
    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container  .swal2-html-container')
            .should('have.text', expectedMessage)
    }
    alertMessageShouldBe(expectedMessage) {
        //Valida CPF
        cy.get('.alert-error').should('have.text', expectedMessage)
    }
    alertMessageShouldBe(expectedMessage) {
        //Valida e-mail
        //cy.get('.alert-error').should('have.text', expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}
export default new SignupPage;