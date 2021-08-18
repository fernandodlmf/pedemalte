<template>
    <q-btn-dropdown
        flat
        class="q-px-xs"
        no-caps>

        <template v-slot:label>    
            <q-icon color="text-black" name="location_on" />            
            <q-item-section>
                <q-item-label caption>Localização atual</q-item-label>
                <q-item-label class="text-bold">{{getLocalizacaoAtual}}</q-item-label>
            </q-item-section>
        </template>
        
        <q-list>            
            <q-item
                v-for="endereco in listaEnderecos"
                :key="endereco.id"
                clickable
                v-close-popup 
                @click="onItemClick(endereco)">
                    <q-item-section>
                    <q-item-label>{{endereco.get('endereco')}}</q-item-label>
                    </q-item-section>
            </q-item>            
        </q-list>
    </q-btn-dropdown>

    <!-- <q-item
        class="q-py-md">
        
    </q-item> -->
</template>

<script>
    import {mapState} from 'vuex'
    import {printCurrentPosition, getEnderecoPorCoordenada} from './../service/ServiceLocation.js'
    export default {

        created() {
            this.getLocal()
        },

        data() {
            return {
                enderecoLocalizacaoAtual: undefined
            }
        },

        computed: {
            ...mapState('usuario', ['listaEnderecos']),
            
            getLocalizacaoAtual() {
                console.log(this.listaEnderecos)
                let endereco = "Obtendo localizacao atual..."
                try {
                    endereco = this.enderecoLocalizacaoAtual.endereco
                } catch (e) {
                    if (this.listaEnderecos.length && this.enderecoLocalizacaoAtual === null)
                        endereco = this.listaEnderecos[0].get('endereco')                        
                }
                return endereco
            }
        },

        methods: {
            getLocal: async function () {
                const _listaEnderecosProximos = await getEnderecoPorCoordenada()                
                this.enderecoLocalizacaoAtual = _listaEnderecosProximos ? _listaEnderecosProximos[0] : null
                console.log(this.enderecoLocalizacaoAtual)
            },

            onItemClick: function(endereco) {
                this.enderecoLocalizacaoAtual = endereco.toJSON();
            }
        }
    }
</script>

<style>

</style>