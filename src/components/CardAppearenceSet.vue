<template>
    <span class="cardAppearenceWrapper">
        <span class="backgroundPick">
            <background-picker></background-picker>
        </span>
        <span class="borderPick">
            border picker here
        </span>
        <span class="shadowPick">
            shadow picker here
        </span>
        <span class="roundCornerPick">
            round corner picker here
        </span>

    </span>
</template>

<script>
    import backgroundPicker from "../components/backgroundPicker.vue";
    export default {
        name: "CardAppearenceSet",
        components: {backgroundPicker},
        props :{
            currentValues:{
                type: Object,
                required: false
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
