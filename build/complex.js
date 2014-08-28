// Build by LittleHelper. Build Date : Thu Aug 28 2014 20:49:03 GMT+0200 (CEST)




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
'use strict';

var cx = {
	version : "0.9.4",
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



// FILE >> src/GameObject.js
cx.GameObject = Class.extend({
    init : function(){
        this.tag = "cx.GameObject";
        this.debugable=true;
    }
})



// FILE >> src/Component.js
/**
 * The component object
 * @param {[type]} data [description]
 */
cx.Component = cx.GameObject.extend({
	init : function(){
		this._super();
	}
});



// FILE >> src/Entity.js
/**
 * [init description]
 */
cx.Entity = cx.GameObject.extend({
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

	/**
	 * [getWorld description]
	 */
	getWorld : function(){
		return this.world;
	},

	/**
	 * [setWorld description]
	 * @param {cx.World} world [description]
	 */
	setWorld : function( world){
		this.world = world;
	},

	/**
	 * Add a component to the entity
	 * @param {cx.Component} component [description]
	 */
	addComponent : function ( component ) {
		var slot = this._getFreeSlot();
		if( slot != null ){
			this.components[slot] = component;
		} else {
			this.components.push( component );
		}
	},

	/**
	 * Get a component from this entity
	 * @param {string} componentName [description]
	 */
	getComponent : function ( componentName ) {
		for(var i = 0, len = this.components.length; i < len; i++){
			var component = this.components[i];
			if(component.tag == componentName){
				return component;
			}
		}
		return null;
	},

	/**
	 * Get all components
	 */
	getComponents : function() {
		return this.components;
	},

	/**
	 * Remove component from this entity
	 * @param {string} componentName [description]
	 */
	removeComponent : function(componentName){
		for(var i = 0, len = this.components.length; i < len; i++){
			var component = this.components[i];
			if(component.tag == componentName){
				delete this.components[i];
			}
		}
	},

	/**
	*	Destroy entity and remove it from the world
	*/
	destroy : function(){
		this.alive = false;
		this.remove = true;
	},

	/**
	 * Search a free slot for a component
	 */
	_getFreeSlot : function(){
		for(var c = 0, len = this.components.length; c < len; c++){
			var component = this.components[c];
			if(component == undefined || component == null ){
				return c;
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
cx.System = cx.GameObject.extend({
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
     * Set World
     * @param {cx.World} world [description]
     */
    setWorld : function ( world ) {
        this.world = world;
    },

    /**
     * retrive the world object
     * @returns {cx.World}
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
	 * Update entities
	 * @param  {cx.Entity} entity     [description]
	 * @param  {cx.Component[]} components [description]
	 */
	update : function(entity, components){},

	/**
	 * [added description]
	 * @param  {cx.Entity} entity [description]
	 * @return {[type]}        [description]
	 */
	added : function (entity){},

	/**
	 * [removed description]
	 * @param  {cx.Entity} entity [description]
	 * @return {[type]}        [description]
	 */
	removed : function(entity){}

});



// FILE >> src/VoidSystem.js
cx.VoidSystem = cx.System.extend({
    init : function(){
		this._super();
		this.type = this.TYPE_VOID;
	},

    /**
     * Called when an entity has been added to the world
     * @param  {cx.Entity} entity [description]
     */
    added : function( entity ){},

    /**
     * Called when an entity has been removed from world
     * @param  {cx.Entity} entity [description]
     */
    removed : function( entity ){},

    /**
    * Called every tick
    */
    update : function(){}
});



// FILE >> src/World.js
/**
 * Holds all the current entities and systems
 */
cx.World = cx.GameObject.extend({
	entities : [],
    systems : [],
	voidSystems: [],
	processSystems : [],
    managers : [],
    tag : 'cx.World',

	init : function(){
		this._super();
	},

    /**
     * Add entity to world
     * @param {cx.Entity} entity [description]
     */
    addEntity : function ( entity ) {

		var slot = this._getFreeEntitySlot();
		entity.setWorld(this);
		if( slot != null){
			entity.index = slot;
			this.entities[slot] = entity;
		} else {
        	entity.index = this.entities.length;
			this.entities.push(entity);
		}
		this._entityAdded(entity);
	},

	/**
	 * Remove an entity from the world
	 * @param {cx.Entity} entity [description]
	 */
	removeEntity : function(entity){
		this._entityDeleted(entity);
		delete this.entities[entity.index];
	},

	/**
	* return an entity
	* @param  {integer} index [description]
	* @return {cx.Entity}       [description]
	*/
	getEntity : function ( index ) {
		return this.entities[index];
	},

	/**
	* Return all entities
	*/
	getEntities : function(){
		var entities = [];
		for(var e = 0, len=this.entities.length; e < len; e++){
			var entity = this.entities[e];
			if(entity == undefined || entity == null){
				continue;
			}
			entities.push(entity);
		}
		return entities;
	},

	/**
	 * add system to world
	 * @param {cx.System} system [description]
	 */
	addSystem : function ( system ){
        system.setWorld(this);
		if ( system.type == system.TYPE_PROCESS ){
			var slot = this._getFreeProcessSystemSlot();
			if(slot != null){
				this.processSystems[slot] = system;
			} else {
				this.processSystems.push(system);
			}
		} else if (system.type == system.TYPE_VOID ) {
			var slot = this._getFreeProcessSystemSlot();
			if(slot != null){
				this.voidSystems[slot] = system;
			}else {
				this.voidSystems.push(system);
			}
		}
		system.addedToWorld();
	},

	/**
	 * get a system
	 * @param  {cx.System|string} systemName [description]
	 * @return {cx.System}            [description]
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
	 * Returns all systems of a specific type
	 * @param {string} type process/void
	 */
	getSystems : function(type){
		if(type == 'process'){
			return this.processSystems;
		}
		if(type == 'void'){
			return this.voidSystems;
		}
	},

	/**
	 * Remove a system from the world
	 * @param {cx.System|string} system
	 */
	removeSystem : function( system ){
		var systemName = "";
		if ( typeof system == "string"){
			systemName = system;
		} else {
			systemName = system.tag;
		}

		for(var i = 0, len = this.processSystems.length; i < len; i++) {
			var system = this.processSystems[i];
			if ( system.tag == systemName ){
				delete this.processSystems[i];
			}
		}

		for(var i = 0, len = this.voidSystems.length; i < len; i++) {
			var system = this.voidSystems[i];
			if ( system.tag == systemName ){
				delete this.voidSystems[i];
			}
		}
	},

	/**
	* add manager to world
	* @param {cx.Manager} manager [description]
	*/
	addManager : function ( manager ){
		manager.world = this;
		this.managers.push(manager);
	},

	/**
	 * get a manager
	 * @param  {string} name [description]
	 * @return {cx.Manager}      [description]
	 */
	getManager : function ( name ) {
	    for(var i = 0, len = this.managers.length; i < len; i++){
			var manager = this.managers[i];
			if(manager.tag == name){
				return this.managers[i];
			}
		}
		return null;
	},


	/**
	 * update step
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

				if(entity == null){
					continue;
				}

				if(!entity.alive && entity.remove){
					this.removeEntity(entity);
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
	},

	/**
	 * Find a free slot for a new entity
	 */
	_getFreeEntitySlot : function(){
		for(var e = 0, len = this.entities.length; e < len; e++){
			var entity = this.entities[e];
			if(entity == null || entity == undefined){
				return e;
			}
		}
		return null;
	},

	/**
	 * Find free slot for a processSystem
	 */
	_getFreeProcessSystemSlot : function(){
		for(var s = 0, len = this.processSystems.length; s < len; s++){
			var system = this.processSystems[s];
			if(system == undefined || system == null ){
				return s;
			}
		}
		return null;
	},

	/**
	 * Find a free slot for a voidSystem
	 */
	_getFreeVoidSystemSlot : function(){
		for(var s = 0, len = this.voidSystems.length; s < len; s++){
			var system = this.voidSystems[s];
			if(system == undefined || system == null ){
				return s;
			}
		}
		return null;
	},

	/**
	 * Notify systems when an entity has been added
	 * @param {cx.Entity} entity
	 */
	_entityAdded : function( entity ){
		for(var s=0,len=this.voidSystems.length; s<len;s++){
			var system = this.voidSystems[s];
			system.added(entity);
		}
		for(var s=0,len=this.processSystems.length; s<len;s++){
			var system = this.processSystems[s];
			system.added(entity);
		}
	},

	/**
	 * Notify systems when an entity has been removed
	 * @param {cx.Entity} entity
	 */
	_entityDeleted : function( entity ){
		for(var s=0,len=this.voidSystems.length; s<len;s++){
			var system = this.voidSystems[s];
			system.removed(entity);
		}
		for(var s=0,len=this.processSystems.length; s<len;s++){
			var system = this.processSystems[s];
			system.removed(entity);
		}
	},
});



// FILE >> src/Manager.js
/**
 * Represents a manager to handle additional data
 * @type {*}
 */
cx.Manager = cx.GameObject.extend({
    tag : null,
    world : null,
    init : function () {
        this._super();
    }
});
