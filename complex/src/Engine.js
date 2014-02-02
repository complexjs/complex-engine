/**
 * The core of complex, rendering the screen
 */
cx.Engine = Class.extend({
    /**
     * constructor
     */
    init : function(){
        this.tag = "cx.Engine";
        this.screen = null;
    },

    /**
     * called every tick and updates the screen
     */
    update : function () {
        if(this.screen){
            this.screen.update();
        } 
    },

    /**
     * set a new screen to be rendered/updated
     * @param screen
     */
    setScreen : function( screen ) {
        if (this.screen) {
            this.screen.hide();
        }

        this.screen = screen;
        this.screen.show();
    }

});