/**
 * Created by Administrator on 2015/3/28.
 */


cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(800, 480, cc.ResolutionPolicy.EXACT_FIT);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new SplashScene());
    }, this);
};
cc.game.run("gameCanvas");