module NiuNiu {

    let canClick:boolean = true;

    export class GameUtil {

        private statusTimer:egret.Timer = null;

        public setStatusTimer(status:number, sec:number){
            if(this.statusTimer){
                this.statusTimer.stop();

                this.statusTimer.repeatCount = sec;
                this.statusTimer.start()
            }else{
                this.statusTimer = new egret.Timer(1000, sec);
                this.statusTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.statusTimerOut, this);
                this.statusTimer.start();
            }
        }

        private statusTimerOut(e:egret.Timer){
            this.statusTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.statusTimerOut, this);
            this.statusTimer = null;
        }
    }

    export function createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    export function getStatus():boolean{
        return this.canClick;
    }
}