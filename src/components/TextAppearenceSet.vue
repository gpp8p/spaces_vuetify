<template>
    <span class="textAppearenceWrapper">
            <span class="fontFamilyCss">
                Font Family
            </span>
            <span class="fontColorCss">
                Font Color
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
    export default {
        name: "TextAppearenceSet",
        components: {fontSizePicker, fontWeightPicker, fontStylePicker, fontAlignPicker},
    }
</script>

<style scoped>

    .fontFamilyCss {

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



</style>
