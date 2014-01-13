/**
 * [Engine description]
 */
cx.Engine = function ( ) {
	this.tag = "cx.Engine";
   
    this.screen = null;

    Log.d(this, 'engine created');
}

cx.Engine.prototype.update = function(){
    if(this.screen){
        this.screen.update();
    }
}

cx.Engine.prototype.setScreen = function( screen ) {
    Log.d(this, 'set screen');
    if (this.screen) {
        this.screen.hide();
    }

    this.screen = screen;
    this.screen.show();
}