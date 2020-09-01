<template>
        <span class="input-color-container">
            <input  id="input-color" type="color" class="input-color" @change="newColor" :value="val"/>
        </span>
</template>

<script>
    export default {
        name: "colorPicker",
        props: {
            currentValues:{
                type: Object,
                required: false
            }

        },

        data(){
            return{
                val:this.getCurrentValue()
            }
        },
        watch:{
            currentValues: function(){
                debugger;
                this.val = this.getCurrentValue();
            }
        },

        methods:{
            newColor(evt){
                console.log(evt.target.value);
                this.$emit('configSelected', [evt.target.value]);

            },
            getCurrentValue(){
//        debugger;
                if(typeof(this.currentValues[this.configElement.element])=='undefined'){
                    return '#FFFFFF';
                }else{
                    return this.currentValues[this.configElement.element];
                }
            }

        }

    }
</script>

<style scoped>
    .input-color-container {
        position: relative;
        overflow: hidden;
        width: 30px;
        height: 20px;
        top: 15px;
        margin-right: 5px;
        margin-top: 20px;
        border: solid 2px #ddd;
        border-radius: 40px;
    }

    .input-color {

        right: -8px;
        top: -5px;
        width: 36px;
        height: 26px;
        border: none;
    }

    .input-color-label {
        cursor: pointer;
        text-decoration: underline;
        color: #dbd50c;
        margin-right: 30px;
    }
    .colorSpan{
        margin-left: 26px;
    }
</style>
