module NiuNiu{

    export class GameCard extends egret.Sprite{
        
        private bg:egret.Bitmap;
        private flower:egret.Bitmap;
        private numTxt:egret.TextField;

        public constructor(){
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(e:egret.Event){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.initCard();
        }

        private initCard(){
            this.width = 40;
            this.height = 60;

            this.bg = NiuNiu.createBitmapByName("kuang_png");
            this.addChild(this.bg);
            this.bg.width = 40;
            this.bg.height = 60;

            
        }

        public setCard(flo:number, num:number){

        }

    }

}