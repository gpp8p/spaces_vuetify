<template>
    <span class="sizePicker">
                <v-select @change="sizeSelected"
                          :items="items"
                          label="Select Font Size:"
                          :value="selectedSize"
                          dense
                ></v-select>
    </span>
</template>

<script>
    export default {
        name: "fontSizePicker",
        mounted(){
            if(typeof(this.currentValues.fontSize)!='undefined'){
                this.selectedSize=this.currentValues.fontSize;
            }
        },
        props :{
            currentValues:{
                type: Object,
                required: false
            }
        },
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
