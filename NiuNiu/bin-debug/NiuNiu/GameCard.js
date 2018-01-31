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
    var GameCard = (function (_super) {
        __extends(GameCard, _super);
        function GameCard() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GameCard.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.initCard();
        };
        GameCard.prototype.initCard = function () {
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
        };
        GameCard.prototype.setCard = function (flo, num) {
            var floStr = "flo" + flo.toString() + "_png";
            this.flower.texture = RES.getRes(floStr);
            var numStr = num.toString();
            if (num == 1) {
                numStr = "A";
            }
            else if (num == 11) {
                numStr = "J";
            }
            else if (num == 12) {
                numStr = "Q";
            }
            else if (num == 13) {
                numStr = "K";
            }
            this.numTxt.text = numStr;
        };
        return GameCard;
    }(egret.Sprite));
    NiuNiu.GameCard = GameCard;
    __reflect(GameCard.prototype, "NiuNiu.GameCard");
})(NiuNiu || (NiuNiu = {}));
//# sourceMappingURL=GameCard.js.map