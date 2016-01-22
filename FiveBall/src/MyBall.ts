/**
 * Created by Administrator on 2014/10/7.
 */
class MyBall extends egret.DisplayObjectContainer
{
    // 小球图画
    public imgBall:egret.Bitmap;
    // 小球点击动画
    private twBallClick:egret.Tween;
    // MyBall属性
    public nBallX:number;
    public nBallY:number;
    public nColor:number;
    public bClicked:boolean = false;
    //public bRealClicked:boolean = false;

    public constructor(nX:number, nY:number, nCol:number)
    {
        super();

        this.nBallX = nX;
        this.nBallY = nY;
        this.nColor = nCol;

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage()
    //public CreateBall(nX:number, nY:number, nPer:number, nCol:number)
    {
        var imgBalls:egret.SpriteSheet = RES.getRes("Balls");
        this.imgBall = new egret.Bitmap();

        if( 0 == this.nColor ) {
            this.imgBall.texture = imgBalls.getTexture("ballRed");
        }
        else if( 1 == this.nColor ) {
            this.imgBall.texture = imgBalls.getTexture("ballYellow");
        }
        else if( 2 == this.nColor ) {
            this.imgBall.texture = imgBalls.getTexture("ballOrange");
        }
        else if( 3 == this.nColor) {
            this.imgBall.texture = imgBalls.getTexture("ballBlue");
        }
        else if( 4 == this.nColor) {
            this.imgBall.texture = imgBalls.getTexture("ballGreen");
        }
        else if( 5 == this.nColor) {
            this.imgBall.texture = imgBalls.getTexture("ballBlack");
        }
        else {
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
        tw.wait(80).to({width: DataManage._nPerBox, height: DataManage._nPerBox}, 180);
        // 增加小球点击消息响应
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBall, this);

    }

    private onClickBall(evt:egret.TouchEvent)
    {
        var eventClick:EventClick = new EventClick(EventClick.DATE);
        //添加对应的点击信息
        eventClick._ClickX = this.nBallX;
        eventClick._ClickY = this.nBallY;
        console.log("发出点击事件请求X:" + String(this.nBallX) + "Y:" + String(this.nBallY));
        //发送要求事件
        this.dispatchEvent(eventClick);

    }
    // 确定小球跳动函数
    public OKClick()
    {
        this.bClicked = true;
        // 小球点击动画
        this.twBallClick = egret.Tween.get(this.imgBall, {loop: true});
        this.twBallClick.to({width: DataManage._nPerBox * 0.8, height: DataManage._nPerBox * 1.2}, 150)
            .to({width: DataManage._nPerBox * 1.2, height: DataManage._nPerBox * 0.8}, 300)
            .to({width: DataManage._nPerBox * 0.9, height: DataManage._nPerBox * 1.1}, 100)
            .to({width: DataManage._nPerBox * 1.1, height: DataManage._nPerBox * 0.9}, 200)
            .to({width: DataManage._nPerBox, height: DataManage._nPerBox}, 200).wait(1000);
    }
    // 取消小球跳动函数
    public CancelClick()
    {
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
    }

}