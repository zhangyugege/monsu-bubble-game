/**
 * Created by Administrator on 2015/4/13.
 */
var GamePauseLayer = cc.Layer.extend({


    board:null,
    restartBtn:null,
    playBtn:null,
    menuBtn:null,
    ctor:function (space) {
        this._super();
        var winSize = cc.director.getWinSize();

            ///////////////////////////////////////背景板/////////////////////////////////////////////

            this.board = new cc.Sprite(res.pause.pauseboard);
            this.board.attr({
                x:winSize.width+100,
                y:winSize.height/2
            });
            this.board.setScale(0.7);
            this.addChild(this.board,0);
            var actionTo = cc.MoveTo.create(0.7, cc.p(winSize.width/2, winSize.height/2)).easing(cc.easeBounceOut());
            this.board.runAction(actionTo);




        ///////////////////////////////////按钮/////////////////////////////////////////////

        //再玩一次
        this.restartBtn = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.over.reload),
            new cc.Sprite(res.over.reload),
            this.onRestart, this));
        this.restartBtn.setPosition(cc.p(winSize.width+100, 60));
        this.restartBtn.attr({
            anchorX: 0,
            anchorY: 0,
            x: winSize.width+100,
            y: winSize.height/2-165
        });
        this.restartBtn.setScale(0.8);
        this.restartBtn.runAction(cc.MoveTo.create(0.7, cc.p(winSize.width/2-70, winSize.height/2-10)).easing(cc.easeBounceOut()));
        this.addChild(this.restartBtn, 1);

        //继续
        this.playBtn = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.pause.playbtn),
            new cc.Sprite(res.pause.playbtn),
            this.onPlay, this));
        this.playBtn.setPosition(cc.p(winSize.width+100, 60));
        this.playBtn.attr({
            anchorX: 0,
            anchorY: 0,
            x: winSize.width+100,
            y: winSize.height/2-165
        });
        this.playBtn.setScale(0.8);
        this.playBtn.runAction(cc.MoveTo.create(0.7, cc.p(winSize.width/2, winSize.height/2-10)).easing(cc.easeBounceOut()));
        this.addChild(this.playBtn, 1);


        //回到主菜单
        this.menuBtn = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.over.menu),
            new cc.Sprite(res.over.menu),
            this.onMenu, this));
        this.menuBtn.setPosition(cc.p(winSize.width+100, 60));
        this.menuBtn.attr({
            anchorX: 0,
            anchorY: 0,
            x: winSize.width+100,
            y: winSize.height/2-165
        });
        this.menuBtn.setScale(0.8);
        this.menuBtn.runAction(cc.MoveTo.create(0.7, cc.p(winSize.width/2+70, winSize.height/2-10)).easing(cc.easeBounceOut()));
        this.addChild(this.menuBtn, 1);








},
    playsound: function () {
        cc.audioEngine.playEffect(res.sound.ground, false);
    },



    onRestart: function (sender) {
        this.playsound();

        //cc.director.resume();
        cc.director.runScene(new PlayScene());

        game.menuitemopen=false;
    },
    onPlay: function(){

        this.playsound();
        //cc.director.resume();
            this.board.removeFromParent(true);
            this.restartBtn.removeFromParent(true);
            this.playBtn.removeFromParent(true);
            this.menuBtn.removeFromParent(true);

        game.menuitemopen=false;



    },
    onMenu: function() {


        this.playsound();
        //cc.director.resume();
        cc.director.runScene(new MenuScene());

        game.menuitemopen=false;
    }


});