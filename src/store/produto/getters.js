export function getListaProdutosCategorias({listaProdutosCategorias}) {
    return listaProdutosCategorias
}

export function getListaAllProdutos({listaProdutos}) {
    return listaProdutos
}

export const getProdutosPorCategoriaById = (state) => (idCategoria) => {
    console.log(idCategoria)
    if (!idCategoria)
        throw "Categoria inválida"

    console.log('getProdutosPorCategoriaById ' + idCategoria)
    // console.log(state.listaProdutosCategorias.find(item => item.categoria.id === idCategoria))

    let produtosCategoria = state.listaProdutosCategorias.filter(item => item.get('categoria').id === idCategoria).map(item => item.get('produto').id)
    console.log('produtos da categoria: '  + idCategoria)
    console.log(produtosCategoria)
    let result = state.listaProdutos.filter(produto => produtosCategoria.includes(produto.get('produto').id))
    console.log('resultado filtrado ')
    console.log(result)
    return result
}

export const getProdutosPorCategoriaByName = (state) => (nomeCategoria) => {
    console.log(nomeCategoria)
    if (!nomeCategoria)
        throw "Categoria inválida"
    
    let produtosCategoria = state.listaProdutosCategorias
        .filter(item => item.get('categoria').get('nome')
            .toLowerCase().includes(String(nomeCategoria).toLowerCase())).map(item => item.get('produto').id)
    return state.listaProdutos.filter(produto => produtosCategoria.includes(produto.get('produto').id))
}

export const getProdutosByName = (state) => (nomeProduto) => {
    console.log('getProdutosByName: ' + nomeProduto)
    if (!nomeProduto)
        return []
    nomeProduto = String(nomeProduto).toLowerCase()
    return state.listaProdutos.filter(produtoInventario => produtoInventario.get('produto').get('nome').toLowerCase().includes(nomeProduto))
}

export const getDistinctCategorias = (state) => (idCategoriaPai) =>  {
    console.log('getDistinctCategorias ')

    console.log(state.listaProdutosCategorias)
    let resultado = state.listaProdutosCategorias.filter((value, index , self) => 
        index === self.findIndex(elemento => elemento.get('categoria').get('nome') === value.get('categoria').get('nome')))
            .filter(item => item.get('categoria').get('categoriaPai').id === idCategoriaPai ).map(item => item.get('categoria'))
    
    return resultado
}

export const getHarmonizacoesPorProdutoId = (state) => (idProduto) => {
    if (!idProduto)
        throw "Categoria inválida"

    console.log('getProdutosPorCategoriaById ' + idProduto)
    // console.log(state.listaProdutosCategorias.find(item => item.categoria.id === idCategoria))

    let resultado = state.listaHarmonizacoes.filter(item => item.get('produtoPai').id === idProduto).map(item => item.get('produtoFilho'))
    return resultado
}



