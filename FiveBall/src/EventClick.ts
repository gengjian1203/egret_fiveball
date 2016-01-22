/**
 * Created by Administrator on 2014/10/8.
 */
class EventClick extends egret.Event
{
    public static DATE:string = "点击事件";
    public _ClickX:number = -1;
    public _ClickY:number = -1;

    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type, bubbles, cancelable);
    }
}