<template>
    <q-dialog ref="dialog">
        <q-card 
            class="q-dialog-plugin q-py-md">
            <q-list class="q-my-sm">
                <q-item
                    @click="onOKClick(item)"
                    v-for="item in getLista"
                    :key="item.objectId"
                    class="q-py-md" clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon color="text-black" name="credit_card" />
                        </q-item-section>
                    
                        <q-item-section>             
                            <q-item-label class="text-h6 tex-bold">
                                {{getTitulo(item)}}
                            </q-item-label>                            
                            <q-item-label class="text-subtitle2 text-grey">{{getCaption(item)}}</q-item-label>
                        </q-item-section>

                        <q-item-section side>
                            <q-icon icon="keyboard_arrow_right" name="keyboard_arrow_right" />
                        </q-item-section>
                        </q-item>
                </q-list>
        </q-card>
    </q-dialog>
</template>

<script>
    export default {
        props: {
            lista: {
                type: Array,
                default: () => []
            }
        },

        computed: {
            getLista() {
                return this.lista
            }
        },

        methods: {
            getTitulo: function(item) {
                console.log('titulo: ' + item.titulo)
                return item.titulo ? item.titulo : "Titulo Padrao"
            },

            getCaption: function(item) {
                console.log('caption: ' +item.caption)
                return item.caption ? item.caption : "Caption Padrao"
            },

            show () {
                this.$refs.dialog.show()
            },

            hide () {
                this.$refs.dialog.hide()
            },

            onOKClick (value) {
                // on OK, it is REQUIRED to
                // emit "ok" event (with optional payload)
                // before hiding the QDialog
                this.$emit('ok', value)
                // or with payload: this.$emit('ok', { ... })

                // then hiding dialog
                this.hide()
            },
        }
    }
</script>

<style>

</style>