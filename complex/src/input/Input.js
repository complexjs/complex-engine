/**
 * Handles the input
 * @type {{}}
 */
cx.Input = {};

/**
 * keyboard input handler
 * @type {{_key: Array, init: init, onkeydown: onkeydown, onkeyup: onkeyup, isKeyPressed: isKeyPressed}}
 */
cx.Input.Keyboard = {
	_key : [],
    /**
     * constructor
     */
	init : function() {
		window.onkeydown = this.onkeydown;
		window.onkeyup = this.onkeyup;
	},

    /**
     * called when a key is pressed
     * @param e
     */
	onkeydown : function ( e ) {
		cx.Input.Keyboard._key[e.which] = true;
	},

    /**
     * called when a key is released
     * @param e
     */
	onkeyup : function ( e ) {
		cx.Input.Keyboard._key[e.which] = false;
	},

    /**
     * check if a key is pressed
     * @param key
     * @returns True/False
     */
	isKeyPressed : function ( key ) {
	    var char = key.charCodeAt(0);
		return cx.Input.Keyboard._key[char];
	}
}

/**
 * mouse input handler
 * @type {{x: number, y: number, init: init, move: move}}
 */
cx.Input.Mouse = {
    x : 0,
    y : 0,
    /**
     * constructor
     */
    init : function(){
        window.onmousemove = cx.Input.Mouse.move;
    },

    /**
     * called by window.onmousemove
     * @param event
     */
    move : function ( event ) {
        cx.Input.Mouse.x = event.clientX;
        cx.Input.Mouse.y = event.clientY;
    }
    
}