<template>
    <h2>This is component Bar</h2>
</template>

<script>
    import store from "../store";

    export default {
        name: "Bar",
        mounted(){
                store.commit('setOrgHome',59);
                this.$router.push({
                name: 'displayLayout',
                params: { layoutId: 59 }
            });
        }
    }
</script>

<style scoped>

</style>
