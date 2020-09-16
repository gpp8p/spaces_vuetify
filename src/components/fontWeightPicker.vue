<template>
    <span class="weightPicker">
                <v-select @change="weightSelected"
                          :items="items"
                          label="Select Font Weight:"
                          :value="selectedWeight"
                          dense
                ></v-select>
    </span>
</template>

<script>
    export default {
        name: "fontWeightPicker",
        mounted(){
            if(typeof(this.currentValues.fontWeight)!='undefined'){
                this.selectedWeight=this.currentValues.fontWeight;
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
                selectedWeight:'',
                items: ['normal', 'bold', 'bolder', 'lighter']
            }
        },
        methods:{
            weightSelected(msg){
                this.selectedWeight = msg;
                this.$emit('selectedValue', ['fontWeight', this.selectedWeight]);
            }
        }
    }
</script>

<style scoped>
    .weightPicker {
        display:grid;
        grid-template-rows: 100%;
        grid-template-columns: 80%;
    }

</style>
