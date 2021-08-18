import Parse from './../service/Parse'
import {isUsuarioLogado} from './ServiceUsuario.js'
import {getStore} from './LojaConfig.js'

function getUsuario() {

    const usuarioLogado = Parse.User.current()
    if (!usuarioLogado) 
        throw "Nenhuma usuário logado"
    return usuarioLogado
}

export async function calculaFrete(idCarrinho) {
    try {
        if (!idCarrinho)
            throw new Error('Id do carrinho inválido')
        await Parse.Cloud.run('calculateFare', { order_id: idCarrinho })    
    } catch (error) {
        console.error(error)
        _erro = "Erro ao calcular frente para carrinho: "
        if (error.code === 141) 
            throw _erro += 'Não realizamos entrega para o endereço selecionado.'

        throw _erro += idCarrinho + error.message        
    }
}

// Cria o carrinho caso
export async function criaCarrinho(total, loja) {
    console.log('servicePedido.criaCarrinho')
    try {
        if (!isUsuarioLogado()) 
            throw "Nenhuma usuário logado"
        
        let UserCart = Parse.Object.extend('Carrinho')
        const carrinho = new UserCart()
        carrinho.set('usuario', getUsuario())
        carrinho.set('tipo', 'EM_COMPRA')
        //carrinho.set('fare', 0)
        carrinho.set('total', total)
        return carrinho.save()
    } catch(e) {
        console.error(e)
        throw "Erro ao criar carrinho: " + e.message
    }
}

export async function getItenCarrinho(carrinho) {
    console.log('servicePedido.getItenCarrinho')
    try {
        if (!carrinho)
            throw "Carrinho inválido"
        let query = new Parse.Query('CarrinhoItens')
        query.include(['produtoInventario', 'produtoInventario.produto'])
        query.equalTo('carrinho', carrinho)
        
        const result = await query.find()
        return result
    } catch (e) {
        console.error(e)
        throw " Erro ao obter itens do carrinho: " + e
    }
} 

export async function removeItemCarrinho(item) {
    console.log('servicePedido.removeItemCarrinho')
    try {
        if (!(item instanceof Parse.Object))
            throw "Instancia de item inválida"
        await item.destroy()
    } catch (e) {
        console.error(e)
        throw e
    }
}

export async function atualizaItem(item) {
    console.log('servicePedido.atualizaItem')
    try {
        if (!(item instanceof Parse.Object))
            throw "Instancia de item inválida"
        await item.save()
    } catch (e) {
        console.error(e)
        throw e
    }
}

// Cria o carrinho caso
export async function getCarrinhoAberto() {
    console.log('servicePedido.getCarrinhoAberto')
    try {
        if (!isUsuarioLogado()) 
            throw "Nenhuma usuário logado"

        // Verifica se o carrinho já existe
        const queryCarrinho = new Parse.Query('Carrinho')
        queryCarrinho.equalTo('usuario', getUsuario())
        queryCarrinho.equalTo('tipo', 'EM_COMPRA')
        let resultado = await queryCarrinho.find()
        // console.log('carrinho aberto')
        // console.log(resultado)
        if (resultado.length > 1)
            throw "Foi encontrado mais de um carrinho aberto para este usuário e loja"
        
        return resultado[0]
    } catch(e) {
        console.error(e)
        throw "Erro ao obter carrinho aberto: " + e
    }
}

// Cria o carrinho caso
export async function isCarrinhoExiste() {
    console.log('servicePedido.isCarrinhoExiste')
    try {
       return (await getCarrinhoAberto()) === null
    } catch(e) {
        console.error(e)
        throw "Erro ao verificar se carrinho já existe: " + e.message
    }
}

// Adiciona o item ao carrinho
export async function adicionaItemAoCarrinho(item) {
    console.log('servicePedido.adicionaItemAoCarrinho')
    console.log(item)
    try {
        if (!item.quantidade)
            throw "Quantidade inválida"
        else if (!item.produto || !item.produto.get('produto').get('nome'))
            throw "Produto inválido"
        else if (!item.carrinho)
            throw "Carrinho inválido"

        let UserPurchase = Parse.Object.extend('CarrinhoItens')
        const itemCarrinho = new UserPurchase()
        
        itemCarrinho.set('quantidade', item.quantidade)
        itemCarrinho.set('carrinho', item.carrinho)
        itemCarrinho.set('produtoInventario', item.produto)
        itemCarrinho.set('preco', item.preco)
        
        let itemSalvo = await itemCarrinho.save()    
        return itemSalvo
    } catch(e) {
        console.error(e)
        throw "Erro ao adicionar produto ao carrinho: " + e
    }
}

export async function getPedidosHistorico(idLoja) {
    console.log('servicePedido.getPedidosHistorico')
    const usuarioLogado = Parse.User.current()

    if (!usuarioLogado) {
        console.log('Nennuma usuario logado')
        return
    }

    const queryCarrinho = new Parse.Query('Carrinho')
    queryCarrinho.equalTo('carrinho', usuarioLogado)
    queryCarrinho.containedIn('tipo', ['ENTREGUE', 'CANCELADO', 'DEVOLVIDO', 'REEMBOLSADO'])
    queryCarrinho.descending('updatedAt')
    

    const queryCarrinhoProdutoItem = new Parse.Query('CarrinhoItens')
    queryCarrinhoProdutoItem.matchesQuery('carrinho', queryCarrinho)
    queryCarrinhoProdutoItem.include(['produtoInventario.produto','carrinho.enderecoEntrega'])
    //queryCarrinhoProdutoItem.select('cart.userAddress')

    try {
        const serverResponse = await queryCarrinhoProdutoItem.find()

        let resposta = serverResponse.reduce((carrinhos, respostaItem) => {
            let carrinho = respostaItem.get('carrinho')
            let index = carrinhos.findIndex(el => el.id === carrinho.id)
            
            // console.log(respostaItem)
            // console.log(carrinho)
            
            if(index > -1) {
                carrinhos[index].itens.push(respostaItem)
            } else {
                carrinho.itens = [respostaItem]
                carrinhos.push(carrinho)
            }

            return carrinhos

        }, [])
        
        console.log('carrinhos')
            console.log(resposta)
        return resposta

    } catch (e) {
        console.log('Não foi possível obter o histórico de pedidos: ' + e)
    }
}

export async function realizaPagamento(paramentros) {
    const {endereco, formaPagamento} = paramentros   
     
    try {
        if (!endereco)
            throw new Error('Endereco inválido')
        else if (!formaPagamento)
            throw new Error('Forma de pagamento inválida')
        let _carrinho = await getCarrinhoAberto()   
        _carrinho.set('tipo', 'AGUARDANDO_ACEITACAO')
        _carrinho.set('enderecoEntrega', endereco)
        _carrinho.set('formaPagto', formaPagamento)

        let resposta = await _carrinho.save()
        console.log('resposta do pagamento')
        console.log(resposta)  
        return resposta
    } catch (error) {
        console.error(error)
        throw "Erro ao realizar pagamento: " + error.message
    }
}
