var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NiuNiu;
(function (NiuNiu) {
    var canClick = true;
    var GameUtil = (function () {
        function GameUtil() {
            this.statusTimer = null;
        }
        GameUtil.prototype.setStatusTimer = function (status, sec) {
            if (this.statusTimer) {
                this.statusTimer.stop();
                this.statusTimer.repeatCount = sec;
                this.statusTimer.start();
            }
            else {
                this.statusTimer = new egret.Timer(1000, sec);
                this.statusTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.statusTimerOut, this);
                this.statusTimer.start();
            }
        };
        GameUtil.prototype.statusTimerOut = function (e) {
            this.statusTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.statusTimerOut, this);
            this.statusTimer = null;
        };
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
    function getStatus() {
        return this.canClick;
    }
    NiuNiu.getStatus = getStatus;
})(NiuNiu || (NiuNiu = {}));
//# sourceMappingURL=GameUtil.js.map