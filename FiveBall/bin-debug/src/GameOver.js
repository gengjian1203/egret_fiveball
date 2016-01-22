var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by lenovo on 2014-10-15.
*/
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createUI, this);
    }
    GameOver.prototype.createUI = function () {
        var winWidth = this.stage.stageWidth;
        var winHeight = this.stage.stageHeight;

        this.bgContain = new egret.Sprite();
        this.bgContain.graphics.beginFill(0xf06060);
        this.bgContain.graphics.drawRect(0, 0, winWidth, winHeight);
        this.bgContain.graphics.endFill();
        this.addChild(this.bgContain);

        // 提示信息
        this.scoreLabel = new egret.TextField();
        this.scoreLabel.x = winWidth * 0.5;
        this.scoreLabel.y = winHeight * 0.2;
        this.scoreLabel.anchorX = 0.5;
        this.scoreLabel.anchorY = 0.5;
        this.scoreLabel.size = 20;
        this.scoreLabel.textAlign = egret.HorizontalAlign.CENTER;
        this.scoreLabel.textColor = 0x000000;
        this.scoreLabel.text = "这位英雄，\n你一口气创造了" + String(DataManage._nScore) + "的高分，\n" + String(DataManage._nScore / 5) + "珠当空，\n请做好穿越准备~ (¯(∞)¯) \n\n 点击右上角，分享朋友圈，看看小伙伴谁分数最高！";
        this.bgContain.addChild(this.scoreLabel);

        // 重玩按钮
        var reStartBtn = new egret.Bitmap();
        reStartBtn = new egret.Bitmap();
        reStartBtn.texture = RES.getRes("pngBtn");
        reStartBtn.x = winWidth * 0.5;
        reStartBtn.y = winHeight * 0.7;
        reStartBtn.anchorX = 0.5;
        reStartBtn.anchorY = 0.5;
        reStartBtn.scaleX = 3.5;
        reStartBtn.scaleY = 2.5;
        reStartBtn.touchEnabled = true;
        reStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startNewGame, this); //点击按钮开始游戏
        this.bgContain.addChild(reStartBtn);

        // 按钮文本
        this.btnLabel = new egret.TextField();
        this.btnLabel.x = winWidth * 0.5;
        this.btnLabel.y = winHeight * 0.7;
        this.btnLabel.anchorX = 0.5;
        this.btnLabel.anchorY = 0.5;
        this.btnLabel.size = 25;
        this.btnLabel.textAlign = egret.HorizontalAlign.CENTER;
        this.btnLabel.textColor = 0xFFFFFF;
        this.btnLabel.text = "再来一次";
        this.bgContain.addChild(this.btnLabel);

        WeixinApi.ready(function (api) {
            var info = new WeixinShareInfo();

            info.title = "运筹帷幄，凑齐" + String(DataManage._nScore / 5) + "颗龙珠，创造" + String(DataManage._nScore) + "的高分，就要召唤神龙，准备穿越了！";
            info.desc = "运筹帷幄，凑齐" + String(DataManage._nScore / 5) + "颗龙珠，创造" + String(DataManage._nScore) + "的高分，就要召唤神龙，准备穿越了！";
            info.link = "http://101.251.194.57/FiveBall/index.html";
            info.imgUrl = "http://101.251.194.57/FiveBall/gameIcon/Logo.png";

            api.shareToFriend(info);

            var timelineInfo = new WeixinShareInfo();

            timelineInfo.desc = "运筹帷幄，凑齐" + String(DataManage._nScore / 5) + "颗龙珠，创造" + String(DataManage._nScore) + "的高分，就要召唤神龙，准备穿越了！";
            timelineInfo.title = "运筹帷幄，凑齐" + String(DataManage._nScore / 5) + "颗龙珠，创造" + String(DataManage._nScore) + "的高分，就要召唤神龙，准备穿越了！";
            timelineInfo.link = "http://101.251.194.57/FiveBall/index.html";
            timelineInfo.imgUrl = "http://101.251.194.57/FiveBall/gameIcon/Logo.png";
            api.shareToTimeline(timelineInfo);
        });
    };

    GameOver.prototype.startNewGame = function () {
        this.removeChild(this.bgContain);
        var newGame = new MyGame();
        this.addChild(newGame);
    };
    return GameOver;
})(egret.DisplayObjectContainer);
GameOver.prototype.__class__ = "GameOver";
