export function capitalizeFirstLetter (texto) {
    if (!texto)
        return texto = ""
    
    texto = texto.toLowerCase().trim()

    return texto.charAt(0).toUpperCase() + texto.slice(1)

}

export function capitalizaTexto(texto) {
    let _texto = texto || ''
    return String(_texto.toLowerCase()).replace(/(^|\s)\S/g, l => l.toUpperCase())
}

export function getNumeroCartaoFormatado(value) {
    const base = '**** **** **** ****'
    if (!value) {
        return base
    }

    let ultimos4Digitos = value.trim().slice(value.length - 4)

    return base.slice(0, base.length - ultimos4Digitos.length) + ultimos4Digitos
}

export function getJustNumbers(texto) {
    //var numsStr = string.replace(/[^0-9]/g,'')
    if (!texto)
        return ""
   
    return removeSpaces(texto.split("").filter(n => (Number(n) || n == 0)).join(""));
}

export function getDinheiroFormatadoSemCifrao(texto) {
    try {             
        return formataDinheiro(texto)
    } catch (error) {
        throw new Error('Erro ao formatar dinheiro sem cifrão: ' + error.message)
    }
}

export function getDinheiroFormatadoComCifrao(texto) {
    let comCifrao = true
    try {
        return formataDinheiro(texto, comCifrao)
    } catch (error) {
        throw new Error('Erro ao formatar dinheiro com cifrão: ' + error.message)
    }
}

function formataDinheiro(texto, comCifrao) {
    try {
        let numero = String(texto) || "0"
        if (numero.includes(',')) {
            numero = String(texto).replaceAll('.', '')
            numero = numero.replace(',', '.')
        }

        if (comCifrao)
            return Number(numero).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        else
            return Number(numero).toLocaleString('pt-br', {minimumFractionDigits: 2})   
    } catch (error) {
        throw error
    }
}

export function removeSpaces(texto) {
    //var numsStr = string
    if (!texto)
        return ""
   
    return texto.replace(/\s/g, '');
}

// (XX) XXXXX-XXXX
export function getTelefoneMascarado(texto) {
    if (!texto) 
        return ""

    let _texto = getJustNumbers(texto).match(/(\d{2})(\d{5})(\d{4})/);   
    return '(' + _texto[1] + ') ' + _texto[2] + '-' + _texto[3]
}