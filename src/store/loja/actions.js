import * as serviceLoja from './../../service/ServiceLoja.js'

export async function getLojaCategorias({commit}, idLoja) {
    console.log('getLojaCategorias id? ' + idLoja)
    const categorias = await serviceLoja.getLojaCategorias()
    commit('setLojaCategorias', categorias)
}

export async function getLoja({commit}, idLoja) {
    const loja = await serviceLoja.getLoja()
    commit('setLoja', loja)
}

export async function getBanners({commit}, idLoja) {
    const listaBanners = await serviceLoja.getLojaBanners()
    commit('setBanners', listaBanners)
}

export async function getFormasPagto({commit}) {
    const listaFormasPagto = await serviceLoja.getFormasPagto()
    if (listaFormasPagto)
        commit('setFormasPagto', listaFormasPagto)
}

export async function escolheCategoria({commit}, categoria) {
    commit('setCategoriaEscolhida', categoria)
}

export async function escolheProduto({commit}, produto) {
    commit('setProdutoEscolhido', produto)
}
