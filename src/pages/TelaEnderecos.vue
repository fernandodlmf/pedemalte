<template>
    <q-layout view="hHr LpR lFf">
        <q-page-container>
            <q-page >
                <toolbar-padrao titulo="Meus Endereços" />
                <!-- input de pesquisa de endereços -->

                <q-card
                    style="border-radius: 30px"
                    class="my-card q-mx-md shadow-4 q-py-sm q-px-md text-capitalize">

                    <q-input 
                        :loading="loading"
                        v-model="pesquisa"
                        borderless
                        debounce="700"                        
                        placeholder="Busque um novo endereço">
                        
                        <template v-slot:prepend>
                            <q-avatar>
                                <q-icon size="md" name="search" />
                            </q-avatar>
                        </template>
                    </q-input>
                </q-card> 

                <div class="q-mt-lg">
                    <tela-enderecos-card-endereco
                        @renderiza="renderiza()"
                        v-for="endereco in getListaEndercos" :key="endereco.id"
                        :endereco="endereco" />
                </div>

            </q-page>
        </q-page-container>
              
    </q-layout>
</template>

<script>
    import axios from 'axios'
    import TelaEnderecosCardEndereco from 'src/components/TelaEnderecosCardEndereco.vue'
    import ToolbarPadrao from 'src/components/ToolbarPadrao.vue'
    import {mapActions, mapState} from 'vuex'
    export default {
        // name: 'PageName',
        components: { 
            TelaEnderecosCardEndereco, ToolbarPadrao
        },

        data() {
            return {
                enderecos: [],
                pesquisa: "",
                loading: false,
                rederizacao: 1
            }
        },

        mounted () {
            this.recebeDados()
        },

        watch: {
            pesquisa: function() {
                if (!this.pesquisa)
                    return

                let url = 'https://viacep.com.br/ws/PB/João Pessoa/' + this.pesquisa + '/json/'
                this.loading = !this.loading
                
                axios.get(url).then((response) => {
                    console.log(response)
                    if (response && response.data) {
                        this.enderecos = response.data.map(item => {

                            return {
                                ehNovo: true,
                                endereco: item.logradouro,
                                bairro: item.bairro,
                                cidade: item.localidade,
                                estado: item.uf,
                                cep: item.cep,
                                numero: "",
                                apelido: "",
                                complemento: item.complemento
                            }
                        })
                    }
                }).catch((e) => {
                    console.log(e)
                    this.$q.notify({
                        color: 'negative',
                        position: 'top',
                        message: 'Loading failed',
                        icon: 'report_problem'
                    })
                }).finally(() => {
                    this.loading = !this.loading
                    //this.renderiza()
                })
            }
        },

        computed: {
            ...mapState('usuario', ['listaEnderecos']),
            
            getListaEndercos() {
                return this.enderecos 
            },
        },

        methods: {
            ...mapActions('usuario', ['getEnderecos']),

            async recebeDados() {
                this.$q.loading.show()
                try {
                    if (!this.listaEnderecos.length)
                        await this.getEnderecos()
                    this.enderecos = this.listaEnderecos
                } finally {
                    this.$q.loading.hide()
                }
            },

            renderiza: function() {
                this.renderizacao++
            }
        }
    }
</script>
