<template>
    <q-layout view="hHr LpR lFf">
        <q-page-container>
            <q-page>
                <toolbar-padrao titulo="Meus Favoritos" />
                <div class="row q-px-sm justify-evenly">
                    <div  class="col-6" v-for="produto in getProdutos" :key="produto.id" >
                        <card-produto :produto="produto"  />
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
    import ToolbarPadrao from 'src/components/ToolbarPadrao.vue'
    import {mapState} from 'vuex'
    import CardProduto from 'src/components/CardProduto.vue'
    
    export default {
        components: { ToolbarPadrao, CardProduto},
        // name: 'PageName',

        computed: {
            ...mapState('usuario', ['listaFavoritos']),

            getProdutos() {
                return this.listaFavoritos.map(item => item.get('produtoInventario'))
            }
        }
    }
</script>
