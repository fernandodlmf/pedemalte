<template>
    <div class="row">
        <div
            style="border-radius: 0px 40px 40px 0px"
            class="q-my-md q-py-xs q-pr-lg q-px-xs row items-center bg-white text-black bg-primary">
            <q-btn
                @click="$router.go(-1)"
                size="lg"
                flat round icon="arrow_back" />

            <div class="col-auto column q-pa-xs" >
                <div class="text-h5 text-bold">{{titulo | formataCapitaliza}}</div>
                <div v-if="subtitulo" class="text-subtitle2 text-bold text-grey">{{subtitulo | formataCapitaliza}}</div>
            </div>
        </div> 
    </div>
                     
</template>

<script>
    export default {
        props: {
            titulo: {
                type: String,
                default: "título"
            },
            subtitulo: {
                type: String,
                default: ""
            }
        }
    }
</script>

<style>

</style>