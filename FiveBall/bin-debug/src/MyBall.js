var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Administrator on 2014/10/7.
*/
var MyBall = (function (_super) {
    __extends(MyBall, _super);
    //public bRealClicked:boolean = false;
    function MyBall(nX, nY, nCol) {
        _super.call(this);
        this.bClicked = false;

        this.nBallX = nX;
        this.nBallY = nY;
        this.nColor = nCol;

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    MyBall.prototype.onAddToStage = function () {
        var imgBalls = RES.getRes("Balls");
        this.imgBall = new egret.Bitmap();

        if (0 == this.nColor) {
            this.imgBall.texture = imgBalls.getTexture("ballRed");
        } else if (1 == this.nColor) {
            this.imgBall.texture = imgBalls.getTexture("ballYellow");
        } else if (2 == this.nColor) {
            this.imgBall.texture = imgBalls.getTexture("ballOrange");
        } else if (3 == this.nColor) {
            this.imgBall.texture = imgBalls.getTexture("ballBlue");
        } else if (4 == this.nColor) {
            this.imgBall.texture = imgBalls.getTexture("ballGreen");
        } else if (5 == this.nColor) {
            this.imgBall.texture = imgBalls.getTexture("ballBlack");
        } else {
            this.imgBall.texture = imgBalls.getTexture("ballRed");
        }

        //this.imgBall.x = DataManage.winWidth * 0.5 - DataManage._nPerBox * 4 + DataManage._nPerBox * this.nBallX;
        //this.imgBall.y = DataManage.winHeight * 0.5 - DataManage._nPerBox * 4 + DataManage._nPerBox * this.nBallY;
        this.imgBall.x = DataManage.winHalfWidth - (4 - this.nBallX) * DataManage._nPerBox;
        this.imgBall.y = DataManage.winHalfHeight - (4 - this.nBallY) * DataManage._nPerBox;
        this.imgBall.anchorX = 0.5;
        this.imgBall.anchorY = 0.5;
        this.imgBall.width = 5;
        this.imgBall.height = 5;
        this.addChild(this.imgBall);

        // 增加小球诞生动画
        var tw = egret.Tween.get(this.imgBall);
        tw.wait(80).to({ width: DataManage._nPerBox, height: DataManage._nPerBox }, 180);

        // 增加小球点击消息响应
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBall, this);
    };

    MyBall.prototype.onClickBall = function (evt) {
        var eventClick = new EventClick(EventClick.DATE);

        //添加对应的点击信息
        eventClick._ClickX = this.nBallX;
        eventClick._ClickY = this.nBallY;
        console.log("发出点击事件请求X:" + String(this.nBallX) + "Y:" + String(this.nBallY));

        //发送要求事件
        this.dispatchEvent(eventClick);
    };

    // 确定小球跳动函数
    MyBall.prototype.OKClick = function () {
        this.bClicked = true;

        // 小球点击动画
        this.twBallClick = egret.Tween.get(this.imgBall, { loop: true });
        this.twBallClick.to({ width: DataManage._nPerBox * 0.8, height: DataManage._nPerBox * 1.2 }, 150).to({ width: DataManage._nPerBox * 1.2, height: DataManage._nPerBox * 0.8 }, 300).to({ width: DataManage._nPerBox * 0.9, height: DataManage._nPerBox * 1.1 }, 100).to({ width: DataManage._nPerBox * 1.1, height: DataManage._nPerBox * 0.9 }, 200).to({ width: DataManage._nPerBox, height: DataManage._nPerBox }, 200).wait(1000);
    };

    // 取消小球跳动函数
    MyBall.prototype.CancelClick = function () {
        this.bClicked = false;

        //this.bRealClicked = false;
        egret.Tween.removeTweens(this.imgBall);

        // 回复原装
        //this.imgBall.x = DataManage.winWidth * 0.5 - DataManage._nPerBox * 4 + DataManage._nPerBox * this.nBallX;
        //this.imgBall.y = DataManage.winHeight * 0.5 - DataManage._nPerBox * 4 + DataManage._nPerBox * this.nBallY;
        this.imgBall.x = DataManage.winHalfWidth - (4 - this.nBallX) * DataManage._nPerBox;
        this.imgBall.y = DataManage.winHalfHeight - (4 - this.nBallY) * DataManage._nPerBox;
        this.imgBall.width = DataManage._nPerBox;
        this.imgBall.height = DataManage._nPerBox;
        console.log("取消小球跳动函数");
    };
    return MyBall;
})(egret.DisplayObjectContainer);
MyBall.prototype.__class__ = "MyBall";
