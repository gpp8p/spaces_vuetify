<template>
    <div v-bind:style="gridParamDefinition" class="gridSection">
        <generic-card
                v-for="(instance, index) in cardInstances"
                :key="index"
                :cardType="instance.card_component"
                :card-style="instance.card_parameters.style"
                :card-id="instance.id"
                :card-key="index"
                :card-position="instance.card_position"
                :gridCss="gridParamDefinition"
                :cardProperties="instance.card_parameters.properties"
                :displayStatus="displayStatus"
                @storeValue="processClick"
                @cardClick="cardClick"
                @textEditor="textEditor"
                @configurationHasBeenSaved="configurationHasBeenSaved"
                @cardDataLoaded="cardDataLoaded"
                @linkHelperRequested="linkHelperRequested"
                ref="key"
        ></generic-card>
        <Dialog :dialog = 'openDialog' :newCard='newCardBeingAdded' @menuSelection="dialogMenuSelected"></Dialog>
    </div>
</template>

<script>
    import axios from "axios";
    import genericCard from '../components/genericCard.vue';
    import Dialog from "./newCardDialog.vue";
    export default {
        name: "editLayout",
        components:{genericCard, Dialog},
        data(){
            return {
                cardInstances: [],
                gridParamDefinition: "",
                layoutGrid:[],
                selectedColor: '#66bb6a',
                unSelectedColor: 'rgb(219, 170, 110)',
                layoutConfigurationValues: {},
                LayoutPermissions:{},
                displayStatus:true,
                openDialog:false,


                newCardBeingAdded:false,
                topLeftClicked: 0,
                bottomRightClicked: 0,
                cstatus: 0,
                topLeftRow:0,
                topLeftCol:0,
                bottomRightRow:0,
                bottomRightCol:0,
                WAITINGFORCLICK:0,
                TOPLEFTCLICKED:1,
                BOTTOMRIGHTCLICKED:2,
                SELECTAREAOK:3,
                WAITINGFORNAME:4,
                WAITINGFORTYPE:5,
                WAITINGFORSUBMIT:6,
                WAITINGTOSAVE:8,
                CANCELLAYOUTUPDATE:7,
                CARDBEINGCONFIGED:8,


            }
        },
        created() {
            this.$eventHub.$on('editStatusChanged', this.editStatusChanged);
        },
        beforeDestroy(){
            this.$eventHub.$off('editStatusChanged');
        },

        mounted(){
            this.reloadLayout(this.$route.params.layoutId);
            this.displayStatus=false;
            this.$eventHub.$emit('editStatusChanged',['openEdit',0]);
        },
        methods: {
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
                    "display: grid; grid-gap: 3px; background-color: " + backgroundColor + "; height: 90vh; color: #ffcd90; " +
                    gridHeightCss +
                    ";" +
                    gridWidthCss +
                    ";";
                return gridCss;
            },
            reloadLayout: function (layoutId) {
//                debugger;
                this.cardInstances = [];
                this.displayGrid = true;
//                this.layoutId = msg;

//      console.log("reloading" + msg);
                axios
                    .get("http://localhost:8000/getLayout?layoutId=XDEBUG_SESSION_START=15122", {
                        params: {
                            orgId: this.$store.getters.getOrgId,
                            userId: this.$store.getters.getLoggedInUserId,
                            layoutId: layoutId
                        }
                    })
                    .then(response => {
                        // JSON responses are automatically parsed.
//          debugger;
                        this.cardInstances = response.data.cards;
                        this.gridParamDefinition = this.layoutGridParameters(
                            response.data.layout.height,
                            response.data.layout.width,
                            response.data.layout.backgroundColor
                        );
// build a blank layout using the dimensions of the layout loaded

                        var newBlankLayout = this.makeBlankLayout(response.data.layout.height, response.data.layout.width, response.data.layout.description, response.data.layout.menu_label, response.data.layout.backgroundColor)
//          console.log(newBlankLayout);
                        var layoutGrid = newBlankLayout[3];
                        var cardsToDelete = [];

                        for (var thisCardIndex = 0; thisCardIndex < this.cardInstances.length; thisCardIndex++) {
                            var thisCard = this.cardInstances[thisCardIndex];
//                  console.log('thisCard', thisCard);
                            var cardTopLeftRow = thisCard.card_position[0] - 1;
                            var cardTopLeftColumn = thisCard.card_position[1] - 1;
                            var cardBottomRightRow = (cardTopLeftRow + thisCard.card_position[2]);
                            var cardBottomRightColumn = (cardTopLeftColumn + thisCard.card_position[3]);
//                  console.log('cardId:'+thisCard.id+' cardTopLeftRow:'+cardTopLeftRow+' cardTopLeftColumn:'+cardTopLeftColumn+' cardBottomRightRow:'+cardBottomRightRow+' cardBottomRightColumn:'+cardBottomRightColumn)
// build cardsToDelete by taking it from indexes in layoutGrid within the dimensions of the card to show
                            for (var r = cardTopLeftRow; r < cardBottomRightRow; r++) {
                                for (var c = cardTopLeftColumn; c < cardBottomRightColumn; c++) {
                                    cardsToDelete.push(layoutGrid[r][c]);
                                }
                            }
//            console.log(thisCard);
//            debugger;
                        }
//          debugger;

// set the toDelete flag in the blank cards for everything in the cardsToDelete list
                        var blankLayout = newBlankLayout[1].cards;
//          debugger;
                        for (var d = 0; d < cardsToDelete.length; d++) {
                            var indexOfCardToDelete = cardsToDelete[d];
                            console.log(indexOfCardToDelete);
                            blankLayout[indexOfCardToDelete].toDelete = true;
                        }
// copy all the cards in blankLayout that are not to be deleted
                        var newCardInstances = [];
                        for (c = 0; c < blankLayout.length; c++) {
                            if (!blankLayout[c].toDelete) {
                                newCardInstances.push(blankLayout[c]);
                            }
                        }
// add the cards coming from the db
                        for (thisCardIndex = 0; thisCardIndex < this.cardInstances.length; thisCardIndex++) {
                            newCardInstances.push(this.cardInstances[thisCardIndex]);
                        }
// make cardInstances equal to newCardInstances
                        this.cardInstances = newCardInstances;

                    })
                    .catch(e => {
//                        debugger;
                        console.log(e);
                        this.errors.push(e);
                    });
            },


            makeBlankLayout(height, width, description, menu_label, backgroundColor) {
//      debugger;

                this.layoutGrid = [];
                var newCards = [];
//      var newCardId=1;
                var newCardId = 0;
                height++;
                width++;
                for (var h = 1; h < height; h++) {
                    var gridRow = [];
                    for (var w = 1; w < width; w++) {
                        var c = this.createBlankCardInstance(h, w, 1, 1, newCardId);
                        newCards.push(c);
                        gridRow.push(newCardId);
                        newCardId++;
                    }
                    this.layoutGrid.push(gridRow);
                }

                var newLayout = {
                    cards: newCards,
                    layout: {description: description, menu_label: menu_label, height: (height - 1), width: (width - 1)}
                };
                var newGridParameters = this.layoutGridParameters(height, width, backgroundColor);

//      this.reloadBlankLayout(newLayout);

                return ['newBlankGrid', newLayout, newGridParameters, this.layoutGrid];
            },
            createBlankCardInstance(row, col, height, width, id){
//      console.log('createBlankCardInstance:'+row+' '+col+' '+height+' '+width+ ' '+id);
                var thisGridCss = this.computeGridCss(row, col, height, width);
                var thisCardStyle = thisGridCss+";"+"background-color:#DBAA6E;color:blue;";
                var thisInstance = {card_component: 'simpleCard', card_position: [row,col,height,width], id:id, toDelete: false, card_parameters: {style: thisCardStyle}};
                return thisInstance;

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
            processClick(msg) {
                if(!this.newCardBeingAdded){
                    return;
                }
                console.log('editLayout gets storeValue -' + msg);
  //              debugger;
                var cardThatWasClicked = this.findCard(msg[0]);
                console.log('cardThatWasClicked:'+cardThatWasClicked);
                switch(this.cstatus){
                    case this.CARDBEINGCONFIGED:
                        break;
                    case this.WAITINGFORCLICK:
                        this.topLeftClicked=msg[0];
                        this.topLeftRow = this.cardInstances[cardThatWasClicked].card_position[0];
                        this.topLeftCol = this.cardInstances[cardThatWasClicked].card_position[1];
//          debugger;
                        this.cstatus=this.TOPLEFTCLICKED;
                        this.$refs.key[cardThatWasClicked].$el.style.backgroundColor='#66bb6a';
                        this.$emit('LayoutMessage', ['topLeft', this.topLeftRow,this.topLeftCol ]);
                        break;
                    case this.TOPLEFTCLICKED:
                        this.bottomRightClicked = msg[0];
                        var brClickRow = this.cardInstances[cardThatWasClicked].card_position[0];
                        var brClickCol = this.cardInstances[cardThatWasClicked].card_position[1];
                        if(this.checkClickPos(brClickRow, brClickCol, this.topLeftRow, this.topLeftCol)){
                            this.bottomRightRow = this.cardInstances[cardThatWasClicked].card_position[0];
                            this.bottomRightCol = this.cardInstances[cardThatWasClicked].card_position[1];
                            this.cstatus=this.BOTTOMRIGHTCLICKED;
                            this.$refs.key[cardThatWasClicked].$el.style.backgroundColor='#66bb6a';
                            this.scolor = this.selectedColor;
//            this.cardInstances.forEach(this.fillInCell);
                            this.fillSelectedCells(this.cardInstances,this.topLeftCol,this.topLeftRow,this.bottomRightCol,this.bottomRightRow, '#66bb6a');
                            this.$emit('layoutMessage', ['bottomRight', this.bottomRightRow,this.bottomRightCol ]);
                            this.openDialog=true;
                        }else{
                            this.$emit('layoutMessage', ['error', 'You must click and to the right',0 ]);
                        }
                        break;
                    case this.BOTTOMRIGHTCLICKED:
                        this.cstatus = this.WAITINGFORNAME;
                        break;
                    case this.WAITINGFORNAME:
                        this.cstatus = this.WAITINGFORTYPE;
                        break;
                }
                this.$eventHub.$emit('editStatusChanged', ['newCard',this.cstatus]);

            },
            findCard(cardId){
                for(var i=0;i<this.cardInstances.length;i++){
                    if(this.cardInstances[i].id == cardId){
                        return i;
                    }
                }
            },
            checkClickPos(brClickRow, brClickCol, tlSelectRow, tlSelectCol){
//      debugger;
                if((brClickRow<tlSelectRow)||(brClickCol<tlSelectCol)){
                    return false;
                }else{
                    return true;
                }


            },
            fillSelectedCells(arr,tlCol,tlRow,brCol,brRow, colorToFill){
                var topLeftCol = tlCol;
                var topLeftRow = tlRow;
                var bottomRightCol = brCol;
                var bottomRightRow = brRow;
                for(var i = 0; i<arr.length; i++){
                    var thisCardCol = arr[i].card_position[1];
                    var thisCardRow = arr[i].card_position[0];
//        console.log('thisCardCol:'+thisCardCol+'topLeftCol:'+topLeftCol+'thisCardRow:'+thisCardRow+'topLeftRow:'+topLeftRow);
//        console.log('thisCardCol:'+thisCardCol+'bottomRightCol:'+bottomRightCol+'thisCardRow:'+thisCardRow+'bottomRightRow:'+bottomRightRow);
//        console.log(arr[i].id);
//        console.log('-----------------------------')
                    if(thisCardCol >= topLeftCol && thisCardRow >= topLeftRow && thisCardCol <= bottomRightCol && thisCardRow <= bottomRightRow){
//          console.log('card matched');
                        this.$refs.key[i].$el.style.backgroundColor=colorToFill;
                    }

                }
//      console.log('done');
            },
            editStatusChanged(msg){
//                console.log(msg);
                switch(msg[0]){
                    case 'newCard':
                        switch(msg[1]){
                            case this.WAITINGFORCLICK:
                                this.newCardBeingAdded = true;
                                this.cstatus=this.WAITINGFORCLICK;
                                break;
                        }
                    break;
                }
            },
            dialogMenuSelected(msg){
               switch(msg[0]){
                   case 'Cancel':
                       this.cancelLayoutEdit();
                       this.newCardBeingAdded=false;
                       this.openDialog=false;
                       break;
                   case 'Create New Card':
                        var currentLayoutId = this.$store.getters.getCurrentLayoutId;
                        console.log(currentLayoutId, msg[2], msg[1], this.topLeftRow, this.topLeftCol, this.bottomRightRow, this.bottomRightCol);
                        debugger;
                        this.insertCard(currentLayoutId, msg[2], msg[1], this.topLeftRow, this.topLeftCol, this.bottomRightRow, this.bottomRightCol);
                       break;
               }
            },
            insertCard(layoutId, title, cardType, tlrow, tlcol, brrow, brcol){
                debugger;
                axios.post('http://localhost:8000/saveCardOnly?XDEBUG_SESSION_START=12016', {
                    layoutId: layoutId,
                    cardTitle: title,
                    cardType: cardType,
                    topLeftRow: tlrow,
                    topLeftCol: tlcol,
                    bottomRightRow: brrow,
                    bottomRightCol: brcol
                }).then(response=>
                {
                    console.log('card saved:'+response);
                    this.$router.push({
                        name: 'displayLayout',
                        params: { layoutId: this.$store.getters.getCurrentLayoutId }
                    })
                }).catch(function(error) {
                    console.log(error);
                });
            },
            cancelLayoutEdit(){
//      console.log('noButton clicked');
                this.cstatus = this.WAITINGFORCLICK;
                this.scolor = this.unSelectedColor;
//      debugger;
                if(this.bottomRightCol==0 && this.bottomRightRow==0){
                    this.fillInOneCell(this.cardInstances, this.topLeftRow, this.topLeftCol, this.unSelectedColor);
                }else{
                    this.fillSelectedCells(this.cardInstances,this.topLeftCol,this.topLeftRow,this.bottomRightCol,this.bottomRightRow, this.unSelectedColor);
                }

            },


// end of methods
        },




    }
</script>

<style scoped>

</style>
