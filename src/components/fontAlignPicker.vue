<template>
    <span class="alignPicker">
                <v-select @change="alignSelected"
                          :items="items"
                          label="Select Alignment:"
                          dense
                ></v-select>
    </span>
</template>

<script>
    export default {
        name: "fontAlignPicker",
        data(){
            return {
                selectedAlign:'',
                items: ['left', 'center', 'right']
            }
        },
        methods:{
            alignSelected(msg){
                this.selectedAlign = msg;
                this.$emit('selectedValue', ['fontSize', this.selectedAlign]);
            }
        }
    }
</script>

<style scoped>
    .alignPicker {
        display:grid;
        grid-template-rows: 100%;
        grid-template-columns: 80%;
    }

</style>
