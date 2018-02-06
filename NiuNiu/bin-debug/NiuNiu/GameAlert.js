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
    var GameAlert = (function (_super) {
        __extends(GameAlert, _super);
        function GameAlert() {
            var _this = _super.call(this) || this;
            _this.alertIng = false;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.OnStage, _this);
            return _this;
        }
        GameAlert.prototype.OnStage = function (e) {
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
        };
        GameAlert.prototype.AlertStr = function (str) {
            var _this = this;
            if (this.alertIng) {
                return;
            }
            this.alertIng = true;
            this.alertText.text = str;
            this.alertText.y = this.stage.stageHeight * 0.5;
            var tw = egret.Tween.get(this.alertText);
            tw.to({ y: this.stage.stageHeight * 0.5 - 200 }, 1000).call(function () {
                _this.alertIng = false;
                _this.alertText.text = "";
            });
        };
        return GameAlert;
    }(egret.Sprite));
    NiuNiu.GameAlert = GameAlert;
    __reflect(GameAlert.prototype, "NiuNiu.GameAlert");
})(NiuNiu || (NiuNiu = {}));
//# sourceMappingURL=GameAlert.js.map