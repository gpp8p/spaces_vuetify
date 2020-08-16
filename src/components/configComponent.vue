<template>
    <v-row justify="center">
        <v-btn
                color="primary"

                dark
                @click.stop="dialog = true"
        >
            Open Config Dialog
        </v-btn>

        <v-dialog v-model="dialog"  max-width="600px">
            <v-card
                    color="#ffcd90"
            >
                <v-card-title>
                    <span class="headline">Configure This Card</span>
                </v-card-title>
                <nadform v-if="this.viewNow==0"></nadform>
                <page2 v-if="this.viewNow==1"></page2>
                <page3 v-if="this.viewNow==2"></page3>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <span class="layoutMenu">
                        <v-btn @click="optClicked(0)" text large>Previous</v-btn>
                        <v-btn @click="optClicked(1)" text large>Next</v-btn>
                        <v-btn @click="optClicked(2)" text large>Cancel</v-btn>
                    </span>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import nadform from "../components/nadform.vue";
    import page2 from "./page2";
    import page3 from "./page3";
    export default {
        name: "configComponent",
        components: {nadform, page2, page3},
        mounted(){
            this.viewNow=0;
        },
        data () {
            return {
                dialog: false,
                viewNow:0
            }
        },
        methods:{
            optClicked(b){
//                debugger;
                switch(b){
                    case 0: {
                        if(this.viewNow>0){
                            this.viewNow--;
                        }
                        break;
                    }
                    case 1: {
                        if(this.viewNow<3){
                            this.viewNow++;
                        }
                        break;
                    }
                    case 2: {
                        break;
                    }
                }
                console.log(this.viewNew);
            }
        }
    }
</script>

<style scoped>

    .layoutMenu {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        align-items: baseline;
        margin-top: 6px;
    }

</style>
