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
                items: ['Headline Card', 'Text Card'],
                headlineCardDefaults:{
                    "backgroundTypeColor":'checked',
                    "backgroundColor":"#FFFFFF",
                    "fontSize":"12pt",
                    "fontWeight":"bold",
                    "border":"checked",
                    "borderColor":"#cc0521",
                    "borderSize":"medium",
                    "shadow":"checked",
                    "shadowSize":"10px",
                    "shadowSizeSetAt":"10px",
                    "shadowColor":"#BBBBBB",
                    "fontFamily":"Helvetica",
                    "fontStyle":"oblique",
                    "textAlign":"left",
                    "color":"#0537aa"
                },
                textCardDefaults:{
                    "backgroundTypeColor":'checked',
                    "backgroundColor":"#FFFFFF",
                    "fontSize":"12pt",
                    "fontWeight":"bold",
                    "border":"checked",
                    "borderColor":"#cc0521",
                    "borderSize":"medium",
                    "shadow":"checked",
                    "shadowSize":"10px",
                    "shadowSizeSetAt":"10px",
                    "shadowColor":"#BBBBBB",
                    "fontFamily":"Helvetica",
                    "fontStyle":"oblique",
                    "textAlign":"left",
                    "color":"#0537aa"
                }
            }
        },
        methods:{
            typeSelected(msg){
                console.log('type selected', msg);
                switch(msg){
                    case 'Headline Card':{
                        this.$emit('typeSelected', [msg, this.headlineCardDefaults]);
                        break;
                    }
                    case 'Text Card':{
                        this.$emit('typeSelected', [msg, this.textCardDefaults]);
                        break;
                    }
                }
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
