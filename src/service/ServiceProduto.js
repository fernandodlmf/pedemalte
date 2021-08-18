import Parse from './../service/Parse'
import axios from 'axios'
import {getStore} from './LojaConfig.js'

export async function getProdutosMaisVistos(limit) {
    console.log('serviceProduto.getProdutosMaisVistos')

    const productQuery = new Parse.Query('Produto')
    productQuery.equalTo('ativo', true)
    productQuery.greaterThan('numeroVisitas', 0)
    productQuery.descending('numeroVisitas')
    productQuery.limit(limit)
    let resultado = (await productQuery.find()).map(item => item.id)
    //console.log(resultado)
    return resultado
}

export async function getAllProdutos() {
    console.log('serviceProduto.getAllProdutos')

    try {
        const productQuery = new Parse.Query('Produto')
        productQuery.equalTo('ativo', true)
        productQuery.limit(1000)

        const inventoryQuery = new Parse.Query('ProdutoInventario')
        inventoryQuery.matchesQuery('produto', productQuery)
        inventoryQuery.include(['produto'])
        //inventoryQuery.select(['fragile', 'featured', 'quantityExtra', 'forOver18', 'product', 'size', 'price'])
        //inventoryQuery.equalTo('ativo', true)
        inventoryQuery.limit(1000)
        
        let resultado = await inventoryQuery.find()
        //console.log(resultado)
        return resultado
    } catch(e) {
        console.log('Erro ao obter produtos inventario ' + e)
    }
}

export async function getAllHarmonizacoes() {
    console.log('serviceProduto.getAllHarmonizacoes')

    try {
        const produtosQuery = new Parse.Query('Produto')
        produtosQuery.equalTo('ativo', true)
        //produtosQuery.limit(1000)

        const pCategoryQuery = new Parse.Query('ProdutoHarmonizacao')
        pCategoryQuery.matchesQuery('produtoPai', produtosQuery)
        //pCategoryQuery.limit(1000)

        const result = await pCategoryQuery.find()
        // console.log('harmonizacoes')
        // console.log(result)
        return result
    } catch (e) {
        console.log('Erro ao obter harmonizacoes ' + e)
    }
}

export async function getProdutoCategorias() {
    console.log('serviceProduto.getProdutoCategorias')

    try {
        const produtosQuery = new Parse.Query('Produto')
        produtosQuery.equalTo('ativo', true)
        //produtosQuery.limit(1000)

        const pCategoryQuery = new Parse.Query('ProdutoCategoria')
        pCategoryQuery.matchesQuery('produto', produtosQuery)
        pCategoryQuery.include(['categoria'])
        pCategoryQuery.limit(1000)

        const inventoryQuery = new Parse.Query('ProdutoInventario')
        inventoryQuery.matchesQuery('produto', produtosQuery)
        inventoryQuery.limit(1000)

        const result = await pCategoryQuery.find()
        //console.log(result)
        return result
    } catch (e) {
        console.log('Erro ao obter categoria dos produtos ' + e)
    }
}

// Busca todos os produtos pelo ID da Loja
export async function getAllLojaProdutos(idLoja) {
    console.log('serviceProduto.getAllLojaProdutos')

    try {
        let query = new Parse.Query('Product')
        query.equalTo('store', getStore())
        //query.exclude(['User'])
        query.limit(1000)
        let resultado = await Promise.resolve(query.find())
        //console.log('PRodutos: ' +resultado)
        return resultado 
    } catch (e) {
        consolo.log('Erro ao obter todos os sprodutos da loja: ' + e)
    }
    
}

export async function getProdutos(idStore) {
    console.log('serviceProduto.getProdutos')
    try {
        const produtosQuery = new Parse.Query('Product')
        produtosQuery.equalTo('store', getStore())
        produtosQuery.equalTo('status', true)
        produtosQuery.limit(1)

        // const resultado = await Promise.resolve(produtosQuery.find())
        // console.log('resultado1: ' + JSON.stringify(resultado))

        const produtoInventarioQuery = new Parse.Query('ProductInventory')
        produtoInventarioQuery.equalTo('status', true)
        produtoInventarioQuery.limit(1)
        //produtoInventarioQuery.include(['product.ProductCategory',])
        produtoInventarioQuery.matchesQuery('product', produtosQuery)
        produtoInventarioQuery.descending('updatedAt')
        produtoInventarioQuery.find()

        const resultado1 = await Promise.resolve(produtoInventarioQuery.find())
        
    } catch(e) {
        console.log('erro ao obter produtos ' + e)

    }
}