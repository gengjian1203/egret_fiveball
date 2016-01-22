var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Administrator on 2014/10/5.
*/
var MyMenu = (function (_super) {
    __extends(MyMenu, _super);
    function MyMenu() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStaget, this);
    }
    MyMenu.prototype.onAddToStaget = function () {
        this.DrawUI();
    };

    MyMenu.prototype.DrawUI = function () {
        // 获取屏幕大小
        DataManage.winWidth = this.stage.stageWidth;
        DataManage.winHeight = this.stage.stageHeight;
        DataManage.winHalfWidth = this.stage.stageWidth * 0.5;
        DataManage.winHalfHeight = this.stage.stageHeight * 0.5;
        DataManage._nPerBox = DataManage.winWidth / 10;

        // 绘制背景
        this.bgContain = new egret.Sprite();
        this.bgContain.graphics.beginFill(0xC898F5);
        this.bgContain.graphics.drawRect(0, 0, DataManage.winWidth, DataManage.winHeight);
        this.bgContain.graphics.endFill();
        this.addChild(this.bgContain);

        // 添加Menu精灵
        this.sprMenu = new egret.Sprite();
        this.addChild(this.sprMenu);

        // 游戏名称
        this.strGameName = new egret.TextField();
        this.strGameName.x = DataManage.winHalfWidth;
        this.strGameName.y = DataManage.winHeight * 0.1;
        this.strGameName.anchorX = 0.5;
        this.strGameName.anchorY = 0.5;
        this.strGameName.size = 40;
        this.strGameName.textAlign = egret.HorizontalAlign.CENTER;
        this.strGameName.textColor = 0xFFFF00;
        this.strGameName.text = "玖玖五子连珠";
        this.strGameName.strokeColor = 0xFF0000;
        this.strGameName.stroke = 2;
        this.sprMenu.addChild(this.strGameName);

        // 书写游戏规则
        this.strGameRule = new egret.TextField();
        this.strGameRule.x = DataManage.winHalfWidth;
        this.strGameRule.y = DataManage.winHeight * 0.3;
        this.strGameRule.anchorX = 0.5;
        this.strGameRule.anchorY = 0.5;
        this.strGameRule.size = 25;
        this.strGameRule.textAlign = egret.HorizontalAlign.CENTER;
        this.strGameRule.textColor = 0x000000;
        this.strGameRule.text = "游戏目标：\n移动小球，把相同颜色的小球\n连成5个以上\n就算得分并且消去。\n比比看谁的得分最高。（测试版）\n\n移动小球方法:\n1、点击小球。\n2、点击空白区域。\n";
        this.sprMenu.addChild(this.strGameRule);

        // 添加开始按钮
        this.btnStart = new egret.Bitmap();
        this.btnStart.texture = RES.getRes("pngBtn");
        this.btnStart.x = DataManage.winHalfWidth;
        this.btnStart.y = DataManage.winHeight * 0.7;
        this.btnStart.anchorX = 0.5;
        this.btnStart.anchorY = 0.5;
        this.btnStart.scaleX = 3.5;
        this.btnStart.scaleY = 2.5;
        this.btnStart.touchEnabled = true;
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameStart, this);
        this.sprMenu.addChild(this.btnStart);

        // 绘制开始按钮字体
        this.strStart = new egret.TextField();
        this.strStart.x = DataManage.winHalfWidth;
        this.strStart.y = DataManage.winHeight * 0.7;
        this.strStart.anchorX = 0.5;
        this.strStart.anchorY = 0.5;
        this.strStart.size = 25;
        this.strStart._textAlign = egret.HorizontalAlign.CENTER;
        this.strStart.textColor = 0x000000;
        this.strStart.text = "开始游戏";
        this.sprMenu.addChild(this.strStart);

        // 绘制关于按钮
        this.btnAbout = new egret.Bitmap();
        this.btnAbout.texture = RES.getRes("pngBtn");
        this.btnAbout.x = DataManage.winHalfWidth;
        this.btnAbout.y = DataManage.winHeight * 0.8;
        this.btnAbout.anchorX = 0.5;
        this.btnAbout.anchorY = 0.5;
        this.btnAbout.scaleX = 3.5;
        this.btnAbout.scaleY = 2.5;
        this.btnAbout.touchEnabled = true;
        this.btnAbout.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGameAboutShow, this);
        this.btnAbout.addEventListener(egret.TouchEvent.TOUCH_END, this.onGameAboutHide, this);
        this.sprMenu.addChild(this.btnAbout);

        // 绘制关于按钮字体
        this.strAbout = new egret.TextField();
        this.strAbout.x = DataManage.winHalfWidth;
        this.strAbout.y = DataManage.winHeight * 0.8;
        this.strAbout.anchorX = 0.5;
        this.strAbout.anchorY = 0.5;
        this.strAbout.size = 25;
        this.strAbout._textAlign = egret.HorizontalAlign.CENTER;
        this.strAbout.textColor = 0x000000;
        this.strAbout.text = "关于我们";
        this.sprMenu.addChild(this.strAbout);

        // 绘制关于信息
        this.strShow = new egret.TextField();
        this.strShow.x = DataManage.winHalfWidth;
        this.strShow.y = DataManage.winHalfHeight;
        this.strShow.anchorX = 0.5;
        this.strShow.anchorY = 0.5;
        this.strShow.size = 20;
        this.strShow._textAlign = egret.HorizontalAlign.CENTER;
        this.strShow.textColor = 0x000000;
        this.strShow.strokeColor = 0xFFFFFF;
        this.strShow.stroke = 3;
        this.strShow.alpha = 0.0;
        this.strShow.text = "如果程序出现问题，请联系作者。\n我们尽快予以修复。\n在此感谢一切宝贵的意见。\nQQ：伞伊漆凌伊依衣散衣\n酝酿以堪";
        this.sprMenu.addChild(this.strShow);

        WeixinApi.ready(function (api) {
            var info = new WeixinShareInfo();

            info.title = "玖玖五子连珠";
            info.desc = "把相同颜色的珠珠连成5个以上就算得分，分享给好友，比比谁的得分最高！";
            info.link = "http://101.251.194.57/FiveBall/index.html";
            info.imgUrl = "http://101.251.194.57/FiveBall/gameIcon/Logo.png";

            api.shareToFriend(info);
            api.shareToTimeline(info);
        });
    };
    MyMenu.prototype.onGameStart = function () {
        this.removeChild(this.sprMenu);
        var game = new MyGame();
        this.addChild(game);
    };

    MyMenu.prototype.onGameAboutShow = function () {
        this.strShow.alpha = 1.0;
    };

    MyMenu.prototype.onGameAboutHide = function () {
        this.strShow.alpha = 0.0;
    };
    return MyMenu;
})(egret.DisplayObjectContainer);
MyMenu.prototype.__class__ = "MyMenu";
