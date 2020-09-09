<template>
<span class="roundPickerWrapper">
            <v-checkbox
                    v-model="round"
                    :label="roundLabel"
                    @change="roundClicked"
            ></v-checkbox>

</span>
</template>

<script>
    export default {
        name: "roundCornerPicker",
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
                roundLabel: "Round Corners ?",
                round: false
            }
        },
        methods:{
            roundClicked(){
                this.$emit('selectedValue', [this.pType, this.round]);
            }
        }
    }
</script>

<style scoped>
    .roundPickerWrapper{
        display:grid;
        grid-template-rows: 100%;
        grid-template-columns: 30%;
    }
</style>
