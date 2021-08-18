<template>
    <q-card
        @click="adicionaESalvaEndereco()"
        style="border-radius: 30px"
        class="q-ma-md q-py-sm my-card shadow-4">
        <q-item>
            <q-item-section avatar>
                <q-icon  name="location_on" color="pink" />
            </q-item-section>
            
            <q-item-section class="text-subtitle2">
                <q-item-label>{{getEndereco.endereco + ', ' + getEndereco.numero + ', ' + getEndereco.complemento | formataCapitaliza}}</q-item-label>
                <q-item-label>{{getEndereco.bairro | formataCapitaliza}}</q-item-label>
                <q-item-label>{{getEndereco.cidade + ' - ' + getEndereco.estado}}</q-item-label>
                <q-item-label>{{getEndereco.cep}}</q-item-label>
            </q-item-section>
            
            <q-item-section v-if="!isNovoEndereco" side center>            
                <q-btn
                    v-if="!isEnderecoPadrao && !isNovoEndereco"
                    @click="defineEnderecoPadrao()"
                    unelevated round flat
                    size="md"
                    color="pink" icon="done"  />
                
                <q-btn
                    @click="$router.push({name: 'tela-endereco-adicionar', params: {endereco: getEndereco}})"
                    unelevated round flat
                    size="md"
                    color="pink" icon="edit" />
            </q-item-section>
        </q-item>

    </q-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        props: {
            endereco: {
                type: Object,
                required: true
            }
        },

        computed: {
            ...mapGetters('usuario', ['getEnderecoSelecionado']),

            getEndereco: function() {
                // TODO: VALIDAR SE ESSE ENDERECO É VALIDO ANTES DE CONVERTER
                let endereco
                try {
                    endereco = this.endereco.toJSON()
                } catch (error) {
                    endereco = this.endereco
                }

                //console.log(endereco)
                return endereco
            },

            isNovoEndereco() {
                return !this.getEndereco.objectId ? true : false
            },

            isEnderecoPadrao() {
                let endereco = this.getEnderecoSelecionado
                return (endereco && endereco.id === this.getEndereco.objectId) ? true : false
            },
        },

        methods: {
            ...mapActions('usuario', ['updateSelectedAddress']),

            adicionaESalvaEndereco: function() {                    
                if (this.isNovoEndereco)
                    this.$router.push({name: 'tela-endereco-adicionar', params: {endereco: this.getEndereco}})
            },
            
            defineEnderecoPadrao: function() {
                this.updateSelectedAddress(this.getEndereco.objectId)
                this.$emit('renderiza')
            },
        }
    }
</script>

<style>

</style>