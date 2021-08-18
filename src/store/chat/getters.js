export function getMensagensEnviadas({listaTodasMensagens}) {
    if (listaTodasMensagens)
        return listaTodasMensagens.filter(m => m.get('readBy') === "READ_USER")
}

export function getMensagensRecebidas({listaTodasMensagens}) {
    if (listaTodasMensagens)
        return listaTodasMensagens.filter(m => m.get('readBy') === "READ_ALL")
}