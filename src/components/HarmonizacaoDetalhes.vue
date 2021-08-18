<template>
    <q-dialog 
        position="right" 
        ref="dialog">   
            <q-card
                style="border-radius: 30px"
                class="my-card q-mx-md q-pa-md">
                <div class="row">
                    <q-card
                        style="border-radius: 30px; height: 13vh; width: 13vh;"
                        class="my-card shadow-4 q-py-sm col-auto self-center">
                            <q-img
                                :src="getImagemUrl"
                                :ratio="16/9"
                                class="absolute-full" 
                                spinner-color="primary"
                                spinner-size="82px"
                            />
                    </q-card> 
                    
                    <div class="col column justify-evenly q-px-md">
                        <span class="text-bold">{{getNome | formataCapitaliza}}</span>
                        <div class="row">
                            <span>R$ </span>
                            <span class="text-bold">{{getPreco | formataDinheiroSemCifrao}}</span>
                        </div>

                        <div class="text-subtitle2 text-grey">
                            <q-icon name="print" />
                            <span>Servem até 2 pessoas</span>  
                        </div>
                    
                    </div>

                    <q-btn
                        class="self-start"
                        @click="hide"
                        round unelevated
                        color="red" icon="close" />
                </div>

                <q-separator class="q-my-md" color="primary" inset />

                <div class="column"> 
                    <span class="text-h6 text-bold">Descrição</span>
                    <span class="text-subtitle2 text-grey"> 
                        {{getDescricao}}
                    </span>
                </div>

                <div class="row q-py-md justify-evenly items-center">
                    <mais-menos
                        @handle-quantidade-click="manipulaQuantidade"  
                        :direcaoVertical="false" 
                        :qtdProduto="qtdProduto" />

                    <q-btn
                        class="q-py-xs q-px-lg text-bold"
                        @click="onOKClick()"
                        rounded
                        unelevated no-caps 
                        size="lg"
                        color="primary" label="Adicionar" />
                </div>
            </q-card>

    </q-dialog>
    
</template>

<script>
    import MaisMenos from './MaisMenos.vue'
    export default {
        props: {
            produto: {
                type: Object
            }
        },

        components: { 
            MaisMenos
        },
        
        data() {
            return {
                qtdProduto: 1
            }
        },

        computed: {
            getProduto() {          
                return this.produto
            },

            getNome() {
                return this.getProduto.get('produto').get('nome')
            },

            getDescricao() {
                return this.getProduto.get('produto').get('descricao')
            },

            getImagemUrl() {
                return this.getProduto.get('produto').get('imagem') === undefined ? '' : this.getProduto.get('produto').get('imagem')._url 
            },

            getPreco() {
                return this.produto.get('preco')
            },

            montaItem() {
                let _produto = this.getProduto
                let _qtd = this.qtdProduto
                return {produto: _produto, qtd: _qtd}
            },
        },

        methods: {
            show () {
                this.$refs.dialog.show()
            },

            hide () {
                this.$refs.dialog.hide()
            },

            onOKClick() {
                // on OK, it is REQUIRED to
                // emit "ok" event (with optional payload)
                // before hiding the QDialog
                this.$emit('ok', this.montaItem)
                // or with payload: this.$emit('ok', { ... })

                // then hiding dialog
                this.hide()
            },

            manipulaQuantidade: function(qtd) {
                if (qtd < 1)
                    return
                this.qtdProduto  = qtd
            },

        }

    }
</script>

<style>

</style>