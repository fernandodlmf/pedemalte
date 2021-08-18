<template>
    <q-layout view="hhh lpr lFf">
        <q-page-container>            
            <q-page class="bg-grey-1">
                <tela-categoria-detalhe-toolbar :titulo="getToolbarTitulo"/>

                <div  class="row">
                    <!-- <card-secao
                        textColor="text-white" bgColor="bg-black" :bordaEsquerda="false" :caption="getTituloSecao"/> -->
                    <div   
                        style="overflow: auto"
                        class="row no-wrap q-ml-lg">

                        <q-btn
                            @click="setCategoriaSelecionada(null)"
                            class="q-px-sm q-my-sm q-mx-xs text-bold bg-white text-black"
                            :outline="false"
                            rounded
                            :flat="getCategoriaSelecionada !== null"
                            no-caps size="lg" >
                            <span class="text-subtitle1 text-bold">Tudo</span>
                        </q-btn>

                        <q-btn
                            @click="setCategoriaSelecionada(subCategoria)"
                            v-for="subCategoria in getSubcategorias" :key="subCategoria.id"
                            class="q-px-sm q-my-sm q-mx-xs text-bold bg-white text-black"
                            :flat="!(getCategoriaSelecionadaTitulo === subCategoria.get('nome'))" no-caps size="md" rounded >
                            <span class="text-subtitle1 text-bold">{{getSubcategoriaTitutlo(subCategoria.get('nome'))}}</span>
                        </q-btn>
                    </div>
                </div>

                <div
                    class="q-mx-sm q-my-md"
                    v-for="subCategoria in getSubcategoriaSelecionada" :key="subCategoria.id">
                    <span class="text-h5 q-mx-sm q-my-md text-bold">{{getSubcategoriaTitutlo(subCategoria.get('nome'))}}</span>
                    
                    <div style="overflow: auto" class="row q-my-md no-wrap">
                        <card-produto
                            class="col-5" v-for="produto in getProdutosPorCategoria(subCategoria)" :key="produto.id"
                            :produto="produto"  />            
                    </div>
                    
                </div>

            </q-page>
        </q-page-container>        
    </q-layout>
</template>

<script>
    import TelaCategoriaDetalheToolbar from 'src/components/TelaCategoriaDetalheToolbar.vue'
    import CardSubcategoria from 'src/components/CardSubcategoria.vue'
    import CardProduto from 'src/components/CardProduto.vue'
    import { mapGetters, mapActions, mapState } from 'vuex'

    export default {
        //name: 'Categoria',
        components: { 
            TelaCategoriaDetalheToolbar,
            // CardSubcategoria,
                CardProduto
        },

        data () {
            return {
                categorias: [],
                categoria: null,
                categoriaSelecionada: null,
                pesquisa: "",
                value: true
            }
        },

        created () {
            // if (this.getSubcategorias.length) {
            //     console.log('selecionando categoria')
            //     this.setCategoriaSelecionada(this.getSubcategorias[0])
            // }
        },


        computed: {
            ...mapState('produto', ['listaProdutosCategorias', 'listaProdutos']),
            ...mapState('loja', ['categoriaEscolhida']),
            ...mapGetters('produto', ['getProdutosByName','getProdutosCategorias', 'getProdutosPorCategoriaById', 'getProdutosPorCategoriaByName', 'getDistinctCategorias']),

            getCategoriaImgUrl() {
                return this.getRouteParametroCategoria && this.getRouteParametroCategoria.get('file') ? this.getRouteParametroCategoria.get('file')._url : 'imgs/tecnologia.jpg'
            },
            
            getCategoriaSelecionada(){
                return this.categoriaSelecionada
            },

            getRouteParametroCategoria() {
                return this.categoriaEscolhida //this.$route.params['categoria']
            },

            getSubcategoriaSelecionada() {
                if (this.getCategoriaSelecionada)
                    return [this.getCategoriaSelecionada]
                else
                    return this.getSubcategorias
            },

            getSubcategorias: function() {                            
                let categoria = this.getRouteParametroCategoria
                console.log('subcategorias')
                if (!categoria)
                    return []
                let _subcategorias = this.getDistinctCategorias(categoria.id)
                console.log('retornando')
                console.log(_subcategorias) 
                return _subcategorias 
            }, 
            
            getPesquisa() {
                return this.pesquisa
            },

            getTituloSecao() {
                if (this.getCategoriaSelecionada)
                    return this.getSubcategoriaTitutlo(this.getCategoriaSelecionada.get('nome'))
                else 
                    return "TUDO"
            },

            getToolbarTitulo() {
                let _titulo = this.getParametro('categoria') ? this.getParametro('categoria').get('nome') : ""
                return _titulo || "Categoria"
            },

            getCategoriaSelecionadaTitulo: function () {
                if (!this.getCategoriaSelecionada)                
                    return ""
                return this.getCategoriaSelecionada.get('nome')
            },
        },

        methods: {
            getProdutosPorCategoria(categoria) {
                let _pesquisa = this.getPesquisa
                if (_pesquisa)
                    return this.getProdutosByName(_pesquisa)
                else if (categoria)
                    return this.getProdutosPorCategoriaById(categoria.id)
                else if (this.getTituloSecao.toUpperCase() === "TUDO")
                    return this.getProdutosPorCategoriaByName(this.getRouteParametroCategoria.get('nome'))
                else 
                    return []
            },

            getParametro(valor) {
                return this.$route.params[valor]
            },
            
            getSubcategoriaTitutlo: function (value) {
                if (!value) return ''
                return value
            },     

            setCategoriaSelecionada(categoria) {
                console.log('selecionou categoria')
                console.log(categoria)
                this.pesquisa = ""
                this.categoriaSelecionada = categoria
            },
            
        },
    }
</script>
