<template>
    <q-expansion-item
        style="border-radius: 20px"
        class="shadow-1 q-py-sm q-my-sm"
        v-if="getPedido">

        <template v-slot:header>
            <q-item
                style="width: 100%;">
                <q-item-section  >
                    <q-item-label class="text-subtitle2 text-red text-bold">{{getPedidoCarrinho.get('tipo') | statusProcessado}}</q-item-label>
                    <span class="text-grey text-subtitle2">{{getPedidoItens | quantidadeProdutos}}</span>
                </q-item-section>
                
                <q-item-section side top>
                    {{horaPedido}}
                </q-item-section>
            </q-item>
        </template>

        <q-card class="my-card bg-white">
            <q-separator spaced />
            <div class="q-ma-md text-grey text-subtitle2">Detalhes do Pedido</div>            
            <div v-for="item in getPedidoItens" :key="item.id" class="row q-py-sm q-px-sm no-wrap">
                <q-card
                    style="border-radius: 20px; height: 12vh; width: 12vh;"
                    class="my-card shadow-4 q-py-sm col-auto self-center">
                        <q-img
                            :src="item.get('produtoInventario').get('produto').get('imagem')._url"
                            contain
                            :ratio="16/9"
                            class="absolute-full"  
                            spinner-color="primary"
                            spinner-size="82px"
                        />
                </q-card> 

                <div class="col row justify-evenly q-px-md text-subtitle2">
                    <span class="col text-subtitle1">{{item.get('produtoInventario').get('produto').get('nome')}}</span>
                    <div class="col-auto text-h6  self-center">
                        <span>R$ </span>
                        <span class="text-bold"> {{item.get('preco') | formataDinheiroSemCifrao}}</span>
                    </div>
                </div>
            </div>

            <q-separator spaced  />

            <div class="column text-subtitle1 text-capitalize q-px-sm justify-center text-grey">
                <div v-if="getPedidoCarrinho.get('enderecoEntrega')">
                    <q-icon class="q-pa-xs" size="sm" name="location_on" color="" />
                    <span class="">{{getPedidoCarrinho.get('enderecoEntrega') | enderecoProcessado}}</span>
                </div>

                <div>
                    <q-icon class="q-pa-xs" size="sm" name="money" color="" />
                    <span class="">{{getPedidoCarrinho.get('paymentMethod') | formataPagamento}}</span>
                </div>

                <div>
                    <q-icon class="q-pa-xs" size="sm" name="delivery_dining" color="" />
                    <span class="">R$ {{getPedidoCarrinho.get('precoEntrega') | formataDinheiroSemCifrao}}</span>
                </div>
            </div> 
            
            <div class="row text-bold items-center justify-end q-px-md">
                <span>Total: R$ </span>
                <span class="text-h6">{{ getPedidoCarrinho.get('total') | formataDinheiroSemCifrao}}</span>
            </div>
        </q-card>
      
    </q-expansion-item>
</template>

<script>
    import { date } from 'quasar'
    import {getDinheiroFormatadoSemCifrao} from './../Framework/FuncoesTexto.js'
    export default {
        props: {
            pedido: {
                type: Object,
                required: true
            }
        },

        computed: {
            getPedido() {          
                return this.pedido
            },

            getPedidoCarrinho() {
                
                return this.pedido.carrinho
            },

            getPedidoItens() {                
                return this.pedido.itens
            },

            horaPedido() {
                let momento = this.getPedidoCarrinho.get('createdAt')
                if (!momento) return "Hora inválida"
                const format = 'DD MMM YYYY [às] HH:mm'
                const datea = date.formatDate(momento, format)

                return datea
            }
        },

        filters: {
            statusProcessado: function (value) {
                switch (value) {
                    case 'EM_COMPRA':
                        return 'Aguardando pagamento'
                    case 'AGUARDANDO_ACEITACAO':
                        return 'Aguardando confirmação do depósito'
                    case 'ACEITO':
                        return 'Aguardando o entregador'
                    case 'EM_ROTA':
                        return 'Em rota de entrega'
                    case 'RETORNADO':
                        return 'Retornado para Lojista'
                    case 'CANCELADO':
                        return 'Pedido cancelado'
                    case 'REEMBOLSADO':
                        return 'Pedido reembolsado'
                    case 'ENTREGUE':
                        return 'Pedido entregue'
                    case 'PROD_ERROR':
                        return 'Estado Inválido'
                    default: 
                        return `Status não mapeado ${value}`
                }
            },

            quantidadeProdutos: function(itens) {
                if (!itens || itens.length <= 0) return ""

                if (itens.length == 1)
                    return `${itens.length} produto`
                else
                    return `${itens.length} produtos`
            },

            enderecoProcessado: function(endereco) {
                if (!endereco)
                    return "Endereço inválido"
                
                return `${endereco.get('endereco')} - ${endereco.get('numero')}`
            },

            formataPagamento: function(valor) {
                switch (String(valor).toLowerCase()) {
                    case 'credit_card': 
                        return "Cartão"
                    case 'pix':
                        return "Pix"
                    default:
                        return "Pagamento desconhecido: " + valor
                }
            }
        },

        methods: {

        }
    }
</script>

<style>

</style>