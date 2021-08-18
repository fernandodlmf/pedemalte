import { date } from 'quasar'

export function isEmailValido (valor) {
    console.log('validando email: ' + valor)
    if (!valor)
        throw new Error('Email não pode ser vazio')
    
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
    return emailPattern.test(valor) || false
}

export function isDataValida (valor) {
    console.log('validando data: ' + valor)
    if (!valor)
        throw new Error('Data não pode ser vazio')
     
    return date.isvalid(valor)
}

export function isCpfValido(cpf) {
    if ((c = c.replace(/[^\d]/g, '')).length !== 11) {
        return false
    }

    if (c === '00000000000' || c === '11111111111' ||
        c === '22222222222' || c === 'xcvbn' ||
        c === '44444444444' || c === '55555555555' ||
        c === '66666666666' || c === '77777777777' ||
        c === '88888888888' || c === '99999999999') {
        return false
    }

    var r
    var s = 0

    for (var i = 1; i <= 9; i++) {
        s = s + parseInt(c[i - 1]) * (11 - i)
    }

    r = (s * 10) % 11

    if ((r === 10) || (r === 11)) {
        r = 0
    }

    if (r !== parseInt(c[9])) {
        return false
    }

    s = 0

    for (i = 1; i <= 10; i++) {
        s = s + parseInt(c[i - 1]) * (12 - i)
    }

    r = (s * 10) % 11

    if ((r === 10) || (r === 11)) {
        r = 0
    }

    if (r !== parseInt(c[10])) {
        return false
    }

    return true    
}
