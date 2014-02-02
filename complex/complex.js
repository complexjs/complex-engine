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
    update : function(){
        cx.App.update();
    },
    
};

cx.API = {
	tag : 'cx.API',
	v : '0.0.1',
	
	
	
	scriptLoaded : function() {
		Log.d('cx', 'script loaded');
		cx.API.data.scriptLoadedCounter++;
		if( cx.API.data.scriptLoadedCounter == cx.API.customScripts.length){
			cx.API.data.loadedCallback();
		}
	},

}


cx.App = {
    engine : null,
    updater : null,
    
    data : {
		scriptLoadedCounter : 0,
		loadedCallback : function(){},
	},
	
	customScripts : [],
	
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

	load : function( container, completeCB ) {
	    console.log('hi')
		Log.d('cx', 'load scripts');
		cx.App.data.loadedCallback = completeCB;
		console.log(cx.App.customScripts.length);
		
		for(var s = 0, sLen = cx.App.customScripts.length; s < sLen; s++){
			var script = document.createElement("script");
			script.src = cx.App.customScripts[s];
   			script.onload= cx.App.scriptLoaded;
			container.appendChild(script);
			Log.d('cx.Api', 'script loaded');
		}
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

	/**
	 * [start description]
	 * @return {[type]} [description]
	 */
	start : function ( ) {
	    Log.d('cx', 'start');
		this.updater = setInterval(cx.update, 1000/30);
	},

	/**
	 * [update description]
	 * @return {[type]} [description]
	 */
	update : function () {
		
	},

	/**
	 * [stop description]
	 * @return {[type]} [description]
	 */
	stop : function ( ) {
	    
	    Log.d('cx', 'start');
		clearInterval(cx.App.updater);
	},

	loadComplete : function() {
	    Log.d('cx', 'loadComplete');
	    
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
	        cx.App.engine.update();
	    })();
	}
};