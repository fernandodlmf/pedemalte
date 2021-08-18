import * as serviceProduto from './../../service/ServiceProduto.js'

export async function getProdutoCategorias ({commit}) {
    const categorias = await serviceProduto.getProdutoCategorias()
    commit('setProdutoCategorias', categorias)
}

export async function getAllProdutos({commit}) {
    const produtos = await serviceProduto.getAllProdutos()
    commit('setAllProdutos', produtos)
}

export async function getAllHarmonizacoes({commit}) {
    const harmonizacoes = await serviceProduto.getAllHarmonizacoes()
    commit('setAllHarmonizacoes', harmonizacoes)
}


export async function getProdutosMaisVistos ({commit, state}) {
    const listaProdutosIds = await serviceProduto.getProdutosMaisVistos(10)
    let result = state.listaProdutos.filter(produto => listaProdutosIds.includes(produto.get('produto').id))
    commit('setProdutosMaisVistos', result)
}

