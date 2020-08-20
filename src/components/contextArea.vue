<template>
    <span>
        <span class="labelLinkStyle" @click="goBack">Back</span>
    </span>

</template>

<script>
    export default {
        name: "contextArea",
        data(){
            return {

            }
        },
        methods: {
            goBack(){
                debugger;
                var thisStringLayoutIdStack = sessionStorage.getItem('layoutIdStack');
                if(thisStringLayoutIdStack!=null){
                    var thisLayoutIdStack = JSON.parse(thisStringLayoutIdStack);
                    thisLayoutIdStack.pop();
                    if(thisLayoutIdStack.length>0){
                        thisStringLayoutIdStack = JSON.stringify(thisLayoutIdStack);
                        sessionStorage.setItem('layoutIdStack', thisStringLayoutIdStack);
                    }else{
                        sessionStorage.removeItem('layoutIdStack');
                    }
                    var stackTop = thisLayoutIdStack.length -1;
                    if(stackTop>=0){
                        var nextLayoutId = thisLayoutIdStack[stackTop]
                        this.$router.push({
                            name: 'displayLayout',
                            params: { layoutId: nextLayoutId }
                        });
                        this.$router.go();
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .labelLinkStyle {
        color:blue;
        font-family: Arial;
        margin-right: 15px;
    }
    .labelLinkStyle:hover {
        color:red;
        font-weight: bold;
    }
</style>
