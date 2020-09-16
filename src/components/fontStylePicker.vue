<template>
    <span class="stylePicker">
                <v-select @change="styleSelected"
                          :items="items"
                          label="Select Font Style:"
                          :value="selectedStyle"
                          dense
                ></v-select>
    </span>
</template>

<script>
    export default {
        name: "fontStylePicker",
        mounted(){
            if(typeof(this.currentValues.fontStyle)!='undefined'){
                this.selectedStyle=this.currentValues.fontStyle;
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
                selectedStyle:'',
                items: ['normal', 'italic', 'oblique']
            }
        },
        methods:{
            styleSelected(msg){
                this.selectedStyle = msg;
                this.$emit('selectedValue', ['fontSize', this.selectedStyle]);
            }
        }
    }
</script>

<style scoped>
    .stylePicker {
        display:grid;
        grid-template-rows: 100%;
        grid-template-columns: 80%;
    }

</style>
