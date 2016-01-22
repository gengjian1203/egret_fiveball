/**
 * Created by lenovo on 2014-10-11.
 */
class DataManage
{
    // 获取设备宽高
    public static winWidth:number;
    public static winHeight:number;
    public static winHalfWidth:number;
    public static winHalfHeight:number;

    // 每个格子的大小
    public static _nPerBox:number;
    // 小球租信息
    public static _nBallIndex:Array<number> = [];  //索引值数据
    // 格子组信息
    public static _nRectData:Array<number> = [];   //所有的数据
    //public static _nousedata:Array<any> = [];  //位数用的数据
    //public static isRunning:boolean = true;   //是否运行中
    // 小球数组
    public static sprBall:Array<MyBall> = [];  //索引值数据

    // 分数
    public static _nScore:number = 0;   //分数

    //通过行和列得到Index编号
    public static  getNumberByXY(point:egret.Point):number
    {
        return point.y * 9 + point.x;
    }
    // 通过Index编号来得到x、y
    public static getXYByNumber(index:number):egret.Point
    {
        var point:egret.Point = new egret.Point();
        point.y = Math.floor( index / 9 );
        point.x = Math.floor( index % 9 );

        return point;
    }
    // 获得棋盘某点X位置
    public static getChessX(nX:number):number
    {
        return DataManage.winHalfWidth - (4 - nX) * DataManage._nPerBox;
    }
    // 获得棋盘某点Y位置
    public static getChessY(nY:number):number
    {
        return DataManage.winHalfHeight - (4 - nY) * DataManage._nPerBox;
    }
    //找到随即空白格子，返回点
    public static getEmptyBox():egret.Point
    {
        var point:egret.Point = new egret.Point();
        point.x = -1;
        point.y = -1;
        var nNum  = Math.floor(Math.random() * 80);
        for(var i = 0; i < 81; i ++)
        {
            if(!DataManage._nRectData[nNum])
            {
                point = DataManage.getXYByNumber(nNum);
                break;
            }
            nNum++;
            nNum = nNum % 81;
        }
        return point;
    }
    // 找到空白索引值
    public static getEmptyIndex():number
    {
        var i;
        for( i = 1; i < 82; i++ )
        {
            if(!DataManage._nBallIndex[i])
            {
                DataManage._nBallIndex[i] = 1;
                break;
            }
        }
        return i;
    }
    // 是否存在小球
    public static isExistBall(pointClicked:egret.Point):number
    {
        var nNum:number;
        nNum = DataManage.getNumberByXY(pointClicked);
        console.log("该点的RectData[" + String(nNum)+ "]值为：" + String(DataManage._nRectData[nNum]));
        return DataManage._nRectData[nNum];
    }
    // 数据移动
    public static MoveRectData(pointOld:egret.Point, pointNew:egret.Point)
    {
        DataManage._nRectData[DataManage.getNumberByXY(pointNew)] = DataManage._nRectData[DataManage.getNumberByXY(pointOld)]
        DataManage._nRectData[DataManage.getNumberByXY(pointOld)] = 0;
    }

}