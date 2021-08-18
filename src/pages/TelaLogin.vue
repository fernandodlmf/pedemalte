<template>
    <q-layout view="hHr LpR lFf">
        <q-page-container>
            <q-page>
                <div class="column flex flex-center">
                    <q-img
                        src="img/logo-pedemalte.png"
                        :ratio="16/9"
                        width="80%"
                        class="q-mt-lg"

                        contain
                        spinner-color="primary"
                        spinner-size="82px">
                    </q-img>

                    <div class="column text-center bg-transparent">
                        <span class="text-h5 text-bold">Bem vindo de volta</span>
                        <span class="text-subtitle1 text-grey">Entre na sua conta do Pede Malte</span>
                    </div>
                </div>

                <div class="column q-pa-md">
                    <q-input
                        class="q-my-sm"
                        outlined rounded v-model="usuario" type="text" label="email">
                        <template v-slot:prepend>
                            <q-icon class="q-pa-sm" name="person" />
                        </template>    
                    </q-input>

                    <q-input
                        :loading="loading"
                        class="q-my-sm"
                        outlined rounded v-model="senha" type="password" label="senha">
                        <template v-slot:prepend>
                            <q-icon class="q-pa-sm" name="lock" />
                        </template> 

                        <template v-slot:append>
                            <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                            />
                        </template>
                    </q-input>

                    <q-btn
                        class="self-end"
                        flat
                        rounded
                        unelevated
                        color="" no-caps label="Esqueceu a senha?" />

                    <q-btn
                        @click="login()"
                        class="q-mx-xl q-my-lg q-py-xs shadow-4"
                        size="lg"
                        rounded
                        unelevated
                        color="primary" no-caps label="Acessar" />

                    <span class="q-mt-md text-center text-subtitle1 text-grey-6">
                        Ou conecte usando
                    </span>

                    <div class="row justify-center q-my-md">
                        <q-btn
                            class="q-mx-sm"
                            color="blue" 
                            no-caps
                            unelevated
                            icon="img:img/icons/facebook.svg" label="Facebook" />

                        <q-btn
                            class="q-mx-sm q-py-xs q-px-sm" 
                            no-caps
                            color="red" 
                            unelevated
                            icon="img:img/icons/google.svg" label="Google"/>
                    </div>
                </div>
                
                <div class="q-my-md text-center">
                    <q-btn
                        @click="$router.push('/tela-cadastro')"
                        class="q-px-xs"
                        rounded
                        flat no-caps size="lg" color=""
                        label="Não possui uma conta?" />
                </div>


                <q-dialog v-model="mostraDialog">
                    <q-card>
                        <q-card-section>
                        <div class="text-h6">Erro</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                        {{erro}}
                        </q-card-section>

                        <q-card-actions align="right">
                            <q-btn flat label="OK" color="primary" v-close-popup />
                        </q-card-actions>
                    </q-card>
                </q-dialog>
                
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import * as serviceLogin from './../service/ServiceUsuario.js'   
    
    export default {
    // name: 'PageName',

        data() {
            return {
                loading: false,
                isPwd: false,
                mostraDialog: false,
                erro: '',
                usuario: '',
                senha: ''
            }
        },

        methods: {
            ...mapActions('usuario', ['getPerfilFromServer']),
            
            login: async function() {
                try {
                    this.loading = !this.loading
                    await serviceLogin.login(this.usuario, this.senha)
                    await this.getPerfilFromServer()
                    this.$router.push('/')
                } catch(e) {
                    this.erro = e
                    this.mostraDialog = true
                } finally {
                    this.loading = !this.loading
                    //this.$q.loading.hide();
                }                
            }
        }
    }
</script>
