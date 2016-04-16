/**
 * Created by Administrator on 2015/4/5.
 */
var Bubble=cc.Sprite.extend({
    type:0,
    myCol:0,
    myRow:0,
    myFlyRadius:0,
    isMoving:false,
    //isMark:false,
    ctor:function(type){


            this.type=type;
            var pic=res["Bubble_"+type];
            this._super(pic);


    },
    fly:function(pos){
        this.myFlyRadius=Math.atan2(pos.y-this.y,pos.x-this.x);
        this.isMoving=true;
    },
    stopFly:function(){
        this.isMoving=false;
    },
    fall:function(){
        //跟fly一样要有速度，每一帧加dx和dy
        this.scheduleUpdate();
        this.isMoving=true;
        this.myFlyRadius = 1.5*Math.PI;//270度
    },
    //得到泡泡周围泡泡的坐标
    getRoundPos:function(dir){
        var grid=null;
        var r=this.myRow;
        var c=this.myCol;
        switch(dir)
        {
            case 0:
                grid=[r,c-1];
                break;
            case 1:
                var nc=r%2?c:c-1;
                grid=[r-1,nc];
                break;
            case 2:
                var nc=r%2?c+1:c;
                grid=[r-1,nc];
                break;
            case 3:
                grid=[r,c+1];
                break;
            case 4:
                var nc=r%2?c+1:c;
                grid=[r+1,nc];
                break;
            case 5:
                var nc=r%2?c:c-1;
                grid=[r+1,nc];
                break;
        }
        if(grid){
            if(grid[0]<0||grid[0]>=game.MaxRow||grid[1]<0||grid[1]>=game.MaxCol){
                grid=0;
            }
        }
        return grid;
    },
    reachBound:function(){
        //行等于零
        var col=Math.round((this.x-game.Bound.LEFT+game.BubbleD/2)/game.BubbleD);
        this.x=game.Bound.LEFT+game.BubbleD*col;
        this.y=game.Bound.UP;
        this.myCol=col;
        this.myRow=0;
    },
    //每一帧刷新自己的位置
    update:function(){
        var bStop=false;
        var dx=game.FlySpeed * Math.cos(this.myFlyRadius);
        var dy=game.FlySpeed * Math.sin(this.myFlyRadius);

        //边缘判断
        //右飞
        if(dx>0&&this.x+dx>game.Bound.RIGHT){
            dx=game.Bound.RIGHT-this.x;
            //方向改变
            this.myFlyRadius=Math.PI-this.myFlyRadius;
        }
        //左飞
        else if(dx<0&&this.x+dx<game.Bound.LEFT){
            dx=game.Bound.LEFT-this.x;
            this.myFlyRadius=Math.PI-this.myFlyRadius;
        }
        //到顶
        if(dy>0&&this.y+dy>game.Bound.UP){
            dy=game.Bound.UP-this.y;
            this.stopFly();
            this.reachBound();
            bStop=true;
            return bStop;
        }
        else if(dy<0&&this.y+dy<game.Bound.DOWN){
            this.stopFly();
            this.removeFromParent(true);

            this.unscheduleUpdate();
            bStop=true;
            return bStop;
        }
        this.x+=dx;
        this.y+=dy;

        return bStop;
    }

});