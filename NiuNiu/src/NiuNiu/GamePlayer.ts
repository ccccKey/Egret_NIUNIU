module NiuNiu {

    export class GamePlayer extends egret.Sprite {

        private iconStr: string;
        private playerName: string;
        private score: number;
        private isMe: boolean = false;
        private niuText:egret.TextField;
        private cardArr = new Array();

        public constructor(zIcon: string, zName: string, zScore: number, zMe: boolean) {
            super();

            this.iconStr = zIcon;
            this.playerName = zName;
            this.score = zScore;
            this.isMe = zMe;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onStageCom, this);
        }

        private onStageCom(e: egret.Event) {
            this.width = 200;
            this.height = 150;
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onStageCom, this);

            this.initPlayer();
        }

        //初始化玩家
        private initPlayer() {
            let icon = GameUtil.createBitmapByName(this.iconStr);
            this.addChild(icon);
            icon.width = 100;
            icon.height = 100;

            let name = new egret.TextField();
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

            for (let i = 0; i < 5; i++) {
                let card = new NiuNiu.GameCard();
                this.addChild(card);
                card.x = 120 + (card.width + 10) * i;
                this.cardArr.push(card);

                if (this.isMe) {
                    name.y = this.height - 80;
                    card.y = 0;
                } else {
                    name.y = 0;
                    card.y = 40;
                }
            }
        }

        //设置这一轮的牌
        public getCardsAndSet(cards:Array<number>){
            for(let i = 0;i<cards.length;i++){
                this.setPlayerCard(i, cards[i][0], cards[i][1], cards[i][2]);
            }
        }

        //设置单张牌
        public setPlayerCard(zNum:number, flo:number, num:number, count:number) {
            let card = this.cardArr[zNum] as NiuNiu.GameCard;
            if(card){
                card.setCard(flo, num, count);
            }
        }

        //设置牌面文字
        public setNiuText(str:string){
            this.niuText.text = str;
        }

    }

}