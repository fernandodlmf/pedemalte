<template>
    <q-layout view="hHr LpR lFf">
        <q-page-container>
            <q-page >
                <toolbar-padrao titulo="Pesquise Produtos" />
                
                <q-input 
                    :debounce="200"
                    borderless
                    outlined
                    rounded
                    class="q-mx-md"
                    v-model="pesquisa" type="text" placeholder="Digite o que procura...">
                    
                    <template v-slot:prepend>
                        <q-icon size="lg" color="black" class="q-mx-sm" name="search" />
                    </template>
                </q-input>


                <div class="row justify-evenly">
                    <card-produto
                        class="col-5"
                        v-for="produto in getProdutos" 
                        :produto="produto"
                        :key="produto.id"  />
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
    import CardProduto from 'src/components/CardProduto.vue'
    import {mapGetters} from 'vuex'
    import ToolbarPadrao from 'src/components/ToolbarPadrao.vue'

    export default {
        // name: 'PageName',
        components: { CardProduto, ToolbarPadrao},
        data () {
            return {
                pesquisa: ""
            }
        },

        computed: {
            ...mapGetters('produto', ['getProdutosByName']),
            getProdutos() {
                console.log('pesquisa: ' + this.pesquisa)
                let produtos = this.getProdutosByName(this.pesquisa)
                console.log('resultado: ' + JSON.stringify(produtos))
                return produtos
            }
        },
    }
</script>
