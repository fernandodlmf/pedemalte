<template>
    <q-card
        @click="goToPageProduto(produto)"
        class="my-card q-ma-sm shaddow-5 column" style="border-radius: 20px">
        <div class="column items-center q-mx-sm q-mt-sm q-pb-lg relative-position">
            
            <!-- <div class="col-4 relative-position">
                <q-img
                    :src="getImagemUrl"
                    :ratio="16/9"
                    contain
                    height="100%"
                    width="100%"
                    class=""
                    spinner-color="primary"
                    spinner-size="82px"
                />
            </div> -->
            
            <q-img
                :src="getImagemUrl"
                :ratio="16/9"
                height="112px"
                contain
                class="rounded-borders"
                width="100%"
                spinner-color="primary"
                spinner-size="82px"
            />

            <div
                class="absolute-bottom row flex flex-center"
                style="bottom: -5px">
                <q-btn
                    @click="goToPageProduto(produto)"
                    size="md" round color="yellow" icon="add" />
            </div>

        </div>
        
        <div class="col column justify-between q-pa-sm q-mt-sm">
            <span class="text-subtitle1 text-bold ellipsis-2-lines">{{getNome | formataCapitaliza}}</span>      
            
            <div class="row items-center justify-between q-mx-xs">
                <span class="col text-subtitle1 text-bold text-grey">{{getTamanho}}</span>
                <span class="text-bold text-h6 col-auto">R${{getPreco | formataDinheiroSemCifrao}}</span>
            </div>                                                                 
        </div>

    </q-card>
</template>

<script>
    import {getParteInteira} from './../Framework/FuncoesNumero.js'
    import {mapActions, mapState} from 'vuex'
    
    export default {
        props: {
            produto: {
                type: Object
            }
        },

        computed: {
            // TODO: vslot quando não carregar imagem
            // TODO: validar produto undefined
            ...mapState('usuario', ['listaFavoritos']),
            isFavorito() {
                let _achou
                if (this.getProduto)
                    _achou = this.listaFavoritos.find(item => item.get('produtoInventario').id == this.getProduto.id)
                return _achou ? true : false
            },

            getProduto() {
                // console.log('produto no cardProduto')
                // console.log(this.produto)            
                return this.produto
            },

            getNome() {
                return this.produto.get('produto').get('nome')
            },

            getImagemUrl() {
                return this.produto.get('produto').get('imagem') === undefined ? '' : this.produto.get('produto').get('imagem')._url 
            },

            getTamanho() {
                return this.produto.get('tamanho')
            },

            getRating() {
                return 0
            },

            getPreco() {
                return this.produto.get('preco')
            },

            getPrecoPromocao() {
                return this.produto.get('precoPromocao')
            },

            isPromocao() {
                return this.produto.get('ehPromocao') ? true : false
            },

            getDescontoPorcentagem() {
                let preco = this.getPreco
                let precoPromo = this.getPricePromo
                let diferenca = preco - precoPromo
                let resultado = (diferenca / preco) * 100

                return getParteInteira(resultado)
            }
        },

        methods: {
            ...mapActions('loja', ['escolheProduto']),

            goToPageProduto: function(valor) {         
                this.escolheProduto(valor)       
                this.$router.push({name: 'produto-detalhe', params: {produto: valor}}) 
            }
        }



    }
</script>

<style>

</style>