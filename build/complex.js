// Build Date : Tue Jul 08 2014 09:26:18 GMT+0200 (CEST)




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


//JSCOMPILER FILE -> src/Component.js

/**
 * The component object
 * @param {[type]} data [description]
 */
cx.Component = Class.extend({
	tag : null,
	init : function(){
		
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
			if(component.tag == componentName){
				return component;
			}
		}
		return null;
	}
});


//JSCOMPILER FILE -> src/System.js

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



//JSCOMPILER FILE -> src/EntitySystem.js
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



//JSCOMPILER FILE -> src/VoidSystem.js
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



//JSCOMPILER FILE -> src/World.js
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
	removeEntity : function(entity){
		this._entityDeleted(entity);
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
	},

	/**
	 * add manager to world
	 * @param {[type]} manager [description]
	 * @TODO
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
	_entityDeleted : function(){
		for(var s=0,len=this.voidSystems.length; s<len;s++){
			var system = this.voidSystems[s];
			system.removed(entity);
		}
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


//JSCOMPILER FILE -> src/Custom/Script/ScriptComponent.js
var ScriptComponent = cx.Component.extend({
	tag:'cx.ScriptComponent',
	script : null,
	setup : false,
	init : function(script){
		this._super();
		this.script = script;
	}
});



//JSCOMPILER FILE -> src/Custom/Script/ScriptSystem.js
var ScriptSystem = cx.EntitySystem.extend({
	tag : 'cx.ScriptSystem',

	init : function(){
		this._super();
		this.components = ["cx.ScriptComponent"];
	},

	update : function( entity, components){
		var scriptcomponent = components["cx.ScriptComponent"];
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
	init : function(){

	},
	setup : function( entity ){
		this.entity = entity;
		this.onSetup();
		this.isSetUp = true;
	},

	onSetup : function(){},
	update : function(){}
});



//JSCOMPILER FILE -> src/Custom/Stats/StatsSystem.js
var StatsSystem = cx.VoidSystem.extend({
	stats : null,
	tag : 'cx.statssystem',
	mode : {FPS : 0, MS : 1},

	init : function( mode, element ){
		this._super();
		this.stats = new Stats();
		mode = mode || this.mode.FPS;
		this.stats.setMode(mode); // 0: fps, 1: ms

		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.left = '0px';
		this.stats.domElement.style.top = '0px';

		if ( !element ){
			document.body.appendChild( this.stats.domElement );
		} else {
			element.appendChild( this.stats.domElement );
		}

		this.stats.begin();
	},

	added : function(){

	},

	update : function () {
		this.stats.end();

		this.stats.begin();
	},
});



//JSCOMPILER FILE -> src/Custom/DatGui/DatGuiSystem.js
var DatGuiSystem = cx.VoidSystem.extend({
    tag : 'cx.DatGuiSystem',
    gui : null,
    groups : [],

    init : function(){
        this._super();
        this.gui = new dat.GUI();
    },

    add : function(obj, prop) {
    	this.gui.add(obj, prop).listen();
    },

    addToGroup : function (groupName, obj, prop, min, max) {
        var group = null;
        if ( (group = this.groups[groupName]) == null ){
            group = this.gui.addFolder(groupName);
            this.groups[groupName] = group;

        }
        if ( min != null && max != null){
            group.add(obj, prop, min, max).listen();
        } else {
            group.add(obj, prop).listen();
        }
        return group;
    },

    update : function () {

    }
});



//JSCOMPILER FILE -> src/Custom/Debug/DebugSystem.js
var DebugSystem = cx.VoidSystem.extend({

	init : function(guiSystem){
		this._super();
		this.tag = "cx.DebugSystem";
		this.guiSystem = guiSystem;
	},

	added : function(entity){
		this.loadEntity(entity);
	},

	addObject : function(text, object, excluded){
		excluded = excluded || [];
		var keys = Object.keys(object);
		for(var i = 0; i < keys.length; i++ ) {
			var key = keys[i];
			if ( key == "debugable"){
				continue;
			}
			if ( this.isPropertyExcluded(key, excluded) ){
				continue;
			}
			if ( typeof object[key] == "boolean" || (typeof object[key] == "number" || typeof object[key] == "string")) {
				this.guiSystem.addToGroup(text, object, key);
			}
			if ( typeof object[key] == "object" && object[key] != null && object[key].debugable == true){
				this.addObject(text, object[key]);
			}
		}
	},
	isPropertyExcluded : function( property, list){
		for(var i = 0, len = list.length; i < len; i++){
			if ( property == list[i]){
				return true;
			}
		}
		return false;
	},
	loadSystem : function( systemname, excluded ) {
		var system = null;
		if ( (system = this.world.getSystem(systemname)) == null ){
			return;
		}
		this.addObject(system.tag, system, excluded);

	},
	loadEntity : function( entity, excluded ){
		var debugComponent = entity.getComponent("cx.DebugComponent");
		if ( debugComponent == null ) {
			return;
		}
		var tags = debugComponent.components;

		for ( var t = 0, tLen = tags.length; t < tLen; t++ ) {
			var tag = tags[t];
			var component = entity.getComponent(tag);
			this.addObject(entity.tag+"."+component.tag, component, excluded);
		}
	},

	update : function(){

	}
});



//JSCOMPILER FILE -> src/Custom/Debug/DebugComponent.js
var DebugComponent = cx.Component.extend({
	tag : "cx.DebugComponent",
	components : [],
	init : function( components ){
		this._super();
		this.components = components;
	},
});
