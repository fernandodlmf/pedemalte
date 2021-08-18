export function getFloatValido(value, casasDecimais) {
    let numero = Number(value) || 0
    if (!numero)
        console.log("Valor inválido pra obtenção de float. Retornando 0")
    return Number(numero.toFixed(Number(casasDecimais) || 0))
}

export function getIntValido(value) {
    let numero = Number(value) || 0
    return parseInt(numero)
}

export function getFloatDuasDecimais(value) {
    return getFloatValido(value, 2)
}

export function getFloatTresDecimais(value) {
    return getFloatValido(value, 3)
}

export function getParteInteira(value) {
    let numero = Number(value) || 0
    return Math.trunc(numero)
}

export function getParteInteiraArredondada(value) {
    let numero = Number(value) || 0
    return Math.round(numero)
}