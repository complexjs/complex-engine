"use strict";

/**
 * Complex Core
 */
module.exports = class Complex {
	/**
	 *
	 */
	constructor() {
		this.scene = null;
	}

	/**
	 * load a scene to be rendered
	 * @param cxScene cxScene
	 */
	loadScene ( cxScene ) {
		cxScene.cx = this;
		this.scene = cxScene;
		this.scene.load();
	}

	/**
	 * render the loaded scene
	 */
	update () {
		this.scene.update();
	}

	/**
	 * Start the render loop
	 */
	start () {
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
	 * The animation frame
	 */
	_animFrame() {
		requestAnimFrame(this._animFrame);
		this.update();
	}
}
