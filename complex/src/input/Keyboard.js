cx.Input.Keyboard = {
	tag : 'cx.Input.Keyboard',
	keys : [],
	init : function() {
		window.onkeypress = cx.Input.onKeyDown;
		window.onkeyup = cx.Input.onKeyUp;

		Log.d(this, 'init')
	},
	/**
	 * [onKeyDown description]
	 * @return {[type]} [description]
	 */
	onKeyDown : function ( e ) {
	},

	onKeyUp : function ( e ) {

	},

	isKeyDown : function ( char ) {

	},
	
	isKeyUp : function ( char ) {

	}
}