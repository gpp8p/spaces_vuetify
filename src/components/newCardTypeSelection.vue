<template>
    <span class="cardTypeSpan">
                <span class="cardInput">
                  <v-text-field
                          label="Card Title"
                          placeholder=""
                          v-model="cardTitle"
                  ></v-text-field>
                </span>

                <span class="cardInput">
                    <v-select @change="typeSelected"
                              :items="items"
                              label="Select Card Type:"
                              outlined
                    ></v-select>
                </span>

    </span>
</template>

<script>
    export default {
        name: "newCardTypeSelection",
        data(){
            return {
                cardTitle:'',
                selectedValue:'',
                items: ['Headline Card', 'Text Card'],
            }
        },
        methods:{
            typeSelected(msg){
                console.log('type selected', msg);
                this.selectedValue = msg;
                this.$emit('selectedValue', ['cardType', this.selectedValue, this.cardTitle]);
            }
        }
    }
</script>

<style scoped>
    .cardTypeSpan {
        display:grid;
        grid-template-rows: 30% 30%;
        grid-template-columns: 100%;
        justify-items: center;
        height: 180px;
        margin-left: 30%;
        width:40%;
    }
    .cardInput {
        width:100%
    }
</style>
