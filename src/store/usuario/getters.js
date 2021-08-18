/*
export function someGetter (state) {
}
*/
import * as serviceUsuario from './../../service/ServiceUsuario.js'

export function getUsuarioPerfil({perfil}) {
    return perfil
}

export function getUsuarioNotificacoes({listaNotificacoes}) {
    return listaNotificacoes
}

export function getUsuarioPedidos({listaPedidosHistorico}) {
    return listaPedidosHistorico
}

export function getUsuarioEnderecos({listaEnderecos}) {
    return listaEnderecos
}

export function getUsuarioPagamentos({listaPagamentos}) {
    return listaPagamentos
}

export function isUsuarioLogado() {
    console.log('verificando usuario logado')
    return serviceUsuario.isUsuarioLogado()
}

export function getEnderecoSelecionado ({ enderecoSelecionado, listaEnderecos }) {
    let endereco
    if (enderecoSelecionado) {
       endereco = enderecoSelecionado
    } else if (window.localStorage.getItem('vraaLojaEnderecoPadrao')) {
        let _id = window.localStorage.getItem('vraaLojaEnderecoPadrao')
       endereco = listaEnderecos.find(item => item.id === _id)
    } else if (listaEnderecos.length)
        endereco = listaEnderecos[0]
    return endereco
}

export function getPagamentoPadrao ({ pagamentoPadrao, listaPagamentos }) {
    let pagamento
    console.log('aqui')
    console.log('lista cartoes')
    console.log(listaPagamentos)
    if (pagamentoPadrao) {
       pagamento = pagamentoPadrao
       console.log('entrou1')
    } else if (window.localStorage.getItem('vraaLojaPayDefault')) {
        console.log('entrou2')
        let _id = window.localStorage.getItem('vraaLojaPayDefault')
       pagamento = listaPagamentos.find(item => item.id === _id)
    } else if (listaPagamentos.length)
        console.log('entrou3')
        pagamento = listaPagamentos[0]
    return pagamento
}
