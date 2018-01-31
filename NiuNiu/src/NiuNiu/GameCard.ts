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

            this.flower = NiuNiu.createBitmapByName("flo1_png");
            this.addChild(this.flower);
            this.flower.width = 30;
            this.flower.height = 30;
            this.flower.x = this.width * 0.5 - this.flower.width * 0.5;
            this.flower.y = 5;

            this.numTxt = new egret.TextField();
            this.addChild(this.numTxt);
            this.numTxt.width = this.width;
            this.numTxt.y = 35;
            this.numTxt.size = 20;
            this.numTxt.textAlign = egret.HorizontalAlign.CENTER;
            this.numTxt.textColor = 0x000000;
            // this.numTxt.text = "K";
        }

        public setCard(flo:number, num:number){
            let floStr = "flo"+ flo.toString() +"_png";
            this.flower.texture = RES.getRes(floStr);
            
            let numStr = num.toString();
            if(num == 1){
                numStr = "A";
            }else if(num == 11){
                numStr = "J";
            }else if(num == 12){
                numStr = "Q";
            }else if(num == 13){
                numStr = "K";
            }
            this.numTxt.text = numStr;
        }

    }

}