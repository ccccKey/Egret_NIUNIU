module NiuNiu {

    export class GameController extends egret.DisplayObjectContainer {

        private GamePlayer1;
        private GamePlayer2;
        private scoreCost = 500; //每次花费
        private GameAlert = new NiuNiu.GameAlert();

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(e: egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

            GameUtil.resetGame();
            this.GameSetting();
        }

        private GameSetting() {

            let GameBg = GameUtil.createBitmapByName("gameBg_jpg");
            this.addChild(GameBg);
            GameBg.width = this.stage.stageWidth;
            GameBg.height = this.stage.stageHeight;

            this.GamePlayer1 = new NiuNiu.GamePlayer("icon1_jpg", "key", 100000, true);
            this.addChild(this.GamePlayer1);
            this.GamePlayer1.x = this.stage.stageWidth * 0.5 - this.GamePlayer1.width * 0.5 - 50;
            this.GamePlayer1.y = this.stage.stageHeight - 120;

            this.GamePlayer2 = new NiuNiu.GamePlayer("icon2_jpg", "CC", 200000, false);
            this.addChild(this.GamePlayer2);
            this.GamePlayer2.x = this.stage.stageWidth * 0.5 - this.GamePlayer2.width * 0.5 - 50;
            this.GamePlayer2.y = 20;

            let playBtn = GameUtil.createBitmapByName("btn_png");
            this.addChild(playBtn);
            playBtn.width = 160;
            playBtn.height = 52;
            playBtn.x = this.stage.stageWidth * 0.5 - playBtn.width * 0.5;
            playBtn.y = this.stage.stageHeight * 0.5 - playBtn.height * 0.5;
            playBtn.touchEnabled = true;
            playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GameStart, this);

            let textfield = new egret.TextField();
            this.addChild(textfield);
            textfield.text = "下一盘";
            textfield.width = 200;
            textfield.textAlign = egret.HorizontalAlign.CENTER;
            textfield.size = 25;
            textfield.textColor = 0x000000;
            textfield.x = this.stage.stageWidth * 0.5 - textfield.width * 0.5;
            textfield.y = this.stage.stageHeight * 0.5 - textfield.height * 0.5;


            let resetBtn = GameUtil.createBitmapByName("btn_png");
            this.addChild(resetBtn);
            resetBtn.width = 160;
            resetBtn.height = 52;
            resetBtn.x = 5;
            resetBtn.y = 5;
            resetBtn.touchEnabled = true;
            resetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GameRest, this);

            let resetfield = new egret.TextField();
            this.addChild(resetfield);
            resetfield.text = "洗 牌";
            resetfield.width = 200;
            resetfield.textAlign = egret.HorizontalAlign.CENTER;
            resetfield.size = 25;
            resetfield.textColor = 0x000000;
            resetfield.x = -15;
            resetfield.y = 17;

            this.addChild(this.GameAlert);
        }

        //开始游戏
        private GameStart() {
            GameUtil.getCardBuffer();

            if (!GameUtil.getRound()) {
                this.Alert("牌数不足,请重新洗牌");
                return;
            }

            let playerCard1 = GameUtil.getCard(1);
            let playerCard1Type = GameUtil.getTypeByCard(playerCard1);
            let playerCard1Name = GameUtil.getCardTypeNamebyType(playerCard1Type);
            this.GamePlayer1.getCardsAndSet(playerCard1);
            // GamePlayer.setNiuText(playerCard1Name);

            let playerCard2 = GameUtil.getCard(2);
            let playerCard2Type = GameUtil.getTypeByCard(playerCard2);
            let playerCard2Name = GameUtil.getCardTypeNamebyType(playerCard2Type);
            this.GamePlayer2.getCardsAndSet(playerCard2);
            this.GamePlayer2.setNiuText(playerCard2Name);

            if (GameUtil.bankerIsWin(playerCard1, playerCard2)) {
                //庄家赢
                this.GamePlayer1.setNiuText(playerCard1Name + "--赢");
                this.GamePlayer1.setScoreText(this.scoreCost * GameUtil.getCardTypeCost(playerCard1Type));
                this.GamePlayer2.setScoreText(-this.scoreCost * GameUtil.getCardTypeCost(playerCard2Type));
            } else {
                //庄家输
                this.GamePlayer1.setNiuText(playerCard1Name + "--输");
                this.GamePlayer1.setScoreText(-this.scoreCost * GameUtil.getCardTypeCost(playerCard1Type));
                this.GamePlayer2.setScoreText(this.scoreCost * GameUtil.getCardTypeCost(playerCard2Type));
            }
        }

        //飘字提示
        private Alert(str: string) {
            this.GameAlert.AlertStr(str);
        }

        //重置游戏,重新洗牌
        private GameRest() {
            GameUtil.resetGame();

            this.GamePlayer1.reset();
            this.GamePlayer2.reset();
        }
    }

}