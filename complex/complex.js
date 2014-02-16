/** 
 * Name: ComplexJS
 * Author: faebeee
 * version: 0.5
 */


/**
 * The main object
 * @type {Object}
 */
var cx = {
	tag : "cx",
    update : function(){
        cx.App.update();
    },
    
};

/**
 * The main App. Initializes all the used scripts and components.
 * @type {{engine: null, updater: null, use: use, setEngine: setEngine, getEngine: getEngine, config: config, load: load, init: init, start: start, update: update, stop: stop, loadComplete: loadComplete}}
 */
cx.App = {
    engine : null,
    updater : null,
    fps : 30,
    
	use : function ( scripts ) {
		cx.App.ScriptLoader.scripts = scripts;
	},
	
    setEngine : function ( engine ) {
        this.engine = engine;
    },
    
    getEngine : function () {
        return this.engine;
    },
    
    config : function(options){
		Log.d('cx', 'configure')
		for(entry in options){
			this[entry] = options[entry];
		}	
	},

	load : function(container, cb) {
		cx.App.ScriptLoader.load(container, cb);
	},

	/**
	 * [init description]
	 * @return {[type]} [description]
	 */
	init : function() {
	    Log.d('cx', 'init');
        this.setEngine( new cx.Engine() );
		cx.Input.Keyboard.init();
		cx.Input.Mouse.init();
		return this.getEngine();
	},


	stop : function ( ) {
	    Log.d('cx', 'stop');
		clearInterval(cx.App.updater);
	},

	loadComplete : function() {
	    Log.d('cx', 'loadComplete');
	    
	  window.requestAnimFrame = (function(){
	    return  window.requestAnimationFrame       ||
	            window.webkitRequestAnimationFrame ||
	            window.mozRequestAnimationFrame    ||
	            function( callback ){
	              window.setTimeout(callback, 1000 / cx.App.fps);
	            };
	    })();


	    (function animloop(){
	    	requestAnimFrame(animloop);
	        cx.App.engine.update();
	    })();
	}
};

cx.App.ScriptLoader = {
	scripts : [],
	loadedScripts : 0,
	callback : function(){},

	scriptLoaded : function() {
		Log.d('cx', 'script loaded');
		cx.App.ScriptLoader.loadedScripts++;
		if( cx.App.ScriptLoader.loadedScripts >= cx.App.ScriptLoader.scripts.length){
			cx.App.ScriptLoader.callback();
		}
	},

	load : function( container, completeCB ) {
		Log.d('cx', 'load scripts '+cx.App.ScriptLoader.scripts.length);
		cx.App.ScriptLoader.callback = completeCB;
		
		for(var s = 0, sLen = cx.App.ScriptLoader.scripts.length; s < sLen; s++){
			var script = document.createElement("script");
			script.src = cx.App.ScriptLoader.scripts[s];
   			script.onload= cx.App.ScriptLoader.scriptLoaded;
			container.appendChild(script);
		}
    }
}