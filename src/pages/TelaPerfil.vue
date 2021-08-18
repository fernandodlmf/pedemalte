<template>
    <q-layout view="hHr LpR lFf">
        <q-page-container>
            <q-page >
                <tela-categoria-detalhe-toolbar titulo="Meu Perfil" />                

                <div class="column items-center">
                    <q-avatar
                        size="120px">
                        <img
                            style="border: solid 4px yellow"
                            :src="getImagemPerfil">
                    </q-avatar>

                    <div class="column text-center q-py-md">
                        <span class="text-h5 text-bold">{{getNomeUsuario}}</span>
                        <span class="text-capitalize">João Pessoa, Paraíba</span>
                    </div>                   
                </div>

                <q-form class="column q-px-md">
                    <q-toggle class="self-end" v-model="podeEditar" color="green" />
                    <q-field
                        borderless
                        class="q-my-xs"
                        :disable="!podeEditar"
                        :value="meuPerfil.nome"
                        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
                        hide-bottom-space>
                
                        <q-card
                            style="border-radius: 30px"
                            class="my-card full-width shadow-2 q-py-sm q-px-md text-capitalize">

                            <q-input 
                                placeholder="Seu nome"
                                borderless
                                v-model="meuPerfil.nome" type="text" >

                                <template v-slot:prepend>
                                    <q-icon class="q-px-sm" name="person" color="black" />
                                    <q-separator spaced vertical />
                                </template>
                            </q-input>
                        </q-card> 
                    </q-field>

                    <q-field
                        ref="telefone"
                        borderless
                        :disable="!podeEditar"
                        class="q-my-xs"
                        :value="meuPerfil.telefone"
                        hide-bottom-space
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']">
                
                        <q-card
                            style="border-radius: 30px"
                            class="my-card full-width shadow-2 q-py-sm q-px-md text-capitalize">

                            <q-input 
                                placeholder="DDD + seu número"
                                borderless
                                unmasked-value
                                mask="(##) # ####-####"
                                v-model="meuPerfil.telefone" type="tel" >

                                <template v-slot:prepend>
                                    <q-icon class="q-px-sm" name="phone" color="black" />
                                    <q-separator spaced vertical />
                                </template>
                            </q-input>
                        </q-card> 
                    </q-field> 

                    <q-field                 
                        class="q-my-xs"       
                        borderless
                        :disable="!podeEditar"
                        hide-bottom-space
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']">

                        <q-card
                            style="border-radius: 30px"
                            class="my-card full-width shadow-2 q-py-sm q-px-md text-capitalize">

                            <q-input 
                                placeholder="Seu email"
                                borderless
                                v-model="meuPerfil.email" type="email" >

                                <template v-slot:prepend>
                                    <q-icon class="q-px-sm" name="email" color="black" />
                                    <q-separator spaced vertical />
                                </template>
                            </q-input>
                        </q-card> 
                    </q-field> 

                    <q-field
                        class="q-my-xs"
                        borderless
                        :disable="!podeEditar"
                        :value="meuPerfil.nascimento"
                        hide-bottom-space
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']">
                
                        <q-card
                            style="border-radius: 30px"
                            class="my-card full-width shadow-2 q-py-sm q-px-md text-capitalize">

                            <q-input 
                                placeholder="Data de nascimento"
                                borderless
                                v-model="meuPerfil.nascimento" type="date" >

                                <template v-slot:prepend>
                                    <q-icon class="q-px-sm" name="event" color="black" />
                                    <q-separator spaced vertical />
                                </template>
                            </q-input>
                        </q-card> 
                    </q-field> 

                    <q-field
                        class="q-my-xs"
                        borderless
                        :disable="!podeEditar"
                        :value="meuPerfil.genero"
                        hide-bottom-space
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']">
                
                        <q-card
                            style="border-radius: 30px"
                            class="my-card full-width shadow-2 q-py-sm q-px-md text-capitalize"> 

                            <q-input 
                                placeholder="Gênero"
                                borderless
                                v-model="meuPerfil.genero" type="text" >

                                <template v-slot:prepend>
                                    <q-icon class="q-px-sm" name="person" color="black" />
                                    <q-separator spaced vertical />
                                </template>
                            </q-input>
                        </q-card> 
                    </q-field> 


                     <q-btn
                        class="q-my-md"
                        disabled
                        rounded unelevated
                        color="primary" size="lg" no-caps label="Salvar" @click="onClick" />
                </q-form>

               
            </q-page>
        </q-page-container>
              
    </q-layout>
</template>

<script>
    import TelaCategoriaDetalheToolbar from 'src/components/TelaCategoriaDetalheToolbar.vue'
    import {mapState} from 'vuex'
    export default {
    // name: 'PageName',
    
    components: { TelaCategoriaDetalheToolbar },

    data () {
            return {
                podeEditar: false,
                crop: false,
                imgSrc: '',
                meuPerfil: {
                    imagemUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
                    nascimento: "",
                    nome: "",
                    email: "",
                    genero: "",
                    telefone: "",
                    senha: "",
                    senhaConfirmacao: ""
                }
            }
        },
        mounted () {
            this.preenchePerfil()
        },

        computed: {
            ...mapState('usuario', ['perfil']), 

            getImagemPerfil() {
                return this.imgSrc ? this.imgSrc : 'https://cdn.quasar.dev/img/boy-avatar.png' 
            },

            getNomeUsuario: function() {
                let nome = "Usuário"
                if (this.perfil && this.perfil.nome)
                    nome = this.perfil.nome.split(' ')[0]
                    
                return nome
            },
        },

        methods: {
            preenchePerfil() {
                console.log(this.perfil)
                if (this.perfil) {
                    this.meuPerfil.imagemUrl = this.perfil.imagem ? this.perfil.imagem.url :'https://cdn.quasar.dev/img/boy-avatar.png'
                    this.meuPerfil.nome = this.perfil.nome
                    this.meuPerfil.email = this.perfil.email
                    this.meuPerfil.genero = this.perfil.genero
                    this.meuPerfil.telefone = this.perfil.telefone
                    this.imgSrc = this.meuPerfil.imagemUrl
                }            
            },

            // metodos de alteracao de imagem

            toggleInputFile () {
                this.$refs['profile-image'].click()
            },

        }
    }
</script>
