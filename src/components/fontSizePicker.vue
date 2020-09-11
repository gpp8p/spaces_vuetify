<template>
    <span class="sizePicker">
                <v-select @change="sizeSelected"
                          :items="items"
                          label="Select Font Size:"
                          dense
                ></v-select>
    </span>
</template>

<script>
    export default {
        name: "fontSizePicker",
        data(){
            return {
                selectedSize:'',
                items: ['10pt', '12pt', '18pt', '24pt', '36pt', '48pt', '72pt']
            }
        },
        methods:{
            sizeSelected(msg){
                this.selectedSize = msg;
                this.$emit('selectedValue', ['fontSize', this.selectedSize]);
            }
        }
    }
</script>

<style scoped>
    .sizePicker {
        display:grid;
        grid-template-rows: 100%;
        grid-template-columns: 80%;
    }

</style>
