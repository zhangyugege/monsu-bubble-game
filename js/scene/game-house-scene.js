/**
 * Created by Administrator on 2015/4/14.
 */
var HouseScene = cc.Scene.extend({


    ctor: function () {
        this._super();
        this.init();
        var layer = new GameHouseLayer();
        this.addChild(layer, 1);
    }
});