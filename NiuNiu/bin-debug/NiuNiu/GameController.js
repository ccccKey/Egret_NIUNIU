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
            GameUtil.getCardBuffer();
            var GameBg = GameUtil.createBitmapByName("gameBg_jpg");
            this.addChild(GameBg);
            GameBg.width = this.stage.stageWidth;
            GameBg.height = this.stage.stageHeight;
            var GamePlayer = new NiuNiu.GamePlayer("icon1_jpg", "key", 100000, true);
            this.addChild(GamePlayer);
            GamePlayer.x = this.stage.stageWidth * 0.5 - GamePlayer.width * 0.5 - 50;
            GamePlayer.y = this.stage.stageHeight - 120;
            var playerCard1 = GameUtil.getCard(1);
            var playerCard1Type = GameUtil.getTypeByCard(playerCard1);
            var playerCard1Name = GameUtil.getCardTypeNamebyType(playerCard1Type);
            GamePlayer.getCardsAndSet(playerCard1);
            // GamePlayer.setNiuText(playerCard1Name);
            var GamePlayer2 = new NiuNiu.GamePlayer("icon2_jpg", "CC", 200000, false);
            this.addChild(GamePlayer2);
            GamePlayer2.x = this.stage.stageWidth * 0.5 - GamePlayer2.width * 0.5 - 50;
            GamePlayer2.y = 20;
            var playerCard2 = GameUtil.getCard(2);
            var playerCard2Type = GameUtil.getTypeByCard(playerCard2);
            var playerCard2Name = GameUtil.getCardTypeNamebyType(playerCard2Type);
            GamePlayer2.getCardsAndSet(playerCard2);
            GamePlayer2.setNiuText(playerCard2Name);
            if (GameUtil.bankerIsWin(playerCard1, playerCard2)) {
                //庄家赢
                GamePlayer.setNiuText(playerCard1Name + "--赢");
            }
            else {
                //庄家输
                GamePlayer.setNiuText(playerCard1Name + "--输");
            }
        };
        return GameController;
    }(egret.DisplayObjectContainer));
    NiuNiu.GameController = GameController;
    __reflect(GameController.prototype, "NiuNiu.GameController");
})(NiuNiu || (NiuNiu = {}));
//# sourceMappingURL=GameController.js.map