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

            let GamePlayer = new NiuNiu.GamePlayer("icon1_jpg", "key", 100000, true);
            this.addChild(GamePlayer);
            GamePlayer.x = this.stage.stageWidth * 0.5 - GamePlayer.width * 0.5 - 50;
            GamePlayer.y = this.stage.stageHeight - 120;
            GamePlayer.setPlayerCard(1, 3, 5);
            GamePlayer.setPlayerCard(4, 1, 12);

            let GamePlayer2 = new NiuNiu.GamePlayer("icon2_jpg", "CC", 200000, false);
            this.addChild(GamePlayer2);
            GamePlayer2.x = this.stage.stageWidth * 0.5 - GamePlayer2.width * 0.5 - 50;
            GamePlayer2.y = 20;
            GamePlayer2.setPlayerCard(2, 2, 2);
            GamePlayer2.setPlayerCard(3, 4, 7);
        }

    }
}