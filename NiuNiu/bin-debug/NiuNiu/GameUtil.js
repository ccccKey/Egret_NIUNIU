var GameUtil;
(function (GameUtil) {
    // export enum CardColor {
    //     Spade = 1,         //黑桃  
    //     Heart = 2,         //红桃  
    //     Plum = 3,         //梅花  
    //     Block = 4,         //方块 
    // }
    // export enum CardValue {
    //     card_A = 1,
    //     card_2 = 2,
    //     card_3 = 3,
    //     card_4 = 4,
    //     card_5 = 5,
    //     card_6 = 6,
    //     card_7 = 7,
    //     card_8 = 8,
    //     card_9 = 9,
    //     card_10 = 10,
    //     card_J = 11,
    //     card_Q = 12,
    //     card_K = 13,
    // }
    //扑克数据  
    // export let CardData = new Array(0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D,
    //     0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D,
    //     0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D,
    //     0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D);
    var CardType;
    (function (CardType) {
        CardType[CardType["NOT_NIU"] = 0] = "NOT_NIU";
        CardType[CardType["NIU_1"] = 1] = "NIU_1";
        CardType[CardType["NIU_2"] = 2] = "NIU_2";
        CardType[CardType["NIU_3"] = 3] = "NIU_3";
        CardType[CardType["NIU_4"] = 4] = "NIU_4";
        CardType[CardType["NIU_5"] = 5] = "NIU_5";
        CardType[CardType["NIU_6"] = 6] = "NIU_6";
        CardType[CardType["NIU_7"] = 7] = "NIU_7";
        CardType[CardType["NIU_8"] = 8] = "NIU_8";
        CardType[CardType["NIU_9"] = 9] = "NIU_9";
        CardType[CardType["NIU_NIU"] = 10] = "NIU_NIU";
        CardType[CardType["SILVER_NIU"] = 11] = "SILVER_NIU";
        CardType[CardType["GOLD_NIU"] = 12] = "GOLD_NIU";
        CardType[CardType["BOMB"] = 13] = "BOMB";
        CardType[CardType["SMALL_NIU"] = 14] = "SMALL_NIU";
    })(CardType || (CardType = {}));
    var CardData = new Array(); //原始牌库
    var cardBuffer = new Array(); //洗牌后的牌库
    var card1 = new Array(); //庄家的牌
    var card2 = new Array(); //玩家的牌
    var gameRound = 0; //游戏进行的次数
    var canClick = true;
    function getCard(zType) {
        if (zType == 1) {
            return card1;
        }
        else {
            return card2;
        }
    }
    GameUtil.getCard = getCard;
    function getRound() {
        if (gameRound > 5) {
            return false;
        }
        else {
            return true;
        }
    }
    function getCountByValue(value) {
        if (value > 10) {
            return 10;
        }
        else {
            return value;
        }
    }
    function RandCardList() {
        // let randCount = 1;
        // let position = 1;
        // // Math.random
        // for (let i = 0; i < bufferCount; i++) {
        //     let ranOne = Math.round(Math.random() * (bufferCount - i));
        //     CardData[ranOne], CardData[bufferCount - i] = CardData[bufferCount - i], CardData[ranOne];
        // }
        // let cardBuffer = new Array();
        // for (let i = 0; i < bufferCount; i++) {
        //     cardBuffer[i] = CardData[i];
        // }
        // return cardBuffer;
        var cardColors = randUnique(1, 4, 4);
        var cardNums = randUnique(1, 13, 13);
        for (var i = 0; i < cardNums.length; i++) {
            for (var j = 0; j < cardColors.length; j++) {
                var card = [cardColors[j], cardNums[i]];
                CardData.push(card);
            }
        }
        cardBuffer = [];
        var randomNum = randUnique(1, CardData.length, CardData.length);
        for (var i = 0; i < randomNum.length; i++) {
            if (randomNum[i] == CardData.length) {
                cardBuffer.push(CardData[randomNum[0]]);
            }
            else {
                cardBuffer.push(CardData[randomNum[i]]);
            }
        }
    }
    // export function BitBand(a: number, b: number) {
    //     return a & b;
    // }
    function randUnique(start, end, size) {
        // 全部随机数值  
        var allNums = new Array;
        // 判断获取随机数个数  
        size = size ? (size > end - start ? end - start : size) : 1;
        // 生成随机数值区间数组  
        for (var i = start, k = 0; i <= end; i++, k++) {
            allNums[k] = i;
        }
        // 打撒数组排序  
        allNums.sort(function () { return 0.5 - Math.random(); });
        // 获取数组从第一个开始到指定个数的下标区间  
        // return allNums.slice(0, size);
        return allNums;
    }
    function getCardBuffer() {
        gameRound++;
        if (!getRound()) {
            console.log("游戏结束,请重新洗牌");
            return;
        }
        card1 = [];
        card2 = [];
        var nums = 0;
        for (var i = (gameRound - 1) * 10; i < gameRound * 10; i++) {
            // let CardColor = BitBand(cardBuffer[i], 0Xf0) / 16 + 1;
            // let CardValue = BitBand(cardBuffer[i], 0x0f);
            nums++;
            var CardColor = cardBuffer[i][0];
            var CardValue = cardBuffer[i][1];
            var CardCount = getCountByValue(cardBuffer[i][1]);
            var cardInfo = [CardColor, CardValue, CardCount];
            if (nums < 6) {
                card1.push(cardInfo);
            }
            else {
                card2.push(cardInfo);
            }
        }
    }
    GameUtil.getCardBuffer = getCardBuffer;
    //判断庄家是否赢
    function bankerIsWin(banker_cards, other_cards) {
        var banker_cardType = getTypeByCard(banker_cards);
        var other_cardType = getTypeByCard(other_cards);
        if (banker_cardType != other_cardType) {
            return banker_cardType > other_cardType;
        }
        if (banker_cardType == CardType.SMALL_NIU) {
            return true;
        }
        if (banker_cardType == CardType.BOMB) {
            return banker_cards[2][1] > other_cards[2][1];
        }
        if (banker_cardType == CardType.GOLD_NIU) {
            return compByCardsValue(other_cards[4], banker_cards[4]);
        }
        if (banker_cardType == CardType.SILVER_NIU) {
            return compByCardsValue(other_cards[4], banker_cards[4]);
        }
        if (banker_cardType == CardType.NIU_NIU) {
            return compByCardsValue(other_cards[4], banker_cards[4]);
        }
        if (banker_cardType == CardType.NOT_NIU) {
            return compByCardsValue(other_cards[4], banker_cards[4]);
        }
        return true;
    }
    GameUtil.bankerIsWin = bankerIsWin;
    //判断牌面类型
    function getTypeByCard(cards) {
        // Array.prototype.sort()
        var cardtype = CardType.NOT_NIU;
        if (is_small_niu(cards)) {
            cardtype = CardType.SMALL_NIU;
            return cardtype;
        }
        // if(is_bomb(cards)){
        //     cardtype = CardType.BOMB;
        //     return cardtype;
        // }
        // if(is_gold_niu(cards)){
        //     cardtype = CardType.GOLD_NIU;
        //     return cardtype;
        // }
        // if(is_silver_niu(cards)){
        //     cardtype = CardType.SILVER_NIU;
        //     return cardtype;
        // }
        cardtype = getNiuByCard(cards);
        return cardtype;
    }
    GameUtil.getTypeByCard = getTypeByCard;
    //判断牌面不过十
    function is_small_niu(cards) {
        var sum = 0;
        for (var i = 0; i < cards.length; i++) {
            sum = sum + cards[i][2];
        }
        if (sum <= 10) {
            return true;
        }
        else {
            return false;
        }
    }
    //判断是否金刚
    function is_bomb(cards) {
        if (cards[0][1] == cards[3][1]) {
            return true;
        }
        else if (cards[1][1] == cards[4][1]) {
            return true;
        }
        else {
            return false;
        }
    }
    //判断是否银牛
    function is_silver_niu(cards) {
        if (cards[2][1] > 10 && cards[1][1] == 10) {
            return true;
        }
        else {
            return false;
        }
    }
    //判断是否金牛
    function is_gold_niu(cards) {
        if (cards[0][1] > 10) {
            return true;
        }
        else {
            return false;
        }
    }
    //判断有没有牛
    function getNiuByCard(cards) {
        var lave = 0;
        for (var i = 0; i < cards.length; i++) {
            lave = lave + cards[i][2];
        }
        lave = lave % 10;
        for (var i = 0; i < cards.length - 1; i++) {
            for (var j = i + 1; j < cards.length; j++) {
                if ((cards[i][2] + cards[j][2]) % 10 == lave) {
                    if (lave == 0) {
                        return 10;
                    }
                    else {
                        return lave;
                    }
                }
            }
        }
        return 0;
    }
    //对比牌面大小
    function compByCardsValue(a, b) {
        if (a[1] < b[1]) {
            return true;
        }
        if (a[1] > b[1]) {
            return false;
        }
        return a[0] < b[0];
    }
    function sortCards(a, b) {
    }
    function getCardTypeNamebyType(zType) {
        switch (zType) {
            case CardType.NOT_NIU:
                return "没牛";
            case CardType.NIU_1:
                return "牛一";
            case CardType.NIU_2:
                return "牛二";
            case CardType.NIU_3:
                return "牛三";
            case CardType.NIU_4:
                return "牛四";
            case CardType.NIU_5:
                return "牛五";
            case CardType.NIU_6:
                return "牛六";
            case CardType.NIU_7:
                return "牛七";
            case CardType.NIU_8:
                return "牛八";
            case CardType.NIU_9:
                return "牛九";
            case CardType.NIU_NIU:
                return "牛牛";
            case CardType.SILVER_NIU:
                return "银牛";
            case CardType.GOLD_NIU:
                return "金牛";
            case CardType.BOMB:
                return "炸弹";
            case CardType.SMALL_NIU:
                return "五小牛";
        }
        return "异常牌型";
    }
    GameUtil.getCardTypeNamebyType = getCardTypeNamebyType;
    //重置游戏
    function resetGame() {
        gameRound = 0;
        RandCardList();
    }
    GameUtil.resetGame = resetGame;
    // export class GameUtil {
    //     public i: number = 1;
    //     private statusTimer: egret.Timer = null;
    //     public setStatusTimer(status: number, sec: number) {
    //         if (this.statusTimer) {
    //             this.statusTimer.stop();
    //             this.statusTimer.repeatCount = sec;
    //             this.statusTimer.start()
    //         } else {
    //             this.statusTimer = new egret.Timer(1000, sec);
    //             this.statusTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.statusTimerOut, this);
    //             this.statusTimer.start();
    //         }
    //     }
    //     private statusTimerOut(e: egret.Timer) {
    //         this.statusTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.statusTimerOut, this);
    //         this.statusTimer = null;
    //     }
    // }
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    GameUtil.createBitmapByName = createBitmapByName;
    function getStatus() {
        return this.canClick;
    }
    GameUtil.getStatus = getStatus;
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=GameUtil.js.map