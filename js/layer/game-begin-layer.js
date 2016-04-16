//开始场景
var GameBeginLayer = cc.Layer.extend({

    play_btn_anim:null,
	ctor: function(){
		this._super();

		var winsize = cc.director.getWinSize();

        cc.audioEngine.playMusic(res.sound.bgGame,true);

        ///////////////////////////////////////////背景//////////////////////////////////////////////

        //background
		var spritebg = new cc.Sprite(res.begin.bg);
		spritebg.setPosition(cc.p(0, -30));
		spritebg.attr({
			anchorX: 0,
			anchorY: 0,
			width: winsize.width,
			height: winsize.height
		});
		spritebg.setScale(0.8);
		this.addChild(spritebg,0);
        var move = cc.MoveTo.create(5, cc.p(0, -10)).easing(cc.easeElasticOut());
        spritebg.runAction(move);






        //enemy

        var spritelogo = new cc.Sprite(res.begin.enemy);
        spritelogo.setPosition(cc.p(-200, winsize.height-160));
        spritelogo.setScale(0.8);
        this.addChild(spritelogo,1);
        var actionTo = cc.MoveTo.create(1, cc.p(winsize.width/2+100, winsize.height/2+70)).easing(cc.easeElasticOut());
        var sequence = cc.Sequence.create(
            actionTo,
            cc.CallFunc.create(function (logo) {
                var shaking = cc.MoveTo.create(1, cc.p(winsize.width/2+100+50,winsize.height/2+70)).easing(cc.easeElasticIn());
                var shakingBack = cc.MoveTo.create(1, cc.p(winsize.width/2+100, winsize.height/2+70)).easing(cc.easeElasticOut());
                var shakingSeq = cc.Sequence.create(shaking, shakingBack);
                var shakingSeq = cc.Sequence.create(shaking,shakingBack);
                logo.runAction(shakingSeq.repeatForever());
            }, spritelogo));
        spritelogo.runAction(sequence);


        //  logo
        var spritelogo = new cc.Sprite(res.begin.biaoti);
        spritelogo.setPosition(cc.p(-200, winsize.height-160));
        spritelogo.setScale(0.8);
        this.addChild(spritelogo,1);
        var actionTo = cc.MoveTo.create(1, cc.p(winsize.width/2-170, winsize.height/2-50)).easing(cc.easeElasticOut());
        var sequence = cc.Sequence.create(
            actionTo,
            cc.CallFunc.create(function (logo) {
                var shaking = cc.MoveTo.create(1, cc.p(winsize.width/2-170,winsize.height/2-50-50)).easing(cc.easeElasticIn());
                var shakingBack = cc.MoveTo.create(1, cc.p(winsize.width/2-170, winsize.height/2-50)).easing(cc.easeElasticOut());
                var shakingSeq = cc.Sequence.create(shaking, shakingBack);
                var shakingSeq = cc.Sequence.create(shaking,shakingBack);
                logo.runAction(shakingSeq.repeatForever());
            }, spritelogo));
        spritelogo.runAction(sequence);


        ///////////////////////////////////////////按钮//////////////////////////////////////////////////////////


        // play btn
        var playBtn = new cc.Menu(new cc.MenuItemSprite(
        		new cc.Sprite(res.begin.playBtn), // normal state image
        		new cc.Sprite(res.begin.playBtnS), // select state image
        		this.onmenu, this));
        var playBtnPosX = winsize.width/2+100, playBtnPosY = winsize.height/2-130;
        playBtn.setPosition(cc.p(-200, winsize.height));
        this.addChild(playBtn,3);
        var seq = cc.Sequence.create(
        		cc.MoveTo.create(2, cc.p(playBtnPosX, playBtnPosY)).easing(cc.easeElasticInOut(0.8)),
        		cc.CallFunc.create(function(playBtn){
        			var shaking = cc.MoveTo.create(1, cc.p(playBtnPosX, playBtnPosY)).easing(cc.easeIn(2.0));
        			var shakingBack = cc.MoveTo.create(1, cc.p(playBtnPosX, playBtnPosY-10)).easing(cc.easeOut(2.0));
        			var shakingSeq = cc.Sequence.create(shaking, shakingBack);
        			var shakingSeq = cc.Sequence.create(shaking, shakingBack);
        			playBtn.runAction(shakingSeq.repeatForever());
        		},playBtn));
        playBtn.runAction(seq);




        var eating = cc.Animation.create();
        for (var ti = 1; ti < 10; ti ++){
            var tiFrame = res.house["doudou00" + ti];
            eating.addSpriteFrameWithFile(tiFrame);
        }
        eating.setDelayPerUnit(0.1);
        this.play_btn_anim= cc.Animate.create(eating);

        var monsu=new cc.Sprite(res.house.keai001);
        monsu.setPosition(cc.p(winsize.width/2-230,winsize.height-30));
        monsu.setScale(2.0);
        this.addChild(monsu);
        monsu.runAction(this.play_btn_anim.repeatForever());



	},



	onmenu : function () {

        cc.audioEngine.playEffect(res.sound.ground, false);
        cc.director.runScene(new MenuScene());

	}





});