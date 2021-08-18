<template>
  <div id="q-app" class="montserat">
    <router-view />
  </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        methods: {
            ...mapActions('usuario', ['getPerfilFromServer', 'getEnderecos']),
            ...mapActions('produto', ['getAllProdutos','getProdutoCategorias']),
            ...mapActions('loja', [ 'getLojaCategorias', 'getLoja', 'getFormasPagto']),
            ...mapActions('carrinho', ['limparCarrinho', 'getCarrinhoAberto']),

            getDados() {
                this.getPerfilFromServer()
                this.getCarrinhoAberto()
                // this.getLoja()
                this.getFormasPagto()
                this.getEnderecos()
            }
        },

        created () {
            //this.$q.notify('created do app.vue')
        },

        mounted () {
            //this.$q.notify('mounted do app.vue')
            //this.getDados()
            this.getDados()
            
        },
        
        name: 'App'
    }
</script>

