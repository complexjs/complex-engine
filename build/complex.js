// Build by LittleHelper. Build Date : Tue Jul 15 2014 13:12:55 GMT+0200 (CEST)




// FILE >> libs/Class.js
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


// FILE >> complex.js
var cx = {
	version : "0.9.1",
	initFunctions : [],
	addInitFunction : function(cb){
		cx.initFunctions.push(cb);
	},
	init : function(){
		for(var i = 0, len = cx.initFunctions.length; i < len; i++){
			cx.initFunctions[i]();
		}
	}
};
console.log("Complex "+cx.version);


// FILE >> src/Component.js

/**
 * The component object
 * @param {[type]} data [description]
 */
cx.Component = Class.extend({
	tag : null,
	init : function(){
		
	}

});



// FILE >> src/Entity.js
/**
 * [Entity description]
 */
cx.Entity = Class.extend({
	components : [],
	world : null,
	alive : true,
    /**
     * constructor
     */
	init : function(){
		this.components = [];
		this.alive = true;
		this.remove = false;
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
			if(component.tag == componentName){
				return component;
			}
		}
		return null;
	}
});



// FILE >> src/System.js

/**
 * [System description]
 * @param {[type]} arrayOfComponents [description]
 */
cx.System = Class.extend({
    world : null,
    tag : null,

	init : function(){
		this.TYPE_VOID = "void";
		this.TYPE_PROCESS = "process";
	},

    /**
    * called as soon the system has been added to the world object
    */
    addedToWorld : function(){},

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

});



// FILE >> src/EntitySystem.js
cx.EntitySystem = cx.System.extend({
	init : function( components ) {
		this._super();
		this.components = components;
		this.type = this.TYPE_PROCESS;
	},

	/**
	* @param entity Entity
	* @param components array Array contains componens accessable via tag name `components['cx.scriptcomponent']`
	* called every tick for every entity
	*/
	update : function(entity, components){}

});



// FILE >> src/VoidSystem.js
cx.VoidSystem = cx.System.extend({
    init : function(){
		this._super();
		this.type = this.TYPE_VOID;
	},

    /**
    * @param entity Entity object
    * called when an entity is added to world
    */
    added : function( entity ){},


    /**
    * @param entity Entity object
    * called when an entity isremoved from world
    */
    removed : function( entity ){},

    /**
    *    Called every tick
    */
    update : function(){}
});



// FILE >> src/World.js
/**
 * Holds all the current entities and systems
 */
cx.World = Class.extend({
	entities : [],
    systems : [],
	voidSystems: [],
	processSystems : [],
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
	 * Remove entity from world and trigger codes from systems
	 */
	removeEntity : function(entity, triggerSystem){
		triggerSystem = triggerSystem || true;
		if(triggerSystem){
			this._entityDeleted(entity);
		}
		delete this.entities[entity.index];
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
	 * add system to world
	 * @param {[type]} system [description]
	 */
	addSystem : function ( system ){
        system.setWorld(this);
		if ( system.type == system.TYPE_PROCESS ){
			this.processSystems.push(system);
		} else if (system.type == system.TYPE_VOID ) {
			this.voidSystems.push(system);
		}
		system.addedToWorld();
	},

	/**
	 * add manager to world
	 * @param {[type]} manager [description]
	 * @TODO
	 */
	addManager : function ( manager ){
		manager.world = this;
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

		for(var i = 0, len = this.processSystems.length; i < len; i++) {
			var system = this.processSystems[i];
			if ( system.tag == systemName ){
				return system;
			}
		}

		for(var i = 0, len = this.voidSystems.length; i < len; i++) {
			var system = this.voidSystems[i];
			if ( system.tag == systemName ){
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

	_entityAdded : function( entity ){
		for(var s=0,len=this.voidSystems.length; s<len;s++){
			var system = this.voidSystems[s];
			system.added(entity);
		}
	},
	_entityDeleted : function( entity ){
		for(var s=0,len=this.voidSystems.length; s<len;s++){
			var system = this.voidSystems[s];
			system.removed(entity);
		}
		entity.delteted = true;
	},

	/**
	 * update step
	 * @return {[type]} [description]
	 */
	update : function ( ) {

		for(var s = 0, sLen = this.voidSystems.length; s < sLen; s++) {
			var system = this.voidSystems[s];
			system.update();
		}

		for(var s = 0, sLen = this.processSystems.length; s < sLen; s++) {
			var system = this.processSystems[s];

			for(var e = 0, eLen = this.entities.length; e < eLen; e++){
				var entity = this.entities[e];

				if(entity.delteted && entity.remove){
					this.removeEntity(entity, false);
					continue;
				}

				if( entity.remove && !entity.delteted){
					this._entityDeleted(entity);
					continue;
				}
				if( !entity.alive ) {
					continue;
				}
				var entityComponents = [];
				var updateEntity = true;

				for(var sC = 0, sCLen = system.components.length; sC < sCLen; sC++) {
					var systemComponent = system.components[sC];
					var hasEntityComponent = false;

					var entityComponent = entity.getComponent(systemComponent);
					if ( entityComponent != null ){
						entityComponents[systemComponent] = entityComponent;
						hasEntityComponent = true;
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
});



// FILE >> src/Manager.js
/**
 * Represents a manager to handle additional data
 * @type {*}
 */
cx.Manager = Class.extend({
    tag : null,
    world : null,
    init : function () {

    }

});
