
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

        //if(this.openStore) {
        //
         //   this.labelCoins.setString(this.totalCoin);
		//	this.labelMagnet.setString(this.magnetNum);
		//	this.labelShoes.setString(this.shoesNum);
		//	this.labelRedshoes.setString(this.redshoesNum);
		//}
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
		//this.openStore = true;
		//var winsize = cc.director.getWinSize();
        //
        //
		//this.sboard = new cc.Sprite(res.ui.storeBoard);
		//this.sboard.setPosition(cc.p(winsize.width/2+300, winsize.height/2));
		//this.sboard.setScale(0.57);
		//this.addChild(this.sboard, 5);
		//var actionTo = cc.MoveTo.create(1, cc.p(winsize.width/2, winsize.height/2)).easing(cc.easeElasticOut());
		//this.sboard.runAction(actionTo);
        //////返回
		//this.backBtn = new cc.Menu(new cc.MenuItemSprite(
		//		new cc.Sprite(res.ui.backBtn),
		//		new cc.Sprite(res.ui.backBtn),
		//		this.backToMenu, this));
		//this.backBtn.setPosition(cc.p(winsize.width+100, 60));
		//this.backBtn.attr({
		//	anchorX: 0,
		//	anchorY: 0,
		//	x: winsize.width/2+300,
		//	y: winsize.height/2-190
		//});
		//this.backBtn.setScale(0.6);
		//this.backBtn.runAction(cc.MoveTo.create(1, cc.p(winsize.width/2-100, winsize.height/2-210)).easing(cc.easeElasticOut()));
		//this.addChild(this.backBtn, 6);
        //console.log("backbtn");
        //
		////show coins nums
        //this.totalCoin=100;
		//this.labelCoins = new cc.LabelTTF(this.totalCoin, "Helvetica", 50);
		//this.labelCoins.setColor(cc.color(255, 255, 255));//white color
		//this.labelCoins.setPosition(cc.p(winsize.width+100, winsize.height/2+128));
		//this.labelCoins.setScale(0.3);
		//this.addChild(this.labelCoins, 10);
		////this.labelCoins.retain();
		//this.labelCoins.runAction(cc.MoveTo.create(1, cc.p(winsize.width/2+50, winsize.height/2+128)).easing(cc.easeElasticOut()));
        ////购买按钮
		//this.buyMagnetBtn = new cc.Menu(new cc.MenuItemSprite(
		//		new cc.Sprite(res.ui.buy30),
		//		new cc.Sprite(res.ui.buy30),
		//		function(){
		//			//buy magnet
		//			if(this.totalCoin - 30 < 0){
		//				return;
		//			}
		//			this.totalCoin -= 30;
		//			this.magnetNum++;
		//			//sys.localStorage.setItem("TotalCoin", this.totalCoin);
		//			//sys.localStorage.setItem("magnet", this.magnetNum);
		//			cc.audioEngine.playEffect(res.sound.button);
		//		}, this));
		//this.buyMagnetBtn.setPosition(cc.p(winsize.width+80, winsize.height/2+70));
		//this.buyMagnetBtn.attr({
		//	anchorX: 0,
		//	anchorY: 0
		//});
		//this.buyMagnetBtn.setScale(0.6);
		//this.buyMagnetBtn.runAction(cc.MoveTo.create(1, cc.p(winsize.width/2+80, winsize.height/2+70)).easing(cc.easeElasticOut()));
		//this.addChild(this.buyMagnetBtn, 6);
        //
		//this.buyShoesBtn = new cc.Menu(new cc.MenuItemSprite(
		//		new cc.Sprite(res.ui.buy50),
		//		new cc.Sprite(res.ui.buy50),
		//		function(){
		//			//buy shoes
		//			if(this.totalCoin - 50 < 0){
		//				return;
		//			}
		//			this.totalCoin -= 50;
		//			this.shoesNum++;
		//			//sys.localStorage.setItem("TotalCoin", this.totalCoin);
		//			//sys.localStorage.setItem("shoes", this.shoesNum);
		//			cc.audioEngine.playEffect(res.sound.button);
		//		}, this));
		//this.buyShoesBtn.setPosition(cc.p(winsize.width+80, winsize.height/2-10));
		//this.buyShoesBtn.attr({
		//	anchorX: 0,
		//	anchorY: 0
		//});
		//this.buyShoesBtn.setScale(0.6);
		//this.buyShoesBtn.runAction(cc.MoveTo.create(1, cc.p(winsize.width/2+80, winsize.height/2-10)).easing(cc.easeElasticOut()));
		//this.addChild(this.buyShoesBtn, 6);
        //
		//this.buyRedshoesBtn = new cc.Menu(new cc.MenuItemSprite(
		//		new cc.Sprite(res.ui.buy50),
		//		new cc.Sprite(res.ui.buy50),
		//		function(){
		//			//buy red shoes
		//			if(this.totalCoin - 50 < 0){
		//				return;
		//			}
		//			this.totalCoin -= 50;
		//			this.redshoesNum++;
		//			//sys.localStorage.setItem("TotalCoin", this.totalCoin);
		//			//sys.localStorage.setItem("redshoes", this.redshoesNum);
		//			cc.audioEngine.playEffect(res.sound.button);
		//		}, this));
		//this.buyRedshoesBtn.setPosition(cc.p(winsize.width+80, winsize.height/2-90));
		//this.buyRedshoesBtn.attr({
		//	anchorX: 0,
		//	anchorY: 0,
		//});
		//this.buyRedshoesBtn.setScale(0.6);
		//this.buyRedshoesBtn.runAction(cc.MoveTo.create(1, cc.p(winsize.width/2+80, winsize.height/2-90)).easing(cc.easeElasticOut()));
		//this.addChild(this.buyRedshoesBtn, 6);
        //
        //console.log("buy btn");
        //
        //this.magnetNum=1;//磁铁
		//this.labelMagnet = new cc.LabelTTF(this.magnetNum, "Helvetica", 60);
		//this.labelMagnet.setColor(cc.color(255, 255, 255));//white color
		//this.labelMagnet.setPosition(cc.p(winsize.width+100, winsize.height/6-5));
		//this.labelMagnet.setScale(0.3);
		//this.addChild(this.labelMagnet, 10);
		//this.labelMagnet.runAction(cc.MoveTo.create(1, cc.p(winsize.width/2-70, winsize.height/6-5)).easing(cc.easeElasticOut()));
        //console.log("show magnet")
		////show shoes
		//this.labelShoes = new cc.LabelTTF(this.magnetNum, "Helvetica", 60);
		//this.labelShoes.setColor(cc.color(255, 255, 255));//white color
		//this.labelShoes.setPosition(cc.p(winsize.width+200, winsize.height/6-5));
		//this.labelShoes.setScale(0.3);
		//this.addChild(this.labelShoes, 10);
		//this.labelShoes.runAction(cc.MoveTo.create(1, cc.p(winsize.width/2+20, winsize.height/6-5)).easing(cc.easeElasticOut()));
        //
		////show redshoes
		//this.labelRedshoes = new cc.LabelTTF(this.magnetNum, "Helvetica", 60);
		//this.labelRedshoes.setColor(cc.color(255, 255, 255));//white color
		//this.labelRedshoes.setPosition(cc.p(winsize.width+300, winsize.height/6-5));
		//this.labelRedshoes.setScale(0.3);
		//this.addChild(this.labelRedshoes, 10);
		//this.labelRedshoes.runAction(cc.MoveTo.create(1, cc.p(winsize.width/2+100, winsize.height/6-5)).easing(cc.easeElasticOut()));
	}
	
	//backToMenu: function() {
    //
     //   this.playsound();
	//	var winsize = cc.director.getWinSize();
	//	this.backBtn.runAction(cc.Sequence.create(cc.MoveTo.create(1, cc.p(-250, winsize.height/2-190)).easing(cc.easeElasticInOut(0.45)),
	//			new cc.CallFunc(function(){
	//				//this.sboard.removeFromParent();
	//				this.backBtn.removeFromParent();
	//			}.bind(this))));
	//	//this.sboard.runAction(cc.MoveTo.create(1, cc.p(-250, winsize.height/2)).easing(cc.easeElasticInOut(0.45)));
    //
	//	//if(this.buyMagnetBtn)
	//	//	this.buyMagnetBtn.runAction(cc.MoveTo.create(1, cc.p(-250, winsize.height/2+70)).easing(cc.easeElasticInOut(0.45)));
	//	//if(this.buyShoesBtn)
	//	//	this.buyShoesBtn.runAction(cc.MoveTo.create(1, cc.p(-250, winsize.height/2-10)).easing(cc.easeElasticInOut(0.45)));
	//	//if(this.buyRedshoesBtn)
	//	//	this.buyRedshoesBtn.runAction(cc.MoveTo.create(1, cc.p(-250, winsize.height/2-90)).easing(cc.easeElasticInOut(0.45)));
	//	//if(this.labelCoins)
	//	//	this.labelCoins.runAction(cc.MoveTo.create(1, cc.p(-250, winsize.height/2+128)).easing(cc.easeElasticInOut(0.45)));
	//	//if(this.labelMagnet)
	//	//	this.labelMagnet.runAction(cc.MoveTo.create(1, cc.p(-250, winsize.height/6-5)).easing(cc.easeElasticInOut(0.45)));
	//	//if(this.labelShoes)
	//	//	this.labelShoes.runAction(cc.MoveTo.create(1, cc.p(-250, winsize.height/6-5)).easing(cc.easeElasticInOut(0.45)));
	//	//if(this.labelRedshoes){
	//	//	this.labelRedshoes.runAction(cc.MoveTo.create(1, cc.p(-250, winsize.height/6-5)).easing(cc.easeElasticInOut(0.45)));
	//	//}
	//}

});