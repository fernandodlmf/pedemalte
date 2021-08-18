<template>
    <q-footer class="text-white bg-grey-2">       
        <q-card
            class="my-card q-mx-md q-mb-sm"
            style="border-radius: 40px; ">
            <q-tabs 
                align="justify" 
                no-caps 
                style="height: 10vh"
                class="bg-white" 
                active-color="primary" 
                indicator-color="primary" 
                v-model="tab">
                    <q-tab 
                        class="text-grey"
                        clickable 
                        @click="goToRoute('/')" 
                        icon="img:img/icons/home.svg" 
                        name="home"                         
                        label=""/>
                    <q-tab 
                        class="text-grey"                        
                        clickable 
                        @click="goToRoute('/tela-buscar')"                             
                        icon="img:img/icons/lupa.svg"
                        name="search" 
                        label=""/>
                    <q-tab 
                        class="text-grey"                                                    
                        clickable 
                        @click="goToRoute('/tela-cupons')"                                 
                        icon="img:img/icons/tag.svg" 
                        name="meus cupons" 
                        label="" />
                    
                    <q-tab
                        class="text-grey"
                        clickable 
                        @click="goToRoute('/tela-recebimento')"  
                        icon="img:img/icons/sacolas-de-compras.svg"                         
                        label="">
                        <q-badge
                                rounded
                                v-if="getQtdItensCarrinho > 0" color="red"
                                :label="getQtdItensCarrinho"
                                floating />
                            <!-- <q-badge v-if="deliveries > 0" color="red" floating>{{ deliveries }}</q-badge> -->
                    </q-tab>
            </q-tabs>
        </q-card>
    </q-footer>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                tab: ''
            }
        },

        computed: {
            ...mapState('carrinho', ['itens']),

            getQtdItensCarrinho() {
                return this.itens ? this.itens.length : 0
            }
        },

        
        methods: {
            goToRoute (nomeDaRota) {
                this.$router.push(nomeDaRota)
        }
    }

    }
</script>

<style>

</style>