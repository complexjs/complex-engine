/**
 * Complex Core
 */
class Complex
{
	/**
	 *
	 */
	constructor()
	{
		/**
		 * Version
		 * @type {String}
		 */
		this.version = "%%VERSION%%";

		/**
		 * the scene
		 * @type {cxScene}
		 */
		this.scene = null;

		console.log("Complex "+this.version);
	}

	/**
	 * load a scene to be rendered
	 * @param  {cxScene} cxScene [description]
	 */
	loadScene ( cxScene )
	{
		cxScene.cx = this;
		this.scene = cxScene;
		this.scene.load();
	}

	/**
	 * render the loaded scene
	 */
	update ()
	{
		this.scene.update();
	}

	/**
	 * [start description]
	 * @return {[type]} [description]
	 */
	start ()
	{
		// shim layer with setTimeout fallback
	    window.requestAnimFrame = (function(){
	        return  window.requestAnimationFrame       ||
	        window.webkitRequestAnimationFrame ||
	        window.mozRequestAnimationFrame    ||
	        function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	        };
	    })();

	    this._animFrame();
	}

	/**
	 * [_animFrame description]
	 * @return {[type]} [description]
	 */
	_animFrame()
	{
		requestAnimFrame(this._animFrame);
		this.update();
	}
}
