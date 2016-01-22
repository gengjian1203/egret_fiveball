/**
* Created by lenovo on 2014-10-11.
*/
var DataManage = (function () {
    function DataManage() {
    }
    //通过行和列得到Index编号
    DataManage.getNumberByXY = function (point) {
        return point.y * 9 + point.x;
    };

    // 通过Index编号来得到x、y
    DataManage.getXYByNumber = function (index) {
        var point = new egret.Point();
        point.y = Math.floor(index / 9);
        point.x = Math.floor(index % 9);

        return point;
    };

    // 获得棋盘某点X位置
    DataManage.getChessX = function (nX) {
        return DataManage.winHalfWidth - (4 - nX) * DataManage._nPerBox;
    };

    // 获得棋盘某点Y位置
    DataManage.getChessY = function (nY) {
        return DataManage.winHalfHeight - (4 - nY) * DataManage._nPerBox;
    };

    //找到随即空白格子，返回点
    DataManage.getEmptyBox = function () {
        var point = new egret.Point();
        point.x = -1;
        point.y = -1;
        var nNum = Math.floor(Math.random() * 80);
        for (var i = 0; i < 81; i++) {
            if (!DataManage._nRectData[nNum]) {
                point = DataManage.getXYByNumber(nNum);
                break;
            }
            nNum++;
            nNum = nNum % 81;
        }
        return point;
    };

    // 找到空白索引值
    DataManage.getEmptyIndex = function () {
        var i;
        for (i = 1; i < 82; i++) {
            if (!DataManage._nBallIndex[i]) {
                DataManage._nBallIndex[i] = 1;
                break;
            }
        }
        return i;
    };

    // 是否存在小球
    DataManage.isExistBall = function (pointClicked) {
        var nNum;
        nNum = DataManage.getNumberByXY(pointClicked);
        console.log("该点的RectData[" + String(nNum) + "]值为：" + String(DataManage._nRectData[nNum]));
        return DataManage._nRectData[nNum];
    };

    // 数据移动
    DataManage.MoveRectData = function (pointOld, pointNew) {
        DataManage._nRectData[DataManage.getNumberByXY(pointNew)] = DataManage._nRectData[DataManage.getNumberByXY(pointOld)];
        DataManage._nRectData[DataManage.getNumberByXY(pointOld)] = 0;
    };
    DataManage._nBallIndex = [];

    DataManage._nRectData = [];

    DataManage.sprBall = [];

    DataManage._nScore = 0;
    return DataManage;
})();
DataManage.prototype.__class__ = "DataManage";
