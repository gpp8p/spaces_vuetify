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
                    <card-type-selection @typeSelected="typeSelected" @selectedValue="selectedValue"></card-type-selection>
                </span>
                <span v-if="selectedMenuItem==this.VIEW_APPEARENCE">
                    <CardAppearenceSet :currentValues="currentCardValues" @selectedValue="selectedValue"></CardAppearenceSet>
                </span>
                <span v-if="selectedMenuItem==this.VIEW_FONTS">
                    <text-appearence-set :currentValues="currentCardValues" @selectedValue="selectedValue"></text-appearence-set>
                </span>
                <span v-if="selectedMenuItem==this.VIEW_SAVE">
                    Card Save
                </span>

                <span>
                    <menu-component :items='this.menuItems' :selected-item="this.selectedMenuItem" @menuSelection="tabSelected"></menu-component>
                </span>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import menuComponent from "../components/menuComponent.vue";
    import cardTypeSelection from "../components/cardTypeSelection.vue";
    import CardAppearenceSet from "../components/CardAppearenceSet.vue";
    import TextAppearenceSet from "../components/TextAppearenceSet.vue"
    export default {
        name: "cardConfigDialog",
        components: {menuComponent, cardTypeSelection, CardAppearenceSet, TextAppearenceSet},
        created(){
            console.log('cardConfigDialog created. newcard', this.newCard);
            if(this.newCard==false){
                this.menuItems = this.initialMenuItems;
            }else{
                this.menuItems = this.fullMenuItems;
            }
        },
        mounted(){
            this.selectedMenuItem = 0;

        },
        props:{
            dialog:{
                type: Boolean,
                required: true,
            },
            newCard:{
                type: Boolean,
                required: true
            }
        },
        data(){
            return {
                menuItems: [],
                initialMenuItems: ['CardType','Cancel'],
                fullMenuItems: ['Card Type', 'Appearence', 'Fonts', 'Save', 'Cancel'],
                selectedMenuItem:0,
                VIEW_TYPE_SELECTION:0,
                VIEW_APPEARENCE:1,
                VIEW_FONTS:2,
                VIEW_SAVE:4,
                currentCardValues:{}

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
                    case 'Fonts':
                        this.selectedMenuItem=this.VIEW_FONTS;
                        break;
                    case 'Save':
                        this.selectedMenuItem = this.VIEW_SAVE;
                        this.configurationSave();
                        break;
                }

            },
            typeSelected(msg){
                debugger;
                console.log('configDialog - type has been selected', msg);
                this.menuItems=this.fullMenuItems;
                this.currentCardValues=msg[1];
            },
            configurationSave(){

            },
            selectedValue(msg){
                console.log(msg);
                switch (msg[0]) {
                    case "backgroundColor":
                        this.currentCardValues.backgroundColor = msg[1];
                        break;
                    case "cardType":
                        this.currentCardValues.cardType = msg[1];
                        break;
                    case "backgroundType":
                        this.currentCardValues.backgroundType=msg[1];
                        break;
                    case "backgroundImage":
                        this.currentCardValues.backgroundImage=msg[1];
                         break;
                    case "fontFamily":
                        break;
                    case "fontSize":
                        break;
                    case "fontWeight":
                        break;
                    case "fontStyle":
                        break;
                    case "color":
                        break;
                    case "textAlign":
                        break;
                    case "roundIncluded":
                        break;
                    case "shadow":
                        break;
                    case "border":
                        this.currentCardValues.border=msg[1];
                        break;
                    case "borderSize":
                        this.currentCardValues.borderSize=msg[1];
                        break;
                    case "borderColor":
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
