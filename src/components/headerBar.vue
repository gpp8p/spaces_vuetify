<template>
    <div class="hdrBarDiv">
        <span class="contextArea"><context-area :layout="nextLayout"></context-area></span>
        <span class="tabArea">
            <menu-component :items='menuItems' @menuSelection="tabSelected"></menu-component>
        </span>
        <span class="loginArea"><login-component @login="login" @newLayout="newLayout" @logError="logError"></login-component></span>

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
            menuItems: ['Edit','Table', 'Bar', 'Dialog'],
            menuItemsView: ['Info', 'Comments','Test'],
            menuItemsAuthor: ['Edit','Delete', 'Publish', 'Comments','Test'],
            menuItemsAdmin: ['Edit','Delete', 'Publish', 'Create', 'Child Pages', 'Comments','Test'],
            nextLayout:0,
            topPerm:0,
            VIEW_PERM:1,
            AUTHOR_PERM:2,
            ADMIN_PERM:3,
            layoutPerms:{},
          }
        },
        created() {
            this.$eventHub.$on('layoutChanged', this.layoutChanged);
        },
        beforeDestroy(){
            this.$eventHub.$off('layoutChanged');
        },
        components: {menuComponent, loginComponent, contextArea},
        methods:{
            tabSelected(msg){
                this.$emit('tabSelected', msg[0]);
            },
            login(msg){
                debugger;
                this.layoutChanged();
                this.$emit('login', [msg[0]]);
            },
            newLayout(msg){
              console.log('newLayout',msg);
              this.nextLayout=parseInt(msg[0]);
            },
            logError(msg){
                this.$emit('logError', msg);
            },
            layoutChanged(){
                console.log('layoutChanged');
                this.layoutPerms = this.$store.getters.getPerms;
                if(this.layoutPerms.view) this.topPerm=this.VIEW_PERM;
                if(this.layoutPerms.author) this.topPerm=this.AUTHOR_PERM;
                if(this.layoutPerms.admin) this.topPerm=this.ADMIN_PERM;
                switch(this.topPerm){
                    case this.VIEW_PERM:
                        this.menuItems = this.menuItemsView;
                        break;
                    case this.AUTHOR_PERM:
                        this.menuItems = this.menuItemsAuthor;
                        break;
                    case this.ADMIN_PERM:
                        this.menuItems = this.menuItemsAdmin;
                        break;
                }
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
