/**
 * Welcome Scene - the opening scene of the game.
 * <p>
 * It cope with the navigation logic and the logos display.
 * </p>
 * 
 * @class
 * @extends cc.Scene
 */
var BeginScene = cc.Scene.extend(/** @lends WelcomeScene# */{

	
	ctor: function () {
		this._super();
		this.init();
		var layer = new GameBeginLayer();
		this.addChild(layer, 1);
	}
});
