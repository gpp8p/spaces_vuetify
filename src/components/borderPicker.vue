<template>
    <span class="borderPickerWrapper">
            <v-checkbox
                    v-model="checkbox"
                    :label="borderLabel"
            ></v-checkbox>
            <v-select v-if="checkbox"
                        :items="items"
                        label="Size ?"
                        :value="borderValue"
                        @change="valueSelected"
            ></v-select>
    </span>
</template>

<script>
    export default {
        name: "borderPicker",
        data(){
            return{
                borderLabel: "Border ?",
                checkbox:false,
                items: ['thin','medium','thick'],
                borderValue:'',
                borderSelected:false
            }
        },
        methods:{
            valueSelected(msg){
                console.log('Border value selected:', msg);
                this.$emit('selectedValue', ['border', true]);
                this.$emit('selectedValue', ['borderSize', msg]);
            },
        },
        watch:{
            checkbox: function(){
//                debugger;
                if(!this.checkbox){
                    console.log('checkbox changed', this.checkbox);
                    this.$emit('selectedValue', ['border', false]);
                    this.$emit('selectedValue', ['borderSize', '']);

                }
            }
        }
    }
</script>

<style scoped>
    .borderPickerWrapper{
        display:grid;
        grid-template-rows: 100%;
        grid-template-columns: 30% 50%;
    }

</style>
