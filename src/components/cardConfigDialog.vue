<template>
    <v-row justify="center">

        <v-dialog
                v-model="dialog"
                width="800"
        >
            <v-card color="orange"
                    elevation="15"
                    height="300">
                <v-card-title class="headline">Configure New Card</v-card-title>

                <v-card-actions>

                    <v-btn
                            color="purple"
                            text
                    >
                        Card Type
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="purple"
                            text
                    >
                        Card Characteristics
                    </v-btn>

                    <v-spacer></v-spacer>
                    <v-btn
                            color="purple"
                            text
                    >
                        Text
                    </v-btn>

                </v-card-actions>


            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "cardConfigDialog",
        props:{
            dialog:{
                type: Boolean,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
