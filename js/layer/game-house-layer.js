/**
 * Created by Administrator on 2015/4/14.
 */
//宠物场景层
var GameHouseLayer = cc.Layer.extend({

    monsu:null,
    age:0,
    think:null,
    menuBtn:null,

////////按钮动画////
    eat_btn_ani:1,
    goodeat_btn_ani:2,
    gotoschool_btn_ani:3,
    play_btn_ani:4,
    college_btn_ani:5,
    doudou_btn_ani:6,
    sleep_btn_ani:7,

    eat_btn_anim:1,
    goodeat_btn_anim:2,
    gotoschool_btn_anim:3,
    play_btn_anim:4,
    college_btn_anim:5,
    doudou_btn_anim:6,
    sleep_btn_anim:7,
    btnthinkingArr:null,

//////小手/////
    xiaoshou:null,
    xiaoshou_bound:120,
    isxiaoshou:false,
    xiaoshoupos_x:0,
    xiaoshoupos_y:0,


//开场动画
    _kaichang_keaiAnim:null,
    _kaichang_sleepingAnim:null,
    _kaichang_qingwaAnim:null,
    _kaichang_kanhuaAnim:null,


    kaichangArr:null,
    kaichangthinkingArr:null,

////触摸动画//

    _chumo_aifuAnim:null,
    _naonao_aifuAnim:null,
    _xihuanxiaoshou_aifuAnim:null,
    _guai_aifuAnim:null,

    chumoArr:null,
    chumothinkingArr:null,

    ctor: function(){
        this._super();

        var winsize = cc.director.getWinSize();

        this.initanimation();
        this.addEventListener();

        ////////////////初始化数组//////////////////
        this.kaichangArr=[1,1,2,3,4,2,3,4];
        this.kaichangthinkingArr=[
            [],
            ["ma mi~ └(^o^)┘"],
            ["z  zz  z z"],
            ["小小..小可爱.."],
            ["妈妈，小花花可以跟我玩吗"]
        ];

        this.chumoArr=[1,4,3,4,1,3,2,2];
        this.chumothinkingArr=[
            [],
            [" └(^o^)┘"],
            // ["z  zz  z z"],
            //["小小..小可爱.."],
            ["哈哈哈哈哈"],
            ["@!%@#^$#%$^*(.."],
            ["我乖吧.."]
        ];
        this.btnthinkingArr=[
            [],
            ["eat饱饱"],
            ["呜啊！！！！"],
            ["好无聊也"],
            ["吼哈哈哈哈"],
            ["米扫米扫米扫法拉"],
            ["救命杀人啦！"],
            ["人家一点也\n不想睡嘛"]
        ];



        ///////////////////////////////////////////背景//////////////////////////////////////////////

        //background
        var spritebg = new cc.Sprite(res.house.housebg);
        spritebg.setPosition(cc.p(winsize.width/2,winsize.height/2));
        spritebg.setScale(0.73);
        this.addChild(spritebg,0);
        //var move = cc.MoveTo.create(5, cc.p(0, -10)).easing(cc.easeElasticOut());
        // spritebg.runAction(move);

        //////////////////////////////宠物//////////////////////////////////////////

        this.monsu=new cc.Sprite(res.house.keai001);
        this.monsu.setPosition(cc.p(winsize.width/2-100,winsize.height/2));
        this.monsu.setScale(2.0);
        this.addChild(this.monsu);
        this.monsu.runAction(this._kaichang_keaiAnim.repeatForever());

        ////////////////////////////his thinking /////////////////////////////////////////
        var thinking = new cc.Sprite(res.house.thinking);
        thinking.setPosition(cc.p(winsize.width/2-150-100,winsize.height/2+150));
        this.addChild(thinking,0);

        this.think = cc.LabelTTF.create("ma mi~~ ", "Helvetica", 25);
        this.think.setPosition(cc.p(winsize.width/2-150-100,winsize.height/2+170));
        this.think.setColor(cc.color(0, 0,0));
        this.addChild(this.think, 1);


        this.setstate();

        ////////////////////////////年龄/////////////////////////////////////////


        var age = cc.LabelTTF.create("我今年"+this.age+"岁啦", "Helvetica", 25);
        age.setPosition(cc.p(winsize.width/2-100,winsize.height/2-100));
        age.setColor(cc.color(0, 0,0));
        this.addChild(age, 1);

        ////////////////////////////时间版/////////////////////////////////////////




        /////////////////////////////小手///////////////////////////////////////


        this.xiaoshou = new cc.Sprite(res.house.xiaoshou);
        this.xiaoshou.setPosition(cc.p(winsize.width-180,winsize.height/2));
        this.xiaoshou.setScale(0.5);
        this.addChild(this.xiaoshou,0);

        this.xiaoshoupos_x=this.xiaoshou.x;
        this.xiaoshoupos_y=this.xiaoshou.y;

        ///////////////////////////////////////////按钮//////////////////////////////////////////////////////////


        //回到主菜单
        this.menuBtn = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.house.tybtnmenu),
            new cc.Sprite(res.house.tybtnmenu),
            this.onMenu, this));
        this.menuBtn.setPosition(cc.p(winsize.width-120,winsize.height-100));
        this.menuBtn.setScale(0.8);
        this.addChild(this.menuBtn, 1);


        ////left
        //var left = new cc.Menu(new cc.MenuItemSprite(
        //    new cc.Sprite("res/house-btn/tybtnlast.png"),
        //    new cc.Sprite("res/house-btn/tybtnlast.png"),
        //    this.onMenu, this));
        //left.setPosition(cc.p(-40,4));
        //left.setScale(0.8);
        //left.attr(
        //    {
        //        anchorX:0.5,
        //        anchorY:0.5
        //    }
        //);
        //this.addChild(left, 1);
        //
        ////right
        //var right = new cc.Menu(new cc.MenuItemSprite(
        //    new cc.Sprite("res/house-btn/tybtnnext.png"),
        //    new cc.Sprite("res/house-btn/tybtnnext.png"),
        //    this.onMenu, this));
        //right.setPosition(cc.p(winsize.width-120,4));
        //right.setScale(0.8);
        //this.addChild(right, 1);


        var that=this;
        var eatbtn = new cc.MenuItemImage(
            res.house.eatbtn,
            res.house.eatbtn,
            function () {

                that.onrun(that.eat_btn_ani);
            }
        );
        eatbtn.setPosition(cc.p(48+65,44));
        eatbtn.setScale(0.8);


        var goodeatbtn = new cc.MenuItemImage(
            res.house.goodeatbtn,
            res.house.goodeatbtn,
            function () {

                that.onrun(that.goodeat_btn_ani);
            }
        );
        goodeatbtn.setPosition(cc.p(50+80+70,44));
        goodeatbtn.setScale(0.8);



        var gotoschoolbtn= new cc.MenuItemImage(
            res.house.gotoschoolbtn,
            res.house.gotoschoolbtn,
            function () {

                that.onrun(that.gotoschool_btn_ani);
            }
        );
        gotoschoolbtn.setPosition(cc.p(50+80*2+10+70,44));
        gotoschoolbtn.setScale(0.8);



        var playbtn= new cc.MenuItemImage(
            res.house.playbtn,
            res.house.playbtn,
            function () {

                that.onrun(that.play_btn_ani);
            }
        );
        playbtn.setPosition(cc.p(50+80*3+20+80,44));
        playbtn.setScale(0.8);




        var collagebtn= new cc.MenuItemImage(
            res.house.collegebtn,
            res.house.collegebtn,
            function () {

                that.onrun(that.college_btn_ani);
            }
        );
        collagebtn.setPosition(cc.p(50+80*4+30+70,44));
        collagebtn.setScale(0.8);




        var doudoubtn= new cc.MenuItemImage(
            res.house.doudoubtn,
            res.house.doudoubtn,
            function () {

                that.onrun(that.doudou_btn_ani);
            }
        );
        doudoubtn.setPosition(cc.p(50+80*5+40+80,45));
        doudoubtn.setScale(0.8);



        var sleepbtn= new cc.MenuItemImage(
            res.house.sleepbtn,
            res.house.sleepbtn,
            function () {


                that.onrun(that.sleep_btn_ani);
            }
        );
        sleepbtn.setPosition(cc.p(50+80*6+60+80,44));
        sleepbtn.setScale(0.8);



        var menu = new cc.Menu(sleepbtn,doudoubtn,collagebtn,playbtn,gotoschoolbtn,goodeatbtn,eatbtn);
        menu.x=0;
        menu.y=0;
        this.addChild(menu);



    },

    initanimation: function () {


/////////////开场//////////////////////////
        //可爱
        var keai = cc.Animation.create();
        for (var ti = 1; ti < 8; ti ++){
            var tiFrame = res.house["keai00" + ti];
            keai.addSpriteFrameWithFile(tiFrame);
        }
        keai.setDelayPerUnit(0.1);
        this._kaichang_keaiAnim= cc.Animate.create(keai);

        //睡着
        var sleeping = cc.Animation.create();
        for (var ti = 1; ti < 16; ti ++){
            var tiFrame = res.house["sleep0"+ti];
            sleeping.addSpriteFrameWithFile(tiFrame);
        }
        sleeping.setDelayPerUnit(0.1);
        this._kaichang_sleepingAnim= cc.Animate.create(sleeping);


        //扮青蛙装可爱
        var qingwa = cc.Animation.create();
        for (var ti = 1; ti < 10; ti ++){
            var tiFrame = res.house["qingwa00"+ti];
            qingwa.addSpriteFrameWithFile(tiFrame);
        }

        var tiFrame = res.house.qingwa010;
        qingwa.addSpriteFrameWithFile(tiFrame);
        qingwa.setDelayPerUnit(0.1);
        this._kaichang_qingwaAnim= cc.Animate.create(qingwa);

        //蹲下看小花
        var kanhua = cc.Animation.create();
        for (var ti = 1; ti < 10; ti ++){
            var tiFrame = res.house["kanhua00"+ti];
            kanhua.addSpriteFrameWithFile(tiFrame);
        }
        for (var ti = 10; ti < 17; ti ++){
            var tiFrame = res.house["kanhua0"+ti];
            kanhua.addSpriteFrameWithFile(tiFrame);
        }
        kanhua.setDelayPerUnit(0.1);
        this._kaichang_kanhuaAnim= cc.Animate.create(kanhua);



        //////////////////被触摸///////////////////
        var aifu = cc.Animation.create();
        for (var ti = 1; ti < 8; ti ++){
            var tiFrame = res.house["100"+ti];
            aifu.addSpriteFrameWithFile(tiFrame);
        }
        aifu.setDelayPerUnit(0.1);
        this._chumo_aifuAnim= cc.Animate.create(aifu);


        var naonao = cc.Animation.create();
        for (var ti = 1; ti < 10; ti ++){
            var tiFrame = res.house["naonao00"+ti];
            naonao.addSpriteFrameWithFile(tiFrame);
        }

        for (var ti = 10; ti < 18; ti ++){
            var tiFrame = res.house["naonao0"+ti];
            naonao.addSpriteFrameWithFile(tiFrame);
        }
        naonao.setDelayPerUnit(0.1);
        this._naonao_aifuAnim= cc.Animate.create(naonao);


        var xihuanxiaoshou = cc.Animation.create();
        for (var ti = 1; ti < 10; ti ++){
            var tiFrame =res.house["xihuanxiaoshou00"+ti];
            xihuanxiaoshou.addSpriteFrameWithFile(tiFrame);
        }

        var tiFrame = res.house.xihuanxiaoshou010;
        xihuanxiaoshou.addSpriteFrameWithFile(tiFrame);
        xihuanxiaoshou.setDelayPerUnit(0.1);
        this._xihuanxiaoshou_aifuAnim= cc.Animate.create(xihuanxiaoshou);


        var guai = cc.Animation.create();
        for (var ti = 1; ti < 10; ti ++){
            var tiFrame = res.house["guai00"+ti];
            guai.addSpriteFrameWithFile(tiFrame);
        }

        for (var ti = 10; ti < 14; ti ++){
            var tiFrame = res.house["guai0"+ti];
            naonao.addSpriteFrameWithFile(tiFrame);
        }
        guai.setDelayPerUnit(0.1);
        this._guai_aifuAnim= cc.Animate.create(guai);


//////////////////按钮///////////////////

        var eating = cc.Animation.create();
        for (var ti = 1; ti < 17; ti ++){
            var tiFrame =res.house["eating"+ti];
            eating.addSpriteFrameWithFile(tiFrame);
        }
        for (var ti = 17; ti < 45; ti ++){
            var tiFrame = res.house["eating0"+ti];
            eating.addSpriteFrameWithFile(tiFrame);
        }
        eating.setDelayPerUnit(0.1);
        this.eat_btn_anim= cc.Animate.create(eating);


        var eating = cc.Animation.create();
        for (var ti = 1; ti < 10; ti ++){
            var tiFrame =res.house["goodeat00"+ti] ;
            eating.addSpriteFrameWithFile(tiFrame);
        }
        eating.setDelayPerUnit(0.1);
        this.goodeat_btn_anim= cc.Animate.create(eating);


        var eating = cc.Animation.create();
        for (var ti = 1; ti < 10; ti ++){
            var tiFrame = res.house["doudou00"+ti];
            eating.addSpriteFrameWithFile(tiFrame);
        }
        eating.setDelayPerUnit(0.1);
        this.doudou_btn_anim= cc.Animate.create(eating);



        var eating = cc.Animation.create();
        for (var ti = 1; ti < 10; ti ++){
            var tiFrame =res.house["inclass00"+ti];
            eating.addSpriteFrameWithFile(tiFrame);
        }
        for (var ti = 10; ti < 30; ti ++){
            var tiFrame =res.house["inclass0"+ti];
            eating.addSpriteFrameWithFile(tiFrame);
        }
        eating.setDelayPerUnit(0.1);
        this.gotoschool_btn_anim= cc.Animate.create(eating);


        var eating = cc.Animation.create();
        for (var ti = 1; ti < 9; ti ++){
            var tiFrame = res.house["play00"+ti];
            eating.addSpriteFrameWithFile(tiFrame);
        }
        eating.setDelayPerUnit(0.1);
        this.play_btn_anim= cc.Animate.create(eating);

        var eating = cc.Animation.create();
        for (var ti = 1; ti < 9; ti ++){
            var tiFrame = res.house["dontlikesleep00"+ti];
            eating.addSpriteFrameWithFile(tiFrame);
        }
        for (var ti = 10; ti <14; ti ++){
            var tiFrame = res.house["dontlikesleep0"+ti];
            eating.addSpriteFrameWithFile(tiFrame);
        }
        eating.setDelayPerUnit(0.1);
        this.sleep_btn_anim= cc.Animate.create(eating);


        var eating = cc.Animation.create();
        for (var ti = 1; ti < 10; ti ++){
            var tiFrame =res.house["college00"+ti];
            eating.addSpriteFrameWithFile(tiFrame);
        }
        for (var ti = 10; ti <31; ti ++){
            var tiFrame = res.house["college0"+ti];
            eating.addSpriteFrameWithFile(tiFrame);
        }
        eating.setDelayPerUnit(0.1);
        this.college_btn_anim= cc.Animate.create(eating);



    },

    playsound: function () {
        cc.audioEngine.playEffect(res.sound.ground, false);
    },
    onrun: function (ans) {
        console.log(ans);
        this.playsound();
        switch(ans)
        {
            case this.goodeat_btn_ani:this.monsu.stopAllActions();
                this.monsu.runAction(new cc.Sequence(new cc.Repeat(this.goodeat_btn_anim,3),new cc.CallFunc(function (monsu,Anim) {
                    monsu.runAction(Anim.repeatForever());
                },this.monsu,this._kaichang_keaiAnim)));
                break;
            case this.eat_btn_ani:this.monsu.stopAllActions();
                this.monsu.runAction(new cc.Sequence(new cc.Repeat(this.eat_btn_anim,3),new cc.CallFunc(function (monsu,Anim) {
                    monsu.runAction(Anim.repeatForever());
                },this.monsu,this._kaichang_keaiAnim)));
                break;
            case this.doudou_btn_ani:this.monsu.stopAllActions();
                this.monsu.runAction(new cc.Sequence(new cc.Repeat(this.doudou_btn_anim,3),new cc.CallFunc(function (monsu,Anim) {
                    monsu.runAction(Anim.repeatForever());
                },this.monsu,this._kaichang_keaiAnim)));
                break;
            case this.gotoschool_btn_ani:this.monsu.stopAllActions();
                this.monsu.runAction(new cc.Sequence(new cc.Repeat(this.gotoschool_btn_anim,3),new cc.CallFunc(function (monsu,Anim) {
                    monsu.runAction(Anim.repeatForever());
                },this.monsu,this._kaichang_keaiAnim)));
                break;
            case this.play_btn_ani:this.monsu.stopAllActions();
                this.monsu.runAction(new cc.Sequence(new cc.Repeat(this.play_btn_anim,3),new cc.CallFunc(function (monsu,Anim) {
                    monsu.runAction(Anim.repeatForever());
                },this.monsu,this._kaichang_keaiAnim)));
                break;
            case this.sleep_btn_ani:this.monsu.stopAllActions();
                this.monsu.runAction(new cc.Sequence(new cc.Repeat(this.sleep_btn_anim,3),new cc.CallFunc(function (monsu,Anim) {
                    monsu.runAction(Anim.repeatForever());
                },this.monsu,this._kaichang_keaiAnim)));
                break;
            case this.college_btn_ani:this.monsu.stopAllActions();
                this.monsu.runAction(new cc.Sequence(new cc.Repeat(this.college_btn_anim,3),new cc.CallFunc(function (monsu,Anim) {
                    monsu.runAction(Anim.repeatForever());
                },this.monsu,this._kaichang_keaiAnim)));
                break;
        }

        this.think.setString(this.btnthinkingArr[ans]);
    },

    setstate: function () {

        var random=parseInt(Math.random()*this.kaichangArr.length);

        this.think.setString(this.kaichangthinkingArr[this.kaichangArr[random]]);
        switch(this.kaichangArr[random])
        {
            case 1:break;
            case 2:this.monsu.stopAllActions();
                this.monsu.runAction(this._kaichang_sleepingAnim.repeatForever());
                break;

            case 3:this.monsu.stopAllActions();
                this.monsu.runAction(this._kaichang_qingwaAnim.repeatForever());
                break;

            case 4:this.monsu.stopAllActions();
                this.monsu.runAction(this._kaichang_kanhuaAnim.repeatForever());
                break;
        }

    },

    chumo: function () {

        var random=parseInt(Math.random()*this.chumoArr.length);

        this.think.setString(this.chumothinkingArr[this.chumoArr[random]]);

        switch(this.chumoArr[random])
        {
            case 1:this.monsu.stopAllActions();
                this.monsu.runAction(new cc.Sequence(new cc.Repeat(this._chumo_aifuAnim,3),new cc.CallFunc(function (monsu,Anim) {
                    monsu.runAction(Anim.repeatForever());
                },this.monsu,this._kaichang_keaiAnim)));
                break;
            case 2:this.monsu.stopAllActions();
                this.monsu.runAction(new cc.Sequence(new cc.Repeat(this._naonao_aifuAnim,3),new cc.CallFunc(function (monsu,Anim) {
                    monsu.runAction(Anim.repeatForever());
                },this.monsu,this._kaichang_keaiAnim)));
                break;

            case 3:this.monsu.stopAllActions();
                this.monsu.runAction(new cc.Sequence(new cc.Repeat(this._xihuanxiaoshou_aifuAnim,3),new cc.CallFunc(function (monsu,Anim) {
                    monsu.runAction(Anim.repeatForever());
                },this.monsu,this._kaichang_keaiAnim)));
                break;

            case 4:this.monsu.stopAllActions();
                this.monsu.runAction(new cc.Sequence(new cc.Repeat(this._guai_aifuAnim,3),new cc.CallFunc(function (monsu,Anim) {
                    monsu.runAction(Anim.repeatForever());
                },this.monsu,this._kaichang_keaiAnim)));
                break;


        }

    },

    onMenu: function() {
        this.playsound();

        cc.director.runScene(new MenuScene());
    },


    addEventListener: function () {
        var that=this;
        var eventListener=cc.EventListener.create({
            event : cc.EventListener.MOUSE,

            onMouseDown : function(event){
                var pos =event.getLocation();
                that.onMouseDown(pos);
            },
            onMouseMove : function(event){

                var pos =event.getLocation();
                that.onMouseMove(pos);
            }

        });
        cc.eventManager.addListener(eventListener,this);
    },

    onMouseMove: function (pos) {


        if(this.isxiaoshou)
        {
            this.xiaoshou.x=pos.x;
            this.xiaoshou.y=pos.y;
        }

    },
    onMouseDown: function (pos) {


        if(pos.x>=this.xiaoshoupos_x-this.xiaoshou_bound/2&&pos.x<=this.xiaoshoupos_x+this.xiaoshou_bound/2&&pos.y>=this.xiaoshoupos_y-this.xiaoshou_bound/2&&pos.y<=this.xiaoshoupos_y+this.xiaoshou_bound/2)
        {
            console.log("click");
            if(this.isxiaoshou==false)
            {
                this.playsound();
                console.log("move");
                this.isxiaoshou=true;
                this.xiaoshou.x=pos.x;
                this.xiaoshou.y=pos.y;
            }
            else
            {
                this.isxiaoshou=false;
            }

        }
        if(this.isxiaoshou&&pos.x>=this.monsu.x-40&&pos.x<=this.monsu.x+40&&pos.y>=this.monsu.y-40&&pos.y<=this.monsu.y+40)
        {
            this.chumo();
        }

    }



});