'use strict';

let cxScene = require('./Core/cxScene');
let InvalidClass = require('./Core/Exception/InvalidClass');

/**
 * Complex Core
 * @class Complex
 */
module.exports = class Complex {
	constructor() {
		/**
		 * @property scene
		 * @type {cxScene}
		 */
		this.scene = null;
	}

	/**
	 * load a scene to be rendered
	 * @method loadScene
	 * @param {cxScene} scene
	 */
	loadScene ( scene ) {
		if(scene instanceof cxScene === false){
			throw new InvalidClass('cxScene');
		}
		scene.cx = this;
		this.scene = scene;
		this.scene.load();
	}

	/**
	 * render the loaded scene
	 * @method update
	 */
	update () {
		this.scene.update();
	}

	/**
	 * Start the render loop
	 * @method start
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
	 * @method _animFrame
	 */
	_animFrame() {
		requestAnimFrame(this._animFrame);
		this.update();
	}
}
