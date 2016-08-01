
var GameOverLayer = cc.Layer.extend({


	sval : 0,
	openStore: false,
	// constructor
	ctor:function (space) {
		this._super();
		firstInit = false;
		
		var winSize = cc.director.getWinSize();
		
		cc.MenuItemFont.setFontSize(30);
            //////////////////////////////////////成功/////////////////////////////////////////////////

        if(game.win)
        {


            cc.audioEngine.playEffect(res.sound.UI_rankup,false);
            ///////////////////////////////////////背景板/////////////////////////////////////////////
            //score board
            this.board = new cc.Sprite(res.over.scoreboard);
            this.board.attr({
                x:winSize.width+100,
                y:winSize.height/2
            });
            this.board.setScale(0.7);
            this.addChild(this.board,0);
            var actionTo = cc.MoveTo.create(0.7, cc.p(winSize.width/2, winSize.height/2)).easing(cc.easeBounceOut());
            this.board.runAction(actionTo);

            var c = cc.Sprite.create(res.over.winligt);
            c.setPosition(winSize.width / 2, winSize.height / 2);
            c.setScale(0.7);
            this.addChild(c, 0);
            var action=cc.blink(1,2);
            c.runAction(action.repeatForever());


            var sprite = cc.Sprite.create(res.over.wintext);
            sprite.setPosition(winSize.width, winSize.height);
            sprite.setScale(0.7);
            this.addChild(sprite, 0);
            sprite.runAction(cc.MoveTo.create(0.7, cc.p(winSize.width/2, winSize.height/2)).easing(cc.easeBounceOut()));



            //下一关
            this.nextlevelBtn = new cc.Menu(new cc.MenuItemSprite(
                new cc.Sprite(res.over.nextlevel),
                new cc.Sprite(res.over.nextlevel),
                this.onNextlevel, this));
            this.nextlevelBtn.setPosition(cc.p(winSize.width+100, 60));
            this.nextlevelBtn.attr({
                anchorX: 0,
                anchorY: 0,
                x: winSize.width+100,
                y: winSize.height/2-165
            });
            this.nextlevelBtn.setScale(0.8);
            this.nextlevelBtn.runAction(cc.MoveTo.create(0.7, cc.p(winSize.width/2+100, winSize.height/2-165)).easing(cc.easeBounceOut()));
            this.addChild(this.nextlevelBtn, 1);


            //商店
            this.storeBtn = new cc.Menu(new cc.MenuItemSprite(
                new cc.Sprite(res.over.store),
                new cc.Sprite(res.over.store),
                this.onStore, this));
            this.storeBtn.setPosition(cc.p(winSize.width+100, 60));
            this.storeBtn.attr({
                anchorX: 0,
                anchorY: 0,
                x: winSize.width+100,
                y: winSize.height/2-165
            });
            this.storeBtn.setScale(0.8);
            this.storeBtn.runAction(cc.MoveTo.create(0.7, cc.p(winSize.width/2+30, winSize.height/2-165)).easing(cc.easeBounceOut()));
            this.addChild(this.storeBtn, 1);

        }
        else
        {


            cc.audioEngine.playEffect(res.sound.lose, false);
            this.board = new cc.Sprite(res.over.scoreboard2);
            this.board.attr({
                x:winSize.width+100,
                y:winSize.height/2
            });
            this.board.setScale(0.7);
            this.addChild(this.board,0);
            var actionTo = cc.MoveTo.create(0.7, cc.p(winSize.width/2, winSize.height/2)).easing(cc.easeBounceOut());
            this.board.runAction(actionTo);


            var c = cc.Sprite.create(res.over.loseligt);
            c.setPosition(winSize.width / 2, winSize.height / 2);
            c.setScale(0.7);
            this.addChild(c, 0);
            var action=cc.blink(1,2);
            c.runAction(action.repeatForever());


            var sprite = cc.Sprite.create(res.over.losetext);
            sprite.setPosition(winSize.width, winSize.height);
            sprite.setScale(0.7);
            this.addChild(sprite, 0);
            sprite.runAction(cc.MoveTo.create(0.7, cc.p(winSize.width/2, winSize.height/2+50)).easing(cc.easeBounceOut()));





            //商店
            this.storeBtn = new cc.Menu(new cc.MenuItemSprite(
                new cc.Sprite(res.over.store),
                new cc.Sprite(res.over.store),
                this.onStore, this));
            this.storeBtn.setPosition(cc.p(winSize.width+100, 60));
            this.storeBtn.attr({
                anchorX: 0,
                anchorY: 0,
                x: winSize.width+100,
                y: winSize.height/2-165
            });
            this.storeBtn.setScale(0.8);
            this.storeBtn.runAction(cc.MoveTo.create(0.7, cc.p(winSize.width/2+60, winSize.height/2-165)).easing(cc.easeBounceOut()));
            this.addChild(this.storeBtn, 1);

        }

        ////////////////////////////////////分数/////////////////////////////////////////////
		this.labelScore = cc.LabelTTF.create("0", "Helvetica", 35);
		this.labelScore.setColor(cc.color(158, 98, 22));
		this.labelScore.setPosition(cc.p(winSize.width + 100, winSize.height/2-95));
		this.labelScore.runAction(cc.MoveTo.create(0.7, cc.p(winSize.width / 2 + 90, winSize.height/2-95)).easing(cc.easeBounceOut()));
		this.addChild(this.labelScore);


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
		this.restartBtn.runAction(cc.MoveTo.create(0.7, cc.p(winSize.width/2-30, winSize.height/2-165)).easing(cc.easeBounceOut()));
		this.addChild(this.restartBtn, 1);








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
		this.menuBtn.runAction(cc.MoveTo.create(0.7, cc.p(winSize.width/2-100, winSize.height/2-165)).easing(cc.easeBounceOut()));
		this.addChild(this.menuBtn, 1);
		

		this.scheduleUpdate();
	},
	
	update: function(dt) {

		if(this.sval < game.score) {
			if(game.score > 5000) {
				this.sval += 100;
			} else {
				this.sval += 50;
			}
		}
		this.labelScore.setString(this.sval);
	},
    playsound: function () {
        cc.audioEngine.playEffect(res.sound.ground, false);
    },
	

	onRestart: function (sender) {
        this.playsound();
     cc.director.runScene(new PlayScene());
	},
    onNextlevel: function(){
        this.playsound();
        if(game.level<4)game.level++;
        cc.director.runScene(new PlayScene());

    },
	onMenu: function() {
        this.playsound();
        cc.director.runScene(new MenuScene());
	},
	
	onStore: function() {
	}


});