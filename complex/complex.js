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
		Log.d('cx', 'configure')
		cx.API.config(data);
	},

	load : function( container, completeCB ) {
		Log.d('cx', 'load scripts');
		cx.API.data.loadedCallback = completeCB;
		
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
		cx.Input.Mouse.init();
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
	data : {
		scriptLoadedCounter : 0,
		loadedCallback : function(){},
	},
	customScripts : [

	],
	scriptLoaded : function() {
		Log.d('cx', 'script loaded');
		cx.API.data.scriptLoadedCounter++;
		if( cx.API.data.scriptLoadedCounter == cx.API.customScripts.length){
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