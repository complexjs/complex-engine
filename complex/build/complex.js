// compiled by JSCOMPILER
// © by Team Owesome
// Compiler Version : undefined
// Build Date : Sun Feb 02 2014 07:53:58 GMT-0500 (EST)




//JSCOMPILER FILE -> complex/libs/Log.js
/**
 * Logger
 * @type {Object}
 */
var Log = {
	/**
	 * [d description]
	 * @param  {[type]} tag  [description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	d : function (tag, data) {
		var _tag = Log._tag(tag);
		console.log(_tag, data);
	},

	/**
	 * [_tag description]
	 * @param  {[type]} tagObj [description]
	 * @return {[type]}        [description]
	 */
	_tag : function ( tagObj ) {
		if(tagObj.tag) {
			return tagObj.tag
		}

		if(typeof tagObj === 'string') {
			return tagObj.toString();
		}

	}
}


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
		Log.d('cx', 'load scripts');
		cx.App.data.loadedCallback = completeCB;
		
		for(var s = 0, sLen = cx.App.customScripts.length; s < sLen; s++){
			var script = document.createElement("script");
			script.src = cx.App.customScripts[s];
   			script.onload= cx.App.scriptLoaded;
			container.appendChild(script);
		}
	},	
	

	/**
	 * [init description]
	 * @return {[type]} [description]
	 */
	init : function() {
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
		clearInterval(cx.App.updater);
	},

	loadComplete : function() {
	    Log.d(this, 'loadComplete');
	    
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


//JSCOMPILER FILE -> complex/src/Component.js

/**
 * [Component description]
 * @param {[type]} data [description]
 */
cx.Component = Class.extend({
	init : function ( name ) {
		this.name = name;
		this.tag = this.name;

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
		for(var i = 0, len = this.components.length; i < len; i++){
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
	postUpdate : function(){},
	preUpdate : function(){},
	
	update : function(){
		this.preUpdate();
		this.world.update();
		this.postUpdate();
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
    managers : [],
    tag : 'cx.World',

    addEntity : function ( entity ) {
        entity.index = this.entities.length;
		this.entities.push(entity);
	},

	addSystem : function ( system ){
		Log.d(this, 'add system '+system.tag )
		this.systems.push(system);
	},
	
	addManager : function ( manager ){
		Log.d(this, 'add manager '+manager.tag )
	    this.managers.push(manager);
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
	
	getManager : function ( name ) {
	    for(var i = 0, len = this.managers.length; i < len; i++){
			var managers = this.managers[i];
			if(managers.tag == name){
				return manager;
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



//JSCOMPILER FILE -> complex/src/Behaviour.js
cx.Behaviour = Class.extend({
    entity : null,
    initialized : false,
    init : function ( ) {

    },

    setup : function ( entity ) {
        this.entity = entity;

        this.initialized = true;
    },

    update : function ( ) {

    }
});


//JSCOMPILER FILE -> complex/src/Manager.js
cx.Manager = Class.extend({
    init : function ( name ) {
        this.name = name;
        this.tag = this.name;
    },

});


//JSCOMPILER FILE -> complex/src/input/Input.js
/**
 * 
 * 
 */
cx.Input = {}; 

cx.Input.Keyboard = {
	_key : [],
	init : function() {
		window.onkeydown = this.onkeydown;
		window.onkeyup = this.onkeyup;
	},

	onkeydown : function ( e ) {
		cx.Input.Keyboard._key[e.which] = true;
	},

	onkeyup : function ( e ) {
		cx.Input.Keyboard._key[e.which] = false;
	},

	isKeyPressed : function ( key ) {
	    var char = key.charCodeAt(0);
		return cx.Input.Keyboard._key[char];
	},
}

cx.Input.Mouse = {
    init : function(){
        window.onmousemove = cx.Input.Mouse.move;
    },
    
    move : function ( event ) {
        cx.Input.Mouse.x = event.clientX;
        cx.Input.Mouse.y = event.clientY;
    }
    
}