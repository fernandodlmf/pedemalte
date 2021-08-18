export function setItens(state, listaItens) {
    state.itens = listaItens
}

export function setCarrinho(state, carrinho) {
    state.carrinho = carrinho
}

export function limparCarrinho(state) {
    state.carrinho = null
    state.itens = []
    state.total = 0
}

