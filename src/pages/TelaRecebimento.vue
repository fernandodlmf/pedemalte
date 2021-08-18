<template>
    <q-layout view="hHr LpR fFf">
        <q-page-container>
            <q-page class="bg-grey-1">
                <tela-recebimento-toolbar />

                <q-item
                    @click="abreDialog('ENDERECO')"
                    class="" clickable v-ripple>
                    <q-item-section avatar>
                            <q-icon color="text-black" name="location_on" />
                    </q-item-section>

                    <q-item-section>
                        <q-item-label class="text-h6 tex-bold">{{getEnderecoSelecionadoRua}}</q-item-label>                
                        <q-item-label
                            v-if="getEnderecoSelecionadoComplemento"
                            class="text-subtitle2 text-grey">{{getEnderecoSelecionadoComplemento}}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <q-icon icon="keyboard_arrow_right" name="keyboard_arrow_right" />
                    </q-item-section>
                </q-item>

                <q-separator spaced  color="primary"  />  

    
                <div style="overflow: auto" class="column q-px-sm">                    
                    <tela-recebimento-item-carrinho
                        @remove-item-click="removeItemCarrinho"
                        @atualiza="atualiza()"
                        v-for="item in getItens" :key="item.id" :item="item" />
                </div>                                  

                <!-- <q-scroll-area :visible="false" style="width: 100%; height: 200px; max-height: 300px">
                    
                </q-scroll-area> -->

                 <div class="row items-center q-py-md q-px-sm">
                    <q-separator v-for="item in 10" :key="item" class="col q-ma-xs" />
                    <div class="q-px-md">
                        <span class="">sub-total R$ </span>  
                        <span class="text-h6"> {{getSubtotal}}</span>          
                    </div>   
                    <q-space />
                </div>           

                <div class="row q-pb-md items-center">
                    <q-btn 
                        @click="$router.push('/')"
                        class="col-auto" 
                        style="border-radius: 0px 20px 20px 0px" 
                        unelevated
                        no-caps 
                        align="left" 
                        size="lg" 
                        color="primary" 
                        label="Continue Comprando" />   

                    <q-separator spaced  class="col" />

                    <q-btn
                        class="text-bold"
                        no-caps size="lg" flat color="primary" label="Limpar" @click="limpar()" />
                </div>  

                <q-separator spaced />

                <q-item
                        @click="abreDialog('PAGAMENTO')"
                        class="q-py-md" clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon color="text-black" name="credit_card" />
                        </q-item-section>
                    
                        <q-item-section>             
                            <q-item-label class="text-h6 tex-bold">
                                <span>{{getPagamentoSelecionado ? getPagamentoSelecionado.get('nome') : 'Selecione o pagamento'}}</span>
                            </q-item-label>                            
                             <q-item-label
                                class="text-subtitle2 text-grey"
                                v-if="getPagamentoSelecionado && getPagamentoSelecionado.get('tipo') === 1" >
                                    {{getPagamentoSelecionado.get('tipo_descricao')}}
                            </q-item-label>
                        </q-item-section>

                        <q-item-section side>
                            <q-icon icon="keyboard_arrow_right" name="keyboard_arrow_right" />
                        </q-item-section>
                    </q-item>                    
                
                    <div                        
                        class="q-px-md q-my-sm row items-center justify-start"
                        v-if="getPagamentoSelecionado && getPagamentoSelecionado.get('tipo') === 0">
                            <q-item-label class="col-auto text-subtitle1">Troco para:</q-item-label>

                            <q-input
                                    mask="#,##"
                                    fill-mask="0"
                                    reverse-fill-mask  
                                    class="q-mx-sm col-4 roundered text-subtitle1 text-bold"
                                    bg-color="white"  placeholder="R$ 0,00" v-model="troco"
                                    rounded borderless dense  />
                            <!-- <q-card
                                flat
                                class="my-card shadow-1 q-mx-sm col-4">
                                 
                            </q-card> -->

                        </div>         

                <q-separator spaced />

                 <div class="row items-center">
                    <q-icon class="q-ma-md" color="grey" name="access_time" size="sm" />
                    <q-item-label caption>
                        A entrega será realizada em até 40 minutos.
                    </q-item-label>
                </div>

            </q-page>
        </q-page-container> 

        <tela-recebimento-footer @botao-comprar-click="realizarPagamento()" :total="getSubtotal" :frete="0"/>
    </q-layout> 
</template>

<script>
    import TelaRecebimentoToolbar from 'src/components/TelaRecebimentoToolbar.vue'
    import TelaRecebimentoItemCarrinho from 'src/components/TelaRecebimentoItemCarrinho.vue'
    import TelaRecebimentoFooter from 'src/components/TelaRecebimentoFooter.vue'
    import * as servicePedido from './../service/ServicePedido.js'
    import {mapState, mapActions, mapGetters} from 'vuex'
    import {getNumeroCartaoFormatado, getDinheiroFormatadoSemCifrao} from './../Framework/FuncoesTexto.js'
    import {getIntValido} from './../Framework/FuncoesNumero.js'
    import DialogItem from 'src/components/DialogItem.vue'

    export default {
        // name: 'PageName',
        components: { TelaRecebimentoToolbar, TelaRecebimentoItemCarrinho, TelaRecebimentoFooter},        

        created () {
            this.recebeDados()
        },

        data() {
            return {
                total: 0,
                subtotal: 0,
                troco: "",
                pagamentoSelecionado: undefined,
                enderecoSelecionado: undefined
            }
        },

        computed: {
            ...mapState('carrinho', ['carrinho', 'itens']),
            ...mapState('usuario', ['listaEnderecos']),
            ...mapState('loja', ['loja', 'listaFormasPagto']),
            ...mapGetters('usuario', ['getEnderecoSelecionado', 'getPagamentoPadrao']),

            getCarrinho() {
                return this.carrinho
            },

            getCarrinhoId() {
                return this.carrinho.id
            },

            getQuantidadeDeItens() {
                return this.getItens.length
            },

            getItens() {
                return this.itens !== undefined ? this.itens : []
            },

            getSubtotal() {
                this.atualiza()
                return getDinheiroFormatadoSemCifrao(this.subtotal)
            },

            getPagamentoSelecionado() {
                return this.pagamentoSelecionado
            },

            getEnderecoSelecionadoRua() {
                let rua = "Nenhum endereço selecionado"
                console.log(this.enderecoSelecionado)

                try {
                    rua = this.enderecoSelecionado.get('endereco') 
                } catch (error) {
                }

                return rua
            },

            getEnderecoSelecionadoComplemento() {
                let complemento = ""

                try {
                    complemento = this.enderecoSelecionado.get('numero') +
                        (this.enderecoSelecionado.get('complemento') ?  ', ' +  this.enderecoSelecionado.get('complemento') : "")
                } catch (error) {
                }

                return complemento
            }
        },

        methods: {
            ...mapActions('carrinho', ['removerCarrinhoDoState','removeItem', 'limparCarrinho', 'getCarrinhoAberto', 'atualizaFreteCarrinho', 'atualizaItem']),
            ...mapActions('loja', ['getFormasPagto', 'getEnderecos']),

            atualizaEndereco: async function() {
                // aqui na precisa de loading. DEixar por enquanto
                if (!this.enderecoSelecionado)
                    throw "Endereco selecionado inválido"
                try {
                    this.$q.loading.show()
                    if (!this.carrinho) {
                        this.$q.notify("Carrinho vazio. Adicione itens para continuar")
                        return
                    }                        
                    this.carrinho.set('enderecoEntrega', this.enderecoSelecionado)
                    console.log(this.carrinho)
                    await this.atualizaItem(this.carrinho)    
                } finally {
                    this.$q.loading.hide()
                }
            },

            realizarPagamento: async function() {            
                try {
                    if(!this.getCarrinho || !this.getQuantidadeDeItens) {
                        throw new Error("Não é possível fazer o pedido sem itens")                
                    } else if (!this.enderecoSelecionado) {
                        throw new Error("Endereço inválido")
                    } else if (!this.pagamentoSelecionado) {
                        throw new Error("Pagamento inválido")
                    }
                    // } else if (!this.loja.get('aberta')) {                    
                    //     throw new Error("A loja não está aberta no momento")
                    // }

                    this.$q.loading.show()
                
                    console.log('pagamento selecionado ' + JSON.stringify( this.getPagamentoSelecionado))
                   
                    let _endereco = this.getEnderecoSelecionado
                    let _pagamento = this.getPagamentoSelecionado

                    let dadosPagamento = await servicePedido.realizaPagamento({endereco: _endereco, formaPagamento: _pagamento})
                    console.log('dados pagamento no recebimento')
                    console.log(dadosPagamento)
                    if (dadosPagamento) {
                        this.removerCarrinhoDoState()
                        this.$router.push({name: 'tela-pedidos', params: {dadosPagamento: dadosPagamento}})
                    }
                        
                } catch(error) {
                    this.$q.dialog({
                        title: 'Informação',
                        message: error.message,
                        ok: {                            
                            flat: true,
                            label: 'Ok'
                        },
                        persistent: true
                    })
                } finally {
                    this.$q.loading.hide()
                }
            },

            atualiza: function() {
                let subtotal = 0
                this.getItens.forEach(item => {
                    console.log(item)
                    subtotal += (item.get('preco') * item.get('quantidade'))
                })
                this.subtotal = subtotal
            },

            recebeDados: async function() {
                try {
                    this.$q.loading.show()
                    if(!this.carrinho)
                        await this.getCarrinhoAberto() 

                    if(!this.listaFormasPagto.length)
                        await this.getFormasPagto()             

                    if (!this.listaEnderecos || !this.listaEnderecos.length) {
                        await this.getEnderecos()
                    }
                    this.enderecoSelecionado = this.getEnderecoSelecionado
                    this.pagamentoSelecionado = this.getPagamentoPadrao
                } finally {
                    this.$q.loading.hide()
                }
            },

            abreDialog: function(tipo) {
                let listaOpcoes
                if (tipo === 'ENDERECO') {
                    listaOpcoes = this.listaEnderecos.map(item => {
                        return {id: item.id, titulo: item.get('apelido'), caption:  item.get('endereco')}
                    })
                } else if (tipo === 'PAGAMENTO') {
                    listaOpcoes = this.listaFormasPagto.map(item => {
                        return {id: item.id, titulo: item.get('nome'), caption:  item.get('nome')}
                    })
                }

                if (listaOpcoes && !listaOpcoes.length)
                    return

                this.$q.dialog({
                    component: DialogItem,
                    parent: this,
                    lista: listaOpcoes,
                    position: 'bottom'
                }).onOk((data) => {
                    if (tipo === 'ENDERECO') {
                        this.enderecoSelecionado = this.listaEnderecos.find(item => item.id  === data.id)
                        this.atualizaEndereco()
                    } else if (tipo === 'PAGAMENTO') {
                        this.pagamentoSelecionado = this.listaFormasPagto.find(item => item.id === data.id)
                    }
                })
            },
            
            limpar: async function() {

                let mensagem = this.getQuantidadeDeItens > 0 ? 'Deseja limpar o carrinho?' : 'Não há ítens no carrinho'
                let isConfirmacao = this.getQuantidadeDeItens > 0

                this.$q.dialog({
                        title: isConfirmacao ? 'Confirmação' : 'Informação',
                        message: mensagem,
                        ok: {                            
                            flat: true,
                            label: isConfirmacao ? 'Confimar' : 'Ok'
                        },
                        cancel: !isConfirmacao ? false : {
                            flat: true,
                            label: 'Cancelar'
                        },
                        persistent: true
                }).onOk(async () => {
                    if (isConfirmacao) {
                        try {
                            this.$q.loading.show()
                            await this.limparCarrinho()
                            this.$router.push('/')
                        } finally {
                            this.$q.loading.hide()
                        }
                    }                    
                }).onCancel(() => {
                    // console.log('>>>> Cancel')
                }).onDismiss(() => {
                    // console.log('I am triggered on both OK and Cancel')
                })                        
            },

            removeItemCarrinho: async function(id) {
                await this.removeItem(id)
            },

            atualizaQuantiadade: async function(produto) {
                let item = this.getItens.find(item => item.id = produto.id)
                item.set('quantidade', produto.quantidade)
                
                await item.save()
                this.getCarrinho.set('total', 0)
                this.getCarrinho.save()
            }
        }

    }
</script>
