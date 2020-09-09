<template>
    <span class="backgroundPickerWrapper">
        <span>
             <v-radio-group v-model="row" row>
              <v-radio label="Color" @change="colorSelected" value="color_selected"></v-radio>
              <v-radio label="Image" @change="imageSelected" value="image_selected"></v-radio>
            </v-radio-group>
        </span>
        <span v-if="this.backgroundTypeSelection > 0" class="pickers">
            <span v-if="this.backgroundTypeSelection==this.COLOR_SELECTED">
                <color-picker :currentValues="currentValues" :pType="pType" @selectedValue="selectedValue"></color-picker>
            </span>
            <span v-if="this.backgroundTypeSelection==this.IMAGE_SELECTED" class="imageSelectorStyle">
                <file-upload :fileRole="this.fileRole" @selectedValue="selectedValue"></file-upload>
            </span>
        </span>
    </span>
</template>

<script>
    import colorPicker from "../components/colorPicker.vue";
    import fileUpload from "../components/fileUpload.vue";
    export default {
        name: "backgroundPicker",
        components:{colorPicker, fileUpload},
        props:{
          currentValues: {
              type: Object,
              required: true
          },
          pType: {
              type: String,
              required: true
          }
        },
        data(){
          return {
              backgroundTypeSelection:0,
              NOTHING_SELECTED:0,
              COLOR_SELECTED:1,
              IMAGE_SELECTED:2,
              val: '',
              fileRole:"backgroundImage"
          }
        },
        methods:{
            colorSelected(){
                console.log('color has been selected');
                this.backgroundTypeSelection = this.COLOR_SELECTED;
                this.$emit('selectedValue', ['backgroundType',this.backgroundTypeSelection] );
            },
            imageSelected(){
                console.log('image has been selected');
                this.backgroundTypeSelection = this.IMAGE_SELECTED;
                this.$emit('selectedValue', ['backgroundType',this.backgroundTypeSelection] );
            },
            selectedValue(msg){
                this.$emit('selectedValue', msg);
            }
        }
    }
</script>

<style scoped>
    .backgroundPickerWrapper{
        display:grid;
        grid-template-rows: 100%;
        grid-template-columns: 30% 70%;
    }
    .pickers{
        margin-top: 8px;
    }

</style>
