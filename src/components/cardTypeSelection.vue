<template>
    <span class="cardTypeSpan">
                <v-select
                        :items="items"
                        label="Select Card Type:"
                        outlined
                ></v-select>
    </span>
</template>

<script>
    export default {
        name: "cardTypeSection",
        data(){
            return {
                items: ['Headline Card', 'Text Card']
            }
        }

    }
</script>

<style scoped>
    .cardTypeSpan {
        display:flex;
        justify-items: center;
        height: 180px;
        margin-left: 30%;
        width:40%;
    }

</style>
