<template>
    <div class="row justify-around q-mx-sm q-my-sm">
        <div class="relative-position self-center">
            <q-img
                :src="getImagemUrl"
                style="border-radius: 25px"
                contain
                height="100px"
                width="100px"
                spinner-color="primary"
                spinner-size="82px"
            >
            </q-img>

            <q-btn
                    @click="removeItem()"
                    style="top: -9px; "
                    class="absolute-top-left"
                    dense
                    size="10px"
                    round
                    unelevated
                    color="pink" icon="close" />
        </div>
        
        <div class="col column text-black justify-between q-px-sm">
            <span class="text-h6 text-bold">{{getNome}}</span>
            <div>
                <span class="text-bold">Valor un: </span>
                <span>R$ </span>
                <span class="text-h6 text-bold">{{getPreco | formataDinheiroSemCifrao}}</span>
            </div>
        </div>

        <mais-menos @handle-quantidade-click="manipulaQuantidade"  :direcaoVertical="true" :qtdProduto="getQuantidade" />
        
    </div>    

    <!-- <div class="row q-py-sm q-px-md no-wrap">
        <q-card
            style="border-radius: 30px; height: 13vh; width: 13vh;"
            class="my-card shadow-4 q-py-sm col-auto self-center">
                <q-img
                    src="https://placeimg.com/500/300/nature"
                    :ratio="16/9"
                    class="absolute-full"  
                    spinner-color="primary"
                    spinner-size="82px"
                />
        </q-card> 

        <div class="column justify-evenly q-px-md">
            <span class="text-bold">Cerveja Guines Draught in can</span>
            <div class="row">
                <span>Valor un: </span>
                <span class="text-bold">R$ 19,90</span>
            </div>
        </div>

        <mais-menos :direcaoVertical="true"/>
    </div> -->
</template>

<script>
    import MaisMenos from './MaisMenos.vue'
    import {mapActions} from 'vuex'
    import {getFloatDuasDecimais} from './../Framework/FuncoesNumero.js'
    export default {
        props: {
            item: {
                type: Object,
                required: true,
            }
        },

        data() {
            return {
                quantidade: 0
            }
        },

        components: { MaisMenos },
        
        methods: {
            ...mapActions('carrinho', ['atualizaItem']),

            removeItem: function() {

                this.$q.dialog({
                        title: 'Confirmação',
                        message: 'Deseja remover este item?',
                        ok: {
                            flat: true,
                            label: 'Confimar'
                        },
                        cancel: {
                            flat: true,
                            label: 'Cancelar'
                        },
                        persistent: true
                }).onOk(() => {
                    let id = this.getItem.id
                    this.$emit('remove-item-click', id)
                }).onCancel(() => {
                    // console.log('>>>> Cancel')
                }).onDismiss(() => {
                    // console.log('I am triggered on both OK and Cancel')
                })                
            },


            manipulaQuantidade: async function(quantidade) {
                try {
                    this.$q.loading.show()
                    if (quantidade < 1)
                        return
                    
                    let qtdAtual = this.getItem.get('quantidade')
                    let preco = this.getItem.get('preco')
                    let totalARetirar = qtdAtual * preco
                    let totalCarrinho = this.getItem.get('carrinho').get('total') 
                    totalCarrinho = totalCarrinho - totalARetirar                    
                    totalCarrinho = getFloatDuasDecimais(totalCarrinho) + (preco * quantidade)
                    console.log(totalCarrinho)
                    this.getItem.set('quantidade', quantidade)
                    if (totalCarrinho < 0)
                        throw "total inválido"

                    this.getItem.get('carrinho').set('total', getFloatDuasDecimais(totalCarrinho))
                    await this.atualizaItem(this.getItem)
                    this.$emit('atualiza')
                } catch(e) {
                    console.error(e)
                    this.getItem.set('quantidade', quantidade--)
                } finally {
                    this.quantidade = quantidade
                    this.$q.loading.hide()
                }
            }
        },

        computed: {
            getItem() {
                console.log('tela recebimento item')
                console.log(this.item)
                return this.item
            },

            getQuantidade() {
                console.log('nova qtd: ' + this.getItem.get('quantidade'))
                return !this.quantidade ? this.item.get('quantidade') : this.quantidade
            },

            getProdutoInvetario() {
                return this.getItem.get('produtoInventario')
            },

            getProduto() {
                return this.getProdutoInvetario.get('produto')
            },

            getNome() {
                return this.getProduto.get('nome')
            },

            getPreco() {
                return Number(this.getItem.get('preco')).toFixed(2)
            },

            getImagemUrl() {
               return this.getProduto.get('imagem') === undefined ? '' : this.getProduto.get('imagem')._url 
            }
        },

    }
</script>

<style>

</style>