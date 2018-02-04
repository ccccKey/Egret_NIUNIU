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
    var GamePlayer = (function (_super) {
        __extends(GamePlayer, _super);
        function GamePlayer(zIcon, zName, zScore, zMe) {
            var _this = _super.call(this) || this;
            _this.isMe = false;
            _this.cardArr = new Array();
            _this.iconStr = zIcon;
            _this.playerName = zName;
            _this.score = zScore;
            _this.isMe = zMe;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onStageCom, _this);
            return _this;
        }
        GamePlayer.prototype.onStageCom = function (e) {
            this.width = 200;
            this.height = 150;
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onStageCom, this);
            this.initPlayer();
        };
        //初始化玩家
        GamePlayer.prototype.initPlayer = function () {
            var icon = GameUtil.createBitmapByName(this.iconStr);
            this.addChild(icon);
            icon.width = 100;
            icon.height = 100;
            var name = new egret.TextField();
            this.addChild(name);
            name.size = 24;
            name.x = 120;
            name.text = this.playerName + " score:" + this.score;
            this.niuText = new egret.TextField();
            this.addChild(this.niuText);
            this.niuText.size = 40;
            this.niuText.x = 400;
            this.niuText.y = 20;
            this.niuText.text = "";
            for (var i = 0; i < 5; i++) {
                var card = new NiuNiu.GameCard();
                this.addChild(card);
                card.x = 120 + (card.width + 10) * i;
                this.cardArr.push(card);
                if (this.isMe) {
                    name.y = this.height - 80;
                    card.y = 0;
                }
                else {
                    name.y = 0;
                    card.y = 40;
                }
            }
        };
        //设置这一轮的牌
        GamePlayer.prototype.getCardsAndSet = function (cards) {
            for (var i = 0; i < cards.length; i++) {
                this.setPlayerCard(i, cards[i][0], cards[i][1], cards[i][2]);
            }
        };
        //设置单张牌
        GamePlayer.prototype.setPlayerCard = function (zNum, flo, num, count) {
            var card = this.cardArr[zNum];
            if (card) {
                card.setCard(flo, num, count);
            }
        };
        //设置牌面文字
        GamePlayer.prototype.setNiuText = function (str) {
            this.niuText.text = str;
        };
        return GamePlayer;
    }(egret.Sprite));
    NiuNiu.GamePlayer = GamePlayer;
    __reflect(GamePlayer.prototype, "NiuNiu.GamePlayer");
})(NiuNiu || (NiuNiu = {}));
//# sourceMappingURL=GamePlayer.js.map