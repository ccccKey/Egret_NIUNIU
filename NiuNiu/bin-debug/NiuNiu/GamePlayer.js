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
        function GamePlayer(zIcon, zName, zScore) {
            var _this = _super.call(this) || this;
            _this.iconStr = zIcon;
            _this.playerName = zName;
            _this.score = zScore;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onStageCom, _this);
            return _this;
        }
        GamePlayer.prototype.onStageCom = function (e) {
            this.width = 200;
            this.height = 150;
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onStageCom, this);
            this.initPlayer();
        };
        GamePlayer.prototype.initPlayer = function () {
            var icon = NiuNiu.createBitmapByName(this.iconStr);
            this.addChild(icon);
            icon.width = 150;
            icon.height = 150;
        };
        return GamePlayer;
    }(egret.Sprite));
    NiuNiu.GamePlayer = GamePlayer;
    __reflect(GamePlayer.prototype, "NiuNiu.GamePlayer");
})(NiuNiu || (NiuNiu = {}));
//# sourceMappingURL=GamePlayer.js.map