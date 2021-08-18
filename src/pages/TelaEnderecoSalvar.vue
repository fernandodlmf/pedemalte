<template>
    <q-layout view="hHr LpR lFf">
        <q-page-container>
            <q-page>
                <toolbar-padrao :subtitulo="getToolbarSubTitulo" :titulo="getToolbarTitulo" />

                <q-form
                    v-if="getEndereco"
                    class="q-px-md">

                    <q-field
                        class="q-my-sm"
                        borderless
                        disable
                        :value="endereco.cep"
                        hide-bottom-space
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']">
                
                        <q-card
                            style="border-radius: 30px"
                            class="my-card full-width shadow-4 q-py-sm q-px-md text-capitalize">
                            <q-input 
                                placeholder="Complemento"
                                borderless
                                v-model="endereco.cep" type="text" >
                            </q-input>
                        </q-card> 
                    </q-field>

                    <q-field
                        class="q-my-sm"
                        borderless
                        :value="endereco.numero"
                        hide-bottom-space
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']">
                
                        <q-card
                            style="border-radius: 30px"
                            class="my-card full-width shadow-4 q-py-sm q-px-md text-capitalize">

                            <q-input 
                                placeholder="Número"
                                borderless
                                v-model="endereco.numero" type="number">
                            </q-input>
                        </q-card> 
                    </q-field>

                    <q-field
                        class="q-my-sm"
                        borderless
                        :value="endereco.complemento"
                        hide-bottom-space
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']">
                
                        <q-card
                            style="border-radius: 30px"
                            class="my-card full-width shadow-4 q-py-sm q-px-md text-capitalize">

                            <q-input 
                                placeholder="Complemento"
                                borderless
                                v-model="endereco.complemento" type="text" >

                                <template v-slot:append>
                                    <q-btn 
                                        @click="salvar()" round flat color="red" icon="arrow_forward" />
                                </template>
                            </q-input>
                        </q-card> 
                    </q-field>
                </q-form> 
            </q-page>
        </q-page-container>
    </q-layout>
</template>


<script>
    import {mapActions} from 'vuex'
    import ToolbarPadrao from 'src/components/ToolbarPadrao.vue'
    
    export default {
    // name: 'PageName',

        components: { 
            ToolbarPadrao
        },
    
        data() {
            return {
                endereco: null
            }
        },

        mounted () {
            if (this.$route.params['endereco']) {
                this.endereco = Object.assign({}, this.$route.params['endereco'])                 
            }
        },

        computed: {
            getEndereco() {        
                return this.endereco
            },

            getToolbarTitulo() {
                return this.getEndereco ? this.getEndereco.endereco : "Endereço"
            },
            
            getToolbarSubTitulo() {
                let subtitulo = ""
                if (this.getEndereco) {
                    subtitulo = this.getEndereco.bairro + ' ' + this.getEndereco.cidade + ' - '
                        + this.getEndereco.estado + ',' + ' Brasil'
                }
                return subtitulo
            },
        },

        methods: {
            ...mapActions('usuario', ['salvarEndereco']),
            salvar: async function() {
                try {
                    this.$q.loading.show()

                    await this.salvarEndereco(this.getEndereco)
                    this.$router.go(-1)
                } catch(e) {
                    this.$q.notify(e.message)                                    
                } finally { 
                    this.$q.loading.hide()      
                }               
            },
        } 
    }
</script>
