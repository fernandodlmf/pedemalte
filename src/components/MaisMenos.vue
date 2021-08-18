<template>
    <div 
        class="row justify-center q-pa-xs">
        <q-card style="border-radius: 16px" :class="getClass">
            <q-btn 
                flat 
                @click="incrementa()"
                round 
                dense
                class="text-black" 
                icon="add"
            />
                
            <div
                class="row justify-center items-center q-py-xs q-px-md rounded-borders">
                <span class="text-bold">{{getQtdAtualizada}}</span>
            </div>

            <q-btn 
                flat 
                @click="decrementa()"
                round 
                color="white" 
                icon="remove" 
                class="text-black"
            />

        </q-card>        
    </div>
</template>

<script>
export default {
    name: 'botao-mais-menos',
    props: {
        qtdProduto: {
            type: Number,
            default: 1
        },

        direcaoVertical: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            total: '0,00',
        }
    },

    computed: {
        getQtdAtualizada: function () {
            console.log('qtd no computed: ' + this.qtdProduto)
            return this.qtdProduto
        },

        getClass: function () {
            if (this.direcaoVertical)
                return "my-card q-py-xs shadow-5 colum bg-yellow text-center"
            else
                return "my-card q-px-xs shadow-5 row bg-yellow"
        }
    },

    methods: {        
        incrementa: function() { 
            this.$emit('handle-quantidade-click', this.qtdProduto + 1)
        },

        decrementa: function() {
            if (this.qtdProduto > 1) {
                this.$emit('handle-quantidade-click', this.qtdProduto - 1)
            }
        }
    }

}
</script>

<style>

</style>