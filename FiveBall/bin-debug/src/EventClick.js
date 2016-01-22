var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Administrator on 2014/10/8.
*/
var EventClick = (function (_super) {
    __extends(EventClick, _super);
    function EventClick(type, bubbles, cancelable) {
        if (typeof bubbles === "undefined") { bubbles = false; }
        if (typeof cancelable === "undefined") { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this._ClickX = -1;
        this._ClickY = -1;
    }
    EventClick.DATE = "点击事件";
    return EventClick;
})(egret.Event);
EventClick.prototype.__class__ = "EventClick";
