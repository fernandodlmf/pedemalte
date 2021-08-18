import Parse from './../service/Parse'

export function getStore() {
    const Loja = Parse.Object.extend('Loja')
    const loja = new Loja()
    loja.id = '9LPOvpocbL' // casa do barbeiro
    //loja.id = 'VJDO6rYObU' // vraa soluções

    return loja
}