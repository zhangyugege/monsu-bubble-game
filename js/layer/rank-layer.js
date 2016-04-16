/**
 * RankList Layer
 * shows the total rankinglist
 */
var RankLayer = cc.Layer.extend({

    kapai1:null,
    kapai2:null,
    kapai3:null,
    kapai4:null,
    kapai5:null,

    board:null,
    kapai:null,
    pos:1,
    note:null,
    labelArr:null,


    ctor: function() {
        this._super();
        labelArr=[
            ["疯狂炸弹，炸掉一排泡泡"],
            ["改变最后一排泡泡为你想要的颜色"],
            ["随即寻找一个泡泡变成彩色泡泡"],
            ["没有了呦"]
        ];
        var winsize = cc.director.getWinSize();



        /////////////////////////背景////////////////////////

        this.board = new cc.Sprite(res.main.farbg);
        this.board.setPosition(cc.p(winsize.width/2, winsize.height/2));
        this.board.setScale(0.8);
        this.addChild(this.board,0);

        var actionTo = cc.MoveTo.create(1, cc.p(winsize.width/2, winsize.height/2)).easing(cc.easeElasticOut());
        this.board.runAction(actionTo);



        ////////////////////////卡牌///////////////////////


        this.kapai=new cc.Sprite(res.kapai_1);
        this.kapai.setPosition(cc.p(winsize.width/2,winsize.height));
        this.addChild(this.kapai,100);
        var actionTo = cc.MoveTo.create(1, cc.p(winsize.width/2, winsize.height/2)).easing(cc.easeElasticOut());
        this.kapai.runAction(actionTo);

        this.note = new cc.LabelTTF("疯狂炸弹，炸掉一排泡泡", "Helvetica",16);
        this.note.setPosition(cc.p(winsize.width/2,winsize.height));
        this.addChild(this.note,100);
        var actionTo = cc.MoveTo.create(1, cc.p(winsize.width/2, winsize.height/2-200)).easing(cc.easeElasticOut());
        this.note.runAction(actionTo);



        //////////////////////按钮///////////////////////

        var left = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.menu.pageUpLeft),
            new cc.Sprite(res.menu.pageUpLeft),
            function() {

                if(this.pos!=1)
                {
                    this.pos--;
                    this.kapai.removeFromParent(true);
                    cc.audioEngine.playEffect(res.sound.ground, false);
                    this.kapai=new cc.Sprite(res["kapai_"+this.pos]);
                    console.log(this.pos);
                    this.kapai.setPosition(cc.p(winsize.width/2,winsize.height/2));
                    this.addChild(this.kapai,100);
                    this.note.string=labelArr[this.pos-1];
                }


            }.bind(this), this));
        left.setScale(0.8);
        left.setPosition(cc.p(winsize.width/2-250, winsize.height));
        this.addChild(left,110);
        var actionTo = cc.MoveTo.create(1, cc.p(winsize.width/2-400, winsize.height/2-20)).easing(cc.easeElasticOut());
        left.runAction(actionTo);



        var right = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.menu.pageUpRight),
            new cc.Sprite(res.menu.pageUpRight),
            function() {
                this.pos++;
                cc.audioEngine.playEffect(res.sound.ground, false);
                this.kapai.removeFromParent(true);
                this.kapai=new cc.Sprite(res["kapai_"+this.pos]);
                console.log(this.pos);
                this.kapai.setPosition(cc.p(winsize.width/2,winsize.height/2));
                this.addChild(this.kapai,100);
                this.note.string=labelArr[this.pos-1];
            }.bind(this), this));
        right.setScale(0.8);
        right.setPosition(cc.p(winsize.width/2+50, winsize.height));
        this.addChild(right,110);
        var actionTo = cc.MoveTo.create(1, cc.p(winsize.width/2+230, winsize.height/2-30)).easing(cc.easeElasticOut());
        right.runAction(actionTo);



        this.back = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.over.reload),
            new cc.Sprite(res.over.reload),
            function() {
                cc.log(1);
                cc.audioEngine.playEffect(res.sound.ground, false);
                cc.director.runScene(new MenuScene());
            }.bind(this), this));
        this.back.setScale(0.8);
        this.back.setPosition(cc.p(winsize.width/2-250, winsize.height));
        this.addChild(this.back,11);

        var actionTo = cc.MoveTo.create(1, cc.p(winsize.width/2+280, 0)).easing(cc.easeElasticOut());
        this.back.runAction(actionTo);


    }

});