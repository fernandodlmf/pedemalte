export function setPerfil(state, perfil) {
    console.log('setperfil')
    console.log(perfil)
    state.perfil = perfil
}

export function setPedidosHistorico(state, listaPedidos) {
    state.listaPedidosHistorico = listaPedidos
}

export function setListaCupons(state, listaCupons) {
    state.listaCupons = listaCupons
}

export function setPagamentos(state, listaPagamentos) {
    state.listaPagamentos = listaPagamentos
}

export function setEnderecos(state, listaEnderecos) {
    state.listaEnderecos = listaEnderecos
}

export function setFavoritos(state, listaFavoritos) {
    state.listaFavoritos = listaFavoritos
}

export function setListaNotificacoes(state, listaNotificacoes) {
    state.listaNotificacoes = listaNotificacoes
}

export const setEnderecoSelecionado = (state, endereco) => {
  state.enderecoSelecionado = endereco
}

export const setPagamentoSelecionado = (state, pagamento) => {
  state.pagamentoPadrao = pagamento
}






