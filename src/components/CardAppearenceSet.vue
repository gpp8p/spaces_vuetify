<template>
    <span class="cardAppearenceWrapper">
        <span class="backgroundPick">
            <background-picker :currentValues="currentValues" :pType="backgroundColorType" @selectedValue="selectedValue"></background-picker>
        </span>
        <span class="borderPick">
            <border-picker :currentValues="currentValues" :pType="borderColorType" @selectedValue="selectedValue"></border-picker>
        </span>
        <span class="shadowPick">
            <shadow-picker :currentValues="currentValues" :pType="shadowType" @selectedValue="selectedValue"></shadow-picker>
        </span>
        <span class="roundCornerPick">
            <round-corner-picker :currentValues="currentValues" :pType="roundType" @selectedValue="selectedValue"></round-corner-picker>
        </span>

    </span>
</template>

<script>
    import backgroundPicker from "../components/backgroundPicker.vue";
    import borderPicker from "../components/borderPicker.vue";
    import shadowPicker from "../components/shadowPicker.vue"
    import roundCornerPicker from "../components/roundCornerPicker.vue"
    export default {
        name: "CardAppearenceSet",
        components: {backgroundPicker, borderPicker, shadowPicker, roundCornerPicker},
        props :{
            currentValues:{
                type: Object,
                required: false
            }
        },
        data(){
          return {
              backgroundColorType: "backgroundColor",
              borderColorType: "borderColor",
              shadowType: "shadow",
              roundType: "roundIncluded"
          }
        },
        methods:{
            selectedValue(msg){
//                debugger;
                this.$emit('selectedValue', msg);
            }
        }
    }
</script>

<style scoped>
.cardAppearenceWrapper {
    height: 100%;
    margin-left: 5%;
    display: grid;
    grid-template-rows: 25% 25% 25% 25%;
}
.borderPick{

}
.backgroundPick {

}
.shadowPick {

}
.roundCornerPick{

}

</style>
