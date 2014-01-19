/**
 * [Engine description]
 */
cx.Engine = Class.extend({
    init : function(){
        this.tag = "cx.Engine";
        this.screen = null;
        Log.d(this, 'engine created');
    },
    update : function () {
        if(this.screen){
            this.screen.update();
        } 
    },
    setScreen : function( screen ) {
        Log.d(this, 'set screen '+screen.tag);
        if (this.screen) {
            this.screen.hide();
        }

        this.screen = screen;
        this.screen.show();
    },

});