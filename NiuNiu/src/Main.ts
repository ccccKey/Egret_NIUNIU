//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })

    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;
    private beginBtn:egret.Bitmap;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let sky = GameUtil.createBitmapByName("beginBg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        // var buttonSkin =
        //     `<e:Skin class="skins.ButtonSkin" states="up,down,disabled" minHeight="50" minWidth="100" xmlns:e="">
        //         <e:Image width="100%" height="100%" scale9Grid="1,3,8,8" alpha.disabled="0.5"
        //                  source="resource/button_up.png"
        //                  source.down="resource/btn_png.png"/>
        //         <e:Label id="labelDisplay" top="8" bottom="8" left="8" right="8"
        //                  textColor="0xFFFFFF" verticalAlign="middle" textAlign="center"/>
        //         <e:Image id="iconDisplay" horizontalCenter="0" verticalCenter="0"/>
        //     </e:Skin>`;

        // let btn = new eui.Button();
        // this.addChild(btn);
        // btn.x = this.stage.stageWidth * 0.5 - btn.width * 0.5;
        // btn.y = this.stage.stageHeight - btn.height - 50;
        // btn.label = "开始游戏";

        this.beginBtn = GameUtil.createBitmapByName("btn_png");
        this.addChild(this.beginBtn);
        this.beginBtn.x = this.stage.stageWidth * 0.5 - this.beginBtn.width * 0.5;
        this.beginBtn.y = this.stage.stageHeight - this.beginBtn.height - 50;
        this.beginBtn.touchEnabled = true;
        this.beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameStart, this);

        this.textfield = new egret.TextField();
        this.addChild(this.textfield);
        this.textfield.text = "开始游戏";
        this.textfield.width = stageW;
        this.textfield.textAlign = egret.HorizontalAlign.CENTER;
        this.textfield.size = 28;
        this.textfield.textColor = 0x000000;
        this.textfield.y = this.stage.stageHeight - 105;

    }

    private GameAlert = new NiuNiu.GameAlert();

    private onGameStart(e:egret.TouchEvent):void{
        this.beginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameStart, this);
        this.removeChild(this.beginBtn);
        this.removeChild(this.textfield);

        let GameC:NiuNiu.GameController = new NiuNiu.GameController();
        this.addChild(GameC);
    }
}