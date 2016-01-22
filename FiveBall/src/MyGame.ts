/**
 * Created by lenovo on 2014-10-11.
 */
class MyGame extends egret.DisplayObjectContainer
{
    // Game精灵
    private sprGame:egret.Sprite;

    // 点击的坐标
    private _pointClicked:egret.Point;

    // 测试文本
    private textLog:egret.TextField;
    //private textCount:number = 0;

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStaget, this);
    }

    private gameView:GameView;      //游戏视图

    private onAddToStaget():void
    {
        DataManage._nScore = 0;

        this.createGameTable();
    }

    private createGameTable() : void
    {
        // 加入Game精灵
        this.sprGame = new egret.Sprite();
        this.addChild( this.sprGame );

        this.initData();
        //创建游戏静态界面
        this.gameView = new GameView();
        this.gameView.createStaticView( this.sprGame );

        /*
        this.textLog = new egret.TextField();
        this.textLog.x = DataManage.winHalfWidth;
        this.textLog.y = DataManage.winHeight * 0.85;
        this.textLog.anchorX = 0.5;
        this.textLog.anchorY = 0.5;
        this.textLog.size = 20;
        this.textLog.textAlign = egret.HorizontalAlign.CENTER;
        this.textLog.textColor = 0xFFFF00;
        this.textLog.text = "测试";
        this.textLog.strokeColor = 0xFF0000;
        this.textLog.stroke = 2;
        this.sprGame.addChild(this.textLog);
        */

        // 绘出诞生小球
        this.createRandThreeBall();
        // 增加小球点击消息响应
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickChess, this);

    }

    private initData():void
    {
        for(var i = 0; i < 81; i++)
        {
            DataManage._nBallIndex[i] = 0;
            DataManage._nRectData[i] = 0;
        }
        DataManage._nBallIndex[81] = 0;
        this._pointClicked = new egret.Point();
        this._pointClicked.x = -1;
        this._pointClicked.y = -1;
    }

    // 随即诞生三个小球
    private createRandThreeBall()
    {
        for(var i = 0; i < 3; i++)
        {
            var nColor:number;
            var pointEmpty:egret.Point;
            pointEmpty = DataManage.getEmptyBox();
            console.log("获取空白点坐标X：" + String(pointEmpty.x) + "Y：" + String(pointEmpty.y));
            if((-1 == pointEmpty.x) && (-1 == pointEmpty.y))
            {
                console.log("小球已满Box");
                break;
            }
            nColor = Math.floor(Math.random() * 6);
            var nIndex = DataManage.getEmptyIndex();
            console.log("获取空白Index：" + String(nIndex));
            if(nIndex > 81)
            {
                console.log("小球已满nIndex");
                break;
            }
            // 给格子内数据赋值
            DataManage._nRectData[DataManage.getNumberByXY(pointEmpty)] = nIndex;
            DataManage.sprBall[nIndex] = new MyBall(pointEmpty.x, pointEmpty.y, nColor);
            this.sprGame.addChild(DataManage.sprBall[nIndex]);
            console.log("随机小球位置X:" + pointEmpty.x + " Y:" + pointEmpty.y + " 颜色:" + nColor);
            // 监听事件
            ///////////////////////////
            DataManage.sprBall[nIndex].addEventListener(EventClick.DATE, this.disposeClickMsg, this);
        }
        // 小球结算情况
        this.ClearAndScore();
        // 判断是否游戏结束
        if ( this.isGameOver() )
        {
            console.log("Game Over!");
            this.removeChild(this.sprGame);
            var sceneOver:GameOver = new GameOver();
            this.addChild(sceneOver);
        }
        //this.ShowRect();
    }
    // 测试显示
    private ShowRect()
    {
        var point:egret.Point;

        point = new egret.Point();

        this.textLog.text = "";

        for ( var i = 0; i < 9; i++)
        {
            for ( var j = 0; j < 9; j++)
            {
                point.x = j;
                point.y = i;
                if ( 0 == DataManage._nRectData[DataManage.getNumberByXY(point)] )
                {
                    this.textLog.text += "-  ";
                }
                else
                {
                    this.textLog.text += String(DataManage.sprBall[DataManage._nRectData[DataManage.getNumberByXY(point)]].nColor) + "  ";
                }
            }
            this.textLog.text += "\n";
        }
    }
    // 清理小球，更新分数
    private ClearAndScore()
    {
        var judge:JudgePoint;
        var nTmpNumber:number;
        // 小球得分结算
        judge = RuleManage.JudgeAllSuccess();
        while( judge.nCount >= 5 )
        {
            nTmpNumber = judge.nNumber;
            // 清理小球
            for( var i = 0; i < judge.nCount; i++ )
            {
                var tw = egret.Tween.get(DataManage.sprBall[DataManage._nRectData[nTmpNumber]].imgBall);
                tw.to({rotation:360, alpha: 0.1}, 500).call(this.RemoveMyBall, this, [DataManage._nRectData[nTmpNumber]]);
                DataManage._nBallIndex[DataManage._nRectData[nTmpNumber]] = 0;
                DataManage._nRectData[nTmpNumber] = 0;
                // 操作下个球。如果这是最后一个则不做处理
                if( i < judge.nCount - 1)
                {
                    switch (judge.nType)
                    {
                        case 1:
                        {
                            nTmpNumber = DataManage.getNumberByXY(RuleManage.Judge1Next(DataManage.getXYByNumber(nTmpNumber)));
                            break;
                        }
                        case 2:
                        {
                            nTmpNumber = DataManage.getNumberByXY(RuleManage.Judge2Next(DataManage.getXYByNumber(nTmpNumber)));
                            break;
                        }
                        case 3:
                        {
                            nTmpNumber = DataManage.getNumberByXY(RuleManage.Judge3Next(DataManage.getXYByNumber(nTmpNumber)));
                            break;
                        }
                        case 4:
                        {
                            nTmpNumber = DataManage.getNumberByXY(RuleManage.Judge4Next(DataManage.getXYByNumber(nTmpNumber)));
                            break;
                        }
                        default:
                        {
                            console.log("judge.nType值异常！！！！");
                            break;
                        }
                    }
                }
            }
            // 增加对应分数
            DataManage._nScore+= 5 * judge.nCount;
            this.gameView.updateScrore();
            // 再查找一边
            judge = RuleManage.JudgeAllSuccess();
        }
    }
    // 判断游戏是否结束
    private isGameOver():boolean
    {
        var point:egret.Point = new egret.Point();
        var nNum:number;

        for(point.x = 0; point.x < 9; point.x++ )
        {
            for(point.y = 0; point.y < 9; point.y++)
            {
                nNum = DataManage.getNumberByXY(point);
                if ( !DataManage._nRectData[nNum] )
                {
                    return false;
                }
            }
        }
        return true;

    }

    private RemoveMyBall(nDoIndex)
    {
        this.sprGame.removeChild(DataManage.sprBall[nDoIndex]);

    }

    private disposeClickMsg(evt:EventClick)
    {
        var pointEvent:egret.Point;
        pointEvent = new egret.Point();
        pointEvent.x = evt._ClickX;
        pointEvent.y = evt._ClickY;
        var nNumberNew:number;
        nNumberNew = DataManage.getNumberByXY(pointEvent);
        console.log("New Number:" + String(nNumberNew));
        var nIndexNew:number;
        nIndexNew = DataManage._nRectData[nNumberNew];
        console.log("New Index:" + String(nIndexNew));

        var nNumberOld:number;
        nNumberOld = DataManage.getNumberByXY(this._pointClicked);
        console.log("Old Number:" + String(nNumberOld));
        var nIndexOld:number;
        nIndexOld = DataManage._nRectData[nNumberOld];
        console.log("Old Index:" + String(nIndexOld));

        console.log("收到点击事件请求");
        // 如果小球前后坐标相同
        if( (this._pointClicked.x == evt._ClickX) && (this._pointClicked.y == evt._ClickY))
        {
            DataManage.sprBall[nIndexNew].CancelClick();
            console.log("取消跳动");
            this._pointClicked.x = -1;
            this._pointClicked.y = -1;
        }
        else
        {
            // 点击目标则更改到该小球上
            if(!((this._pointClicked.x == -1) || (this._pointClicked.y == -1)))
            {
                DataManage.sprBall[nIndexOld].CancelClick();
            }
            DataManage.sprBall[nIndexNew].OKClick();
            console.log("更换跳动对象");
            this._pointClicked.x = evt._ClickX;
            this._pointClicked.y = evt._ClickY;
        }

    }
    // 点击棋盘消息响应
    private onClickChess(evt:egret.TouchEvent):void
    {
        var pointChess:egret.Point;
        pointChess = new egret.Point();
        pointChess.x = Math.floor((evt.stageX - (DataManage.winWidth * 0.5 - DataManage._nPerBox * 4.5)) / DataManage._nPerBox);
        pointChess.y = Math.floor((evt.stageY - (DataManage.winHeight * 0.5 - DataManage._nPerBox * 4.5)) / DataManage._nPerBox);
        //console.log("点空坐标。X:" + evt.stageX + "Y:" + evt.stageY);
        console.log("点击的棋盘坐标。X:" + pointChess.x + "Y:" + pointChess.y);
        // 如果超出棋盘范围，直接跳出
        if(pointChess.x < 0 || pointChess.y < 0 || pointChess.x > 8 || pointChess.y > 8)
        {
            console.log("超出棋盘范围");
        }
        else
        {
            if( 0 == DataManage.isExistBall(pointChess) )
            {
                // 错误、小球先触发了赋值工作
                if((this._pointClicked.x != -1) && (this._pointClicked.y != -1))
                {
                    this.MoveToBall(pointChess);
                    this._pointClicked.x = -1;
                    this._pointClicked.y = -1;
                }
            }
        }
    }

    // 移动小球处理函数
    private MoveToBall(pointNew:egret.Point):void
    {
        var nNumberOld:number;
        nNumberOld = DataManage.getNumberByXY(this._pointClicked);
        console.log("Old Number:" + String(nNumberOld));
        var nIndexOld:number;
        nIndexOld = DataManage._nRectData[nNumberOld];
        console.log("Old Index:" + String(nIndexOld));

        // RectData数据移动
        DataManage.MoveRectData(this._pointClicked, pointNew);
        // 移动小球XY赋值 及的Cancel消息处理。
        DataManage.sprBall[nIndexOld].nBallX = pointNew.x;
        DataManage.sprBall[nIndexOld].nBallY = pointNew.y;
        // 小球的动作处理
        var tw = egret.Tween.get(DataManage.sprBall[nIndexOld].imgBall);
        tw.to({x:DataManage.getChessX(pointNew.x), y:DataManage.getChessY(pointNew.y)}, 500).call(DataManage.sprBall[nIndexOld].CancelClick, DataManage.sprBall[nIndexOld]).call(this.createRandThreeBall, this);

    }
}