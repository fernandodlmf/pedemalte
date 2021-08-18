<template>
    <q-layout view="hHr LpR lFf">
        <q-page-container>
            <q-page >
                <tela-categoria-detalhe-toolbar titulo=""/>
                
                <div v-if="step === 0" class="q-px-md column text-center items-center">
                    <span class="text-h5 text-bold">Vamos começar!</span>
                    <span class="text-grey text-subtitle1">Crie sua conta no Pede Malte</span>
                </div>

                <div v-else class="q-px-md column text-center items-center">
                    <span class="text-h5 text-bold">{{header[step].titulo}}</span>
                    <span class="text-grey text-subtitle1">{{header[step].caption}}</span>
                </div>
                
                <q-form
                    ref="myForm"
                    class="q-px-md q-mt-md">

                    <div v-if="step === 0">
                        <span class="text-h6 text-bold">{{header[step].titulo}}</span>
                        <div class="text-caption text-grey">{{header[step].caption}}</div>
                    </div>
                    
                    <q-field
                        ref="telefone"
                        class="q-mx-sm q-mt-sm"
                        borderless
                        no-error-icon
                        :value="cadastro.telefone"
                        hide-botom-space
                        lazy-rules
                        v-if="step === CAMPO_TELEFONE"
                        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']">

                        <q-input 
                            :loading="loading"
                            class="q-my-sm full-width"
                            rounded 
                            outlined  
                            bg-color="grey-3"                     
                            color="grey"
                            mask="(##) # ####-####"
                            v-model="cadastro.telefone" type="tel" placeholder="DDD + seu número">
                                <template v-slot:prepend>
                                    <q-icon class="q-px-sm" name="phone" color="black" />
                                    <q-separator spaced vertical />
                                </template>

                                <template v-slot:append>
                                    <q-btn 
                                        @click="nextStep()" round flat color="red" icon="arrow_forward" />
                                </template>
                        </q-input>
                    </q-field> 
                   

                    <q-form ref="formCodigo" v-if="step === CAMPO_CODIGO" class="row">
                        <q-input
                            maxlength="1" 
                            placeholder="0"
                            v-on:keydown="clean($event.target)"
                            v-on:keyup="nextFocus($event)"
                            class="col q-mx-md" v-model="a" type="number"
                            no-error-icon
                            :rules="[ val => val && val.length > 0]" />
                        <q-input
                            maxlength="1" 
                            placeholder="0"
                            v-on:keyup="nextFocus($event)"
                            v-on:keydown="clean($event.target)"
                            class="col q-mx-md" v-model="b" type="number" 
                            no-error-icon
                            :rules="[ val => val && val.length > 0]" />
                        <q-input
                            maxlength="1" 
                            placeholder="0"
                            v-on:keyup="nextFocus($event)"
                            v-on:keydown="clean($event.target)"
                            no-error-icon
                            class="col q-mx-md" v-model="c" type="number"
                            :rules="[ val => val && val.length > 0]" />
                        <q-input
                            maxlength="1" 
                            placeholder="0"
                            v-on:keyup="nextFocus($event)"
                            v-on:keydown="clean($event.target)"
                            no-error-icon
                            class="col q-mx-md" v-model="d" type="number"
                            :rules="[ val => val && val.length > 0]" />
                        <q-input
                            maxlength="1" 
                            placeholder="0"
                            v-on:keyup="nextFocus($event)"
                            v-on:keydown="clean($event.target)"
                            no-error-icon
                            class="col q-mx-md" v-model="e" type="number"
                            :rules="[ val => val && val.length > 0]" />
                        <q-input
                            maxlength="1" 
                            placeholder="0"
                            v-on:keydown="clean($event.target)"
                            v-on:keyup="nextStep()"
                            no-error-icon
                            class="col q-mx-md" v-model="f" type="number"
                            :rules="[ val => val && val.length > 0]" />
                    </q-form>

                    <div v-if="step === CAMPOS_RESTANTES">
                        <q-field
                            class="q-mt-sm"
                            no-error-icon
                            borderless
                            :value="cadastro.nome"
                            hide-botom-space
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Campo obrigatório']">

                            <q-input 
                                class="full-width"
                                rounded outlined  bg-color="grey-3" color="grey-4"
                                v-model="cadastro.nome" type="text" placeholder="Seu nome">
                                <template v-slot:prepend>
                                    <q-icon class="q-px-sm" name="person" color="black" />
                                    <q-separator spaced vertical />
                                </template>                                
                            </q-input>    
                        </q-field> 
                        
                        <q-field
                            class="q-my-xs"
                            no-error-icon
                            borderless
                            :value="cadastro.email"
                            hide-botom-space
                            lazy-rules                            
                            :rules="[ val => val && val.length > 0 || 'Campo obrigatório']">

                                <q-input 
                                    class="full-width"
                                    rounded outlined  bg-color="grey-3" color="grey-4"
                                    v-model="cadastro.email" type="email" placeholder="Digite seu email">
                                    <template v-slot:prepend>
                                        <q-icon class="q-px-sm" name="email" color="black" />
                                        <q-separator spaced vertical />
                                    </template>

                                    <!-- <template v-slot:append>
                                        <q-btn 
                                            @click="nextStep()" round flat color="red" icon="arrow_forward" />
                                    </template> -->
                                </q-input>
                        </q-field>

                        <q-field
                            class="q-my-xs"
                            no-error-icon
                            borderless
                            :value="cadastro.senha"
                            hide-botom-space
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Campo obrigatório']">

                             <q-input 
                                class="full-width"
                                rounded outlined  bg-color="grey-3" color="grey-4"
                                v-model="cadastro.senha" type="password" placeholder="Senha">
                                <template v-slot:prepend>
                                    <q-icon class="q-px-sm" name="lock" color="black"/>
                                    <q-separator spaced vertical />
                                </template>
                            </q-input>                                    
                        </q-field> 

                        <q-field
                            class="q-my-xs"
                            no-error-icon
                            borderless
                            :value="cadastro.confirmacaoSenha"
                            hide-botom-space
                            lazy-rules
                            :rules="[val => val != cadastro.senha] || 'Senhas divergentes'">

                            <q-input 
                                :loading="loading"                                
                                class="full-width"
                                rounded outlined
                                bg-color="grey-3"
                                color="grey-4"
                                v-model="cadastro.confirmacaoSenha" type="password" placeholder="Confirmar senha">
                                <template v-slot:prepend>
                                    <q-icon class="q-px-sm" name="lock" color="black"/>
                                    <q-separator spaced vertical />
                                </template>

                                <template v-slot:append>
                                    <q-btn 
                                        @click="nextStep()" round flat color="red" icon="arrow_forward" />
                                </template>
                            </q-input>
                        </q-field>
                        
                    </div>
                                
                    <div v-if="step === CAMPO_GENERO"  class="row justify-around q-my-sm" >
                        <q-btn
                            v-for="(titulo, index) in ['Masculino', 'Feminino', 'Outro']" :key="titulo"
                            outline no-caps rounded color="primary" :label="titulo" @click="nextStep(index + 1)" />
                    </div>
                    
                </q-form>               
            </q-page>
        </q-page-container>
              
    </q-layout>
</template>

<script>
    import TelaCategoriaDetalheToolbar from 'src/components/TelaCategoriaDetalheToolbar.vue'
    import * as serviceAutenticacao from './../service/ServiceAutenticacao.js'
    import * as serviceValidacao from './../service/ServiceValidacao.js'
    import * as serviceLogin from './../service/ServiceUsuario.js'
    import { mapActions, mapState } from 'vuex'
    export default {
        // name: 'PageName',
        components: { 
            TelaCategoriaDetalheToolbar 
        },
        created () {
            this.CAMPO_TELEFONE = 0
            this.CAMPO_CODIGO = 1
            this.CAMPOS_RESTANTES = 2
            this.CAMPO_GENERO = 5
        },

        data () {
            return {
                text: '',
                loading: false,
                header: [
                    {
                        titulo: "Digite o seu celular",
                        caption: "Enviaremos um código via SMS para este número para validação",
                    },
                    {
                        titulo: "Digite o código enviado",
                        caption: "Enviamos um código via SMS para este numero para validação",
                    },
                    {
                        titulo: "Quase lá...",
                        caption: "Falta pouquinho",
                    },
                    {
                        titulo: "Digite uma senha",
                        caption: "Xiu! não divulgue a ninguém",
                    },
                    {
                        titulo: "Como devemos te chamar?",
                        caption: "",
                    },
                    {
                        titulo: "Qual o seu gênero?",
                        caption: "",
                    },
                    
                ],

                step: 0,
                a: '',
                b: '',
                c: '',
                d: '',
                e: '',
                f: '',
                cadastro: {
                    nome: "",
                    email: "",
                    telefone: "",
                    senha: "",
                    codigoSMS: "",
                    idSMS: "",
                    confirmacaoSenha: "",
                    genero: "",
                }
            }
        },

        methods: {
            ...mapActions('usuario', ['getPerfilFromServer']),
            nextFocus: function (event) {
                if (event.keyCode === 8)
                    return
                let elem = event.target
                const currentIndex = Array.from(elem.form.elements).indexOf(elem);
                elem.form.elements.item(
                    currentIndex < elem.form.elements.length - 1 ?
                    currentIndex + 1 :
                    0
                ).focus()
            },

            clean: function(target) {
                if (!target)
                    return
                target.value = ""
            },

            async validaTelefone() {
                if (!await this.$refs.telefone.validate())
                    return false
                else if (await serviceValidacao.hasPhone(this.cadastro.telefone))
                    throw "Telefone já existe"
                
                this.cadastro.idSMS =  await serviceAutenticacao.sendSMSVerificacao(this.cadastro.telefone)
                console.log('id SMS: ' + this.cadastro.idSMS)
                
                if (this.cadastro.idSMS)                     
                    return true
            },

            async validaSMS() {
                if (await this.$refs.formCodigo.validate()) {
                    this.cadastro.codigoSMS = this.a + this.b + this.c + this.d + this.e + this.f 
                    if (!this.cadastro.telefone)
                        throw "Telefone inválido"
                    else if (!this.cadastro.codigoSMS)
                        throw "Código de SMS inválido"                
                    if(await serviceAutenticacao.validaTokenSMS(this.cadastro.idSMS, this.cadastro.codigoSMS))
                        return true
                }                   
            },

            validaSenhas() {
                if (this.cadastro.senha !== this.cadastro.confirmacaoSenha)
                    throw "Senhas não conferem"
                return true
            },

            nextStep: async function (val) {
                try {
                    console.log(this.step)
                    this.loading = !this.loading
                    switch (this.step) {
                        case this.CAMPO_TELEFONE:
                            if (await this.validaTelefone())
                                this.step++        
                            break
                        case this.CAMPO_CODIGO: 
                            if (await this.validaSMS())
                                this.step++
                            break
                        case this.CAMPOS_RESTANTES: 
                            this.validaSenhas()
                            await serviceValidacao.hasEmail(this.cadastro.email)      
                            await serviceLogin.salvar(this.cadastro)                                                               
                            await serviceLogin.login(this.cadastro.email, this.cadastro.senha)
                            await this.getPerfilFromServer()
                            this.$router.push('/')                      
                            break
                        case this.CAMPO_GENERO: // Senha
                            this.cadastro.genero = val
                            console.log(this.cadastro)
                            await serviceLogin.salvar(this.cadastro)
                            //this.$router.push('/')
                            break
                        default:
                    }
                } catch (e) {
                    console.error(e)
                } finally {
                    this.loading = !this.loading
                }
                
            },
        }
    }
</script>
