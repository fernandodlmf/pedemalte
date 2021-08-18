<template>
    <q-toolbar  
        class="row bg-white text-black bg-primary">        
        <q-btn
            color="primary"
            size="lg"
            @click="$router.go(-1)"
            round dense flat icon="arrow_back" />                                              
        <span class="text-h6">{{titulo}}</span>           
    </q-toolbar>
</template>

<script>
export default {
    props: {
        titulo: {
            type: String,
            default: "título"
        }
    }

}
</script>

<style>

</style>