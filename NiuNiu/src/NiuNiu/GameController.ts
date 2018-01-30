module NiuNiu {

   export class GameController extends egret.DisplayObjectContainer {

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }

        private onAddToStage(e:egret.Event){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.GameSetting();
        }

        private GameSetting() {
            let GameBg = NiuNiu.createBitmapByName("gameBg_jpg");
            this.addChild(GameBg);
            GameBg.width = this.stage.stageWidth;
            GameBg.height = this.stage.stageHeight;

            let GamePlayer = new NiuNiu.GamePlayer("icon1_jpg", "key", 100000);
            this.addChild(GamePlayer);
            GamePlayer.x = this.stage.stageWidth * 0.5 - GamePlayer.width * 0.5 - 50;
            GamePlayer.y = this.stage.stageHeight - 120;
        }

    }
}