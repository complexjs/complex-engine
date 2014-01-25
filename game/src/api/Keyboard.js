var Keyboard = {
	_key : [],
	init : function() {
		window.onkeydown = Keyboard.onkeydown;
		window.onkeyup = Keyboard.onkeyup;
	},

	onkeydown : function ( e ) {
		Keyboard._key[e.which] = true;
	},

	onkeyup : function ( e ) {
		Keyboard._key[e.which] = false;
	},

	isKeyPressed : function ( int ) {
		return this._key[int];
	},
}