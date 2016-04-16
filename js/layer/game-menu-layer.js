/**
 * Created by Administrator on 2015/4/12.
 */
//菜单场景


var GameMenuLayer = cc.Layer.extend({

    back:null,

    //  翻页效果

    lev1:null,
    lev2:null,
    lev3:null,
    lev4:null,

    isDisplay:null,
    menu_selected_Arr:null,
    isDisplayPos:null,
    ctor: function () {
        this._super();
        var winsize = cc.director.getWinSize();

        cc.audioEngine.stopMusic(res.sound.bgWelcome);
        cc.audioEngine.playMusic(res.sound.bgGame,true);
        this.isDisplay=0;
        this.menu_selected_Arr=[
            this.lev1,
            this.lev2,
            this.lev3,
            this.lev4
        ];
        this.isDisplayPos={x:winsize.width/2,y:winsize.height/2};


        ///////////////////////////////////////////背景/////////////////////////////////////////////
        //background
        var spritebg = new cc.Sprite(res.menu.menubg);
       spritebg.setPosition(cc.p(winsize.width/2,winsize.height/2));
        spritebg.setScale(0.8);
        this.addChild(spritebg,0);

        console.log("is ok1");

        ///////////////////////////////////////////按钮/////////////////////////////////////////////////////////



        //回到主菜单
        var menuBtn = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.house.tybtnmenu),
            new cc.Sprite(res.house.tybtnmenu),
            this.onMenu, this));
        menuBtn.setPosition(cc.p(winsize.width/2-80,4));
        menuBtn.setScale(0.8);
        this.addChild(menuBtn, 1);






        //left page
        var leftpage= new cc.MenuItemImage(
            res.menu.pageUpLeft,
            res.menu.pageUpLeft,
            function () {

                that.onPage(1);
            }
        );
        leftpage.setPosition(cc.p(winsize.width/2-320,winsize.height/2));
        leftpage.setScale(0.8);

        //right page
        var rightpage= new cc.MenuItemImage(
            res.menu.pageUpRight,
            res.menu.pageUpRight,
            function () {

                that.onPage(2);
            }
        );
        rightpage.setPosition(cc.p(winsize.width/2+320,winsize.height/2));
        rightpage.setScale(0.8);



        //card handbook
        var handbook = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.menu.menu_handbook),
            new cc.Sprite(res.menu.menu_handbook),
            new cc.Sprite(res.menu.menu_handbook),
            this.onhandbook, this));
        handbook.setPosition(cc.p(winsize.width/2+30, winsize.height/2+200));
        handbook.setScale(0.4);
        this.addChild(handbook, 1);
        var actionTo = cc.MoveTo.create(1, cc.p(winsize.width/2+30, winsize.height/2+20)).easing(cc.easeElasticOut());
        var sequence = cc.Sequence.create(
            actionTo,
            cc.CallFunc.create(function (logo) {
                var shaking = cc.MoveTo.create(1, cc.p(winsize.width/2+30, winsize.height/2)).easing(cc.easeElasticIn());
                var shakingBack = cc.MoveTo.create(1, cc.p(winsize.width/2+30, winsize.height/2+20)).easing(cc.easeElasticOut());
                var shakingSeq = cc.Sequence.create(shaking, shakingBack);
                var shakingSeq = cc.Sequence.create(shaking,shakingBack);
                logo.runAction(shakingSeq.repeatForever());
            }, handbook));
        handbook.runAction(sequence);


        //my house
        var myhouse = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.menu.menu_myhouse),
            new cc.Sprite(res.menu.menu_myhouse),
            new cc.Sprite(res.menu.menu_myhouse),
            this.onhouse, this));
        myhouse.setPosition(cc.p(winsize.width/2-330, winsize.height/2+130));
        myhouse.setScale(0.7);
        this.addChild(myhouse, 1);




///////////////////////////////////////////////////level/////////////////////////////////////////////////



        var that=this;





        this.lev1= new cc.MenuItemImage(
            res.menu.menuselected1,
            res.menu.menuselected1,
            function () {

                that.onplay(1);
            }
        );
        this.lev1.setPosition(cc.p(winsize.width/2, winsize.height/2));
        this.lev1.setScale(1.2);




        this.lev2= new cc.MenuItemImage(
            res.menu.menuselected2,
            res.menu.menuselected2,
            function () {

                that.onplay(2);
            }
        );
        this.lev2.setPosition(cc.p(winsize.width/2+200+50, winsize.height/2));
        this.lev2.setScale(0.8);



        this.lev3= new cc.MenuItemImage(
            res.menu.menuselected3,
            res.menu.menuselected3,
            function () {

                that.onplay(3);
            }
        );
        this.lev3.setPosition(cc.p(winsize.width/2+200*2+50, winsize.height/2));
        this.lev3.setScale(0.8);




        this.lev4= new cc.MenuItemImage(
            res.menu.menuselected4,
            res.menu.menuselected4,
                    function () {
                that.onplay(4);
            }
        );
        this.lev4.setPosition(cc.p(winsize.width/2+200*3+50, winsize.height/2));
        this.lev4.setScale(0.8);




        var menu = new cc.Menu(this.lev1,this.lev2,this.lev3,this.lev4,leftpage,rightpage);
        menu.x=0;
        menu.y=0;
        this.addChild(menu);


        this.menu_selected_Arr=[
            this.lev1,
            this.lev2,
            this.lev3,
            this.lev4
        ];



       // this.scheduleUpdate();



    },

    update:function(dt){


        //if(game.nowscore <game.score+this.prescore){
        //    game.nowscore+=100;
        //}
        //
        //if(this.card <game.card) {
        //    this.card++;
        //}
        //
        //this.labelScore.setString(game.nowscore);
        //this.labelCard.setString(this.card);

    },
    playsound: function () {
        cc.audioEngine.playEffect(res.sound.ground, false);
    },
    onMenu: function () {
        this.playsound();
        cc.director.runScene(new BeginScene());
    },
    onhandbook: function () {
        this.playsound();
        this.addChild(new RankLayer(), 100);
    },
    onhouse: function () {
        this.playsound();
        //cc.director.runScene(new HouseScene());
    },
    onplay: function (gam) {
        this.playsound();
        game.level=gam;
        cc.director.runScene(new PlayScene());
    },
    onPage: function (pos) {
        this.playsound();


        if(pos==2)//左
        {
            if(this.isDisplay!=3)
            {
                for(var i=0;i<this.menu_selected_Arr.length;i++)
                {
                    if(i==this.isDisplay+1)
                    {
                        this.menu_selected_Arr[i].setPosition(cc.p(this.isDisplayPos.x,this.isDisplayPos.y));
                        this.menu_selected_Arr[i].setScale(1.2);
                    }
                    else if(i==this.isDisplay)
                    {
                        this.menu_selected_Arr[i].setPosition(cc.p(this.menu_selected_Arr[i].getPosition().x-250,this.menu_selected_Arr[i].getPosition().y));
                        this.menu_selected_Arr[i].setScale(0.8);
                    }
                    else
                    {
                        this.menu_selected_Arr[i].setPosition(cc.p(this.menu_selected_Arr[i].getPosition().x-200,this.menu_selected_Arr[i].getPosition().y));
                    }

                }
                this.isDisplay++;
            }

        }

        else if(pos==1)//右
        {

            if(this.isDisplay!=0)
            {
                for(var i=0;i<this.menu_selected_Arr.length;i++)
                {
                    if(i==this.isDisplay-1)
                    {


                        this.menu_selected_Arr[i].setPosition(cc.p(this.isDisplayPos.x,this.isDisplayPos.y));
                        this.menu_selected_Arr[i].setScale(1.2);
                    }
                    else if(i==this.isDisplay)
                    {
                        this.menu_selected_Arr[i].setPosition(cc.p(this.menu_selected_Arr[i].getPosition().x+250,this.menu_selected_Arr[i].getPosition().y));
                        this.menu_selected_Arr[i].setScale(0.8);
                    }
                    else
                    {
                        this.menu_selected_Arr[i].setPosition(cc.p(this.menu_selected_Arr[i].getPosition().x+200,this.menu_selected_Arr[i].getPosition().y));
                    }

                }
                this.isDisplay--;
            }

        }
    }

});
