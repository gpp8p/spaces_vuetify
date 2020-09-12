<template>
    <span class="textAppearenceWrapper">
            <span class="fontFamilyCss">
                <span>
                    <flex-font-select :currentValues="currentValues" :pType="fontFamilyType" @selectedValue="selectedValue"></flex-font-select>
                </span>
            </span>
            <span class="fontColorCss">
                Font Color:
                <span class="pickers">
                    <color-picker :currentValues="currentValues" :pType="colorType" @selectedValue="selectedValue"></color-picker>
                </span>

            </span>
            <span class="fontSizeCss">
                <font-size-picker @selectedValue="selectedValue"></font-size-picker>
            </span>
            <span class="fontWeightCss">
                 <font-weight-picker @selectedValue="selectedValue"></font-weight-picker>
            </span>
            <span class="fontStyeCss">
                <font-style-picker @selectedValue="selectedValue"></font-style-picker>
            </span>
            <span class="fontAlignCss">
                <font-align-picker @selectedValue="selectedValue"></font-align-picker>
            </span>
    </span>

</template>

<script>
    import fontSizePicker from "../components/fontSizePicker.vue";
    import fontWeightPicker from "../components/fontWeightPicker.vue";
    import fontStylePicker from "../components/fontStylePicker.vue";
    import fontAlignPicker from "../components/fontAlignPicker.vue"
    import colorPicker from "../components/colorPicker.vue";
    import flexFontSelect from "../components//flexFontSelect";
    export default {
        name: "TextAppearenceSet",
        components: {fontSizePicker, fontWeightPicker, fontStylePicker, fontAlignPicker, colorPicker, flexFontSelect},
        props :{
            currentValues:{
                type: Object,
                required: false
            }
        },
        data(){
          return {
              colorType: "color",
              fontFamilyType: "fontFamily"
          }
        },
        methods:{
            selectedValue(msg){
//                debugger;
                this.$emit('selectedValue', msg);
            }
        }

    }
</script>

<style scoped>

    .fontFamilyCss {
        margin-top: 8px;
    }
    .fontSizeCss {

    }
    .fontWeightCss {

    }
    .fontStyeCss {

    }
    .fontAlignCss {

    }
    .fontColorCss {

    }

    .textAppearenceWrapper  {
        display:grid;
        grid-template-rows: 30% 30% 30%;
        grid-template-columns:50% 50%;
        height: 100%;
        margin-left: 5%;

    }
    .pickers{
        margin-top: 8px;
    }


</style>
