function getDate() {
    return new Date()
}

export function getMes(data) {
    if(typeof data === 'string')
        data = new Data(data)
    return getMonth() + 1
}

export function getAno(data) {

}

export function getHora(data) {

}

export function isDataValida() {

}

export function getDataAtual() {
    return getDate().toLocaleDateString()
}

export function getHoraAtual() {
    return getDate().toLocaleTimeString()
}

export function getDiaDaSemanaInteiro() {
    return getDate().getDay()
}

export function getDiaDaSemanaPorExtenso() {
    const diaDaSemana = getDate().getDay()
    
    switch(diaDaSemana) {
        case 0: 
            return 'Domingo'
        case 1: 
            return 'Segunda'
        case 2: 
            return 'Terça'
        case 3: 
            return 'Quarta'
        case 4: 
            return 'Quinta'
        case 5: 
            return 'Sexta'
        case 6: 
            return 'Sábado'
        default:
            return 'dia da semana inválido'
    }
    
}

export function getMesAtualPorExtenso() {
    const mes = getDate().getMonth()
    
    switch(mes) {
        case 0: 
            return 'Janeiro'
        case 1: 
            return 'Fevereiro'
        case 2: 
            return 'Março'
        case 3: 
            return 'Abril'
        case 4: 
            return 'Maio'
        case 5: 
            return 'Junho'
        case 6: 
            return 'Julho'
        case 7: 
            return 'Agosto'
        case 8: 
            return 'Setembro'
        case 9: 
            return 'Outubro'
        case 10: 
            return 'Novembro'
        case 11: 
            return 'Dezembro'
        default:
            return 'Mês inválido'
    }
    
}

