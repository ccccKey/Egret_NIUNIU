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
    var GameHistoryRank = (function (_super) {
        __extends(GameHistoryRank, _super);
        function GameHistoryRank() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GameHistoryRank.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        };
        return GameHistoryRank;
    }(egret.DisplayObjectContainer));
    NiuNiu.GameHistoryRank = GameHistoryRank;
    __reflect(GameHistoryRank.prototype, "NiuNiu.GameHistoryRank");
})(NiuNiu || (NiuNiu = {}));
//# sourceMappingURL=GameHistoryRank.js.map