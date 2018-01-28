var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NiuNiu;
(function (NiuNiu) {
    var GameUtil = (function () {
        function GameUtil() {
        }
        return GameUtil;
    }());
    NiuNiu.GameUtil = GameUtil;
    __reflect(GameUtil.prototype, "NiuNiu.GameUtil");
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    NiuNiu.createBitmapByName = createBitmapByName;
})(NiuNiu || (NiuNiu = {}));
//# sourceMappingURL=GameUtil.js.map