<template>
    <q-toolbar
        
        class="row q-py-sm text-black">        
        <!-- style="border-bottom: solid 3px yellow" -->
        <q-btn
            color="primary"
            size="lg"
            @click="$router.go(-1)"
            round dense flat icon="arrow_back" />  
        
        <div class="column q-mx-xs q-py-xs">
            <span class="text-h6">Seu</span>
            <span class="text-h5 text-bold">Carrinho</span>           
        </div>
          
        <q-separator class="absolute-bottom" spaced color="primary"  />                                    
    </q-toolbar>
</template>

<script>
export default {
    

}
</script>

<style>

</style>