<template>
    <span>
          <v-tabs
            background-color="#ffcd90"
            height="20px"
            color="blue"
            centered="true"
            @change="tabClicked"
          >
            <v-tab @change="tabClicked(tab.id)">Edit Layout</v-tab>
            <v-tab @change="tabClicked(tab.id)">List</v-tab>
            <v-tab @change="tabClicked(tab.id)">Third</v-tab>
            <v-tab @change="tabClicked(tab.id)">Dialog</v-tab>
          </v-tabs>


    </span>
</template>

<script>
    export default {
        name: "menu",
        data(){
            return{
                isMounted: false
            }
        },
        methods:{
            tabClicked(id){
//                debugger;
                if(!this.isMOunted){
                    this.isMounted=true;
                }else{
                    console.log('clicked', id);
                    this.$emit('tabSelected', id);
                }
            }
        }
    }
</script>

<style scoped>

</style>
