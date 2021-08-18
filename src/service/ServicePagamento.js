import axios from 'axios'

export async function realizaPagamento(paramentros) {
    const {pagamento, formaPagamento} = paramentros   
    
    try {
        let resposta = await axios.post(url, paramentros, { headers: { 'Content-Type': 'application/json' } }) 
        console.log('resposta do pagamento')
        console.log(resposta)
        console.log(resposta.data)    
        return resposta.data
    } catch (error) {
        console.log('Error', error)
        console.error(error.response.data)
        console.error(error.response.status)
        console.error(error.response.headers)
        throw "Erro ao realizar pagamento: " + error.response.data   
    }
}