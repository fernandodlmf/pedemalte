<template>
    <q-layout view="hHr LpR lFf">
        <tela-inicial-drawer @manipula-drawer="manipaDrawer" :drawerEstado="drawerEstado" />
        <q-page-container>            
            <q-page class="bg-grey-2" >
                <!-- Toolbar  -->
                <tela-inicial-toolbar :perfil="getPerfil" @manipula-drawer="manipaDrawer" />

                <!-- <q-btn color="primary" icon="check" label="solicitaPermissao" @click="solicitaPermissao()" />
                <q-btn color="primary" icon="check" label="checaPermissao" @click="checaPermissao()" />
                <q-btn color="primary" icon="check" label="PosicaoAtual" @click="PosicaoAtual()" /> -->

                <!-- botao de pesquisa de produtos -->
                <div class="q-mx-lg q-my-md q-mb-lg">
                    <q-btn
                        class="full-width q-mx-lg"
                        outline
                        rounded
                        no-caps
                        text-color="grey"
                         @click="$router.push('/tela-buscar')">

                        <q-avatar>
                            <q-icon size="md" name="search" />
                        </q-avatar>

                        <span>Busque cervejas, vinhos e petiscos...</span>

                        <q-space />

                    </q-btn>
                </div>

                
                <!-- Barra titulo Categorias -->
                <div class="q-ma-md text-h5">
                    <strong>Categ</strong>
                    <strong style="border-bottom: solid 3px yellow">orias</strong>
                </div>
                
                <!-- scroll de categorias -->
                <div style="overflow: auto" class="q-ml-md q-mr-sm row no-wrap">
                    <card-categoria                         
                        class="col-auto" v-for="categoria in listaLojaCategorias" 
                        :key="categoria.id" 
                        :categoria="categoria"/>
                </div>

                <!-- carrousel de banners -->
                <tela-inicial-carousel />

                <!-- Barra titulo Mais Vendidos -->
                <div class="q-mx-md q-my-sm q-py-sm text-h5">
                    <strong style="border-bottom: solid 3px yellow;">Mais v</strong>
                    <strong>endidos</strong>
                </div>

                <!-- scroll de produtos Mais Vendidos -->
                <div style="overflow: auto" class="row no-wrap q-pl-xs">                    
                    <card-produto
                        class="col-5"
                        v-for="produto in listaProdutosMaisVistos" 
                        :produto="produto"
                        :key="produto.id" />
                </div>
                
            </q-page>

        </q-page-container>

        

    </q-layout>
</template>

<script>
    import {mapActions, mapState, mapGetters} from 'vuex'
    import CardProduto from 'src/components/CardProduto.vue'
    import TelaInicialCarousel from 'src/components/TelaInicialCarousel.vue'
    import TelaInicialToolbar from 'src/components/TelaInicialToolbar.vue'
    import CardCategoria from 'src/components/CardCategoria.vue'
    import TelaInicialDrawer from 'src/components/TelaInicialDrawer.vue'
    import {getCurrentPosition, requestPermissions, checkPermissions} from './../service/ServiceLocation.js'

    export default {
        name: 'PageIndex',
        components: {
            CardProduto, TelaInicialCarousel, TelaInicialToolbar, CardCategoria,
            
                TelaInicialDrawer,
                  
        },

        mounted () {
            this.recebeDados()
            //this.setLocalizacaoAtual()
            //this.getLocalizacaoAtual()
            
        },

        data () {
            return {
                drawerEstado: false,
                localizacaoAtual: undefined,
                categorias: [
                    {id: 1, titulo: "cervejas", caminhoImg: "img/categoria_cerveja.png"},
                    {id: 2, titulo: "Vinhos", caminhoImg: "img/categoria_vinho.png"},
                    {id: 3, titulo: "Petiscos", caminhoImg: "img/categoria_petisco.png"},
                    {id: 4, titulo: "Licores", caminhoImg: "img/categoria_vinho.png"},
                    {id: 5, titulo: "Cachaças", caminhoImg: "img/categoria_cerveja.png"}
                ]
            }
        },

        computed: {
            ...mapState('loja', ['listaLojaCategorias', 'loja', 'listaBanners']),
            ...mapState('produto', ['listaProdutosCategorias', 'listaProdutos', 'listaProdutosMaisVistos', 'listaHarmonizacoes']),
            ...mapState('carrinho', ['carrinho']),
            ...mapState('usuario', ['perfil', 'listaFavoritos', 'listaEnderecos']),

            getPerfil() {
                return this.perfil
            },   
            
            
            getLocalizacaoAtual() {                
                console.log('coors')
                let retorno =''
                if (this.localizacaoAtual)
                   retorno = JSON.stringify(this.localizacaoAtual)
                return retorno
            },
        },

        methods: {
            ...mapActions('loja', ['getLojaCategorias', 'getLoja', 'getBanners', 'escolheCategoria']),
            ...mapActions('produto', ['getAllProdutos','getProdutoCategorias', 'getProdutosMaisVistos', 'getAllHarmonizacoes']),
            ...mapActions('usuario', ['getFavoritos', 'getEnderecos']),   
            
            setLocalizacaoAtual: async function() {                
                this.localizacaoAtual = await getCurrentPosition()
            },

            async solicitaPermissao() {
                await requestPermissions()
            },
            
            async checaPermissao() {
                await checkPermissions()
            },

            async PosicaoAtual() {
                await getCurrentPosition()
            },

            goToPage: function(rota) {
                console.log(rota)
                this.$router.push(rota) 
            },

            manipaDrawer: function () {
                this.drawerEstado = !this.drawerEstado
            },

            async recebeDados() {
                // TODO: REVISAR PQ SE ACONTECER UM ERRO AQUI FUDEU
                this.$q.loading.show()
                try {
                    if (!this.listaEnderecos.length)
                        await this.getEnderecos()

                    if(!this.listaFavoritos.length)
                        this.getFavoritos()
                    // if (!this.listaBanners.length)
                    //     await this.getBanners()
                    // if (!this.loja)
                    //     this.getLoja() // não precisa de await por enquanto
                    if (!this.listaLojaCategorias.length)  {
                        await this.getLojaCategorias()    
                        console.log('listando')                            
                        console.log(this.listaLojaCategorias)
                    }
                        
                    if (!this.listaProdutos.length) {
                        await this.getAllProdutos()                                                     
                        await this.getProdutosMaisVistos()
                    }                    
                    if (!this.listaProdutosCategorias.length)
                        await this.getProdutoCategorias()  

                    if (!this.listaHarmonizacoes.length)
                        await this.getAllHarmonizacoes()                     
                } finally {
                    this.$q.loading.hide()
                }
                
            }
        }
    }
</script>

<style scoped>
    @import '../css/marcadores.css';
    
    .offsetCardImg {
        position: relative;
        top: -60px;
    }
    div.scrollmenu {
        overflow    : auto;
        white-space : nowrap;
    }

    div.scrollmenu .thumbnail {
        display : inline-block;
    }

</style>
