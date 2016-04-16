
/**
 * Created by Administrator on 2015/4/14.
 */

//游戏主界面



///////////////////////////////卡牌////////////////////////
game.kapaiX=130;
game.kapaiY=180;
/////////////////////////////泡泡//////////////////////////
game.checkCircleCollision=function(p1,p2,r1,r2){
    var r = Math.pow((p2.x-p1.x),2)+Math.pow((p2.y-p1.y),2)<=Math.pow((r2+r1),2);
    return r;
};
game.Shoot_Pos={x:400,y:60};
game.Ready_Pos={x:300,y:20};
game.Bound={
    LEFT:230,
    RIGHT:550,
    UP:420,
    DOWN:80
};
game.BubbleD=40;
game.MaxRow=10;
game.MaxCol=10;
game.FlySpeed=15;
game.isSound=true;
game.menuitemopen=false;
game.jiantoubound=40;
game.runspeed=10;
var PlayLayer = cc.Layer.extend({

    menuItem:null,
    fireBubble:null,
    waitBubble:null,
    shooter:null,
    //发射冷却
    fireColddown:false,
    bubblesArr:[],
    availbleBubTypes:[],
    //可以碰撞的泡泡
    collisionBubArr:[],
    //初始化的时候加载


    role:null,
    rolekapaiArr:[],
    _kaichang_keaiAnim:null,
    think:null,
    progress:null,
    progressrate:100,
    rankdisplay:false,
    goleft:null,
    goright:null,
    leftrun:false,
    rightrun:false,
    shootposnow:{x:game.Shoot_Pos.x,y:game.Shoot_Pos.y},
    progressmonsu:null,
    progressratemonsu:100,
    bomb:null,
    ctor:function(){

        game.score=0;
        game.win=false;
        this._super();
        game.menuitemopen=false;
        this.availbleBubTypes=[0,1,2,3,4,5,6,7];

        this.scheduleUpdate();
        this.shootposnow.x=game.Shoot_Pos.x;
        this.shootposnow.y=game.Shoot_Pos.y;
        this.createLocation();
        this.createShooter();
        this.createReadyBubble();
        this.createShootBubble();
        this.addBubbles();
        this.checkAllBubbles();
        this.addkapai();
        this.addEventListener();
        this.addrole();
        this.addProgress();
        this.addtishi();
        this.addleftright();

    },
    addleftright: function () {

        var size = cc.director.getWinSize();
        this.goleft = cc.Sprite.create(res.main.goleft);
        this.goleft.setPosition(size.width/2-100,150);
        this.goleft.setScale(0.7);
        this.addChild(this.goleft, 900);

        this.goright = cc.Sprite.create(res.main.goright);
        this.goright.setPosition(size.width/2+100,150);
        this.goright.setScale(0.7);
        this.addChild(this.goright,900);
    },
    addtishi:function(){
        var size = cc.director.getWinSize();
        var sprite = cc.Sprite.create(res.main.maintishibg);
        sprite.setPosition(0, size.height / 2);
        sprite.setScale(0.7);
        this.addChild(sprite, 10000);
        //var actionTo = cc.MoveTo.create(1, cc.p(size.width/2, size.height/2)).easing(cc.easeElasticOut());

        var actionTo = new cc.Sequence(new cc.MoveTo(1, cc.p(size.width/2, size.height/2)).easing(cc.easeElasticOut()),new cc.DelayTime(2),new cc.MoveTo(1, cc.p(size.width+500, size.height/2)).easing(cc.easeElasticOut()),new cc.CallFunc(
            function (pos) {
                pos.removeFromParent(true);
            },sprite
        ));
        sprite.runAction(actionTo);



        var sprite2 = cc.Sprite.create(res.main.maintishiguaiwubg);
        sprite2.setPosition(size.width / 2+100, size.height / 2);
        sprite2.setScale(0.7);
        this.addChild(sprite2, 10000);

        var actionTo = new cc.Sequence(new cc.MoveTo(1, cc.p(size.width/2+160, size.height/2)).easing(cc.easeElasticOut()),new cc.DelayTime(2),new cc.MoveTo(1, cc.p(size.width+500, size.height/2)).easing(cc.easeElasticOut()),new cc.CallFunc(
            function (pos) {
                pos.removeFromParent(true);
            },sprite2
        ));
        sprite2.runAction(actionTo);


        var sprite1 = cc.Sprite.create(res.main.maintishilogo);
        sprite1.setPosition(0, size.height / 2+100);
        sprite1.setScale(0.7);
        this.addChild(sprite1, 10000);

        var actionTo = new cc.Sequence(new cc.MoveTo(1, cc.p(size.width/2-100, size.height/2+100)).easing(cc.easeElasticOut()),new cc.DelayTime(2),new cc.MoveTo(1, cc.p(size.width+500, size.height/2)).easing(cc.easeElasticOut()),new cc.CallFunc(
            function (pos) {
                pos.removeFromParent(true);
            },sprite1
        ));
        sprite1.runAction(actionTo);


        var guaiwujieshaoArr=[
            [],
            ["姓名：阿啰\n技能：每轮20%几率加血1点\n每轮70%几率吐泡泡"],
            ["姓名：翠花\n技能：每轮20%几率加血1点\n每轮70%几率吐泡泡\n每轮20%几率遮盖一层泡泡"],
            ["姓名：阿旺\n技能：每轮20%几率加血1点\n每轮70%几率吐泡泡\n每轮20%几率攻击shooter"],
            ["姓名：终极boss\n技能：每轮30%几率加血1点\n每轮80%几率吐泡泡\n每轮20%快速攻击shooter"]
        ];

        if(game.level==1)
        {
            var enemy = cc.Sprite.create(res.main.enemy01);

        }
        else if(game.level==2)
        {
            var enemy = cc.Sprite.create(res.main.enemy0);
        }
        else if(game.level==3)
        {
            var enemy = cc.Sprite.create(res.main.enemy1);
        }
        else if(game.level==4)
        {
            var enemy = cc.Sprite.create(res.main.enemy2);
        }


        var jieshao=cc.LabelTTF.create(guaiwujieshaoArr[game.level],"Helvetica", 30);
        jieshao.setPosition(cc.p(0, size.height / 2+100));
        jieshao.setScale(0.7);
        this.addChild(jieshao, 10000);
        var actionTo = new cc.Sequence(new cc.MoveTo(1, cc.p(size.width/2-140, size.height/2)).easing(cc.easeElasticOut()),new cc.DelayTime(2),new cc.MoveTo(1, cc.p(size.width+500, size.height/2)).easing(cc.easeElasticOut()),new cc.CallFunc(
            function (pos) {
                pos.removeFromParent(true);
            },jieshao
        ));
        jieshao.runAction(actionTo);



        enemy.setPosition(cc.p(0, size.height / 2+100));
        enemy.setScale(0.7);
        this.addChild(enemy, 10000);

        var actionTo = new cc.Sequence(new cc.MoveTo(1, cc.p(size.width/2+160, size.height/2)).easing(cc.easeElasticOut()),new cc.DelayTime(2),new cc.MoveTo(1, cc.p(size.width+500, size.height/2)).easing(cc.easeElasticOut()),new cc.CallFunc(
            function (pos) {
                pos.removeFromParent(true);
            },enemy
        ));
        enemy.runAction(actionTo);






    },

    onEnter: function () {
        this._super();


    },
    onExit:function(){
        this.unscheduleUpdate();
    },


    ////////////////////////////////////背景区//////////////////////////////////////////////////



    createLocation:function(){



        var size = cc.director.getWinSize();


        cc.audioEngine.playEffect(res.sound.V_ready,false);
        cc.audioEngine.stopMusic(res.sound.bgGame);
        cc.audioEngine.playMusic(res.sound.bgWelcome,true);

        var sprite = cc.Sprite.create(res.main.farbg);
        sprite.setPosition(size.width / 2, size.height / 2);
        sprite.setScale(0.7);
        this.addChild(sprite, 0);


        var logo = new cc.LabelTTF("level"+game.level, "Helvetica", 30);
        logo.setColor(cc.color(255, 255, 255));//white color
        logo.setPosition(cc.p(size.width/2-180, 50));
        logo.setScale(0.3);
        this.addChild(logo, 10);



        ////////////////////menu button/////////////////////////////////
        var that=this;
        var menuItem = new cc.MenuItemImage(
            res.house.tybtnmenu,
            res.house.tybtnmenu,
            function () {


                if(game.menuitemopen==false)
                {
                    //cc.director.pause();
                    var layer=new GamePauseLayer();
                    that.addChild(layer);
                    game.menuitemopen=true;

                }



            }
        );
        menuItem.attr(
            {
                x:size.width-30,
                y:30,
                anchorX:0.5,
                anchorY:0.5
            }
        );

        menuItem.setScale(0.7);



        var soundItem = new cc.MenuItemImage(
            res.sound.Sound_On,
            res.sound.Sound_Off,
            function () {
                if(game.isSound==true)
                {
                    soundItem.setNormalSpriteFrame(res.sound.Sound_Off);
                    soundItem.setSelectedSpriteFrame(res.sound.Sound_On);
                    cc.log("click");
                    cc.audioEngine.stopMusic(res.sound.bgWelcome);
                    game.isSound=false;
                }
                else
                {
                    soundItem.setNormalSpriteFrame(res.sound.Sound_On);
                    soundItem.setSelectedSpriteFrame(res.sound.Sound_Off);
                    cc.log("click");
                    cc.audioEngine.playMusic(res.sound.bgWelcome,true);
                    game.isSound=true;

                }

            }
        );


        soundItem.attr(
            {
                x:size.width-100,
                y:30,
                anchorX:0.5,
                anchorY:0.5


            }
        );

        soundItem.setScale(0.7);
        var menu = new cc.Menu(menuItem,soundItem);
        menu.x=0;
        menu.y=0;
        this.addChild(menu);



        var jiange = cc.Sprite.create(res.main.jiange);
        jiange.setPosition(size.width/2,size.height/2);
        jiange.setScale(0.7);
        this.addChild(jiange, 0);


    },



    ////////////////////////////////////角色区//////////////////////////////////////////////////
    addrole: function () {
        var  size=cc.director.getWinSize();


        var keai = cc.Animation.create();
        for (var ti = 1; ti < 8; ti ++){
            var tiFrame = res.house["keai00" + ti];
            keai.addSpriteFrameWithFile(tiFrame);
        }
        keai.setDelayPerUnit(0.1);
        this._kaichang_keaiAnim= cc.Animate.create(keai);





        this.role = cc.Sprite.create(res.house.keai001);
        this.role.setPosition(120, 90);
        this.addChild(this.role, 1000);
        this.role.runAction(this._kaichang_keaiAnim.repeatForever());


        var thinking = new cc.Sprite(res.house.thinking);
        thinking.setPosition(cc.p(170, 150));
        thinking.setScale(0.3);
        this.addChild(thinking,1000);



        this.think = cc.LabelTTF.create("加油呀~ ", "Helvetica", 15);
        this.think.setPosition(cc.p(170, 150));
        this.think.setColor(cc.color(0, 0,0));
        this.addChild(this.think, 1001);



        var c = cc.Sprite.create(res.over.winligt);
        c.setPosition(120, 90);
        c.setScale(0.3);
        this.addChild(c, 999);
        var action=cc.blink(1,2);
        c.runAction(action.repeatForever());



        if(game.level==1)
        {
            var enemy = cc.Sprite.create(res.main.enemy01);
        }
        else if(game.level==2)
        {
            var enemy = cc.Sprite.create(res.main.enemy0);
        }
        else if(game.level==3)
        {
            var enemy = cc.Sprite.create(res.main.enemy1);
        }
        else if(game.level==4)
        {
            var enemy = cc.Sprite.create(res.main.enemy2);
        }
        enemy.setPosition(size.width-100, size.height -120);
        enemy.setScale(0.6);
        this.addChild(enemy, 100);
        var sequence = cc.Sequence.create(
            cc.CallFunc.create(function (logo) {
                var shaking = cc.MoveTo.create(1, cc.p(size.width-100, size.height -120));
                var shakingBack = cc.MoveTo.create(1, cc.p(size.width-100+20, size.height -120-20));
                var shakingB = cc.MoveTo.create(1, cc.p(size.width-100-20, size.height -120-20));
                var shakingSeq = cc.Sequence.create(shaking, shakingBack,shakingB);
                logo.runAction(shakingSeq.repeatForever());
            }, enemy));
        enemy.runAction(sequence);
    },

    addProgress: function () {

        var  size=cc.director.getWinSize();

        var pro=cc.Sprite.create(res.main.progresswai);
        pro.setPosition(size.width-80, size.height -24);
        this.addChild(pro, 100);
        var sequence = cc.Sequence.create(
            cc.CallFunc.create(function (logo) {
                var shaking = cc.MoveTo.create(1, cc.p(size.width-80, size.height -24));
                var shakingBack = cc.MoveTo.create(1, cc.p(size.width-80+20, size.height -24-20));
                var shakingB = cc.MoveTo.create(1, cc.p(size.width-80-20, size.height -24-20));
                var shakingSeq = cc.Sequence.create(shaking, shakingBack,shakingB);
                logo.runAction(shakingSeq.repeatForever());
            }, pro));
        pro.runAction(sequence);



        this.progress=cc.Sprite.create(res.main.progressnei);
        this.progress.setPosition(size.width-147, size.height -24);
        this.addChild(this.progress, 100);
        var sequence = cc.Sequence.create(
            cc.CallFunc.create(function (logo) {
                var shaking = cc.MoveTo.create(1, cc.p(size.width-147, size.height -24));
                var shakingBack = cc.MoveTo.create(1, cc.p(size.width-147+20, size.height -24-20));
                var shakingB = cc.MoveTo.create(1, cc.p(size.width-147-20, size.height -24-20));
                var shakingSeq = cc.Sequence.create(shaking, shakingBack,shakingB);
                logo.runAction(shakingSeq.repeatForever());
            }, this.progress));
        this.progress.runAction(sequence);
        this.progress._setAnchorX(0);

        if(game.level>=3)
        {
            var pro=cc.Sprite.create(res.main.progresswai);
            pro.setPosition(120, 40);
            this.addChild(pro, 0);

            this.progressmonsu=cc.Sprite.create(res.main.progressnei);
            this.progressmonsu.setPosition(55, 40);
            this.addChild(this.progressmonsu, 0);
            this.progressmonsu._setAnchorX(0);
        }



    },


    ////////////////////////////////////卡牌//////////////////////////////////////////////////
    addkapai: function () {

        var  size=cc.director.getWinSize();

        this.rolekapaiArr.splice(0,this.rolekapaiArr.length);
        for(var  i=1;i<=3;i++)
        {
            this.addonekapai(i);
        }

        console.log("add kapai");


    },

    addonekapai: function (i) {

        var  size=cc.director.getWinSize();
        var type=parseInt(Math.random()*3)+1;
        var kapai=new cc.Sprite(res["kapai_"+type]);
        kapai.setScale(0.6);
        kapai.tag=type;
        kapai.num=i-1;
        kapai.point=cc.p(size.width/2-255-i*25, size.height/2+130-i*35);
        kapai.choose=false;
        kapai.setPosition(cc.p(size.width/2,size.height));
        this.addChild(kapai,100+i);
        var actionTo = cc.MoveTo.create(1, cc.p(size.width/2-255-i*25, size.height/2+130-i*35)).easing(cc.easeElasticOut());
        kapai.runAction(actionTo);
        console.log(i);
        this.rolekapaiArr[i-1]=kapai;





    },
    //怪物技能：加血
    addenemyparticle: function () {

        var  size=cc.director.getWinSize();
        cc.audioEngine.playEffect(res.sound.hurt,false);
        var kapai=new cc.Sprite(res.main.particle);
        kapai.setScale(0.6);
        kapai.setPosition(cc.p(size.width-100, size.height -120));
        this.addChild(kapai,1000);
        kapai.runAction(cc.Sequence.create(cc.Blink.create(1,2),cc.CallFunc.create(function(){
            kapai.removeFromParent(true);
        })));

        this.reduceprogress(-2);

        console.log("add blood");
    },
    //怪物技能：遮罩
    addenemyparticle2: function () {

        var  size=cc.director.getWinSize();


        var i=this.notemptyline();
        if(i==0)return ;
        var k=(i-1)%2?1:0;
        for(var j=0;j<game.MaxCol-k;j++)
        {
            var offset=(i-1)%2?game.BubbleD/2:0;
            var x=game.Bound.LEFT+game.BubbleD*j+offset;
            var y=game.Bound.UP-game.BubbleD*(i-1);
            var kapai=new cc.Sprite(res.main.fog);
            kapai.setScale(0.6);
            kapai.setPosition(cc.p(x, y));
            this.addChild(kapai,1000);

            kapai.runAction(cc.Sequence.create(cc.rotateBy(2,360),cc.CallFunc.create(function(kapai){
                kapai.removeFromParent(true);
            },kapai)));
        }

        this.think.setString("它把泡泡遮住啦");

        console.log("zhezhao");
    },
    //怪物技能：攻击shooter
    addenemyparticle3: function () {

        var d=5-game.level;
        var  size=cc.director.getWinSize();
        cc.audioEngine.playEffect(res.sound.hurt,false);
        this.bomb=new cc.Sprite(res.main.bomb);
        // this.bomb.setScale(0.6);
        this.bomb.setPosition(cc.p(size.width-100, size.height -120));
        this.addChild(this.bomb,1000);
        this.bomb.runAction(cc.Sequence.create(cc.MoveTo.create(d,cc.p(this.shootposnow.x-50,this.shootposnow.y-50)),cc.CallFunc.create(function(kapai){
            kapai.removeFromParent(true);
        },this.bomb)));

        this.think.setString("救命啊，快跑啊");

    },
    reduceprogress: function (pos) {

        if(this.progressrate<=0) {
            this.win();
            return ;
        }

        this.progressrate-=pos;
        this.progress.setScaleX(this.progressrate/100);

        this.think.setString("怪物居然会加血");

    },


    flyBegin:function(pos){
        if(!this.fireColddown){
            this.fireColddown=true;
            this.fireBubble.fly(pos);
        }

    },
    checkBubsType:function(type){
        var r=false;
        for(var i=0;i<this.availbleBubTypes.length;i++){
            if(this.availbleBubTypes[i]==type){
                r=true;
                break;
            }
        }
        if(!r)this.availbleBubTypes.push(type);
    },
    checkAllBubbles:function(){
        //清空数组
        var hasBubble=false;
        this.collisionBubArr.splice(0,this.collisionBubArr.length);
        this.availbleBubTypes.splice(0,this.availbleBubTypes.length);
        for(var i=0;i<game.MaxRow;i++){
            next:for(var j=0;j<game.MaxCol;j++){
                var bReach=false;
                var bubble=this.bubblesArr[i][j];

                //如果bubble存在
                if(bubble){
                    hasBubble=true;
                    if(i==game.MaxRow-1){
                        var layer=new GameOverLayer;
                        this.addChild(layer);
                        this.fireColddown=true;
                        return;
                    }
                    bubble.isMark=false;
                    bubble.status="";//把它重置
                    this.checkBubsType(bubble.type);
                    for(var k=0;k<6;k++){
                        var pos=bubble.getRoundPos(k);
                        //如果它存在
                        if(pos){
                            if(!this.bubblesArr[pos[0]][pos[1]]){
                                bReach=true;
                                this.collisionBubArr.push(bubble);
                                continue next;
                            }
                        }
                    }
                }
            }
        }
        if(!hasBubble) {
            this.win();



            //cc.director.runScene(new MenuScene());
            //cc.audioEngine.playEffect("UI_levelup.mp3", false);
            //this.cc.director.runScene(BubbleScene);
        }

    },
    ///////////////////////////////////////////////////游戏胜利////////////////////////////////////////////////////////
    win:function(){


        if(!this.rankdisplay)
        {

            this.goleft.removeFromParent(true);
            this.goright.removeFromParent(true);
            var size = cc.director.getWinSize();
            game.win=true;
            var layer=new GameOverLayer();
            this.addChild(layer);
            cc.audioEngine.stopMusic(res.sound.bgWelcome);

            this.rankdisplay=true;
        }


    },
    flyEnd:function(){

        this.fireBubble=this.waitBubble;
        this.waitBubble.setPosition(this.shootposnow.x,game.Shoot_Pos.y);
        this.createReadyBubble();
        //alert(this.waitBubble.type);
        //alert(this.fireBubble.type);
        this.fireColddown=false;

        console.log("create the ready pos");



    },
    update:function(dt){
        //这里控制了发射的bubble，没有落下的bubble

        if(!this.fireColddown&&this.goleft){
            if(this.leftrun&&this.shooter.x>=game.Bound.LEFT)
            {
                this.shootposnow.x-=game.runspeed;


                this.shooter.x=this.shootposnow.x;
                if(this.fireBubble&&this.fireBubble.y==this.shootposnow.y)this.fireBubble.x=this.shootposnow.x;
            }
        }
        if(!this.fireColddown&&this.goright)
        {
            if(this.rightrun&&this.shooter.x<=game.Bound.RIGHT)
            {
                this.shootposnow.x+=game.runspeed;


                this.shooter.x=this.shootposnow.x;
                if(this.fireBubble&&this.fireBubble.y==this.shootposnow.y)this.fireBubble.x=this.shootposnow.x;
            }
        }
        if(this.bomb&&this.bomb.tag!="aaa")
        {


            var r=game.checkCircleCollision({x:this.bomb.x,y:this.bomb.y},{x:this.shooter.x,y:this.shooter.y},20,33);
            if(r&&this.progressratemonsu>0)
            {
                this.progressratemonsu-=10;
                this.progressmonsu.setScaleX(this.progressratemonsu/100);
                this.bomb.tag="aaa";
            }
            else if(this.progressratemonsu<=0)
            {

                var layer=new GameOverLayer();
                this.addChild(layer);
                cc.audioEngine.stopMusic(res.sound.bgWelcome);
                game.win=false;
            }
        }



        if(this.fireBubble && this.fireBubble.isMoving){

            var hasStop= this.fireBubble.update();

            if(hasStop){

                this.hasCollision(this.fireBubble);

                //alert(this.fireBubble.myRow);
                //alert(this.fireBubble.myCol);
                //实际上没有碰到什么东西就停下了改成跟碰到了一样的处理
                //this.bubblesArr[this.fireBubble.myRow][this.fireBubble.myCol]=this.fireBubble;

                //this.flyEnd();
                //this.checkAllBubbles();

            }else
            {
                this.checkCollision(this.fireBubble);


            }

            //this.addBuboneturn();

        }
    },
    addBuboneturn: function () {


        for(var k=0;k<1;k++)
        {
            var addflag=false;


            console.log("this added"+k+1+"bubbles"+" "+ addflag);
            for(var i=0;i<game.MaxRow;i++)
            {
                for(var j=0;j<game.MaxCol;j++)
                {
                    var b=this.bubblesArr[i][j];
                    if(b)
                    {
                        for(var kk=0;kk<6;kk++){
                            var pos=b.getRoundPos(kk);
                            //如果不是到了边界以外
                            if(pos){
                                if(!this.bubblesArr[pos[0]][pos[1]]){
                                    //加上一个泡泡

                                    var type=parseInt(Math.random()*5);
                                    console.log(pos[0]+pos[1]+"is none can add");
                                    var offset=(pos[0])%2?game.BubbleD/2:0;
                                    var x=game.Bound.LEFT+game.BubbleD*pos[1]+offset;
                                    var y=game.Bound.UP-game.BubbleD*(pos[0]);
//////////////////////////先加一个小云彩////////////////////////
                                    var  size=cc.director.getWinSize();
                                    var kapai=new cc.Sprite(res.main.fog);
                                    kapai.setScale(0.6);
                                    kapai.setPosition(cc.p(size.width-130, size.height -120));
                                    this.addChild(kapai,1000);
                                    var that=this;
                                    kapai.runAction(cc.Sequence.create(cc.MoveTo.create(0.2,cc.p(x,y)),cc.CallFunc.create(function(){
                                        kapai.removeFromParent(true);

                                    })));
                                    var bubble=this.addOneBubble(type,x,y);
                                    bubble.x=x;
                                    bubble.y=y;
                                    bubble.myRow=pos[0];
                                    bubble.myCol=pos[1];
                                    this.bubblesArr[pos[0]][pos[1]]=bubble;

                                    //  alert(b.type);

                                    addflag=true;
                                    break;
                                }


                                console.log(i,j,kk);
                            }
                        }
                    }


                    if(addflag==true)break;
                }
                if(addflag==true)break;
            }
        }


        var isdown=false;
        //怪物技能加血
        var Arr=[1,0,1,0,1,0,0,0,0];
        var random=parseInt(Math.random()*Arr.length);
        if(Arr[random]==1&&this.progressrate<=78)
        {
            this.addenemyparticle();

        }
        //怪物技能遮罩
        if(game.level==2||game.level==4)
        {
            var Arr=[1,0,1,0,1,0,0,0,0];
            var random=parseInt(Math.random()*Arr.length);
            if(Arr[random]==1)
            {
                this.addenemyparticle2();
                isdown=true
            }
        }
        //怪物技能攻击shooter
        if(game.level==3||(game.level==4&&!isdown))
        {
            var Arr=[1,0,1,0,1,0,0,0,0];
            var random=parseInt(Math.random()*Arr.length);
            if(Arr[random]==1)
            {
                this.addenemyparticle3();
            }
        }


    },

    hasCollision:function(flyBubble){
        flyBubble.stopFly();
        this.fireBubble=null;
        //this.flyEnd();
        cc.audioEngine.playEffect(res.sound.select, false);

        this.checkBubNewPos(flyBubble);
        this.shakeBubbles(flyBubble);
        var act=cc.sequence(
            cc.delayTime(0.3),
            //callfunc里面的函数有要求的，第一个参数必须是node，就是这里的this  call函数的用法
            cc.callFunc(this.shakeEnd,this,flyBubble)
        );
        this.runAction(act);


    },
    //检测碰撞
    checkCollision:function(flyBubble){
        var r=false;
        for(var i=0;i<this.collisionBubArr.length;i++){
            var checkBub=this.collisionBubArr[i];
            //判断检测的泡泡是否存在
            if(checkBub){
                //圆形检测的公式
                var r=game.checkCircleCollision({x:flyBubble.x,y:flyBubble.y},{x:checkBub.x,y:checkBub.y},game.BubbleD/2,game.BubbleD/2);
                if(r){


                    this.hasCollision(flyBubble);

                    //碰撞到了
                    r=true;
                    //alert(this.waitBubble.type);
                    //alert(this.fireBubble.type);
                    break;
                }
            }
        }
        return r;
    },
    shakeBubbles:function(flybubble){
        //特效6个方向找距离进的泡泡
        var r=flybubble.myRow;
        var c=flybubble.myCol;
        //此处需要一个数组
        var sr=Math.max(0,r-2);// start row
        var er=Math.min(game.MaxRow-1,r+1);//end row
        var sc=Math.max(0,c-1);
        var ec=Math.min(game.MaxCol,c+1);
        //判断完了特效的范围
        for(var i=sr;i<=er;i++){
            for(var j=sc;j<ec;j++){
                var shakeBub=this.bubblesArr[i][j];
                //如果这个bubble存在的话
                if(shakeBub){
                    //思路
                    //确定抖动的方向

                    var radius=Math.atan2(shakeBub.y-flybubble.y,shakeBub.x-flybubble.x);
                    var dx =Math.cos(radius)*3;
                    var dy =Math.sin(radius)*3;
                    //确定抖动的距离 勾股定理
                    var dis=Math.pow((shakeBub.y-flybubble.y),2)+Math.pow((shakeBub.x-flybubble.x),2);
                    //开始运动ccaction
                    var actArr=[
                        //cocos2d 开头如果小写，说明是一个函数不需要new，如果开头是大写，需要new
                        cc.delayTime(dis*0.000015),
                        //第一个参数是多久
                        cc.moveBy(0.1,{x:dx,y:dy}),
                        cc.moveBy(0.1,{x:-dx,y:-dy})
                    ];
                    //把所有动作穿起来
                    var action=cc.sequence(actArr);
                    shakeBub.runAction(action);

                    //抖动的时间也可以控制一下

                }
            }
        }
    },
    shakeEnd:function(node,flyBubble){
        this.flyEnd();
        //检测泡泡数组的状态
        this.checkElimate(flyBubble);
        this.checkAloneBubbles();
        //reset所有的判断结束重置
        this.checkAllBubbles();
        //碰撞到了
    },

    //判断消除,相同元素
    //先执行把自己放进去，再6个方向递归检测，最后递归，因为可能继续消除哦
    checkElimate:function(bubble){
        //自己先放进去
        bubble.isMark=true;
        var elemateArr=[bubble];
        var that=this;
        //检测6个方向，相同颜色消除
        function check6round(bubble){
            for(var i=0;i<6;i++){
                var pos=bubble.getRoundPos(i);
                if(pos){
                    var roundBub=that.bubblesArr[pos[0]][pos[1]];
                    //周边的泡泡存在并且并没有遍历过，并且被检测的bubble的type与它是否相同


                    var bSame=(roundBub && !roundBub.isMark) ? bubble.type == roundBub.type: false;
                    console.log(bubble.type);
                    console.log("firebubble is ");
                    if(roundBub&&bubble.type==6)
                    {
                        bSame=true;
                        console.log("firebubble is 6");
                    }
                    if(bSame){
                        roundBub.isMark=true;
                        // 可以被消除的，放入数组
                        elemateArr.push(roundBub);
                        check6round(roundBub);//递归


                    }
                }
            }
        }
        //最开始传一个这个函数，从自身的bubble开始
        check6round(bubble);
        if(elemateArr.length>=3){
            //可以被消除

            for(var i=0;i<3;i++)
            {
                var k=this.rolekapaiArr[i];
                if(!k)
                {
                    this.addonekapai(i+1);
                    break;
                }
            }


            if(elemateArr.length==3)cc.audioEngine.playEffect(res.sound.combo1,false);
            else if(elemateArr.length==4)cc.audioEngine.playEffect(res.sound.combo2, false);
            else if(elemateArr.length==5)cc.audioEngine.playEffect(res.sound.combo3, false);
            else if(elemateArr.length==6) cc.audioEngine.playEffect(res.sound.combo4, false);
            else  cc.audioEngine.playEffect(res.sound.combo5, false);

            for(var i=0;i<elemateArr.length;i++){
                var bub=elemateArr[i];
                //处理数组
                this.bubblesArr[bub.myRow][bub.myCol]=0;
                bub.removeFromParent(true);
                game.score+=200;
                this.reduceprogress(2);
            }
        }

    },
    //检测落空的泡泡  递归
    checkAloneBubbles:function(){
        var that=this;
        for(var i=0;i<game.MaxCol;i++){
            var row0Bub=this.bubblesArr[0][i];
            //给他一个状态fix

            if(row0Bub){
                row0Bub.status="fix";
                //第一次初步调用 下面的递归函数
                setBubbleFix(row0Bub);
            }
        }

        function setBubbleFix(bub){
            //遍历他的六个方向
            for(var i=0;i<6;i++){
                //得到他周边的泡泡
                var pos=bub.getRoundPos(i);
                if(pos){
                    var nextBub=that.bubblesArr[pos[0]][pos[1]];
                    if(nextBub&&nextBub.status!="fix"){
                        nextBub.status="fix";
                        setBubbleFix(nextBub);
                    }
                }

            }
        }
        //把是浮空的泡泡取出来
        for(var i=0;i<game.MaxRow;i++){
            for(var j=0;j<game.MaxCol;j++){
                var bub=this.bubblesArr[i][j];
                if(bub&&bub.status!="fix"){
                    //该泡泡会掉落

                    //数组处理
                    this.bubblesArr[bub.myRow][bub.myCol]=0;
                    // alert("要删除的row",bub.myRow,"要删除的col",bub.myCol);
                    bub.fall();
                    game.score+=1000;
                    this.reduceprogress(2);

                }
            }
        }

        // var Arr=[0,1,1,1,0,0,0,1];
        //var random=parseInt(Math.random(Arr.length));
        //if(Arr[random]==1){
        this.addBuboneturn();
        // }

    },
    checkBubNewPos:function(bubble){
        //首先计算正确的行列
        //var row=parseInt((game.Bound.UP+game.BubbleD/2-bubble.y)/game.BubbleD);
        var row=parseInt((game.Bound.UP+game.BubbleD*(2/3)-bubble.y)/game.BubbleD);
        var offset =row % 2 ? -game.BubbleD/2 : 0;
        //球的中心位置定义边界的
        var dx=bubble.x-game.Bound.LEFT+offset;
        var col;
        if(dx<0){
            col=0;
        }else if(dx>game.BubbleD*game.MaxCol){
            col=game.MaxCol-1;
        }else{
            col=Math.round(dx/game.BubbleD);
        }
        bubble.myRow=row;
        bubble.myCol=col;



        //然后根据行列修正坐标
        var offset =row%2?game.BubbleD/2:0;
        var x=game.Bound.LEFT+game.BubbleD*col+offset;
        var y=game.Bound.UP-game.BubbleD*row;
        bubble.x=x;
        bubble.y=y;
        if(this.bubblesArr[row][col]){
            alert("Error!程序出错，数组覆盖了！！！");
        }else {
            this.bubblesArr[row][col]=bubble;
        }


    },
    addEventListener: function () {
        var that=this;
        var eventListener=cc.EventListener.create({
            //其他事件：键盘，加速等等
            event : cc.EventListener.MOUSE,

            onMouseDown : function(event){
                var pos =event.getLocation();
                //cc.log("aaa",pos.x,pos.y);
                that.onMouseDown(pos);
            },
            onMouseMove : function(event){

                var pos =event.getLocation();
                //cc.log("bbb",pos.x,pos.y);
                that.onMouseMove(pos);
            },
            onMouseUp : function (event) {
                var pos =event.getLocation();
                //cc.log("bbb",pos.x,pos.y);
                that.onMouseUp(pos);
            }

        });
        cc.eventManager.addListener(eventListener,this);
    },
    onMouseUp: function (pos) {
        this.leftrun=false;
        this.rightrun=false;
    },
    onMouseMove: function (pos) {




        //反正切，y的差，x的差
        //炮台转动的角度
        var radius=Math.atan2(pos.y-game.Shoot_Pos.y,pos.x-game.Shoot_Pos.x);
        this.shooter.rotation=90-radius*180/Math.PI;

    },

    onMouseDown: function (pos) {

        if(this.goleft)
        {
            var k=pos.x<=this.goleft.x+game.jiantoubound/2&&pos.x>=this.goleft.x-game.jiantoubound/2&&pos.y<=this.goleft.y+game.jiantoubound/2&&pos.y>=this.goleft.y-game.jiantoubound/2
            if(k&&this.shooter.x>=game.Bound.LEFT)
            {
                this.leftrun=true;
                //this.shooter.x-=game.runspeed;
                //this.fireBubble.x-=game.runspeed;
                //
                //this.shootposnow.x=this.shooter.x;
                return ;
            }
        }
        if(this.goright)
        {
            var j=pos.x<=this.goright.x+game.jiantoubound/2&&pos.x>=this.goright.x-game.jiantoubound/2&&pos.y<=this.goright.y+game.jiantoubound/2&&pos.y>=this.goright.y-game.jiantoubound/2
            if(j&&this.shooter.x<=game.Bound.RIGHT)
            {
                this.rightrun=true;
                //this.shooter.x+=game.runspeed;
                //this.fireBubble.x+=game.runspeed;
                //
                //this.shootposnow.x=this.shooter.x;
                return ;
            }

        }


        var runkapaiflag=false;

        for(var i=2;i>=0;i--)
        {
            var kapai=this.rolekapaiArr[i];
            if(kapai)
            {
                var x=kapai.getPositionX();
                var y=kapai.getPositionY();
                var k=pos.x<=x+game.kapaiX/2&&pos.x>=x-game.kapaiX/2&&pos.y<=y+game.kapaiY/2&&pos.y>=y-game.kapaiY/2;

                if(!runkapaiflag&&k){
                    kapai.choose=true;
                    this.playsound();
                    console.log(kapai.num+"is click");
                    var size=cc.director.getWinSize();
                    var actionTo = cc.MoveTo.create(1, cc.p(size.width/2, size.height/2)).easing(cc.easeElasticOut());
                    kapai.runAction(actionTo);
                    runkapaiflag=true;
                }
                else
                {
                    kapai.setPosition(kapai.point);
                    kapai.choose=false;
                }
                console.log(kapai.num+"kapai choose is"+kapai.choose);

            }



        }

        var size=cc.director.getWinSize();
        console.log("runkapaiflag is"+runkapaiflag);
        var that=this;
        var k=pos.x<=size.width/2+game.kapaiX/2&&pos.x>=size.width/2-game.kapaiX/2&&pos.y<=size.height/2+game.kapaiY/2&&pos.y>=size.height/2-game.kapaiY/2;
        if(k){
            for(var i=2;i>=0;i--)
            {
                var kapai = this.rolekapaiArr[i];
                if(kapai&&kapai.choose==true)
                {
                    console.log(kapai.num+"will display");
                    kapai.runAction(cc.Sequence.create(cc.MoveTo.create(0.5, cc.p(size.width/2, size.height+190)).easing(cc.easeElasticInOut(0.45)),
                        new cc.CallFunc(function(kapai){
                            console.log(kapai.num+"is displayed");
                            that.rolekapaiArr[kapai.num]=0;
                            that.runkapaiEffect(kapai.tag);
                            kapai.removeFromParent();
                        },this,kapai)));
                }
            }
        }


        if(runkapaiflag==true)return ;

        // 换球
        if(this.fireColddown==false&&pos.x<=game.Ready_Pos.x+game.BubbleD/2&&pos.x>=game.Ready_Pos.x-game.BubbleD/2&&pos.y<=game.Ready_Pos.y+game.BubbleD/2&&pos.y>=game.Ready_Pos.y-game.BubbleD/2){
            //alert("ok");
            this.playsound();
            var a=this.waitBubble;
            this.waitBubble=this.fireBubble;
            this.fireBubble=a;
            this.waitBubble.setPosition(game.Ready_Pos.x,game.Ready_Pos.y);
            this.fireBubble.setPosition(this.shootposnow.x,game.Shoot_Pos.y);

        }
        var radius=Math.atan2(pos.y-game.Shoot_Pos.y,pos.x-game.Shoot_Pos.x);
        if(radius<180&&radius>0)
        {
            cc.audioEngine.playEffect(res.sound.ground, false);
            this.flyBegin(pos);
        }




    },
    runkapaiEffect:function(type){

        var that=this;
        console.log(type +"will be effect");
        if(type==3)//变彩色球
        {

            console.log("firebubble is remove from parent");
            var q=this.fireBubble;
            q.removeFromParent(true);
            this.fireBubble=null;
            this.fireBubble=this.addOneBubble(6,this.shootposnow.x,game.Shoot_Pos.y);

            //this.fireBubble=this.addOneBubble(type,game.Shoot_Pos.x,game.Shoot_Pos.y);
        }
        else if(type==1)//炸掉一排泡泡
        {
            var caneffect=false;
            var size=cc.director.getWinSize();
            for(var i=game.MaxRow-1;i>=0;i--)
            {
                for(var j=0;j<game.MaxCol;j++)
                {
                    var offset=(i)%2?game.BubbleD/2:0;
                    var b=that.bubblesArr[i][j];
                    that.bubblesArr[i][j]=0;
                    if(b)
                    {
                        caneffect=true;
                        var actionTo = cc.MoveTo.create(1, cc.p(size.width/2, size.height+100)).easing(cc.easeElasticOut());
                        b.runAction(actionTo);
                        b.removeFromParent();
                    }
                }
                if(caneffect==true)
                {
                    for(var j=0;j<game.MaxCol-1;j++)
                    {
                        var offset=(i)%2?game.BubbleD/2:0;
                        var x=game.Bound.LEFT+game.BubbleD*j+offset;
                        var y=game.Bound.UP-game.BubbleD*(i);
                        that.addbombparticle(x,y);
                    }


                    break;
                }
            }

            this.checkAllBubbles();

        }
        else if(type==2)
        {
            var i=this.notemptyline();
            var k=i%2?1:0;
            for(var j=0;j<game.MaxCol-k;j++)
            {
                var offset=(i)%2?game.BubbleD/2:0;
                var b=that.bubblesArr[i][j];
                that.bubblesArr[i][j]=0;
                if(b)
                {
                    console.log(b.myRow+ " "+ b.myCol+"is remove from parent");
                    b.removeFromParent();
                }
                var x=game.Bound.LEFT+game.BubbleD*j+offset;
                var y=game.Bound.UP-game.BubbleD*(i);
                var bubble=this.addOneBubble(this.fireBubble.type,x,y);
                bubble.x=x;
                bubble.y=y;
                bubble.myRow=i;
                bubble.myCol=j;
                this.bubblesArr[i][j]=bubble;
            }

            this.checkAllBubbles();
        }
    },
    addbombparticle: function (i,j) {

        console.log("bomb particle");
        var  size=cc.director.getWinSize();
        var kapai=new cc.Sprite(res.main.starLight);
        kapai.setScale(0.6);
        kapai.setPosition(cc.p(i,j));
        this.addChild(kapai,1000);
        kapai.runAction(cc.Sequence.create(cc.Blink.create(0.5,2),cc.CallFunc.create(function(){
            kapai.removeFromParent(true);
        })));

        this.think.setString("炸掉坏蛋");
        console.log("add blood");
    },
    notemptyline:function(){


        for(var i=game.MaxRow-1;i>=0;i--) {
            for (var j = 0; j < game.MaxCol; j++) {
                var b = this.bubblesArr[i][j];
                if (b) {
                    return i;
                }
            }
        }
    },

    checkBubbles:function(){
        for(var i=0;i<3;i++){
            var offset=i%2?game.BubbleD/2:0;
            for(var j=0;j<game.MaxCol;j++){
                if(i%2 && (j==game.MaxCol-1))continue;
                var bubble=this.bubblesArr[i][j];
                if(!bubble){
                    var x=game.Bound.LEFT+game.BubbleD*j+offset;
                    var y=game.Bound.UP-game.BubbleD*i;
                    var bubble=this.addOneBubble(1,x,y);
                    bubble.myRow=i;
                    bubble.myCol=j;
                    this.bubblesArr[i][j]=bubble;
                }
            }
        }
    },

    addBubbles:function(){
        for(var i=0;i<game.MaxRow;i++){
            this.bubblesArr[i]=[];//js没有原生的二维数组


        }
        ////自定义生成Bubble map
        if(game.level==1)
        {
            for(var i=0;i<game.level1.length;i++){
                var offset=i%2?game.BubbleD/2:0;
                for(var j=0;j<game.level1[i].length;j++){
                    //cc.log("aaa",level1[i][j]);
                    //生成位置
                    if(game.level1[i][j]!=-1)
                    {
                        //var type=parseInt(Math.random()*8);
                        var x=game.Bound.LEFT+game.BubbleD*j+offset;
                        var y=game.Bound.UP-game.BubbleD*i;

                        var bubble=this.addOneBubble(game.level1[i][j],x,y);
                        bubble.myRow=i;
                        bubble.myCol=j;
                        this.bubblesArr[i][j]=bubble;
                    }

                }
            }
        }
        else if(game.level==2)
        {


            for(var i=0;i<game.level2.length;i++){
                var offset=i%2?game.BubbleD/2:0;
                for(var j=0;j<game.level2[i].length;j++){
                    //cc.log("aaa",level1[i][j]);
                    //生成位置
                    if(game.level2[i][j]!=-1)
                    {
                        //var type=parseInt(Math.random()*8);
                        var x=game.Bound.LEFT+game.BubbleD*j+offset;
                        var y=game.Bound.UP-game.BubbleD*i;

                        var bubble=this.addOneBubble(game.level2[i][j],x,y);
                        bubble.myRow=i;
                        bubble.myCol=j;
                        this.bubblesArr[i][j]=bubble;
                    }

                }
            }

        }
        else if(game.level==3)
        {

            for(var i=0;i<game.level3.length;i++){
                var offset=i%2?game.BubbleD/2:0;
                for(var j=0;j<game.level3[i].length;j++){
                    //cc.log("aaa",level1[i][j]);
                    //生成位置
                    if(game.level3[i][j]!=-1)
                    {
                        //var type=parseInt(Math.random()*8);
                        var x=game.Bound.LEFT+game.BubbleD*j+offset;
                        var y=game.Bound.UP-game.BubbleD*i;

                        var bubble=this.addOneBubble(game.level3[i][j],x,y);
                        bubble.myRow=i;
                        bubble.myCol=j;
                        this.bubblesArr[i][j]=bubble;
                    }

                }
            }

        }
        else if(game.level==4) {


            for (var i = 0; i < game.level4.length; i++) {
                var offset = i % 2 ? game.BubbleD / 2 : 0;
                for (var j = 0; j < game.level4[i].length; j++) {
                    //cc.log("aaa",level1[i][j]);
                    //生成位置
                    if (game.level4[i][j] != -1) {
                        //var type=parseInt(Math.random()*8);
                        var x = game.Bound.LEFT + game.BubbleD * j + offset;
                        var y = game.Bound.UP - game.BubbleD * i;

                        var bubble = this.addOneBubble(game.level4[i][j], x, y);
                        bubble.myRow = i;
                        bubble.myCol = j;
                        this.bubblesArr[i][j] = bubble;
                    }

                }
            }

        }

        console.log("add bubbles");

    },

    createShooter:function(){
        this.shooter=new cc.Sprite(res.Shooter);
        this.shooter.x=game.Shoot_Pos.x;
        this.shooter.y=game.Shoot_Pos.y;
        this.shooter.anchorY=0.45;
        this.addChild(this.shooter,0);


        console.log("add shooter");
    },
    createShootBubble:function(){
        var random=parseInt(Math.random()*this.availbleBubTypes.length);
        while(random>=game.level+2)
        {
            var random=parseInt(Math.random()*this.availbleBubTypes.length);
        }
        var type=this.availbleBubTypes[random];
        this.fireBubble=this.addOneBubble(type,game.Shoot_Pos.x,game.Shoot_Pos.y);


        console.log("add shootbubbles");
    },
    createReadyBubble:function(){
        var random=parseInt(Math.random()*this.availbleBubTypes.length);
        while(random>=game.level+2)
        {
            var random=parseInt(Math.random()*this.availbleBubTypes.length);
        }
        var type=this.availbleBubTypes[random];
        this.waitBubble=this.addOneBubble(type,game.Ready_Pos.x,game.Ready_Pos.y);
        console.log("add ready bubble");
    },

    addOneBubble:function(type,x,y){
        var bubble=new Bubble(type);
        bubble.attr(
            {
                x:x,
                y:y
            }
        );
        this.addChild(bubble);
        return bubble;
    },
    playsound: function () {
        cc.audioEngine.playEffect(res.sound.ground, false);
    },




});