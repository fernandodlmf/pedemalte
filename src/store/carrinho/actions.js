import * as servicePedido from './../../service/ServicePedido.js'
import {getFloatDuasDecimais} from './../../Framework/FuncoesNumero.js'

export async function addItemAoCarrinho({commit, state, dispatch}, item) {
    console.log('addItemAoCarrinho')
    
    await dispatch('getCarrinhoAberto')
    if (!state.carrinho) 
        await dispatch('criaCarrinho')

    item.carrinho = state.carrinho   
    item.total = getFloatDuasDecimais(item.preco * item.quantidade)
    let totalCarrinho = getFloatDuasDecimais(item.carrinho.get('total'))
    console.log('total carrinho: ' + totalCarrinho)

    let result

    // Verificando se o produto já existe no carrinho
    let _item = state.itens.find(i => i.get('produtoInventario').id === item.produto.id)
    if (!_item) {
       item.carrinho.set('total', getFloatDuasDecimais(totalCarrinho + item.total))
       result = await servicePedido.adicionaItemAoCarrinho(item)        
    } else {
        let _qtdAtual = _item.get('quantidade') 

        try {
            _item.set('quantidade', _qtdAtual + item.quantidade)  
            _item.get('carrinho').set('total', getFloatDuasDecimais(totalCarrinho + item.total))
            await servicePedido.atualizaItem(_item)
        } catch (e) {
            _item.set('quantidade', _qtdAtual)  
            _item.get('carrinho').set('total', getFloatDuasDecimais(totalCarrinho + item.total))            
        }
        return
    }
        
    let novaLista = [...state.itens, result]
    console.log('nova lista')
    console.log(novaLista)
    commit('setItens', novaLista)
}

export async function criaCarrinho({commit, rootState}) {
    let _perfilLoja = rootState.loja.loja
    let _total = 0
    let carrinho = await servicePedido.criaCarrinho(_total, _perfilLoja)
    commit('setCarrinho', carrinho)
}

export async function getCarrinhoAberto({commit, state, dispatch}, recebeNovamente) { 
    console.log('action getCarrinhoAberto')
    console.log('recebe novamente: ' + recebeNovamente)
    
    if (!state.carrinho || recebeNovamente) {
        let carrinhoAberto = await servicePedido.getCarrinhoAberto()
        if (carrinhoAberto) {
            commit('setCarrinho', carrinhoAberto)
            await dispatch('getItenCarrinho')
        }           
    }
}

export async function getItenCarrinho({commit, state}) {
    console.log('obteve itens carrinho')
    let itens = await servicePedido.getItenCarrinho(state.carrinho)
    console.log(itens)
    commit('setItens', itens)
}

export async function removeItem({commit, state}, id) {
    console.log('removeItemCarrinho')
    
    if (!id)
        throw "id de produto inváldio"
        
    const item = state.itens.find(item => item.id === id)
    let totalItem = getFloatDuasDecimais(item.get('preco')) * item.get('quantidade')
    
    await servicePedido.removeItemCarrinho(item)
    let carrinho = await state.carrinho
    if (carrinho) {
        let totalCarrinho = getFloatDuasDecimais(carrinho.get('total')) - getFloatDuasDecimais(totalItem) 
        carrinho.set('total', getFloatDuasDecimais(totalCarrinho))
        await carrinho.save() 
    }
    
    let itens = state.itens.filter(item => item.id != id)
    commit('setItens', itens)
}

export async function atualizaFreteCarrinho({dispatch, state}) {
    await servicePedido.calculaFrete(state.carrinho.id)
    dispatch('getCarrinhoAberto', [true])
}


export async function atualizaItem({commit, state}, item) {
    console.log('atualizaItem')       
    await servicePedido.atualizaItem(item)
}

export async function limparCarrinho({commit, state, dispatch}, item) {
    console.log('limparCarrinho') 

    if (state.carrinho) {
        let carrinho = state.carrinho
        carrinho.set('tipo', 'CANCELADO')
        await servicePedido.atualizaItem(carrinho)
        commit('limparCarrinho')
    }    

    // for(let i = 0; i < state.itens.length; i++)
    //     await servicePedido.removeItemCarrinho(state.itens[i])

    ///await dispatch('getItenCarrinho')
}

export async function removerCarrinhoDoState({commit, state}) {
    console.log('limparCarrinho') 

    if (state.carrinho) {
        commit('setCarrinho', null)   
        commit('setItens', [])
    }
}

