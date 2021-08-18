import * as serviceChat from '../../service/ServiceChat.js'

export async function getChatMensagens({commit}, chatId) {
    console.log('chatId: ' + chatId)
    const listaMensagens = await serviceChat.listarMensagens(chatId)
    commit('setListaTodasMensagens', listaMensagens)
}

export async function getChatAberto({commit, dispatch, state}) {
    if (!state.chat) {
        const chat = await serviceChat.getChatPorUsuarioELoja()
        if (chat) {
            commit('setChat', chat)
            dispatch('getChatMensagens', chat.id)
        }           
    }
}

export function criaNovoChat({commit}) {
    const novoChat = serviceChat.criaNovoChat()
    commit('setChat', novoChat)
}