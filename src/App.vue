<template>
  <v-app>
    <v-main>
      <Content></Content>
    </v-main>
  </v-app>
</template>

<script>


import Content from './components/contentContainer.vue';
import store from './store';

export default {
  name: 'App',
  store,
  components: {
    Content
  },
  created(){
    var pathArray=this.$route.path.substring(1).split('/');
    debugger;
    if(pathArray[0].length>0){
      store.commit('setDefaultOrg', pathArray);
    }else{
      store.commit('setDefaultOrg', ['Shannon']);
    }

  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
  .rounded-Corners{
    background-color: #ddd92a;
    width:100%;
    height: 100%;
    border-radius: 4px;
    border-width: 2px;
    border-style: solid;
    border-color: #0a3aff;

  }
</style>
