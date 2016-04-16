/**
 * Created by Administrator on 2015/4/11.
 */

//菜单场景
var MenuScene = cc.Scene.extend({

    ctor: function () {
        this._super();
        this.init();
        var layer = new GameMenuLayer();
        this.addChild(layer, 1);
    }
});
