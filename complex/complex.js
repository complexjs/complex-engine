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
	tag : "cx",
	core : {
		engine : null,
		updater : null
	}, //holds all the data

	config : function(data){
		Log.d(this, 'configure')
		cx.API.config(data);
	},

	load : function( container, completeCB ) {
		Log.d(this, 'load scripts');
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
   			script.onload= cx.API.scriptLoaded;
			container.appendChild(script);
		}
	},	

	/**
	 * [init description]
	 * @return {[type]} [description]
	 */
	init : function() {
		cx.core.engine = new cx.Engine();
		
		cx.Input.Keyboard.init();

		return cx.core.engine;
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
	tag : 'cx.API',
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
		"src/World.js",
		"src/Screen.js",

		"src/input/Keyboard.js",
	],
	customScripts : [

	],
	scriptLoaded : function() {
		Log.d(this, 'script loaded');
		cx.API.data.scriptLoadedCounter++;
		if( cx.API.data.scriptLoadedCounter == cx.API.scripts.length + cx.API.customScripts.length){
			cx.API.data.loadedCallback();
			
		}
	},
	config : function(options) {
		for(entry in options){
			this[entry] = options[entry];
		}	
	}
}

cx.Input = {};