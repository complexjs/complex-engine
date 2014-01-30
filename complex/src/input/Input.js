/**
 * 
 * 
 */
cx.Input = {}; 

cx.Input.Keyboard = {
	_key : [],
	init : function() {
		window.onkeydown = this.onkeydown;
		window.onkeyup = this.onkeyup;
	},

	onkeydown : function ( e ) {
		cx.Input.Keyboard._key[e.which] = true;
	},

	onkeyup : function ( e ) {
		cx.Input.Keyboard._key[e.which] = false;
	},

	isKeyPressed : function ( key ) {
	    var char = key.charCodeAt(0);
		return cx.Input.Keyboard._key[char];
	},
}

cx.Input.Mouse = {
    init : function(){
        window.onmousemove = cx.Input.Mouse.move;
    },
    
    move : function ( event ) {
        cx.Input.Mouse.x = event.clientX;
        cx.Input.Mouse.y = event.clientY;
    }
    
}