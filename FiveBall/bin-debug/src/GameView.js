var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by lenovo on 2014-10-11.
*/
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.apply(this, arguments);
    }
    //创建全局静态界面
    GameView.prototype.createStaticView = function (rootLayout) {
        this.createScoreText(rootLayout);
        this.createRectBackground(rootLayout);
        //this.createGameOverLayout( rootLayout, res);
    };

    GameView.prototype.createScoreText = function (rootLayout) {
        this.txtScore = new egret.TextField();
        this.txtScore.x = DataManage.winHalfWidth;
        this.txtScore.y = DataManage.winHeight * 0.05;
        this.txtScore.anchorX = 0.5;
        this.txtScore.anchorY = 0.5;
        this.txtScore.size = 30;
        this.txtScore.textAlign = egret.HorizontalAlign.CENTER;
        this.txtScore.textColor = 0xFFFFFF;
        this.txtScore.strokeColor = 0xFF0000;
        this.txtScore.stroke = 2;
        rootLayout.addChild(this.txtScore);
        this.updateScrore();
    };

    GameView.prototype.createRectBackground = function (rootLayout) {
        for (var j = 0; j < 9; j++) {
            for (var i = 0; i < 9; i++) {
                var imgBox = new egret.Bitmap();
                imgBox.texture = RES.getRes("Box");
                imgBox.x = DataManage.winHalfWidth - (4 - i) * DataManage._nPerBox;
                imgBox.y = DataManage.winHalfHeight - (4 - j) * DataManage._nPerBox;
                imgBox.anchorX = 0.5;
                imgBox.anchorY = 0.5;
                imgBox.width = DataManage._nPerBox;
                imgBox.height = DataManage._nPerBox;
                rootLayout.addChild(imgBox);
            }
        }
    };

    //更新分数
    GameView.prototype.updateScrore = function () {
        this.txtScore.text = "得分：" + String(DataManage._nScore);
    };
    return GameView;
})(egret.EventDispatcher);
GameView.prototype.__class__ = "GameView";
