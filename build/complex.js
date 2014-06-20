// compiled by JSCOMPILER
// © by Team Owesome
// Compiler Version : undefined
// Build Date : Fri Jun 20 2014 17:24:24 GMT+0200 (CEST)




//JSCOMPILER FILE -> libs/Class.js
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();


//JSCOMPILER FILE -> complex.js
var cx = {};


//JSCOMPILER FILE -> src/Component.js

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



//JSCOMPILER FILE -> src/Engine.js
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


//JSCOMPILER FILE -> src/Entity.js
/**
 * [Entity description]
 */
cx.Entity = Class.extend({
	components : [],
	world : null,
    /**
     * constructor
     */
	init : function(){
		this.components = [];
	},

	getWorld : function(){
		return this.world;
	},
	setWorld : function( world){
		this.world = world;
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


//JSCOMPILER FILE -> src/Screen.js
/**
 * Represents the current shown&rendered screen
 */

cx.Screen = Class.extend({
    /**
     * constructor
     */
	init : function(){
		this.world = new cx.World();
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



//JSCOMPILER FILE -> src/System.js

/**
 * [System description]
 * @param {[type]} arrayOfComponents [description]
 */
cx.System = Class.extend({
	TYPE_VOID : "void",
	TYPE_PROCESS : "process",
	type : "process",
    world : null,
    tag : null,

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




//JSCOMPILER FILE -> src/EntitySystem.js
cx.EntitySystem = cx.System.extend({
	type : this.TYPE_PROCESS,
	components : null,

	init : function( components ) {
		this.components = components;
	},

});


//JSCOMPILER FILE -> src/VoidSystem.js
cx.VoidSystem = cx.System.extend({
	type : this.TYPE_VOID,
    
    /**
    * @param entity Entity object
    * called when an entity is added to world
    */
    added : function( entity ){},

});


//JSCOMPILER FILE -> src/World.js
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
        entity.setWorld(this);
		this.entities.push(entity);
		this._entityAdded(entity);
	},

	/**
	 * add system to world
	 * @param {[type]} system [description]
	 */
	addSystem : function ( system ){
        system.setWorld(this);
		this.systems.push(system);
	},
	
	/**
	 * add manager to world
	 * @param {[type]} manager [description]
	 */
	addManager : function ( manager ){
	    this.managers.push(manager);
	},

	/**
	 * get a system
	 * @param  {[type]} systemName [description]
	 * @return {[type]}            [description]
	 */
	getSystem : function( system ) {
		var systemName = "";
		if ( typeof system == "string"){
			systemName = system;
		} else {
			systemName = system.tag;
		}
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

	_entityValidForSystem : function( entity, system ){

	},

	_entityAdded : function( entity ){
		for(var s=0,len=this.systems.length; s<len;s++){
			var system = this.systems[s];
			if(system.type == system.TYPE_VOID){
				system.added(entity);
			}
		}
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

						var entityComponent = entity.getComponent(systemComponent);
						if ( entityComponent != null ){
							entityComponents[systemComponent] = entityComponent;
							hasEntityComponent = false;
							continue;
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



//JSCOMPILER FILE -> src/Manager.js
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


//JSCOMPILER FILE -> src/Custom/Script/Component.js
var ScriptComponent = cx.Component.extend({
	name:'cx.scriptcomponent',
	script : null,
	setup : false,
	init : function(script){
		this.script = script;
	}
});


//JSCOMPILER FILE -> src/Custom/Script/System.js
var ScriptSystem = cx.EntitySystem.extend({
	tag : 'cx.scriptsystem',

	init : function(){
		this.components = ["cx.scriptcomponent"];
		this.type = this.TYPE_PROCESS;

	},

	update : function( entity, components){

		var scriptcomponent = components["cx.scriptcomponent"];
		var script = scriptcomponent.script;

		if ( scriptcomponent.setup == false ){
			script.setup(entity);
			scriptcomponent.setup = true;
		}
		script.update();
	}
});


//JSCOMPILER FILE -> src/Custom/Script/Script.js
cx.Script = Class.extend({
	entity : null,
	setup : function( entity ){
		this.entity = entity;
		this.onSetup();
		this.isSetUp = true;
	},

	onSetup : function(){},
	update : function(){}
});