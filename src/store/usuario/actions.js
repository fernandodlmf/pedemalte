import * as serviceUsuario from './../../service/ServiceUsuario.js'

export async function getPerfilFromServer({commit}) {
    try {
        const perfil = await serviceUsuario.getPerfil()
        console.log('perfil: ' + perfil)
        commit('setPerfil', perfil)
    } catch (e) {
        console.log('erro ao getPerfilFromServer: ' + e)
    }
}

export async function getPedidosHistorico({commit}) {
    const listaPedidos = await serviceUsuario.getPedidosHistorico()
    if (listaPedidos)
        commit('setPedidosHistorico', listaPedidos)
}

export async function getPagamentos({commit}) {
    const listaPagamentos = await serviceUsuario.getPagamentos()
    if (listaPagamentos)
        commit('setPagamentos', listaPagamentos)
}

export async function getEnderecos({commit}) {
    const listaEnderecos = await serviceUsuario.getEnderecos()
    if (listaEnderecos)
        commit('setEnderecos', listaEnderecos)
}

export async function getListaCupons({commit}) {
    const listaCupons = await serviceUsuario.getCupons()
    if(listaCupons)
        commit('setListaCupons', listaCupons)
}

export async function getFavoritos({commit}) {
    const listaFavoritos = await serviceUsuario.getFavoritos()
    if (listaFavoritos)
        commit('setFavoritos', listaFavoritos)
}

export async function getListaNotificacoes({commit}) {
    // const listaNotificacoes = serviceUsuario.getNotificacoes()
    // commit('setListaNotificacoes', listaNotificacoes)
}

export async function salvarEndereco({commit, state, dispatch}, endereco) {
    console.log(endereco)

    if (!endereco || !endereco.endereco)
        throw new Error('Endereco inválido')
    let existe = state.listaEnderecos.find(item => item.get('endereco') === endereco.endereco)
    if (existe && endereco.ehNovo)
        throw new Error('Endereco já cadastrado')
    
    const saved = await serviceUsuario.salvarEndereco(endereco)
    if (saved) {
        let listaAtual = state.listaEnderecos.filter(item => item.id !== endereco.objectId)
        const novaLista = [saved, ...listaAtual]
        commit('setEnderecos', novaLista)
        dispatch('updateSelectedAddress', saved.id)
    }
}

export async function adicionaERemoveFavorito({commit, state}, produtoInventario) {
    if (!produtoInventario)
        throw new Error('Produto inválido!')

    let retorno = await serviceUsuario.salvarFavorito(produtoInventario)
    let novaLista = []
    if (retorno) {
        novaLista = [...state.listaFavoritos, retorno]
    } else {
        if(state.listaFavoritos.length)
            novaLista = state.listaFavoritos.filter(favorito => favorito.get('produtoInventario').id !== produtoInventario.id)               
    }
    commit('setFavoritos', novaLista)
}

export const updateSelectedAddress = ({ commit, state }, addressId) => {
    try {
        const endereco = state.listaEnderecos.find(a => a.id === addressId)
        
        console.log(state)
        console.log("selecionando endereço: " + JSON.stringify(endereco))
        if (endereco) {
            commit('setEnderecoSelecionado', endereco)
            window.localStorage.setItem('vraaLojaEnderecoPadrao', endereco.id)
        }
    } catch (error) {
        throw error
    }  
}

export const updatePagamentoSelecionado = ({ commit, state }, pagamentoId) => {
    try {
        const pagamento = state.listaPagamentos.find(a => a.id === pagamentoId)
        console.log("selecionando pagamento padrao: " + JSON.stringify(pagamento))
        if (endereco) {
            commit('setPagamentoSelecionado', pagamento)
            window.localStorage.setItem('vraaLojaPayDefault', pagamento.id)
        }
    } catch (error) {
        throw error
    }  
}

export async function logOut({commit}) {
    await serviceUsuario.logout()
    commit('setPedidosHistorico', [])
    commit('setListaCupons', [])
    commit('setPagamentos', [])
    commit('setEnderecos', [])
    commit('setFavoritos', [])
    commit('setEnderecoSelecionado', null)
    commit('setPagamentoSelecionado', null)
    commit('setPerfil', null)
}








