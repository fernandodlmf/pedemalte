import Parse from './../service/Parse'
import {getPerfil1} from './ServiceUsuario.js'
import {getStore} from './LojaConfig.js'

export function criaNovoChat() {
    console.log('serviceChat.criaNovoChat')
    try {
        const _usuario = getPerfil1()
        const _loja = getStore()

        const Chat = Parse.Object.extend('Chat')
        const chat = new Chat()
        chat.set('store', _loja)
        chat.set('user', _usuario)
        chat.set('type', 'HELP')

        const chatCreated = chat.save()
        console.log('chat criado')
        console.log(chatCreated)
        return chatCreated
    } catch (error) {
        throw new Error('Erro ao criar novo chat: ' + error.message)
    }   
}

export async function getChatPorUsuarioELoja() {
    console.log('serviceChat.getChatPorUsuarioELoja')
    try {
        const _usuario = getPerfil1()
        const _loja = getStore()

        const chatQuery = new Parse.Query('Chat')
        chatQuery.equalTo('user', _usuario)
        chatQuery.equalTo('store', _loja)

        const chatObject = await chatQuery.first()
        console.log('chat recuperado')
        console.log(chatObject)
        return chatObject
    } catch (error) {
        throw new Error('Erro ao obter chat já existente: ' + error.message)
    }   
}

export async function listarMensagens(chatId, readBy) {
    console.log('serviceChat.listarMensagens')
    try {
        if (!chatId)   
            throw new Error('Id de chat inválido')
        const chatQuery = new Parse.Query('Chat')
        const chat = await chatQuery.get(chatId)

        const queryChatHistorico = new Parse.Query('ChatHistory')
        queryChatHistorico.equalTo('chat', chat)
        queryChatHistorico.equalTo('status', true)
        queryChatHistorico.descending('createdAt')
        if (readBy)
            queryChatHistorico.equalTo('readBy', readBy)

        const results = await queryChatHistorico.find()
        console.log('chat mensagens: ')
        console.log(results)
        return results
    } catch (error) {
        console.error(error)
        let read = readBy || ""
        throw new Error('Erro ao obter mensagens do chat: ' + chatId + ' | ' + read + ' :' + error.message) 
    }
}

export function listarMensagensLoja(chatId) {
    console.log('serviceChat.listarMensagensLoja')    
    return listarMensagens(chatId, 'READ_STORE')
}

export function listarMensagensUsuario(chatId) {
    console.log('serviceChat.listarMensagensUsuario')    
    return listarMensagens(chatId, 'READ_USER')    
}

export async function sendMessage(chatId, mensagem, anexo) {
    console.log('serviceChat.sendMessage')
    const _mensagem = mensagem.trim()
    const _anexo = anexo

    try {
        if (!chatId)
            throw new Error('Id de chat inválido')

        if (!_mensagem && !_anexo) {
            console.log('Nenhum dado a ser enviado no chat')
            return
        }

        const _usuario = getPerfil1()

        const ParseChat = Parse.Object.extend('Chat')
        const ParseChatHistory = Parse.Object.extend('ChatHistory')

        const chat = new ParseChat()
        chat.id = chatId

        const chatHistorico = new ParseChatHistory()

        if (_anexo) {
            const file = new Parse.File(
                `attachment.${_anexo.format}`,
                { base64: _anexo.data }
            )
            const savedFile = await file.save()      
            chatHistorico.set('attachment', savedFile)
        } else {
            chatHistorico.set('message', _mensagem)
        }

        chatHistorico.set('readBy', 'READ_USER')
        chatHistorico.set('byStore', false)
        chatHistorico.set('status', true)
        chatHistorico.set('user', _usuario)
        chatHistorico.set('chat', chat)

        const resultado = await chatHistory.save()
        console.log('mensagme enviada')
        console.log(resultado)
        return resultado        
    } catch (error) {
        console.error(error)
        throw new Error('Não foi possível enviar mensagem/imagem: ' + error.message)
    }
}