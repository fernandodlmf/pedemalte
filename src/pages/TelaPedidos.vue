<template>
    <q-layout view="hHr LpR lFf">
        <q-page-container>
            <q-page >
                <tela-categoria-detalhe-toolbar titulo="Meus Pedidos"/>                
                <q-separator spaced inset />

                <div
                    class="q-px-md"
                    v-if="getPedidosEmAndamento.length"
                    :key="chave">   
                        <div class="">
                            <div class="text-subtitle1 text-bold">Em andamento...</div>
                            <div class="text-subtitle2 text-grey">{{getDataAtual}}</div>
                        </div>                                         

                        <pedido-item-historico 
                            v-for="(pedido, index) in getPedidosEmAndamento"
                            :key="index"
                            :pedido="pedido"
                        />
                        
                        <q-separator spaced inset />
                </div>

                <div class="q-px-md">
                    <span class="text-subtitle1 text-bold">Histórico</span>
                
                    <pedido-item-historico 
                        v-for="pedido in pedidosHistorico" :key="pedido.carrinho.id"
                        :pedido="pedido" />
                </div>

            </q-page>
        </q-page-container>
              
    </q-layout>
  
</template>

<script>
    import TelaCategoriaDetalheToolbar from 'src/components/TelaCategoriaDetalheToolbar.vue'
    import PedidoItemHistorico from 'src/components/PedidoItemHistorico.vue'
    import Parse from './../service/Parse.js'
    import {mapState, mapActions} from 'vuex'
    
    export default {
        components: { TelaCategoriaDetalheToolbar, PedidoItemHistorico },
        mounted () {
            this.recebeDados(true)                            
        },

        beforeDestroy() {
            try {
                this.liveQueryCarrinho.unsubscribe()
            } catch(e) {
                console.error(e)
            }
        },

        data() {
            return {
                liveQueryCarrinho: undefined,
                statusCarrinho: "",
                pedidosEmAndamento: [],
                chave: 0
            }
        },

        computed: {
            ...mapState('usuario', ['listaPedidosHistorico', 'perfil']),
            ...mapState('loja', ['loja']),

            getDataAtual() {
                return new Date
            },

            getPedidosEmAndamento() {
                return this.pedidosEmAndamento
            },

            getRouteParametroDadosPagamento() {
                let retorno
                try {
                    retorno = this.$route.params['dadosPagamento']
                } catch (error) {
                    console.error(error)
                }
                return retorno
            },
            
            pedidosHistorico() {
                return this.listaPedidosHistorico
            }
        },
        
        methods: {
            ...mapActions('usuario', ['getPedidosHistorico']),

            recebeDados: async function(loading) {
                try {
                    if (loading)
                        this.$q.loading.show()
                    
                    await this.criarLiveQuery()
                    if (!this.pedidosHistorico.length || !this.getPedidosEmAndamento.length) {
                        await this.getPedidosHistorico()
                        this.forceRerender()
                    }
                } catch (error) {
                    console.log(error)
                    throw error
                } finally {
                    if (loading)
                        this.$q.loading.hide()
                }
            },

            forceRerender () {
                this.chave += 1
            },

            criarLiveQuery: async function() {
                console.log('criarLiveQuery')
                
                try {
                    const cartQuery = new Parse.Query('Carrinho')
                    cartQuery.equalTo('usuario', Parse.User.current())
                    cartQuery.include(['enderecoEntrega', 'entregador'])

                    const carrinhos = await cartQuery.find()
                    if (!carrinhos.length) {
                        console.log('Nenhum carrinho em andamento')
                        return
                    }
                
                    const queryCarrinhoProdutoItem = new Parse.Query('CarrinhoItens')
                    queryCarrinhoProdutoItem.matchesQuery('carrinho', cartQuery)
                    queryCarrinhoProdutoItem.include(['produtoInventario', 'produtoInventario.produto'])
                    const itensResponse = await queryCarrinhoProdutoItem.find()

                    let status = ['EM_COMPRA', 'AGUARDANDO_PAGAMENTO', 'AGUARDANDO_ACEITACAO', 'ACEITO']
                    this.pedidosEmAndamento = carrinhos
                        .filter(carrinho => status.includes(carrinho.get('tipo')))
                        .map(carrinho => {
                            let itens = itensResponse.filter(item => item.get('carrinho').id === carrinho.id)
                                
                            return  { 
                                carrinho: carrinho,
                                itens: itens,
                                dadosPagamento: this.getRouteParametroDadosPagamento
                            }
                        }) 
                
                    this.liveQueryCarrinho = await cartQuery.subscribe()
                    this.liveQueryCarrinho.on('update', newCart => {
                        console.log('newCart->update', newCart)
                        this.forceRerender()
                    })
                    
                } catch (error) {
                    console.log('Erro ao criar live query: ' + error.message)
                    console.error(error)
                } 
            },
        },
    }
</script>
