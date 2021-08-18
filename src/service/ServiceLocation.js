import { Geolocation } from '@capacitor/geolocation';
import axios from 'axios';

const URL_COORDENADAS = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
const GOOGLE_API_KEY = 'AIzaSyAjNZItSoFVyQA1BJEdeKEOmuqLbQ1ujTA'

function getParametrosCoordenadasFormatado(coordenadas) {
    try {
        if (!coordenadas)
            throw new Error('coordenada inválida')
        return coordenadas.latitude + ',' + coordenadas.longitude
    } catch (error) {
        console.error(error)
    }
}

export async function checkPermissions() {
    try {
        let permissoes = await Geolocation.checkPermissions()
        window.alert(JSON.stringify(permissoes))
    } catch (error) {
        window.alert('check error' + error)
    }    
}

export async function requestPermissions () {
    try {
        let permissoes = await Geolocation.requestPermissions()
        window.alert(JSON.stringify(permissoes))
    } catch (error) {
        window.alert('requestPermissions error: ' + error)
    }
}

export const getCurrentPosition = async () => {
    //await requestPermissions()
    try {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log('Current position:', coordinates);
        return coordinates
    } catch (error) {
        //window.alert('error get p' + error)
        return error
    }    
};

export async function getEnderecoPorCoordenada() {
    console.log('ServiceLocation.getEnderecoPorCoordenada')
    
    let coordenadas = await getCurrentPosition()      
    try {
        let _retorno = []
        const _url = URL_COORDENADAS + getParametrosCoordenadasFormatado(coordenadas.coords) + '&key=' + GOOGLE_API_KEY
        let resposta = await axios.get(_url)
        if (resposta && resposta.data)
            _retorno = await getEnderecosFromGoogleFormatados(resposta.data.results)    
        return _retorno
    } catch (error) {
        console.error('Erro ao obter enderecos por coodenadas')
    }    
}

export async function getEnderecosFromGoogleFormatados(enderecos) {
    console.log('ServiceLocation.getEnderecosFromGoogleFormatados')
    try {
        if (!enderecos)
            throw new Error('Enderecos inválidos')

        let _novaLista = enderecos.map(function(item, index, self) {
            
            let componentes = item.address_components  
            let coordenadas = item.geometry.location
            const endereco = {}
            endereco.id = index
            endereco.latitude = coordenadas.lat
            endereco.longitude = coordenadas.lng    
            endereco.enderecoFormatado = item.formatted_address
            for (let i = 0; i < componentes.length; i++) {                           
                if (componentes[i].types.includes('route'))
                    endereco.endereco = componentes[i].long_name
                else if (componentes[i].types.includes('sublocality'))
                    endereco.bairro = componentes[i].long_name
                else if (componentes[i].types.includes('administrative_area_level_1'))
                    endereco.estado = componentes[i].long_name
                else if (componentes[i].types.includes('administrative_area_level_2'))
                    endereco.cidade = componentes[i].long_name
                else if (componentes[i].types.includes('street_number'))
                    endereco.numero = componentes[i].long_name
                else if (componentes[i].types.includes('"postal_code"'))
                    endereco.cep = componentes[i].long_name
            }        
            return endereco
        })

        return _novaLista
    } catch (error) {
        console.error(error)
    }
}

// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
// }
// //Get latitude and longitude;
// function successFunction (position) {
//     var lat = position.coords.latitude;
//     var long = position.coords.longitude;
// }