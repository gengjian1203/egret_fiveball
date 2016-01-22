/**
 * Created by lenovo on 2014-10-11.
 */
class GameView extends egret.EventDispatcher
{
    //创建全局静态界面
    public createStaticView(rootLayout:egret.DisplayObjectContainer):void
    {
        this.createScoreText( rootLayout );
        this.createRectBackground( rootLayout );
        //this.createGameOverLayout( rootLayout, res);
    }

    // 文书文本
    private txtScore:egret.TextField;

    private  createScoreText (rootLayout:egret.DisplayObjectContainer) : void
    {
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
        rootLayout.addChild( this.txtScore );
        this.updateScrore();
    }

    private createRectBackground( rootLayout:egret.DisplayObjectContainer ) : void
    {
        for( var j = 0; j < 9; j++ )
        {
            for ( var i = 0; i < 9; i++ )
            {
                var imgBox:egret.Bitmap = new egret.Bitmap();
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

    }

    //更新分数
    public updateScrore()
    {
        this.txtScore.text = "得分：" + String(DataManage._nScore);
    }
}