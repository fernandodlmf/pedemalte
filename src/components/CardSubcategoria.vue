<template>
    <q-btn
        class="q-pa-sm q-ma-xs text-bold bg-white"
        flat no-caps size="md" rounded  @click="onClick">
        {{titulo}}
    </q-btn>
</template>

<script>
export default {
    props: {
        titulo: {
            type: String,
            default: "Titulo"
        }
    }
}
</script>

<style>

</style>