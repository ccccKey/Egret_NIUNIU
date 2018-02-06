module GameUtil {

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

    enum CardType {
        NOT_NIU = 0, //没牛
        NIU_1 = 1, //牛一
        NIU_2 = 2, //牛二
        NIU_3 = 3, //牛三
        NIU_4 = 4, //牛四
        NIU_5 = 5, //牛五
        NIU_6 = 6, //牛六
        NIU_7 = 7, //牛七
        NIU_8 = 8, //牛八
        NIU_9 = 9, //牛九
        NIU_NIU = 10, //牛牛
        SILVER_NIU = 11, //银牛
        GOLD_NIU = 12, //金牛
        BOMB = 13, //炸弹
        SMALL_NIU = 14, //五小牛
    }

    let CardData = new Array(); //原始牌库
    let cardBuffer = new Array(); //洗牌后的牌库
    let card1 = new Array(); //庄家的牌
    let card2 = new Array(); //玩家的牌
    let gameRound = 0; //游戏进行的次数

    let canClick: boolean = true;

    export function getCard(zType: number): Array<number> {
        if (zType == 1) {
            return card1;
        } else {
            return card2;
        }
    }

    export function getRound(): boolean {
        if (gameRound > 5) {
            return false;
        } else {
            return true;
        }
    }

    function getCountByValue(value: number) {
        if (value > 10) {
            return 10;
        } else {
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
        let cardColors = randUnique(1, 4, 4);
        let cardNums = randUnique(1, 13, 13);

        for (let i = 0; i < cardNums.length; i++) {
            for (let j = 0; j < cardColors.length; j++) {
                let card: number[] = [cardColors[j], cardNums[i]];
                CardData.push(card);
            }
        }

        cardBuffer = [];
        let randomNum = randUnique(1, CardData.length, CardData.length);
        for (let i = 0; i < randomNum.length; i++) {
            if (randomNum[i] == CardData.length) {
                cardBuffer.push(CardData[randomNum[0]]);
            } else {
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
        for (var i = start, k = 0; i <= end; i++ , k++) {
            allNums[k] = i;
        }

        // 打撒数组排序  
        allNums.sort(function () { return 0.5 - Math.random(); });

        // 获取数组从第一个开始到指定个数的下标区间  
        // return allNums.slice(0, size);
        return allNums;
    }

    export function getCardBuffer() {
        gameRound++;
        if (!getRound()) {
            console.log("游戏结束,请重新洗牌");
            return;
        }

        card1 = [];
        card2 = [];
        let nums = 0;
        for (let i = (gameRound - 1) * 10; i < gameRound * 10; i++) {
            // let CardColor = BitBand(cardBuffer[i], 0Xf0) / 16 + 1;
            // let CardValue = BitBand(cardBuffer[i], 0x0f);
            nums++;

            let CardColor = cardBuffer[i][0];
            let CardValue = cardBuffer[i][1];
            let CardCount = getCountByValue(cardBuffer[i][1]);
            let cardInfo: number[] = [CardColor, CardValue, CardCount];

            if (nums < 6) {
                card1.push(cardInfo);
            } else {
                card2.push(cardInfo);
            }
        }
    }

    //判断庄家是否赢
    export function bankerIsWin(banker_cards: Array<number>, other_cards: Array<number>): boolean {
        let banker_cardType = getTypeByCard(banker_cards);
        let other_cardType = getTypeByCard(other_cards);

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

    //判断牌面类型
    export function getTypeByCard(cards: Array<number>) {

        //冒泡排序,牌面从小到大
        for (let i = 0; i < cards.length - 1; i++) {
            for (let j = 0; j < cards.length - 1 - i; j++) {
                if (cards[j][1] > cards[j + 1][1]) {
                    var temp = cards[j];
                    cards[j] = cards[j + 1];
                    cards[j + 1] = temp;
                }
            }
        }

        let cardtype = CardType.NOT_NIU;

        if (is_small_niu(cards)) {
            cardtype = CardType.SMALL_NIU;
            return cardtype;
        }

        if(is_bomb(cards)){
            cardtype = CardType.BOMB;
            return cardtype;
        }

        if(is_gold_niu(cards)){
            cardtype = CardType.GOLD_NIU;
            return cardtype;
        }

        if(is_silver_niu(cards)){
            cardtype = CardType.SILVER_NIU;
            return cardtype;
        }

        cardtype = getNiuByCard(cards);

        return cardtype;
    }

    //判断牌面不过十
    function is_small_niu(cards: Array<number>): boolean {
        let sum = 0;
        for (let i = 0; i < cards.length; i++) {
            sum = sum + cards[i][2];
        }
        if (sum <= 10) {
            return true;
        } else {
            return false;
        }
    }

    //判断是否金刚
    function is_bomb(cards: Array<number>): boolean {
        if (cards[0][1] == cards[3][1]) {
            return true;
        } else if (cards[1][1] == cards[4][1]) {
            return true;
        } else {
            return false;
        }
    }

    //判断是否银牛
    function is_silver_niu(cards: Array<number>): boolean {
        if (cards[1][1] > 10 && cards[0][1] == 10) {
            return true;
        } else {
            return false;
        }
    }

    //判断是否金牛
    function is_gold_niu(cards: Array<number>): boolean {
        if (cards[0][1] > 10) {
            return true;
        } else {
            return false;
        }
    }

    //判断有没有牛
    function getNiuByCard(cards: Array<number>): number {
        let lave = 0;
        for (let i = 0; i < cards.length; i++) {
            lave = lave + cards[i][2];
        }
        lave = lave % 10;
        for (let i = 0; i < cards.length - 1; i++) {
            for (let j = i + 1; j < cards.length; j++) {
                if ((cards[i][2] + cards[j][2]) % 10 == lave) {
                    if (lave == 0) {
                        return 10;
                    } else {
                        return lave;
                    }
                }
            }
        }

        return 0;
    }

    //对比牌面大小
    function compByCardsValue(a: number, b: number): boolean {

        if (a[1] < b[1]) {
            return true;
        }

        if (a[1] > b[1]) {
            return false;
        }

        return a[0] < b[0];
    }

    function sortCards(a: number, b: number) {

    }

    export function getCardTypeNamebyType(zType: CardType): string {
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

    //返还分数倍数
    export function getCardTypeCost(zType: CardType): number {
        switch (zType) {
            case CardType.NOT_NIU:
                return 1;
            case CardType.NIU_1:
                return 1;
            case CardType.NIU_2:
                return 1;
            case CardType.NIU_3:
                return 1;
            case CardType.NIU_4:
                return 1;
            case CardType.NIU_5:
                return 1;
            case CardType.NIU_6:
                return 1;
            case CardType.NIU_7:
                return 2;
            case CardType.NIU_8:
                return 2;
            case CardType.NIU_9:
                return 2;
            case CardType.NIU_NIU:
                return 3;
            case CardType.SILVER_NIU:
                return 4;
            case CardType.GOLD_NIU:
                return 4;
            case CardType.BOMB:
                return 5;
            case CardType.SMALL_NIU:
                return 5;
        }

        return 1;
    }

    //重置游戏
    export function resetGame() {
        gameRound = 0;
        RandCardList();
    }

    export function createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    export function getStatus(): boolean {
        return this.canClick;
    }


}