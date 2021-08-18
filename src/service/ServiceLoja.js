import Parse from './../service/Parse'
import {getStore} from './LojaConfig.js'
import {isUsuarioLogado} from './ServiceUsuario.js'

export async function getLojaBanners() {
    console.log('serviceLoja.getLojaBanners')
    let ativo = true;

    try {
        const queryBanners = new Parse.Query('LojaBanners')
        queryBanners.equalTo('loja', getStore())
        queryBanners.equalTo('status', ativo)
        queryBanners.equalTo('type', 'PROMO')
        queryBanners.ascending('index')    

        //return banner;
        let resultado = await queryBanners.find()    
        return resultado
    } catch (error) {
        throw new Error('Erro ao obter banners: ' + error.message)
    }
}

export async function getLoja() {
    console.log('serviceLoja.getLoja')
    try {
        if (!getStore().id)
            throw "Id da loja inválido"
        
        let query = new Parse.Query('Store')
        let result = await query.get(getStore().id)
       
        //console.log('loja: ' + JSON.stringify(result))
        return result  
    } catch (e) {
        console.error(e)
        throw "Erro ao obter loja: " + e
    }
}

// Busca todas as categorias da pela ID da Loja
export async function getLojaCategorias(idLoja) {
    console.log('serviceLoja.getLojaCategorias')

    try {
        if (!getStore().id)
            throw "Id da loja inválido"

        let queryCategorias = new Parse.Query('LojaCategoria')
        queryCategorias.equalTo('loja', getStore())
        queryCategorias.include('categoria')
        queryCategorias.limit(1000)


        const results = await Promise.resolve(queryCategorias.find())
        let categorias  = results.map(item => item.get('categoria'))

        //console.log('loja categorias: ' + JSON.stringify(results))
        return categorias
    } catch(e) {
        console.log('Erro ao obter  categorias da loja: ' + e)
        throw e
    }
}

export async function getFormasPagto() {
    console.log('executando serviceLoja.getFormasPagto')
    if (!isUsuarioLogado())
        return
    
    const query = new Parse.Query('FormaPagto')
    query.equalTo('ativo', true)

    try {
        let resultado = await query.find()
        console.log('formas pagto')
        //console.log(resultado)

        return resultado
    } catch (e) {
        console.error(e)
    }
}

