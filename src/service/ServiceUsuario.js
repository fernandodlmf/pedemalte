import Parse from './../service/Parse'
import * as FuncoesValidacao from './../Framework/FuncoesValidacao.js'
import * as FuncoesTexto from './../Framework/FuncoesTexto.js'
import { getStore } from './LojaConfig.js'

function getQueryPadrao(classe) {
    console.log('executando serviceUsuario.getQueryPadrao')
    if (!classe)
        throw new Error('Classe de query inváida')

    let query = new Parse.Query(classe)
    return query
}

export async function login(usuario, senha) {
    console.log('executando serviceUsuario.login')
    console.log('usuario: ' + usuario)
    console.log('senha: ' + senha)
    let _dev = false
    if(_dev) {
        usuario = 'fernandodlmf@gmail.com' 
        senha = 'senha123'
    }

    try {     
        if (!usuario)
            throw new Error("Usuário não pode ser vazio")
        else if (!senha)
            throw new Error("senha não pode ser vazio")

            console.log('aqui')

        await Parse.User.logIn(usuario.toLowerCase(), senha.trim())
        return Parse.User.current()      
    } catch (error) {        
        console.log("erro ao logar")
        console.error(error)
        throw error
    }   
}

export async function logout() {
    console.log('executando serviceUsuario.logout')
    try {
         await Parse.User.logOut()
         console.log('deslogou')
        //this.$router.go(-1)
    } catch (e) {
        console.error(e)
    }
}

export async function salvar(usuario) {
    console.log('executando serviceUsuario.salvar')
    console.log(usuario)
    // if(_dev) {
    //     usuario = 'fernandodlmf@gmail.com' 
    //     senha = 'senha123'
    // }

    if (!usuario)
        throw new Error("Usuário inválido")

    if(!FuncoesValidacao.isEmailValido(usuario.email))
        throw new Error("Email inválido: " + usuario.email)

    try {
        let User = Parse.Object.extend('User')
        let user = new User()
        
        user.set('nome', usuario.nome)
        user.set('email', usuario.email.toLowerCase().trim())
        user.set('username', usuario.email.toLowerCase().trim())
        user.set('telefone', FuncoesTexto.getTelefoneMascarado(usuario.telefone))
        user.set('password', usuario.senha.trim())
        let resposta = await user.save()
    } catch (error) {
        console.error(error)
        if (error.code === 202) 
            throw 'O e-mail informado já existe.'
        else 
            throw error
    }
}

export function isUsuarioLogado() {
    console.log('executando serviceUsuario.isUsuarioLogado')
    let logado = false
    try {
        if (Parse.User.current()) {
            let email = Parse.User.current().get('email')
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            // Verifica se o usuário tem um e-mail válido como username, caso contrário provavelmente uma conta não terminada
            logado = re.test(String(email).toLowerCase())
            if (!logado) 
                Parse.User.logOut()
        }

        return logado
    } catch(e) {
        let _erro = "Erro ao verificar usuário logado: " + e
        console.error(_erro)
        throw _erro
    }
}

export async function getPerfil() {
    console.log('executando serviceUsuario.getPerfil')
    if (!isUsuarioLogado())
        throw 'Usuário não está logado'
        
    console.log('user: ' + JSON.stringify(Parse.User.current()))       
    return Parse.User.current().toJSON() 
}

export function getPerfil1() {
    console.log('executando serviceUsuario.getPerfil')
    if (!isUsuarioLogado())
        throw new Error('Usuário não está logado')
        
    console.log('user: ' + JSON.stringify(Parse.User.current()))       
    return Parse.User.current()
}


export async function getEnderecos() {
    console.log('executando serviceUsuario.getEnderecos')    

    try {
        const usuarioLogado = getPerfil1()    
        const query = new Parse.Query('UsuarioEndereco')
        query.equalTo('usuario', usuarioLogado)
        let resultado = await query.find()
        return resultado
    } catch (e) {
        console.error(e)
        //throw new Error('Não foi possível obter endereços: ' + e.message)
    }
}

export async function salvarEndereco(endereco) {
    console.log('ServiceUsuario.salvarEndereco')
    console.log(endereco)
    try {
        if (!endereco || !endereco.endereco)
            throw new Error('Endereco inválido')

        const UserAddress = Parse.Object.extend('UsuarioEndereco')
        const userAddress = new UserAddress()

        const usuario = getPerfil1()
        if (endereco.objectId)
            userAddress.id = endereco.objectId
        userAddress.set('usuario', usuario)
        userAddress.set('endereco', endereco.endereco)
        userAddress.set('numero', endereco.numero)
        userAddress.set('bairro', endereco.bairro)
        userAddress.set('complemento', endereco.complemento)
        userAddress.set('estado', endereco.estado)
        userAddress.set('cidade', endereco.cidade)
        userAddress.set('cep', endereco.cep)
        userAddress.set('apelido', endereco.apelido)
        userAddress.set('ativo', true)

        let retorno = await userAddress.save()
        return retorno
    } catch (e) {
        console.log(e)
        throw new Error("Erro ao salvar endereço: " + e.message)
    }
}

// TO DOOO
export async function getCupons() {
    console.log('executando serviceUsuario.getCupons')
    const usuarioLogado = Parse.User.current() 
    if (!usuarioLogado)
        return
    
    const query = new Parse.Query('UsuarioCupons')
    query.equalTo('usuario', usuarioLogado)

    try {
        let resultado = (await query.find()).map(item => item.toJSON())
        console.log(resultado)

        return resultado
    } catch (e) {
        console.error(e)
    }
}

export async function getPagamentos() {
    console.log('executando serviceUsuario.getPagamentos')
    const usuarioLogado = Parse.User.current() 
    if (!usuarioLogado)
        return
    
    const query = new Parse.Query('UserCard')
    query.equalTo('status', 'SET')
    query.equalTo('user', usuarioLogado)

    try {
        let resultado = (await query.find()).map(item => item.toJSON())
        //console.log(resultado)

        return resultado
    } catch (e) {
        console.error(e)
    }
}

export async function getFavoritos() {
    console.log('executando serviceUsuario.getFavoritos')
    
    try {
        const usuario = getPerfil1()        
        const queryFavoritos = getQueryPadrao('UsuarioFavoritos')
        queryFavoritos.equalTo('usuario', usuario)
        queryFavoritos.exists('produtoInventario')
        let resultado = await queryFavoritos.find()
        return resultado
    } catch (e) {
        console.error(e)
    }
}

export async function salvarFavorito(produto) {
    console.log(produto)
    try {
        if (!(produto instanceof Parse.Object))
            throw new Error('Objeto parse inválido')
        
        const usuario = getPerfil1()

        const UserFavorite = Parse.Object.extend('UsuarioFavoritos')
        const queryFavorito = new Parse.Query(UserFavorite)
        queryFavorito.equalTo('usuario', usuario)
        queryFavorito.equalTo('produtoInventario', produto)

        const ehFavorito = await queryFavorito.first()
        if (ehFavorito) {
            console.log('destruindo favorito')
            await ehFavorito.destroy()
        } else {
            console.log('salvando favorito')
            const userFavorite = new UserFavorite()
            userFavorite.set('usuario', usuario)
            userFavorite.set('produtoInventario', produto)
            return await userFavorite.save()
        }
    } catch (e) {
        console.log(e)
        throw new Error("Erro ao salvar favorito: " + e.message)
    }
}

export async function getPedidosHistorico(idLoja) {
    console.log('executando serviceUsuario.getPedidosHistorico')
    const usuarioLogado = Parse.User.current()

    if (!usuarioLogado) {
        console.log('Nennuma usuario logado')
        return
    }

    const queryCarrinho = new Parse.Query('Carrinho')
    queryCarrinho.equalTo('usuario', usuarioLogado)
    queryCarrinho.containedIn('tipo', ['ENTREGUE', 'CANCELADO', 'RECUSADO', 'REEMBOLSADO'])
    queryCarrinho.descending('updatedAt')
    
    const queryCarrinhoProdutoItem = new Parse.Query('CarrinhoItens')
    queryCarrinhoProdutoItem.matchesQuery('carrinho', queryCarrinho)
    queryCarrinhoProdutoItem.include(['produtoInventario.produto','carrinho.enderecoEntrega', 'carrinho.entregador'])
    //queryCarrinhoProdutoItem.select('cart.userAddress')

    try {
        const serverResponse = await queryCarrinhoProdutoItem.find()
        let resposta = serverResponse.reduce((pedidos, item) => {
    
            let carrinho = item.get('carrinho')
            let index = pedidos.findIndex(el => el.carrinho.id === carrinho.id)

            if(index > -1) {
                pedidos[index].itens.push(item)
            } else {
                pedidos.push({carrinho: carrinho, itens: [item]})
            }
                    
            return pedidos

        }, [])

        console.log("pedidos historico: ")
        //console.log(resposta)
        return resposta

    } catch (e) {
        console.log('Não foi possível obter o histórico de pedidos: ' + e)
    }

}







