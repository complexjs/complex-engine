// Build by LittleHelper. Build Date : Wed Jan 28 2015 11:15:11 GMT+0100 (CET)




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
	},

	loop : {
		update : function(){},
		init : function ( ) {
			// shim layer with setTimeout fallback
			window.requestAnimFrame = (function(){
				return  window.requestAnimationFrame       ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame    ||
				function( callback ){
					window.setTimeout(callback, 1000 / 60);
				};
			})();

			(function loop(){
				requestAnimFrame(loop);
				cx.loop.update();
			})();
		}
	}
};

console.log("Complex "+cx.version);



// FILE >> src/GameObject.js
/**
 * @constructor
 */
var GameObject = function(){
    this.tag = null;
    this.debugable = true;
}
cx.GameObject = GameObject;



// FILE >> src/Component.js
/**
* The component object
* @param {[type]} data [description]
*/

/**
 * @constructor
 */
var Component = function(){
	cx.GameObject.call(this);
}
Component.prototype = Object.create(cx.GameObject.prototype);
Component.prototype.constructor = Component;
cx.Component = Component;



// FILE >> src/Entity.js
/**
* [init description]
*/

/**
* @constructor
*/
var Entity = function()
{
	cx.GameObject.call(this);
	this.components = [];
	this.alive = true;
	this.remove = false;
}

Entity.prototype = Object.create(cx.GameObject.prototype);
Entity.prototype.constructor = Entity;

/**
 * [getWorld description]
 * @return cx.World
 */
Entity.prototype.getWorld = function()
{
	return this.world;
}

	/**
	 * [setWorld description]
	 * @param {cx.World} world [description]
	 */
Entity.prototype.setWorld = function ( world )
{
	this.world = world;
}

/**
 * add component to this entity
 * @param {cx.Component} component [description]
 */
Entity.prototype.addComponent = function( component )
{
	var slot = this._getFreeSlot();
	if( slot != null )
		{
		this.components[slot] = component;
	}
	else
	{
		this.components.push( component );
	}
}

/**
 * [getComponent description]
 * @param {string} componentName [description]
 * @return {cx.Component|null}
 */
Entity.prototype.getComponent = function ( componentName)
{
	for(var i = 0, len = this.components.length; i < len; i++)
	{
		var component = this.components[i];
		if(component.tag == componentName)
		{
			return component;
		}
	}
	return null;
}

/**
 * [removeComponent description]
 * @param {string} componentName [description]
 */
Entity.prototype.removeComponent = function ( componentName )
{
	for(var i = 0, len = this.components.length; i < len; i++)
	{
		var component = this.components[i];
		if(component.tag == componentName)
		{
			delete this.components[i];
		}
	}
}

/**
 * [getComponents description]
 * @return {cx.Component[]} components
 */
Entity.prototype.getComponents = function ( )
{
	return this.components;
}

/**
 * search an empty slot for a new component (pooling)
 */
Entity.prototype._getFreeSlot = function(){
	for(var c = 0, len = this.components.length; c < len; c++)
		{
		var component = this.components[c];
		if(component == undefined || component == null )
			{
			return c;
		}
	}
	return null;
}

/**
*	Destroy entity and remove it from the world
*/
Entity.prototype.destroy = function()
{
	this.alive = false;
	this.remove = true;
},

cx.Entity = Entity;



// FILE >> src/System.js
/**
 * [System description]
 * @param {[type]} arrayOfComponents [description]
 */

/**
 * @constructor
 */
var System = function()
{
    cx.GameObject.call(this);
    this.world = null;
    this.tag = null;
}

System.TYPE_VOID = "void";
System.TYPE_PROCESS = "process";

System.prototype = Object.create(cx.GameObject.prototype);
System.prototype.constructor = System;


/**
* called as soon the system has been added to the world object
*/
System.prototype.addedToWorld = function()
{

}

/**
 * Called when an entity has been added to the world
 * @param  {cx.Entity} entity [description]
 */
System.prototype.added = function( entity )
{

}

/**
 * Called when an entity has been removed from world
 * @param  {cx.Entity} entity [description]
 */
System.prototype.removed = function( entity )
{

}

/**
 * [setWorld description]
 * @param {cx.World} world [description]
 */
System.prototype.setWorld = function ( world )
{
    this.world = world;
}

/**
 * [getWorld description]
 * @return {cx.World} world
 */
System.prototype.getWorld = function ( )
{
    return this.world;
}

cx.System = System;



// FILE >> src/EntitySystem.js
/**
* @constructor
*/
var EntitySystem = function()
{
	cx.System.call(this);
	this.components = [];
	this.type = cx.System.TYPE_PROCESS;
}

EntitySystem.prototype = Object.create(cx.System.prototype);
EntitySystem.prototype.constructor = EntitySystem;

/**
* Update entities
* @param  {cx.Entity} entity     [description]
* @param  {cx.Component[]} components [description]
*/
EntitySystem.prototype.update = function ( entity, components )
{

}

cx.EntitySystem = EntitySystem;



// FILE >> src/VoidSystem.js
/**
 * @constructor
 */
var VoidSystem = function()
{
    cx.System.call(this);
    this.type = cx.System.TYPE_VOID;
}

VoidSystem.prototype = Object.create(cx.System.prototype);
VoidSystem.prototype.consctructor = VoidSystem;

/**
* Called every tick
*/
VoidSystem.prototype.update = function ()
{

}

cx.VoidSystem = VoidSystem;



// FILE >> src/World.js
/**
 * Holds all the current entities and systems
 */

/**
* @constructor
*/
var World = function(){
	cx.GameObject.call(this);
	this.entities = [];
	this.voidSystems = [];
	this.entitySystems = [];
	this.managers = [];
	this.tag = 'cx.World';
}

World.prototype = Object.create(cx.GameObject.prototype);
World.prototype.constructor = World;

/**
* Add entity to world
* @param {cx.Entity} entity [description]
*/
World.prototype.addEntity = function ( entity )
{

	var slot = this._getFreeEntitySlot();
	entity.setWorld(this);
	if( slot != null)
		{
		entity.index = slot;
		this.entities[slot] = entity;
	}
	else
	{
		entity.index = this.entities.length;
		this.entities.push(entity);
	}
	this._entityAdded(entity);
}

/**
* Remove an entity from the world
* @param {cx.Entity} entity [description]
*/
World.prototype.removeEntity = function(entity)
{
	this._entityDeleted(entity);
	delete this.entities[entity.index];
}

/**
* return an entity
* @param  {integer} index [description]
* @return {cx.Entity}       [description]
*/
World.prototype.getEntity = function ( index )
{
	return this.entities[index];
}

/**
* Return all entities
* @return {cx.Entity[]}
*/
World.prototype.getEntities = function(){
	var entities = [];
	for(var e = 0, len=this.entities.length; e < len; e++){
		var entity = this.entities[e];
		if(entity == undefined || entity == null){
			continue;
		}
		entities.push(entity);
	}
	return entities;
}

/**
* add system to world
* @param {cx.System} system [description]
*/
World.prototype.addSystem = function ( system ){
	system.setWorld(this);
	if ( system.type == cx.System.TYPE_PROCESS ){
		var slot = this._getFreeProcessSystemSlot();
		if(slot != null){
			this.entitySystems[slot] = system;
		} else {
			this.entitySystems.push(system);
		}
	} else if (system.type == cx.System.TYPE_VOID ) {
		var slot = this._getFreeProcessSystemSlot();
		if(slot != null){
			this.voidSystems[slot] = system;
		}else {
			this.voidSystems.push(system);
		}
	}
	system.addedToWorld();
}

/**
* get a system
* @param  {cx.System|string} systemName [description]
* @return {cx.System}            [description]
*/
World.prototype.getSystem = function( system ) {
	var systemName = "";
	if ( typeof system == "string"){
		systemName = system;
	} else {
		systemName = system.tag;
	}

	for(var i = 0, len = this.entitySystems.length; i < len; i++) {
		var system = this.entitySystems[i];
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
}

/**
* Returns all systems of a specific type
* @param {string} type process/void
*/
World.prototype.getSystems = function(type){
	if(type == 'process'){
		return this.entitySystems;
	}
	if(type == 'void'){
		return this.voidSystems;
	}
}

/**
* Remove a system from the world
* @param {cx.System|string} system
*/
World.prototype.removeSystem = function( system ){
	var systemName = "";
	if ( typeof system == "string"){
		systemName = system;
	} else {
		systemName = system.tag;
	}

	for(var i = 0, len = this.entitySystems.length; i < len; i++) {
		var system = this.entitySystems[i];
		if ( system.tag == systemName ){
			delete this.entitySystems[i];
		}
	}

	for(var i = 0, len = this.voidSystems.length; i < len; i++) {
		var system = this.voidSystems[i];
		if ( system.tag == systemName ){
			delete this.voidSystems[i];
		}
	}
}

/**
* add manager to world
* @param {cx.Manager} manager [description]
*/
World.prototype.addManager = function ( manager ){
	manager.world = this;
	this.managers.push(manager);
}

/**
* get a manager
* @param  {string} name [description]
* @return {cx.Manager}      [description]
*/
World.prototype.getManager = function ( name ) {
	for(var i = 0, len = this.managers.length; i < len; i++){
		var manager = this.managers[i];
		if(manager.tag == name){
			return this.managers[i];
		}
	}
	return null;
}

/**
* update step
*/
World.prototype.update = function ( ) {

	for(var s = 0, sLen = this.voidSystems.length; s < sLen; s++) {
		var system = this.voidSystems[s];
		system.update();
	}

	for(var s = 0, sLen = this.entitySystems.length; s < sLen; s++) {
		var system = this.entitySystems[s];

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
}

/**
* Find a free slot for a new entity
*/
World.prototype._getFreeEntitySlot = function(){
	for(var e = 0, len = this.entities.length; e < len; e++){
		var entity = this.entities[e];
		if(entity == null || entity == undefined){
			return e;
		}
	}
	return null;
}

/**
* Find free slot for a processSystem
*/
World.prototype._getFreeProcessSystemSlot = function(){
	for(var s = 0, len = this.entitySystems.length; s < len; s++){
		var system = this.entitySystems[s];
		if(system == undefined || system == null ){
			return s;
		}
	}
	return null;
}

/**
* Find a free slot for a voidSystem
*/
World.prototype._getFreeVoidSystemSlot = function(){
	for(var s = 0, len = this.voidSystems.length; s < len; s++){
		var system = this.voidSystems[s];
		if(system == undefined || system == null ){
			return s;
		}
	}
	return null;
}

/**
* Notify systems when an entity has been added
* @param {cx.Entity} entity
*/
World.prototype._entityAdded = function( entity ){
	for(var s=0,len=this.voidSystems.length; s<len;s++){
		var system = this.voidSystems[s];
		system.added(entity);
	}
	for(var s=0,len=this.entitySystems.length; s<len;s++){
		var system = this.entitySystems[s];
		system.added(entity);
	}
}

/**
* Notify systems when an entity has been removed
* @param {cx.Entity} entity
*/
World.prototype._entityDeleted = function( entity ){
	for(var s=0,len=this.voidSystems.length; s<len;s++){
		var system = this.voidSystems[s];
		system.removed(entity);
	}
	for(var s=0,len=this.entitySystems.length; s<len;s++){
		var system = this.entitySystems[s];
		system.removed(entity);
	}
}

cx.World = World;



// FILE >> src/Manager.js
/**
 * Represents a manager to handle additional data
 * @type {*}
 */

/**
 * @constructor
 */
var Manager = function()
{
    cx.GameObject.call(this);
    this.tag = null;
    this.world = null;
}

Manager.prototype = Object.create(cx.GameObject.prototype);
Manager.prototype.constructor = Manager;

cx.Manager = Manager;
