export function createHash (msg) {
    const publicKey = '-----BEGIN RSA PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0SkXRzlKeDiC7Vlu8B56\r\nytL3ChbMvnYK4Ire+ULm94joFDL+5tjMHORkBjpqr3WteRZdfSWdwvFNnd/vSM3W\r\nS+lR8BWsW5roiZ9yI5OyNsDAeLk/KFXMDZoBJf3/QWOhdh3j7RQSH2BiTrF6ADfs\r\n/2OlxOzw5+MqBKBxpu+LmSwEJHT3f3qvp0+Gy7DgEcYVW86Lcw7EuVVtZYHTVI3p\r\nYY+LcmHMJZrXI/SnBSX6fZo7ePE+rvhEaQ1MSZvMRv7RYj7fy0uDwArIdafA4Dr1\r\nX3X4IgnYOIqVQ1aBP4KZH1AlVxL8TLDs6FP2QF0PjZqTb3dgu9gH35D0TER5SWKR\r\nKQIDAQAB\r\n-----END RSA PUBLIC KEY-----\r\n'
    const crypto = window.crypto || window.msCrypto
    
    return new Promise(function (resolve) {
    if (crypto.subtle) {
        const vector = crypto.getRandomValues(new Uint8Array(16))

        importPublicKey(publicKey)
            .then(function (key) {
                return encryptData(vector, key, msg)}
            ).then(function (encryptedData) {resolve(arrayBufferToBase64(encryptedData))})
        }
    })
}

function importPublicKey (pemKey) {
    console.log('importPublicKey')
    return new Promise(function (resolve) {
        let penToBinary = convertPemToBinary(pemKey)
        console.log('pen to binayr: ' + penToBinary)
        const importer = crypto.subtle.importKey(
            'spki', penToBinary , 
            { name: 'RSA-OAEP', hash: 'SHA-1' }, 
            true,
            ['encrypt']
        )

        importer.then(function (key) {
            resolve(key)
        })
    })
}

function encryptData (vector, key, data) {
    console.log('encryptData')
    let valor =  textToArrayBuffer(data)
    console.log('textToArrayBuffer: ' + valor)
    return crypto.subtle.encrypt({ name: 'RSA-OAEP', iv: vector },
        key, valor
    )
}

function convertPemToBinary (pem) {
    console.log('convertPemToBinary')
    const lines = pem.split('\n')
    let encoded = ''
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().length > 0 &&
            lines[i].indexOf('-BEGIN RSA PRIVATE KEY-') < 0 &&
            lines[i].indexOf('-BEGIN RSA PUBLIC KEY-') < 0 &&
            lines[i].indexOf('-END RSA PRIVATE KEY-') < 0 &&
            lines[i].indexOf('-END RSA PUBLIC KEY-') < 0) {
            encoded += lines[i].trim()
        }
    }
    return base64StringToArrayBuffer(encoded)
}

function base64StringToArrayBuffer (b64str) {
    console.log('base64StringToArrayBuffer')
    const byteStr = atob(b64str)
    const bytes = new Uint8Array(byteStr.length)
    for (let i = 0; i < byteStr.length; i++) {
    bytes[i] = byteStr.charCodeAt(i)
    }
    return bytes.buffer
}

function textToArrayBuffer (str) {
    console.log('textToArrayBuffer')
    const buf = unescape(encodeURIComponent(str)) // 2 bytes for each char
    const bufView = new Uint8Array(buf.length)
    for (let i = 0; i < buf.length; i++) {
        bufView[i] = buf.charCodeAt(i)
    }
    return bufView
}

function arrayBufferToBase64 (arr) {
     console.log('arrayBufferToBase64')
    return btoa(String.fromCharCode.apply(null, new Uint8Array(arr)))
}