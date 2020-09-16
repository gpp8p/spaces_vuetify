<template>
    <v-row justify="center">

        <v-dialog
                v-model="dialog"
                width="500"
        >
            <v-card color="#ffcd90"
                    elevation="15"
                    height="250"
                    class="cardConfig">
                <span class="titleClass">
                    Create New Card
                </span>
                <span v-if="selectedMenuItem==this.VIEW_TYPE_SELECTION">
                    <new-card-type-selection @selectedValue="selectedValue"></new-card-type-selection>
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
    import newCardTypeSelection from "../components/newCardTypeSelection.vue";
    import menuComponent from "../components/menuComponent.vue";
    export default {
        name: "newCardDialog",
        components: {menuComponent, newCardTypeSelection},
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
        data() {
            return {
                menuItems: ['Card Type', 'Create New Card', 'Cancel'],
                selectedMenuItem: 0,
                VIEW_TYPE_SELECTION: 0,
                VIEW_SAVE: 4,
            }
        },
        methods: {
            tabSelected(msg) {
                switch (msg[0]) {
                    case 'Cancel':
                        this.dialog = false;
                        this.$emit('menuSelection', [msg[0]]);
                        break;
                    case 'Card Type':
                        this.selectedMenuItem = this.VIEW_TYPE_SELECTION;
                        break;
                    case 'Create New Card':
                        this.selectedMenuItem = this.VIEW_SAVE;
                        this.configurationSave();
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    .titleClass{
        margin-left: 35%;
        font-size: large;
        font-family: Arial;
        font-weight: bold;
        color: blue;
    }
</style>
