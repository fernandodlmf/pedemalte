import axios from 'axios'
const access_token = 'lDcoCgVhPAj2nFFwcubjZqAMB'    

export async function sendSMSVerificacao(telefone) {
    const BASE_URL = 'https://rest.messagebird.com/verify'
    try {
        if (!telefone)
            throw new Error('Telefone inválido')

        // validar telefone

        console.log('telefone: ' + telefone)

        let verifyObject = {
            recipient: "55"+telefone,
            originator: "Fernando",
            timeout: 12000 // 20 minutos em segundos
        }

        let responde = await axios.post(BASE_URL, verifyObject, {
            headers: {
                'Authorization': `AccessKey ${access_token}`,
            }
        })

        return responde.data.id
    } catch (e) {
        console.error(e.message)
        console.error(e)
    }
}

export async function validaTokenSMS(id, token) {
    const BASE_URL = `https://rest.messagebird.com/verify/${id}`
    const access_token = 'lDcoCgVhPAj2nFFwcubjZqAMB'    
    let params = {token}

    // validar parametros

    try {
        let response = await axios.get(BASE_URL, {
            params,
            headers: {
                'Authorization': `AccessKey ${access_token}`,
            }
        })

        if (response.data.status === 'verified')
            return true
    } catch (e) {
        console.log(e.message)
        console.error(e)
    }
}
