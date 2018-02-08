module NiuNiu {

    export class GameHistoryRank extends egret.DisplayObjectContainer {

        private group = new eui.Group();
        private scrollView = new eui.Scroller();
        private nums = 0;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(e: egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

            this.width = 321;
            this.height = 340;

            this.initRank();
        }

        private initRank() {

            let bgKuang = GameUtil.createBitmapByName("kuang2_png");
            this.addChild(bgKuang);
            bgKuang.width = this.width;
            bgKuang.height = this.height;

            let title = new egret.TextField();
            this.addChild(title);
            title.text = "战 绩";
            title.width = this.width;
            title.textAlign = egret.HorizontalAlign.CENTER;
            title.size = 25;
            title.bold = true;
            title.x = 15;
            title.textColor = 0x000000;

            this.scrollView = new eui.Scroller();
            this.addChild(this.scrollView);
            this.scrollView.width = 200;
            this.scrollView.height = 260;
            this.scrollView.x = 73;
            this.scrollView.y = 40;
            this.scrollView.$blendMode

            this.group = new eui.Group();
            this.scrollView.viewport = this.group;
        }

        public addOne(cards1: Array<number>, cards2: Array<number>, isWin:boolean) {
            let playerCard1Type = GameUtil.getTypeByCard(cards1);
            let playerCard2Type = GameUtil.getTypeByCard(cards2);
            let playerCard1Name = GameUtil.getCardTypeNamebyType(playerCard1Type);
            let playerCard2Name = GameUtil.getCardTypeNamebyType(playerCard2Type);

            let str = "";
            if(isWin){
                str = "庄:" + playerCard1Name + " vs 玩家:" + playerCard2Name + "   赢";
            }else{
                str = "庄:" + playerCard1Name + " vs 玩家:" + playerCard2Name + "   输";
            }

            let rect = new eui.Rect();
            rect.width = this.scrollView.width;
            if(isWin){
                rect.fillColor = 0xff0000;
            }else{
                rect.fillColor = 0x00ff00;
            }
            rect.fillAlpha = 0.5;
            rect.height = 30;
            rect.y = 30 * this.nums + this.nums * 5;
            this.group.addChild(rect);

            let des = new egret.TextField();
            des.text = str;
            des.width = this.scrollView.width;
            des.textAlign = egret.HorizontalAlign.CENTER;
            des.size = 16;
            des.textColor = 0x000000;
            des.y = 30 * this.nums + this.nums * 5 + 10;
            this.group.addChild(des);

            console.log(this.scrollView.viewport.contentHeight);
            console.log(this.scrollView.viewport.height);

            //当排行榜超出框架,滚动到最下面
            if(this.scrollView.viewport.contentHeight > this.scrollView.viewport.height){
                this.scrollView.viewport.scrollV = this.scrollView.viewport.contentHeight - this.scrollView.viewport.height + 35;
            }

            this.nums++;
        }


    }

}