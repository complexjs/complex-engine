/** 
 * Name: ComplexJS
 * Author: faebeee
 * 
 */


/**
 * [cx description]
 * @type {Object}
 */
var cx = {
	core : {
		engine : null,
		updater : null,
	}, //holds all the data

	load : function( container, completeCB ) {
		cx.API.data.loadedCallback = completeCB;
		for(var s = 0, sLen = cx.API.scripts.length; s < sLen; s++){
			var script = document.createElement("script");
			script.src = cx.API.scriptRoot+""+cx.API.scripts[s];
   			script.onload= cx.API.scriptLoaded;
			container.appendChild(script);
		}

		for(var s = 0, sLen = cx.API.customScripts.length; s < sLen; s++){
			var script = document.createElement("script");
			script.src = cx.API.customScripts[s];
			container.appendChild(script);
		}
	},	

	/**
	 * [init description]
	 * @return {[type]} [description]
	 */
	init : function() {
		this.core.engine = new cx.Engine();
		return this.core.engine;
	},

	/**
	 * [start description]
	 * @return {[type]} [description]
	 */
	start : function ( ) {
		this.core.updater = setInterval(cx.update, 1000/30);
	},

	/**
	 * [update description]
	 * @return {[type]} [description]
	 */
	update : function () {
		cx.core.engine.update();
	},

	/**
	 * [stop description]
	 * @return {[type]} [description]
	 */
	stop : function ( ) {
		clearInterval(cx.core.updater);
	},

	loadComplete : function() {
	  window.requestAnimFrame = (function(){
	    return  window.requestAnimationFrame       ||
	            window.webkitRequestAnimationFrame ||
	            window.mozRequestAnimationFrame    ||
	            function( callback ){
	              window.setTimeout(callback, 1000 / 60);
	            };
	    })();


	    (function animloop(){
	    requestAnimFrame(animloop);
	    cx.update();
	    })();
	}

};

cx.API = {
	v : '0.0.1',
	scriptRoot : "./",
	data : {
		scriptLoadedCounter : 0,
		loadedCallback : function(){},
	},
	scripts :  [
		"src/Engine.js",
		"src/Entity.js",
		"src/Component.js",
		"src/System.js",
	],
	customScripts : [

	],
	scriptLoaded : function() {
		Log.d('cx.API', 'script loaded');
		cx.API.data.scriptLoadedCounter++;
		if( cx.API.data.scriptLoadedCounter == cx.API.scripts.length){
			cx.API.data.loadedCallback();
		}
	},
	config : function(options) {
		for(entry in options){
			this[entry] = options[entry];
		}	
	}
}