<template>
    <div class="hdrBarDiv">
        <span class="contextArea"><context-area></context-area></span>
        <span class="tabArea">
            <menu-component :items='menuItems' @menuSelection="tabSelected"></menu-component>
        </span>
        <span class="loginArea"><login-component @login="login"></login-component></span>

    </div>

</template>

<script>
    import menuComponent from "../components/menuComponent.vue";
    import loginComponent  from "./loginComponent";
    import contextArea from "../components/contextArea.vue";
    export default {
        name: "headerBar",
        data(){
          return {
            menuItems: ['Edit','Table', 'Bar', 'Dialog']
          }
        },
        components: {menuComponent, loginComponent, contextArea},
        methods:{
            tabSelected(msg){
                this.$emit('tabSelected', msg[0]);
            },
            login(msg){
                this.$emit('login', [msg[0]]);
            }
        }
    }
</script>

<style scoped>
    .hdrBarDiv {
        display: grid;
        grid-template-columns: 18% 59.5% 18%;
        grid-template-rows: 7vh;
        grid-column-gap: 2%;
        height: 100%;
    }
    .contextArea{
        background-color: #ffcd90;
        color:white;
        height: 100%;
    }
    .tabArea {
        background-color: #ffcd90;
        color:white;
        height: 100%;
    }
    .loginArea {
        background-color: #ffcd90;
        color:blue;
        height: 100%;
    }

</style>
