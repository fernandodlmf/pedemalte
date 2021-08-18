<template>  
    <q-footer reveal class="text-black bg-primary" style="background-color: #fafafa">
        <q-card
            style="background-color: #fafafa; border-radius: 0px 0px 30px 30px"
            flat class=" absolute-top">
            <q-card-section>

            </q-card-section>
        </q-card>
        <q-card 
            flat
            style="border-radius: 30px"
            class="my-card shadow-1 q-mx-md q-my-sm q-px-sm">
            <div class="row items-center">
                <div class="col column justify-center">
                    <q-input 
                        rounded outlined v-model="numeroCupom" label="Digite o Cupom..."/>
                </div>
                                
                <q-card-section> 
                    <div class="col-auto">
                        <span class="text-subtitle1">Frete: R$ </span>
                        <span class="text-bold text-h6">{{frete | formataDinheiroSemCifrao}}</span>
                    </div>

                    <q-separator spaced />

                    <div class="text-center">
                        <span class="text-subtitle1">Total: R$ </span>
                        <span class="text-bold text-h5">{{total | formataDinheiroSemCifrao}}</span>
                    </div>
                    
                </q-card-section>
            </div>
        </q-card>

        <div class="column bg-primary">
            <q-btn
                @click="click()"
                unelevated no-caps icon-right="arrow_forward"
                size=""
                color="primary" 
                class="q-py-sm text-bold text-h6" label="Fazer Pedido"/>
        </div>
            
    </q-footer>
</template>

<script>
    export default {
        props: {
            total: {
                type: String,
                default: "0"
            },
            
            frete: {
                default: "0"
            },
        },

        data () {
            return {
                numeroCupom: ''
            }
        },

        methods: {
            click() {
                this.$emit('botao-comprar-click')
                //this.$router.push('/tela-pedidos')
            }
        },
    }
</script>

<style>

</style>