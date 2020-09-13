<template>
<span class="shadowPickerWrapper">
            <v-checkbox
                    v-model="shadow"
                    :label="shadowLabel"
                    @change="shadowClicked"
            ></v-checkbox>

</span>
</template>

<script>
    export default {
        name: "shadowPicker",
        props:{
            pType:{
                type: String,
                required: true
            },
            currentValues: {
                type: Object,
                required: true
            },
        },
        data(){
            return {
                shadowLabel: "Shadow ?",
                shadow: false
            }
        },
        mounted(){
            if(this.currentValues.shadow=='checked'){
                this.shadow=true;
            }
        },
        methods:{
            shadowClicked(){
                this.$emit('selectedValue', [this.pType, this.shadow]);
            }
        }
    }
</script>

<style scoped>
    .shadowPickerWrapper{
        display:grid;
        grid-template-rows: 100%;
        grid-template-columns: 30%;
    }
</style>
