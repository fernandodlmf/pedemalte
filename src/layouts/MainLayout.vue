<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <router-view />
        </q-page-container>
        <tela-incial-menu-footer/>
    </q-layout>
</template>

<script>
    import TelaIncialMenuFooter from 'src/components/TelaIncialMenuFooter.vue'
    export default {
        name: 'MainLayout',
        components: {

            TelaIncialMenuFooter,
               
                  
        },
    }
</script>

<style>
    @import '../css/marcadores.css';
</style>
