<template>
    <span class="cardTypeSpan">
                <v-select @change="typeSelected"
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
        },
        methods:{
            typeSelected(msg){
                console.log('type selected', msg);
                this.$emit('typeSelected', msg);
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
