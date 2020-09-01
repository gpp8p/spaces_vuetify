<template>
    <v-row justify="center">

        <v-dialog
                v-model="dialog"
                width="800"
        >
            <v-card color="#ffcd90"
                    elevation="15"
                    height="300"
                    class="cardConfig">
                <span class="titleClass">
                    Configure New Card
                </span>
                <span v-if="selectedMenuItem==this.VIEW_TYPE_SELECTION">
                    <card-type-selection></card-type-selection>
                </span>
                <span v-if="selectedMenuItem==this.VIEW_APPEARENCE">
                    <CardAppearenceSet></CardAppearenceSet>
                </span>

                <span>
                    <menu-component :items='menuItems' :selected-item="this.selectedMenuItem" @menuSelection="tabSelected"></menu-component>
                </span>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import menuComponent from "../components/menuComponent.vue";
    import cardTypeSelection from "../components/cardTypeSelection.vue";
    import CardAppearenceSet from "../components/CardAppearenceSet.vue";
    export default {
        name: "cardConfigDialog",
        components: {menuComponent, cardTypeSelection, CardAppearenceSet},
        mounted(){
            this.selectedMenuItem = 0;
        },
        props:{
            dialog:{
                type: Boolean,
                required: true,
            }
        },
        data(){
            return {
                menuItems: ['Card Type', 'Appearence', 'Fonts', 'Save', 'Cancel'],
                selectedMenuItem:0,
                VIEW_TYPE_SELECTION:0,
                VIEW_APPEARENCE:1,
                VIEW_FONTS:2
            }
        },
        methods:{
            tabSelected(msg){
                switch(msg[0]){
                    case 'Cancel':
                        this.dialog=false;
                        this.$emit('menuSelection', [msg[0]]);
                        break;
                    case 'Card Type':
                        this.selectedMenuItem=this.VIEW_TYPE_SELECTION;
                        break;
                    case 'Appearence':
                        this.selectedMenuItem=this.VIEW_APPEARENCE;
                        break;
                }

            }
        }
    }
</script>

<style scoped>
.cardConfig{
    display:grid;
    grid-template-rows: 20% 60% 20%;
}
.titleClass{
    margin-left: 40%;
    font-size: large;
    font-family: Arial;
    font-weight: bold;
    color: blue;
}
</style>
