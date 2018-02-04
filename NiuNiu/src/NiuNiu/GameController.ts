module NiuNiu {

   export class GameController extends egret.DisplayObjectContainer {

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }

        private onAddToStage(e:egret.Event){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);

            GameUtil.resetGame();
            this.GameSetting();
        }

        private GameSetting() {
            GameUtil.getCardBuffer();

            let GameBg = GameUtil.createBitmapByName("gameBg_jpg");
            this.addChild(GameBg);
            GameBg.width = this.stage.stageWidth;
            GameBg.height = this.stage.stageHeight;

            let GamePlayer = new NiuNiu.GamePlayer("icon1_jpg", "key", 100000, true);
            this.addChild(GamePlayer);
            GamePlayer.x = this.stage.stageWidth * 0.5 - GamePlayer.width * 0.5 - 50;
            GamePlayer.y = this.stage.stageHeight - 120;
            let playerCard1 = GameUtil.getCard(1);
            let playerCard1Type = GameUtil.getTypeByCard(playerCard1);
            let playerCard1Name = GameUtil.getCardTypeNamebyType(playerCard1Type);
            GamePlayer.getCardsAndSet(playerCard1);
            // GamePlayer.setNiuText(playerCard1Name);

            let GamePlayer2 = new NiuNiu.GamePlayer("icon2_jpg", "CC", 200000, false);
            this.addChild(GamePlayer2);
            GamePlayer2.x = this.stage.stageWidth * 0.5 - GamePlayer2.width * 0.5 - 50;
            GamePlayer2.y = 20;
            let playerCard2 = GameUtil.getCard(2);
            let playerCard2Type = GameUtil.getTypeByCard(playerCard2);
            let playerCard2Name = GameUtil.getCardTypeNamebyType(playerCard2Type);
            GamePlayer2.getCardsAndSet(playerCard2);
            GamePlayer2.setNiuText(playerCard2Name);
            
            if(GameUtil.bankerIsWin(playerCard1, playerCard2)){
                //庄家赢
                GamePlayer.setNiuText(playerCard1Name + "--赢");
            }else{
                //庄家输
                GamePlayer.setNiuText(playerCard1Name + "--输");
            }
        }

    }
}