/*
 * opening animation
 * 
 */

//刚开始出现的公司logo  动画  第一个加载进来的场景
var GameOpeningLayer = cc.Layer.extend({
	ctor : function() {
		this._super();

        cc.audioEngine.playEffect(res.sound.timi, false);
		var size = cc.director.getWinSize();
		var bg = new cc.Sprite(res.open.bg);
		bg.setPosition(cc.p(size.width/2, size.height/2));
		this.addChild(bg, 0);
		
		var team = new cc.Sprite(res.open.team);
		team.setPosition(cc.p(size.width/2, size.height/2));
		team.setScale(0.4);
		this.addChild(team, 1);
		team.opacity = 0;
		var fadeIn = cc.FadeIn.create(1.0);
		var fadeOut = cc.FadeOut.create(1.0);
		var delay = cc.delayTime(2);
		var seq = cc.Sequence.create(
				fadeIn,
				delay,
				fadeOut);
		team.runAction(seq);


		//load plist res to memory
		
		//load image to memory	
		String.prototype.endWith=function(s){
			if(s==null||s==""||this.length==0||s.length>this.length)
				return false;
			if(this.substring(this.length-s.length)==s)
				return true;
			else
				return false;
			return true;
		}
		
		//find all image
		var temp = [];
		for (var i in res) {
			if(typeof res[i] == "object"){
				for(var j in res[i]){
					if(res[i] instanceof Array) {
						continue;
					} else {
						if(typeof res[i][j] == "string"){
							if(!res[i][j].endWith("ogg") && !res[i][j].endWith("mp3")) {
								temp.push(res[i][j]);
							}
						}
					}
				}
			} else {
				if(typeof res[i][j] == "string"){
					if(!res[i][j].endWith("ogg") && !res[i][j].endWith("mp3")) {
						temp.push(res[i]);
					}
				}
			}
		}

		//load to mem
       console.log(temp);
		for(var i in temp) {

			cc.textureCache.addImage(temp[i]);
	
		}
	}
});
