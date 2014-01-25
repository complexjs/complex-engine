// compiled by JSCOMPILER
// © by Team Owesome
// Compiler Version : undefined
// Build Date : Sun Jan 19 2014 12:52:47 GMT+0100 (CET)




//JSCOMPILER FILE -> complex/complex.js
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


//JSCOMPILER FILE -> complex/src/Component.js

/**
 * [Component description]
 * @param {[type]} data [description]
 */
cx.Component = Class.extend({
	init : function ( data ) {
		this.name = 'cx.Component';
		this.tag = this.name;

		for(entry in data){
			this[entry] = data[entry];
		}	
	}
});



//JSCOMPILER FILE -> complex/src/Engine.js
/**
 * [Engine description]
 */
cx.Engine = Class.extend({
    init : function(){
        this.tag = "cx.Engine";
        this.screen = null;
        Log.d(this, 'engine created');
    },
    update : function () {
        if(this.screen){
            this.screen.update();
        } 
    },
    setScreen : function( screen ) {
        Log.d(this, 'set screen '+screen.tag);
        if (this.screen) {
            this.screen.hide();
        }

        this.screen = screen;
        this.screen.show();
    },

});


//JSCOMPILER FILE -> complex/src/Entity.js
/**
 * [Entity description]
 */
cx.Entity = Class.extend({
	components : [],

	init : function(){
		this.components = [];
	},

	addComponent : function ( component ) {
		this.components.push( component );
	},

	getComponent : function ( componentName ) {
		for(var i = 0, len = this.compnents.length; i < len; i++){
			var component = this.components[i];
			if(component.name == componentName){
				return component;
			}
		}
		return null;
	}
});


//JSCOMPILER FILE -> complex/src/Screen.js
/**
 * Represents the current shown&rendered screen
 */

cx.Screen = Class.extend({
	init : function(){
		this.world = new cx.World();
		this.tag = "cx.Screen";
	},

	show : function(){},
	hide : function(){},
	onUpdate : function(){},
	
	update : function(){
		this.world.update();
		this.onUpdate();
	}
});



//JSCOMPILER FILE -> complex/src/System.js

/**
 * [System description]
 * @param {[type]} arrayOfComponents [description]
 */
cx.System = Class.extend({
	components : [],
	TYPE_VOID : "void",
	TYPE_PROCESS : "process",
	type : "process",

	init : function( components ){
		this.components = components;
	},
	
	update : function(){}
});




//JSCOMPILER FILE -> complex/src/World.js
/**
 * Holds all the current entities and systems
 */
cx.World = Class.extend({
	entities : [],
    systems : [],
    tag : 'cx.World',

    addEntity : function ( entity ) {
		this.entities.push(entity);
	},

	addSystem : function ( system ){
		Log.d(this, 'add system '+system.tag )
		this.systems.push(system);
	},

	getSystem : function( systemName ) {
		for(var i = 0, len = this.systems.length; i < len; i++){
			var system = this.systems[i];
			if(system.tag == systemName){
				return system;
			}
		}
		return null;
	},

	update : function ( ) {

		for(var s = 0, sLen = this.systems.length; s < sLen; s++) {
			var system = this.systems[s];

			if(system.type == system.TYPE_VOID){
				system.update();
			} else if(system.type == system.TYPE_PROCESS){
				for(var e = 0, eLen = this.entities.length; e < eLen; e++){
					var entity = this.entities[e];
					var entityComponents = [];
					var updateEntity = true

					for(var sC = 0, sCLen = system.components.length; sC < sCLen; sC++) {
						var systemComponent = system.components[sC];
						
						var hasEntityComponent = false;

						for(var eC = 0, eCLen = entity.components.length; eC < eCLen; eC++) {
							var entityComponent = entity.components[eC];

							entityComponents[entityComponent.name] = entityComponent;
							if(entityComponent.name == systemComponent) {
								hasEntityComponent = true;
							}
						}
						
						if( !hasEntityComponent) {
							updateEntity = false;
						}
					}

					if(updateEntity){
						system.update(entity, entityComponents);				
					}
				}	
			}
		}
	}
});
