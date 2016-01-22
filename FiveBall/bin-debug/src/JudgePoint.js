var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by lenovo on 2014-10-14.
*/
var JudgePoint = (function (_super) {
    __extends(JudgePoint, _super);
    function JudgePoint() {
        _super.call(this);
        this.pointMatk = new egret.Point();
        this.nNumber = 0;
        this.nColorMatk = -1;
        this.nCount = 0;
        this.nType = 0;
    }
    return JudgePoint;
})(egret.DisplayObjectContainer);
JudgePoint.prototype.__class__ = "JudgePoint";
