// compiled by JSCOMPILER
// © by Team Owesome
// Compiler Version : undefined
// Build Date : Tue May 20 2014 15:07:08 GMT+0200 (CEST)




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
    data : {},//customisable data holder
    
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


//JSCOMPILER FILE -> complex/src/Component.js

/**
 * The component object
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
 * The core of complex, rendering the screen
 */
cx.Engine = Class.extend({
    /**
     * constructor
     */
    init : function(){
        this.tag = "cx.Engine";
        this.screen = null;
    },

    /**
     * called every tick and updates the screen
     */
    update : function () {
        if(this.screen){
            this.screen.update();
        } 
    },

    /**
     * set a new screen to be rendered/updated
     * @param screen
     */
    setScreen : function( screen ) {
        if (this.screen) {
            this.screen.hide();
        }

        this.screen = screen;
        this.screen.show();
    }

});


//JSCOMPILER FILE -> complex/src/Entity.js
/**
 * [Entity description]
 */
cx.Entity = Class.extend({
	components : [],
    /**
     * constructor
     */
	init : function(){
		this.components = [];
	},

    /**
     * add a component to the entity
     * @param component
     */
	addComponent : function ( component ) {
		this.components.push( component );
	},

    /**
     * get a component by its name
     * @param componentName
     * @returns {*}
     */
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
    /**
     * constructor
     */
	init : function(){
		this.world = new cx.World();
		this.tag = "cx.Screen";
	},

    /**
     * called when the screen is shown
     */
	show : function(){},

    /**
     * called when an other screen will be shown
     */
	hide : function(){},

    /**
     * called after update
     */
	postUpdate : function(){},

    /**
     * called before update
     */
	preUpdate : function(){},

    /**
     * updates the current world
     */
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
    world : null,

    /**
     * Initialize a new system
     * @param components required components for this system
     */
	init : function( components ){
		this.components = components;
	},

    /**
     * Set the worldobject when the system is added
     * @param world
     */
    setWorld : function ( world ) {
        this.world = world;
    },

    /**
     * retrive the world object
     * @returns {null}
     */
    getWorld : function() {
        return this.world;
    },

    /**
     * called for an entity if the required components are matching these of the entity
     * @param entity
     * @param componens
     */
	update : function( entity, componens){}
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

    /**
     * Add entity to world
     * @param {[type]} entity [description]
     */
    addEntity : function ( entity ) {
        entity.index = this.entities.length;
		this.entities.push(entity);
	},

	/**
	 * add system to world
	 * @param {[type]} system [description]
	 */
	addSystem : function ( system ){
		Log.d(this, 'add system '+system.tag )
        system.setWorld(this);
		this.systems.push(system);
	},
	
	/**
	 * add manager to world
	 * @param {[type]} manager [description]
	 */
	addManager : function ( manager ){
		Log.d(this, 'add manager '+manager.tag )
	    this.managers.push(manager);
	},

	/**
	 * get a system
	 * @param  {[type]} systemName [description]
	 * @return {[type]}            [description]
	 */
	getSystem : function( systemName ) {
		for(var i = 0, len = this.systems.length; i < len; i++){
			var system = this.systems[i];
			if(system.tag == systemName){
				return system;
			}
		}
		return null;
	},
	
	/**
	 * get a manager
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	getManager : function ( name ) {
	    for(var i = 0, len = this.managers.length; i < len; i++){
			var manager = this.managers[i];
			if(manager.tag == name){
				return manager;
			}
		}
		return null;
	},

	/**
	 * return an entity
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 */
	getEntity : function ( index ) {
		return this.entities[index];
	},

	/**
	 * update step
	 * @return {[type]} [description]
	 */
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



//JSCOMPILER FILE -> complex/src/Manager.js
/**
 * Represents a manager to handle additional data
 * @type {*}
 */
cx.Manager = Class.extend({
    init : function ( name ) {
        this.name = name;
        this.tag = this.name;
    }

});


//JSCOMPILER FILE -> complex/src/input/Input.js
/**
 * Handles the input
 * @type {{}}
 */
cx.Input = {};

/**
 * keyboard input handler
 * @type {{_key: Array, init: init, onkeydown: onkeydown, onkeyup: onkeyup, isKeyPressed: isKeyPressed}}
 */
cx.Input.Keyboard = {
	_key : [],
    /**
     * constructor
     */
	init : function() {
		window.onkeydown = this.onkeydown;
		window.onkeyup = this.onkeyup;
	},

    /**
     * called when a key is pressed
     * @param e
     */
	onkeydown : function ( e ) {
		cx.Input.Keyboard._key[e.which] = true;
	},

    /**
     * called when a key is released
     * @param e
     */
	onkeyup : function ( e ) {
		cx.Input.Keyboard._key[e.which] = false;
	},

    /**
     * check if a key is pressed
     * @param key
     * @returns True/False
     */
	isKeyPressed : function ( key ) {
	    var char = key.charCodeAt(0);
		return cx.Input.Keyboard._key[char];
	}
}

/**
 * mouse input handler
 * @type {{x: number, y: number, init: init, move: move}}
 */
cx.Input.Mouse = {
    x : 0,
    y : 0,
    /**
     * constructor
     */
    init : function(){
        window.onmousemove = cx.Input.Mouse.move;
    },

    /**
     * called by window.onmousemove
     * @param event
     */
    move : function ( event ) {
        cx.Input.Mouse.x = event.clientX;
        cx.Input.Mouse.y = event.clientY;
    }
    
}