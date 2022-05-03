var faker = require('faker') // importando biblioteca faker para trabalhar com dados dinamico
var cpf = require ('gerador-validador-cpf') // importando biblioteca para gerar cpf dinamico

export default {
    deliver: function () {
        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()


        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: "11945233377",
            address: {
                postalCode: "08343320",
                street: "Travessa Salve a Mocidade",
                number: "153",
                details: "Casa 02",
                district: "Jardim da Conquista (Zona Leste)",
                city_state: "São Paulo/SP"
            },
            delivery_method: "Moto",
            cnh: "cnh-digital.jpg"
        }
        return data
    }
}