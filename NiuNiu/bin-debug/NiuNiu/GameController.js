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
            this.GameSetting();
        };
        GameController.prototype.GameSetting = function () {
            var GameBg = NiuNiu.createBitmapByName("gameBg_jpg");
            this.addChild(GameBg);
            GameBg.width = this.stage.stageWidth;
            GameBg.height = this.stage.stageHeight;
            var GamePlayer = new NiuNiu.GamePlayer("icon1_jpg", "key", 100000);
            this.addChild(GamePlayer);
            GamePlayer.x = this.stage.stageWidth * 0.5 - GamePlayer.width * 0.5;
            GamePlayer.y = this.stage.stageHeight - GamePlayer.height;
        };
        return GameController;
    }(egret.DisplayObjectContainer));
    NiuNiu.GameController = GameController;
    __reflect(GameController.prototype, "NiuNiu.GameController");
})(NiuNiu || (NiuNiu = {}));
//# sourceMappingURL=GameController.js.map