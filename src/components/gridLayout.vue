<template>
    <span class="layoutGrid">
        <span v-for="(instance, index) in this.cells" class="layoutCell"
              :key="index" >
            Cell Here
        </span>

    </span>

</template>

<script>
    export default {
        name: "gridLayout",
        mounted(){
            this.cardInstances = this.makeBlankLayout(10,10, 'blank layout', 'blank layout label', '#DBAA6E');
            this.cells=this.cardInstances[1].cards;
        },
        data(){
          return {
              cardInstances: [],
              cells:[]
          }
        },
        methods:{
            //    createBlankLayout(height,width, description, menu_label, backgroundColor){
            //      console.log('createBlankLayout:'+height+' '+width);
            //      this.$emit('storeValue', this.makeBlankLayout(height,width, description, menu_label, backgroundColor));
            //    },

            makeBlankLayout(height,width, description, menu_label, backgroundColor){
                debugger;

                this.layoutGrid = [];
                var newCards = [];
                var newCardId=0;
                height++;
                width++;
                for(var h=1;h<height;h++){
                    var gridRow = [];
                    for(var w = 1; w<width; w++){
                        var c=this.createBlankCardInstance(h,w,1,1,newCardId);
                        newCards.push(c);
                        gridRow.push(newCardId);
                        newCardId++;
                    }
                    this.layoutGrid.push(gridRow);
                }

                var newLayout = {cards: newCards, layout: {description:description, menu_label: menu_label, height: (height-1), width:(width-1)}};
                var newGridParameters = this.layoutGridParameters(height, width, backgroundColor);

                return ['newBlankGrid', newLayout, newGridParameters, this.layoutGrid ];
            },

            computeGridCss(row, col, height, width){
//        debugger;
                var startRow = row;
                var startColumn = col;
                var endRow=0;
                var endCol=0;
                if(height==1){
                    endRow = row;
                }else{
                    endRow = row+height;
                }
                endCol=startColumn+width;
                var thisCss = "grid-area:"+startRow+"/"+startColumn+"/"+endRow+"/"+endCol;
                return thisCss;

            },


            createBlankCardInstance(row, col, height, width, id){
//      console.log('createBlankCardInstance:'+row+' '+col+' '+height+' '+width+ ' '+id);
                var thisGridCss = this.computeGridCss(row, col, height, width);
                var thisCardStyle = thisGridCss+";"+"background-color:#DBAA6E;color:blue;";
                var thisInstance = {card_component: 'simpleCard', card_position: [row,col,height,width], id:id, toDelete: false, card_parameters: {style: thisCardStyle}};
                return thisInstance;

            },
            layoutGridParameters(height, width, backgroundColor) {
                var heightSize = (95 / height).toFixed(2);
                var widthSize = (98 / width).toFixed(2);
                var gridHeightCss = "grid-template-rows: ";
                var gridWidthCss = "grid-template-columns: ";
                var x = 0;
                for (x = 0; x < height; x++) {
                    gridHeightCss = gridHeightCss + heightSize + "% ";
                }
                for (x = 0; x < width; x++) {
                    gridWidthCss = gridWidthCss + widthSize + "% ";
                }
                var gridCss =
                    "display: grid; grid-gap: 3px; background-color: "+backgroundColor+"; height: 90vh; color: #ffcd90; " +
                    gridHeightCss +
                    ";" +
                    gridWidthCss +
                    ";";
                return gridCss;
            }

        }
    }
</script>

<style scoped>
    .layoutGrid {
        display: grid;
        grid-gap: 3px;
        background-color: #2add16;
        height: 90vh;
        color: #ab97ff;
        grid-template-rows: 9.50% 9.50% 9.50% 9.50% 9.50% 9.50% 9.50% 9.50% 9.50% 9.50% ;
        grid-template-columns: 9.80% 9.80% 9.80% 9.80% 9.80% 9.80% 9.80% 9.80% 9.80% 9.80% ;
    }

    .layoutCell{
        background-color: #d3321a;
        padding: 2px;
    }
</style>
