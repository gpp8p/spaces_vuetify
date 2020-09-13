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
        created() {
            this.$eventHub.$on('configSaved', this.configSaved);
        },
        beforeDestroy(){
            this.$eventHub.$off('configSaved');
        },
        data(){
            return {
                items: ['Headline Card', 'Text Card'],
                headlineCardDefaults:{
                    "backgroundType":"color",
                    "backgroundTypeColor":'checked',
                    "backgroundColor":"#05ff34",
                    "fontSize":"12pt",
                    "fontWeight":"bold",
                    "border":"checked",
                    "borderColor":"#cc0521",
                    "borderSize":"medium",
                    "shadow":"checked",
                    "shadowSize":"10px",
                    "shadowSizeSetAt":"10px",
                    "shadowColor":"#BBBBBB",
                    "rounded":"checked",
                    "fontFamily":"Helvetica",
                    "fontStyle":"oblique",
                    "textAlign":"left",
                    "color":"#0537aa"
                },
                textCardDefaults:{
                    "backgroundType":"image",
                    "backgroundTypeColor":'checked',
                    "backgroundColor":"#ff16fc",
                    "fontSize":"12pt",
                    "fontWeight":"bold",
                    "border":"checked",
                    "borderColor":"#cc0521",
                    "borderSize":"medium",
                    "shadow":"checked",
                    "shadowSize":"10px",
                    "shadowSizeSetAt":"10px",
                    "shadowColor":"#BBBBBB",
                    "rounded":"checked",
                    "fontFamily":"Helvetica",
                    "fontStyle":"oblique",
                    "textAlign":"left",
                    "color":"#0537aa"
                },
                selectedValue:''
            }
        },
        methods:{
            typeSelected(msg){
                console.log('type selected', msg);
                this.selectedValue = msg;
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
                this.$emit('selectedValue', ['cardType', this.selectedValue]);
            },
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
