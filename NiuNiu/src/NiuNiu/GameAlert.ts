module NiuNiu {

    export class GameAlert extends egret.Sprite {

        private alertText;
        private alertIng = false;

        public constructor() {
            super();

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.OnStage, this);
        }

        private OnStage(e: egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.OnStage, this);

            this.width = this.stage.stageWidth;
            this.height = this.stage.stageHeight;

            this.alertText = new egret.TextField();
            this.addChild(this.alertText);
            this.alertText.width = this.width;
            this.alertText.textAlign = egret.HorizontalAlign.CENTER;
            this.alertText.size = 28;
            this.alertText.textColor = 0x000000;
            this.alertText.y = this.stage.stageHeight * 0.5;
        }

        public AlertStr(str: string) {
            if (this.alertIng) {
                return;
            }
            this.alertIng = true;

            this.alertText.text = str;
            this.alertText.y = this.stage.stageHeight * 0.5;
            var tw = egret.Tween.get(this.alertText);
            tw.to({ y: this.stage.stageHeight * 0.5 - 200 }, 1000).call(()=>{
                this.alertIng = false;
                this.alertText.text = "";
            });
        }

    }

}