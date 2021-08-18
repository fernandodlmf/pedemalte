<template>
    <q-card
        @click="abreDialog"
        v-ripple
        class="my-card shadow-5 q-my-sm row justify-end items-center"
        style="border-radius: 40px" >
        
        <div
            class="column justify-evenly items-end col q-px-sm q-mt-sm q-ml-sm">
            <span class="text-subtitle2 text-bold text-capitalize">{{getNome | formataCapitaliza}}</span>
            <span class="text-subtitle1">+ R$ {{getPreco | formataDinheiroSemCifrao}}</span>
        </div>

        <div class="q-ml-xs">
            <q-avatar
                size="66px"
                class="">
                <img  :src="getImagemUrl">
            </q-avatar>
        </div>  
    </q-card>
</template>

<script>
    import HarmonizacaoDetalhes from 'src/components/HarmonizacaoDetalhes.vue'
    export default {
        props: {
            produto: {
                type: Object
            },
        },

        data () {
            return {
                total: '0,00',
                qtdProduto: 1
            }
        },

        computed: {
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

            getPreco() {
                return this.produto.get('preco')
            },
        },

        methods: {
            abreDialog () {
                this.$emit('click-harmonizacao', this.getProduto)
            },
        }

    }
</script>

<style>

</style>