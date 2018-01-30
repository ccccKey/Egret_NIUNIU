module NiuNiu {

    export class GamePlayer extends egret.Sprite {

        private iconStr:string;
        private playerName:string;
        private score:number;

        public constructor(zIcon:string, zName:string, zScore:number) {
            super();

            this.iconStr = zIcon;
            this.playerName = zName;
            this.score = zScore;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onStageCom, this);
        }

        private onStageCom(e: egret.Event) {
            this.width = 200;
            this.height = 150;
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onStageCom, this);
            this.initPlayer();
        }

        private initPlayer() {
            let icon = NiuNiu.createBitmapByName(this.iconStr);
            this.addChild(icon);
            icon.width = 100;
            icon.height = 100;

            let name = new egret.TextField();
            this.addChild(name);
            name.size = 24;
            name.x = 120;
            name.y = this.height - 80;
            name.text = this.playerName + " score:" + this.score;

            let card1 = NiuNiu.createBitmapByName("kuang_png");
            this.addChild(card1);
            card1.width = 40;
            card1.height = 60;
            card1.x = 120;
        }

    }

}