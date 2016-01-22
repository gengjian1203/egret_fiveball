/**
* Created by Administrator on 2014/10/12.
*/
var RuleManage = (function () {
    function RuleManage() {
    }
    // 判断是否得分得分
    // 5连5分 6连10分 7连18分 8连25分 9连40分
    // 1横 2竖 3撇 4捺
    RuleManage.JudgeAllSuccess = function () {
        var pointResult;

        // 处理1横向
        pointResult = RuleManage.Judge1Success();
        if (pointResult.nCount >= 5) {
            console.log("有横向5连以上小球！！！\n" + "起始坐标（" + String(pointResult.pointMatk.x) + "," + String(pointResult.pointMatk.y) + "）,共计数目：" + String(pointResult.nCount));
            return pointResult;
        }

        // 处理2竖向
        pointResult = RuleManage.Judge2Success();
        if (pointResult.nCount >= 5) {
            console.log("有竖向5连以上小球！！！\n" + "起始坐标（" + String(pointResult.pointMatk.x) + "," + String(pointResult.pointMatk.y) + "）,共计数目：" + String(pointResult.nCount));
            return pointResult;
        }

        // 处理3撇向
        pointResult = RuleManage.Judge3Success();
        if (pointResult.nCount >= 5) {
            console.log("有撇向5连以上小球！！！\n" + "起始坐标（" + String(pointResult.pointMatk.x) + "," + String(pointResult.pointMatk.y) + "）,共计数目：" + String(pointResult.nCount));
            return pointResult;
        }

        // 处理4捺
        pointResult = RuleManage.Judge4Success();
        if (pointResult.nCount >= 5) {
            console.log("有撇向5连以上小球！！！\n" + "起始坐标（" + String(pointResult.pointMatk.x) + "," + String(pointResult.pointMatk.y) + "）,共计数目：" + String(pointResult.nCount));
            return pointResult;
        }

        return pointResult;
    };

    // 横向下一个小球
    RuleManage.Judge1Next = function (point) {
        point.x++;
        if (point.x > 8) {
            point.x = -1;
            point.y = -1;
        }
        return point;
    };

    // 横向判断结果
    RuleManage.Judge1Success = function () {
        var nNumPoint;
        var pointIndex = new egret.Point();
        var pointJudge = new JudgePoint();
        pointJudge.nType = 1;

        for (var i = 0; i < 9; i++) {
            pointIndex.x = 0;
            pointIndex.y = i;
            do {
                nNumPoint = DataManage.getNumberByXY(pointIndex);
                if (DataManage._nRectData[nNumPoint]) {
                    // 如果该点有小球，则进行判断操作
                    if (pointJudge.nColorMatk == DataManage.sprBall[DataManage._nRectData[nNumPoint]].nColor) {
                        // 如果改点颜色与标志颜色相同则连续球数加1，否则清空操作数
                        pointJudge.nCount++;
                        console.log("11111nCount：" + String(pointJudge.nCount));
                    } else {
                        if (pointJudge.nCount < 5) {
                            // 如果之前小球不满足
                            pointJudge.nColorMatk = DataManage.sprBall[DataManage._nRectData[nNumPoint]].nColor;
                            pointJudge.nCount = 1;
                            pointJudge.nNumber = nNumPoint;
                            pointJudge.pointMatk.x = pointIndex.x;
                            pointJudge.pointMatk.y = pointIndex.y;
                        } else {
                            // 返回值
                            return pointJudge;
                        }
                    }
                } else {
                    if (pointJudge.nCount < 5) {
                        // 如果该点无小球，则数据清空
                        pointJudge.nColorMatk = -1;
                        pointJudge.nCount = 0;
                    } else {
                        // 返回值
                        return pointJudge;
                    }
                }
            } while(RuleManage.Judge1Next(pointIndex).x >= 0);
        }
        if (pointJudge.nCount < 5) {
            pointJudge.nCount = -1;
        }

        //返回值
        return pointJudge;
    };

    // 竖向下一个小球
    RuleManage.Judge2Next = function (point) {
        point.y++;
        if (point.y > 8) {
            point.x = -1;
            point.y = -1;
        }
        return point;
    };

    // 竖向判断结果
    RuleManage.Judge2Success = function () {
        var nNumPoint;
        var pointIndex = new egret.Point();
        var pointJudge = new JudgePoint();
        pointJudge.nType = 2;

        for (var i = 0; i < 9; i++) {
            pointIndex.x = i;
            pointIndex.y = 0;
            do {
                nNumPoint = DataManage.getNumberByXY(pointIndex);
                if (DataManage._nRectData[nNumPoint]) {
                    // 如果该点有小球，则进行判断操作
                    if (pointJudge.nColorMatk == DataManage.sprBall[DataManage._nRectData[nNumPoint]].nColor) {
                        // 如果改点颜色与标志颜色相同则连续球数加1，否则清空操作数
                        pointJudge.nCount++;
                        console.log("22222nCount：" + String(pointJudge.nCount));
                    } else {
                        if (pointJudge.nCount < 5) {
                            // 如果之前小球不满足
                            pointJudge.nColorMatk = DataManage.sprBall[DataManage._nRectData[nNumPoint]].nColor;
                            pointJudge.nCount = 1;
                            pointJudge.nNumber = nNumPoint;
                            pointJudge.pointMatk.x = pointIndex.x;
                            pointJudge.pointMatk.y = pointIndex.y;
                        } else {
                            // 返回值
                            return pointJudge;
                        }
                    }
                } else {
                    if (pointJudge.nCount < 5) {
                        // 如果该点无小球，则数据清空
                        pointJudge.nColorMatk = -1;
                        pointJudge.nCount = 0;
                    } else {
                        // 返回值
                        return pointJudge;
                    }
                }
            } while(RuleManage.Judge2Next(pointIndex).x >= 0);
        }
        if (pointJudge.nCount < 5) {
            pointJudge.nCount = -1;
        }

        //返回值
        return pointJudge;
    };

    // 撇向下一个小球
    RuleManage.Judge3Next = function (point) {
        point.x--;
        point.y++;

        if ((point.x < 0) || (point.y > 8)) {
            point.x = -1;
            point.y = -1;
        }
        return point;
    };

    // 撇向判断结果
    RuleManage.Judge3Success = function () {
        var nNumPoint;
        var pointIndex = new egret.Point();
        var pointJudge = new JudgePoint();
        pointJudge.nType = 3;

        for (var i = 8; i > 3; i--) {
            for (var j = 0; j < 5; j++) {
                pointIndex.x = i;
                pointIndex.y = j;
                do {
                    nNumPoint = DataManage.getNumberByXY(pointIndex);
                    if (DataManage._nRectData[nNumPoint]) {
                        // 如果该点有小球，则进行判断操作
                        if (pointJudge.nColorMatk == DataManage.sprBall[DataManage._nRectData[nNumPoint]].nColor) {
                            // 如果改点颜色与标志颜色相同则连续球数加1，否则清空操作数
                            pointJudge.nCount++;
                            console.log("33333nCount：" + String(pointJudge.nCount) + "X:" + pointIndex.x + "  Y:" + pointIndex.y);
                        } else {
                            if (pointJudge.nCount < 5) {
                                // 如果之前小球不满足
                                pointJudge.nColorMatk = DataManage.sprBall[DataManage._nRectData[nNumPoint]].nColor;
                                pointJudge.nCount = 1;
                                pointJudge.nNumber = nNumPoint;
                                pointJudge.pointMatk.x = pointIndex.x;
                                pointJudge.pointMatk.y = pointIndex.y;
                            } else {
                                // 返回值
                                return pointJudge;
                            }
                        }
                    } else {
                        if (pointJudge.nCount < 5) {
                            // 如果该点无小球，则数据清空
                            pointJudge.nColorMatk = -1;
                            pointJudge.nCount = 0;
                        } else {
                            // 返回值
                            return pointJudge;
                        }
                    }
                } while(RuleManage.Judge3Next(pointIndex).x >= 0);
            }
        }
        if (pointJudge.nCount < 5) {
            pointJudge.nCount = -1;
        }

        //返回值
        return pointJudge;
    };

    // 捺向下一个小球
    RuleManage.Judge4Next = function (point) {
        point.x++;
        point.y++;

        if ((point.x > 8) || (point.y > 8)) {
            point.x = -1;
            point.y = -1;
        }
        return point;
    };

    // 捺向判断结果
    RuleManage.Judge4Success = function () {
        var nNumPoint;
        var pointIndex = new egret.Point();
        var pointJudge = new JudgePoint();
        pointJudge.nType = 4;

        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                pointIndex.x = i;
                pointIndex.y = j;
                do {
                    nNumPoint = DataManage.getNumberByXY(pointIndex);
                    if (DataManage._nRectData[nNumPoint]) {
                        // 如果该点有小球，则进行判断操作
                        if (pointJudge.nColorMatk == DataManage.sprBall[DataManage._nRectData[nNumPoint]].nColor) {
                            // 如果改点颜色与标志颜色相同则连续球数加1，否则清空操作数
                            pointJudge.nCount++;
                            console.log("44444nCount：" + String(pointJudge.nCount));
                        } else {
                            if (pointJudge.nCount < 5) {
                                // 如果之前小球不满足
                                pointJudge.nColorMatk = DataManage.sprBall[DataManage._nRectData[nNumPoint]].nColor;
                                pointJudge.nCount = 1;
                                pointJudge.nNumber = nNumPoint;
                                pointJudge.pointMatk.x = pointIndex.x;
                                pointJudge.pointMatk.y = pointIndex.y;
                            } else {
                                // 返回值
                                return pointJudge;
                            }
                        }
                    } else {
                        if (pointJudge.nCount < 5) {
                            // 如果该点无小球，则数据清空
                            pointJudge.nColorMatk = -1;
                            pointJudge.nCount = 0;
                        } else {
                            // 返回值
                            return pointJudge;
                        }
                    }
                } while(RuleManage.Judge4Next(pointIndex).x >= 0);
            }
        }
        if (pointJudge.nCount < 5) {
            pointJudge.nCount = -1;
        }

        //返回值
        return pointJudge;
    };
    return RuleManage;
})();
RuleManage.prototype.__class__ = "RuleManage";
