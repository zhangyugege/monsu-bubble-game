
//游戏主场景
var PlayScene = cc.Scene.extend({

    ctor: function () {
        this._super();
        this.init();
        var layer = new PlayLayer();
        this.addChild(layer, 1);
    }
});



