<template>
    <q-card
        @click="onClick(categoria)"
        flat class="my-card q-mx-xs bg-grey-2"
        style="height: 170px; width: 26vw; border-radius: 22px">
        <q-img
            :src="categoria.get('imagem') == undefined ? '': categoria.get('imagem')._url"        
            v-ripple
            class="absolute-full"
            contain
            :ratio="16/9"
            spinner-color="primary"
            spinner-size="82px"
        >
            <span class="absolute-bottom q-px-sm q-mb-md text-white text-subtitle1 text-bold text-center text-capitalize">
                {{categoria.get('nome') | formataCapitaliza}}
            </span>

            <template v-slot:error>
                <div class="absolute-full flex flex-center bg-negative text-white">
                    Não foi possível carregar a categoria
                </div>
            </template>
        </q-img>
    </q-card>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        props: {
            categoria: {
                type: Object,
                required: true
            },
        },

        methods: {
            ...mapActions('loja', ['escolheCategoria']),

            onClick: function(valor) {    
                this.escolheCategoria(valor)
                this.$router.push({name: 'tela-categoria-detalhes', params: {categoria: valor}})                            
            }
        }

    }
</script>

<style>

</style>