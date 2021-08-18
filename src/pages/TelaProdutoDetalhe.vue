<template>
    <q-layout view="hHr LpR lFf">
        <q-page-container>
            <q-page>
                <tela-categoria-detalhe-toolbar :titulo="getNome" />
                <div class="row q-pb-md">
                    <div style="height: 40vh" class="col column relative-position">

                       <q-img                            
                            :src="getImagemUrl" 
                            class="absolute-full"
                            contain
                            spinner-color="primary"
                            spinner-size="82px">
                        </q-img>                  

                        <mais-menos
                            class="absolute-bottom"
                            @handle-quantidade-click="manipulaQuantidade"  
                            :direcaoVertical="false" 
                            :qtdProduto="qtdProduto" />
                    </div>
 
                    <div v-if="getHarmonizacoes(getProduto).length" class="col-7 column q-pr-md">
                        <div class="q-py-sm text-subtitle1 text-bold">
                            <span
                                class=""
                                style="border-bottom: solid 4px red">Harmon</span>
                            <span>iza com</span>
                        </div>

                        <div class="text-subtitle2 text-bold">
                            <strong >Recomendado</strong>
                            <strong class="text-primary"> por nós</strong>
                        </div>

                        <card-item-harmonizacao
                            v-for="harmonizacao in getHarmonizacoes(getProduto)"
                            :key="harmonizacao.id"
                            @click-harmonizacao="abreDialogHarmonizacao"
                            :produto="harmonizacao" />
                    </div>

                </div>

                <q-card 
                    class="my-card"
                    style="border-radius: 30px 30px 0px 0px">

                        <div class="row q-pt-sm items-start justify-around">
                            <div class="col-auto q-px-lg q-py-sm">
                                <div class="text-h6 text-bold">R$ {{getTotalItem | formataDinheiroSemCifrao}}</div>
                                <div class="text-subtitle2 text-bold text-grey">{{getQuantidade}} unidades</div>
                            </div>                            

                            <div class="col column"> 
                                <div
                                    class="row no-wrap"
                                    v-for="harmonizacao in harmonizacoes"
                                    :key="harmonizacao.produto.id">
                                    
                                    <span class="q-my-sm col-auto text-h5">+</span>

                                    <div
                                        class="column q-px-lg q-my-sm"                                        >                                                            
                                        <div class="text-subtitle2 text-bold">{{getHarmonizacaoNomeProduto(harmonizacao)}}</div>
                                        <div class="text-subtitle2 text-bold text-green">{{harmonizacao.qtd}}x R$ {{getHarmonizacaoTotal(harmonizacao) | formataDinheiroSemCifrao}}</div>
                                    </div> 
                                </div>                                                               
                            </div>
                        </div>

                        <div class="row q-pa-sm">
                            <q-btn 
                                class="col q-ma-xs shadow-2 text-black text-bold"
                                unelevated rounded  no-caps color="" 
                                label="+6 unidades" @click="incrementa(6)" />
                            <q-btn
                                class="col q-ma-xs shadow-2 text-black text-bold"
                                unelevated rounded  no-caps color="" 
                                label="+12 unidades" @click="incrementa(12)" />
                            <q-btn 
                                class="col q-ma-xs shadow-2 text-black text-bold"
                                unelevated rounded  no-caps color="" 
                                label="+15 unidades" @click="incrementa(15)" />
                        </div>

                        <q-card-section >
                            <div class="text-h5 text-bold">{{getNome | formataCapitaliza}}</div>
                            <div class="text-subtitle2 text-bold text-grey">{{getTamanho}}</div>
                            <div class="q-mt-sm text-grey">{{getDescricao}}</div>
                        </q-card-section>
                </q-card>
            
            </q-page>
        </q-page-container>

        <q-footer class="row justify-center bg-white" style="height: 12vh"  elevated bordered>
            <div class="q-pt-sm" >
                <q-btn
                    @click="salvarFavorito()"
                    class="q-mx-md text-black"
                    size="lg"
                    color=""
                    :icon="isFavorito ? 'favorite': 'favorite_border'" />
                <q-btn
                    class="q-mx-md q-px-sm q-py-sm"
                    size="lg"
                    no-caps rounded color="primary"
                    label="Adicionar ao carrinho" @click="adicionarProduto()" />
            </div>
        </q-footer>

    </q-layout>
</template>


<script>
    import CardItemHarmonizacao from 'src/components/CardItemHarmonizacao.vue'
    import HarmonizacaoDetalhes from 'src/components/HarmonizacaoDetalhes.vue'
    import MaisMenos from 'src/components/MaisMenos.vue'
    import TelaCategoriaDetalheToolbar from 'src/components/TelaCategoriaDetalheToolbar.vue'
    import { mapGetters, mapActions, mapState } from 'vuex'
    import * as servicePedido from './../service/ServicePedido.js'
    import {isUsuarioLogado} from './../service/ServiceUsuario.js'

    export default {
        name: 'ProdutoDetalhe',
        components: { 
            CardItemHarmonizacao, MaisMenos, TelaCategoriaDetalheToolbar 
        },

        data () {
            return {
                total: '0,00',
                qtdProduto: 1,
                harmonizacoes: []
            }
        },

        computed: {
           // ...mapState('loja', ['loja']),
           ...mapGetters('produto', ['getHarmonizacoesPorProdutoId']),
           ...mapState('usuario', ['listaFavoritos']),
           ...mapState('loja', ['produtoEscolhido']),

            isFavorito() {
                let _achou
                if (this.getProdutoInventario)
                    _achou = this.listaFavoritos.find(item => item.get('produtoInventario').id == this.getProdutoInventario.id)
                return _achou ? true : false
            },

            getLojaParcelamento() {
                return 1
            },

            getProdutoInventario() {
                return this.produtoEscolhido //this.$route.params['produto']
            },

            getProduto() {
                let _retorno
                try {
                    _retorno = this.getProdutoInventario.get('produto')
                } catch (error) {
                    console.error("Erro ao obter produto de produto inventário: " + error.message)
                }
                return _retorno
            },

            getNome() {
                let retorno = ''
                try {
                    retorno = this.getProduto.get('nome')
                } catch (error) {
                    
                }
                return retorno
            },

            getImagemUrl() {
                if (!this.getProduto)
                    return "" // retornar uma imagem padrão
                return this.getProduto.get('imagem') === undefined ? '' : this.getProduto.get('imagem')._url 
            },

            getPreco() {
                return this.getProdutoInventario.get('preco')
            },

            getTamanho() {
                return this.getProdutoInventario.get('tamanho')
            },

            getPrecoPromocao() {
                return this.getProdutoInventario.get('precoPromocao')
            },

            getDescricao() {
                return this.getProduto.get('descricao')
            },

            getEstoqueAtual() {
                return this.getProdutoInventario.get('estoque')
            },

            getRating() {
                return 0
            },

            ehPromocao() {
                return this.getProdutoInventario.get('ehPromocao') ? true : false
            },

            getQuantidade() {
                return this.qtdProduto
            },
            
            getTotalItem() {
                // melhorar com parse floar ou int
                let preco = this.ehPromocao ? this.getPrecoPromocao : this.getPreco
                if (!preco)
                    throw "Preco do item zerado"
                return preco * this.getQuantidade
            },
            

            // getDescontoPorcentagem() {
            //     let preco = this.getPreco
            //     let precoPromo = this.getPrecoPromocao
            //     let diferenca = preco - precoPromo
            //     let resultado = (diferenca / preco) * 100

            //     return getParteInteira(resultado)
            // }
        },

        methods: {
            ...mapActions('carrinho', ['addItemAoCarrinho']),
            ...mapActions('usuario', ['adicionaERemoveFavorito']),

            salvarFavorito: async function() {
                try {
                    if (!isUsuarioLogado())
                        this.$router.push('/tela-login')
                    await this.adicionaERemoveFavorito(this.getProdutoInventario)
                    this.ehFavorito = !this.ehFavorito
                } catch (error) {
                    console.log(error)
                }
            },

            
            getHarmonizacoes: function(produto) {
                return this.getHarmonizacoesPorProdutoId(produto.id)
            },

            getHarmonizacaoTotal(harmonizacao) {
                if (!harmonizacao)
                    return 0

                let _qtd = harmonizacao.qtd
                let _preco = harmonizacao.produto.get('preco')
                return _preco * _qtd
            },

            getHarmonizacaoNomeProduto(harmonizacao) {
                if (!harmonizacao)
                    return 0
                return harmonizacao.produto.get('produto').get('nome')
            },

            getHarmonizacaoProdutoInventario(harmonizacao) {
                if (!harmonizacao)
                    return 0
                return harmonizacao.produto
            },

            abreDialogHarmonizacao(value) {
                this.$q.dialog({
                    component: HarmonizacaoDetalhes,
                    parent: this,
                    produto: value,
                    position: 'bottom'
                }).onOk((data) => {
                    this.adicionaEAtualizaHarmonizacoes(data)
                })
            },

            adicionaEAtualizaHarmonizacoes(harmonizacao) {
                if (!harmonizacao)
                    return
                let existe = this.harmonizacoes.find(elemento => elemento.produto.id === harmonizacao.produto.id)
                if (existe) {
                    existe.qtd += harmonizacao.qtd
                    return
                }                    
                
                this.harmonizacoes.push(harmonizacao)
            },

            manipulaQuantidade: function(qtd) {
                if (qtd < 1)
                    return
                this.qtdProduto  = qtd
            },

            getArrayDeItensAInserir() {
                let _itens = []
                _itens.push({
                    quantidade: this.getQuantidade, 
                    produto: this.getProdutoInventario,
                    preco: this.getPreco
                })

                let _harmonizacoes = this.harmonizacoes
                for(let i = 0; i < _harmonizacoes.length; i++) {
                    _itens.push({
                        quantidade: _harmonizacoes[i].qtd, 
                        produto: this.getHarmonizacaoProdutoInventario(_harmonizacoes[i]),
                        preco: _harmonizacoes[i].produto.get('preco')
                    })
                }

                return _itens
            },

            incrementa: function(qtd) {
                if (qtd && qtd >= 1) {
                    this.qtdProduto = this.qtdProduto + qtd 
                }
                
            },

            async adicionarProduto(){
                let _usuarioLogado = isUsuarioLogado()
                
                if (!_usuarioLogado) {
                    this.$router.push('/tela-login')
                    return
                }

                try {
                    this.$q.loading.show()
                    
                    let _itens = this.getArrayDeItensAInserir()
                    for(let i = 0; i < _itens.length; i++) {
                        console.log('adicionando item: ' + i )
                        console.log(_itens[i])
                        await this.addItemAoCarrinho(_itens[i])
                    }
                                    
                    this.$router.push('/tela-recebimento')
                } catch(error) {
                    console.error(error)
                    // apresentar dialog aqui
                } finally {
                    this.$q.loading.hide()
                }
            }
        }
    }
</script>

<style>
    @import '../css/marcadores.css';
</style>
