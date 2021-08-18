<template>
    <div class="row q-pa-sm">
        <q-btn
            @click="manipulaDrawer"
            class="q-pa-sm col-auto"
            flat round dense icon="img:img/icons/drawer_open.svg" />

        <secao-localizacao class="col"/>

        <q-avatar
            v-ripple
            @click="$router.push('/tela-perfil')"
            class="q-my-sm col-auto" rounded size="62px">
            <img :src="getPerfilFoto">
        </q-avatar>
    </div>  
</template>

<script>
    import SecaoLocalizacao from './SecaoLocalizacao.vue'
    export default {
        components: { 
            SecaoLocalizacao 
        },

        props: {
            perfil: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                drawerAberto: false
            }
        },

        computed: {
            getNomeUsuario: function() {
                let nome = "Usuário"
                if (this.perfil && this.perfil.nome)
                    nome = this.perfil.nome.split(' ')[0]
                    
                return nome
            },

            getPerfilFoto: function() {
                let urlImg = 'https://cdn.quasar.dev/img/boy-avatar.png'
                if (this.perfil && this.perfil.imagem)
                    urlImg = this.perfil.imagem.url
                return urlImg
            }
        },

        methods: {
            manipulaDrawer: function () {
                this.$emit('manipula-drawer')
            }
        }

    }
</script>

<style>

</style>