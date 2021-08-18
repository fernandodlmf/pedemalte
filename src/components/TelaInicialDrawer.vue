<template>
    <q-drawer
        v-model="drawerEstado"
        persistent
        @hide="manipulaDrawer"
        show-if-above
        :width="350"
        :breakpoint="500">
        <div
            style="height: 190px"
            class="absolute-top row items-center justify-center q-px-sm bg-transparent">
                <div class="column items-center q-pa-md">
                    <q-avatar size="120px">
                         <img :src="getPerfilFoto">
                    </q-avatar>
                    <q-btn
                        @click="$router.push('/tela-perfil')"
                        style="top: -15px" icon="person" label="Perfil"
                        unelevated size="md" no-caps rounded color="primary" />
                </div>

                <div class="column col">
                    <span class="text-h5">Olá,</span>
                    <div class="text-h5 text-bold text-capitalize">{{getUserName}}</div>
                    <span class="text-subtitle text-grey-5">Se beber não dirija</span>
                </div>

            <q-separator class="col absolute-bottom" spaced />
        </div>

        <q-scroll-area
            style="height: calc(100% - 190px); margin-top: 190px; border-right: 1px solid #ddd">
            <q-list padding class="q-px-md text-bold">
                <q-item
                    :to="'/'"
                    clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="img:img/icons/home.svg" />
                    </q-item-section>

                    <q-item-section>
                        Início
                    </q-item-section>
                </q-item>

                <q-item
                    :to="'/tela-pedidos'"
                    clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="img:img/icons/sacolas-de-compras.svg" />
                    </q-item-section>

                    <q-item-section class>
                        Meus Pedidos
                    </q-item-section>
                </q-item>

                <q-item
                    :to="'/tela-enderecos'"
                    clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="img:img/icons/localizacao.svg" />
                    </q-item-section>

                    <q-item-section>
                        Endereços
                    </q-item-section>
                </q-item>

                <q-item
                    :to="'/tela-favoritos'"
                    clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="img:img/icons/favorite.svg" />
                    </q-item-section>

                    <q-item-section>
                        Favoritos
                    </q-item-section>
                </q-item>

                <q-item
                    :to="'/tela-ajuda'"
                    clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="img:img/icons/ajuda.svg" />
                    </q-item-section>

                    <q-item-section>
                        Ajuda
                    </q-item-section>
                </q-item>

            </q-list>


            <q-btn
                @click="logout()"
                style="top: 50px; border-radius: 0px 30px 30px 0px"
                class="q-px-md q-mx-lg shadow-5"
                rounded unelevated no-caps size="lg" color="primary"
                :icon="!perfil ? 'logout' : 'login'" :label="perfil ? 'Sair da conta' : 'Entrar'" />
        </q-scroll-area>

    </q-drawer>

</template>

<script>
    import * as serviceLogin from './../service/ServiceUsuario.js'
    import {mapState, mapActions} from 'vuex'
    export default {
        props: {
            drawerEstado: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            ...mapActions('usuario', ['logOut']),
            async logout() {
                await this.logOut()
                this.$router.push('/tela-login')
            },

            manipulaDrawer: function () {
                this.$emit('manipula-drawer')
            }
        }, 

        computed: {
            ...mapState('usuario', ['perfil']), 
            getUserName: function() {
                let nome = "Usuário"
                if (this.perfil && this.perfil.nome)
                    nome = this.perfil.nome.split(' ')[0]
                    
                return nome
            },

            getPerfilFoto: function() {
                let urlImg = 'https://cdn.quasar.dev/img/boy-avatar.png'
                console.log('imagem')
                console.log(this.perfil)
                
                
                
                if (this.perfil && this.perfil.imagem)
                    urlImg = this.perfil.imagem.url
                return urlImg
            },

            drawerEstadoLocal: {
                get: function () {
                    return this.drawerEstado
                },

                set: function(value) {
                    this.$emit('manipula-drawer', value)
                }
            }
        }
    }
</script>

<style>

</style>