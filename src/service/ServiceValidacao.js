import Parse from './Parse'
import * as validacoes from '../Framework/FuncoesValidacao.js'
import * as FuncoesTexto from '../Framework/FuncoesTexto.js'


export async function hasEmail (email) {
    console.log('verificando email: ' + email)
    email = FuncoesTexto.removeSpaces(email)
    if (!validacoes.isEmailValido(email))
        throw "Email inválido: " + email

    let query = new Parse.Query('User')
    query.equalTo('email', email) 
    
    if ((await query.find()).length > 0)
        throw "Email já cadastrado"
}

export async function hasCPF (cpf) {
    console.log('verificando cpf: ' + cpf)
    if (!cpf)
        throw new Error('cpf inválido: ' + cpf)

    // adicionar validação de cpf
    
    let query = new Parse.Query('User')
    query.equalTo('cpf', cpf) 

    if ((await query.find()).length > 0)
        throw "cpf já cadastrado"
}

export async function hasPhone(telefone) {
    if (!telefone)
        throw new Error('Telefone inválido: ' + telefone)
    
    let _telefone = FuncoesTexto.getTelefoneMascarado(telefone)

    let query = new Parse.Query('User')
    query.equalTo('telefone', _telefone) 

    if ((await query.find()).length > 0)
        throw "Telefone já cadastrado"
}

