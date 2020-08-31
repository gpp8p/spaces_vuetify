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
                <span>Content here</span>
                <span>
                    <menu-component :items='menuItems' :selected-item="this.selectedMenuItem" @menuSelection="tabSelected"></menu-component>
                </span>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import menuComponent from "../components/menuComponent.vue";
    export default {
        name: "cardConfigDialog",
        components: {menuComponent},
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
                selectedMenuItem:0
            }
        },
        methods:{
            tabSelected(msg){
                switch(msg[0]){
                    case 'Cancel':
                        this.dialog=false;
                        this.$emit('menuSelection', [msg[0]]);
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
