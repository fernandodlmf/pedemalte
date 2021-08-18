import Vue from 'vue';
import {getDinheiroFormatadoSemCifrao, capitalizaTexto, getNumeroCartaoFormatado} from './../Framework/FuncoesTexto.js'

Vue.filter('formataCapitaliza', function(value) {
    return capitalizaTexto(value)
})

Vue.filter('formataDinheiroSemCifrao', function(value) {
    return getDinheiroFormatadoSemCifrao(value)
})

Vue.filter('formataNumeroCartao', function(value) {
    return getNumeroCartaoFormatado(value)
})

