var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var NiuNiu;
(function (NiuNiu) {
    var GameController = (function (_super) {
        __extends(GameController, _super);
        function GameController() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GameController.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            GameUtil.resetGame();
            this.GameSetting();
        };
        GameController.prototype.GameSetting = function () {
            var GameBg = GameUtil.createBitmapByName("gameBg_jpg");
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
            var playBtn = GameUtil.createBitmapByName("btn_png");
            this.addChild(playBtn);
            playBtn.width = 160;
            playBtn.height = 52;
            playBtn.x = this.stage.stageWidth * 0.5 - playBtn.width * 0.5;
            playBtn.y = this.stage.stageHeight * 0.5 - playBtn.height * 0.5;
            playBtn.touchEnabled = true;
            playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GameStart, this);
            var textfield = new egret.TextField();
            this.addChild(textfield);
            textfield.text = "下一盘";
            textfield.width = 200;
            textfield.textAlign = egret.HorizontalAlign.CENTER;
            textfield.size = 25;
            textfield.textColor = 0x000000;
            textfield.x = this.stage.stageWidth * 0.5 - textfield.width * 0.5;
            textfield.y = this.stage.stageHeight * 0.5 - textfield.height * 0.5;
            var resetBtn = GameUtil.createBitmapByName("btn_png");
            this.addChild(resetBtn);
            resetBtn.width = 160;
            resetBtn.height = 52;
            resetBtn.x = 5;
            resetBtn.y = 5;
            resetBtn.touchEnabled = true;
            resetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GameRest, this);
            var resetfield = new egret.TextField();
            this.addChild(resetfield);
            resetfield.text = "重置";
            resetfield.width = 200;
            resetfield.textAlign = egret.HorizontalAlign.CENTER;
            resetfield.size = 25;
            resetfield.textColor = 0x000000;
            resetfield.x = -15;
            resetfield.y = 17;
        };
        //开始游戏
        GameController.prototype.GameStart = function () {
            GameUtil.getCardBuffer();
            var playerCard1 = GameUtil.getCard(1);
            var playerCard1Type = GameUtil.getTypeByCard(playerCard1);
            var playerCard1Name = GameUtil.getCardTypeNamebyType(playerCard1Type);
            this.GamePlayer1.getCardsAndSet(playerCard1);
            // GamePlayer.setNiuText(playerCard1Name);
            var playerCard2 = GameUtil.getCard(2);
            var playerCard2Type = GameUtil.getTypeByCard(playerCard2);
            var playerCard2Name = GameUtil.getCardTypeNamebyType(playerCard2Type);
            this.GamePlayer2.getCardsAndSet(playerCard2);
            this.GamePlayer2.setNiuText(playerCard2Name);
            if (GameUtil.bankerIsWin(playerCard1, playerCard2)) {
                //庄家赢
                this.GamePlayer1.setNiuText(playerCard1Name + "--赢");
            }
            else {
                //庄家输
                this.GamePlayer1.setNiuText(playerCard1Name + "--输");
            }
        };
        //重置游戏,重新洗牌
        GameController.prototype.GameRest = function () {
            GameUtil.resetGame();
            this.GamePlayer1.reset();
            this.GamePlayer2.reset();
        };
        return GameController;
    }(egret.DisplayObjectContainer));
    NiuNiu.GameController = GameController;
    __reflect(GameController.prototype, "NiuNiu.GameController");
})(NiuNiu || (NiuNiu = {}));
//# sourceMappingURL=GameController.js.map