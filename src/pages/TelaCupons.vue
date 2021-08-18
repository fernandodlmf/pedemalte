<template>
    <q-layout view="hHr LpR lFf">
        <q-page-container>
            <q-page >
                <tela-categoria-detalhe-toolbar titulo="Meus Cupons"/>
            </q-page>
        </q-page-container>
              
    </q-layout>
</template>

<script>
    import TelaCategoriaDetalheToolbar from 'src/components/TelaCategoriaDetalheToolbar.vue'

    export default {
        // name: 'PageName',
        components: { 
            TelaCategoriaDetalheToolbar,
        },
    }
</script>
