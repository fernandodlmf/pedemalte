<template>
    <q-toolbar
        class="row q-py-sm text-black">        
        <q-btn
            @click="back()"
            color="primary"
            size="lg"
            class="q-pa-xs"
            round dense flat icon="arrow_back" />  
        
        <div class="column q-mx-xs justify-center">
            <span class="text-h5 text-capitalize text-bold q-py-none">{{titulo | formataCapitaliza}}</span>           
        </div>                                                
    </q-toolbar>
</template>

<script>
export default {
    props: {
        titulo: {
            type: String,
            default: "título"
        }
    },

    methods: {
        back() {
            if (this.titulo === 'Meus Pedidos')
                this.$router.push('/')
            else 
                this.$router.go(-1)
        }
    }
}
</script>

<style>

</style>