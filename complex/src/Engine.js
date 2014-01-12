/**
 * [Engine description]
 */
cx.Engine = function ( ) {
	this.tag = "cx.Engine";
   
    this.screen = null;

    Log.d(this, 'engine created');

    /**
     * [update description]
     * @return {[type]} [description]
     */
    this.update = function () {
        if(this.screen)
            this.screen.update();
    }

    this.setScreen = function(screen){
        Log.d(this, "set screen");
        this.screen = screen;
        this.screen.init();
    }

}
