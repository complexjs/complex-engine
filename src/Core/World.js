/**
 * Holds all the current entities and systems
 */

/**
* @constructor
*/
var World = function(){

	this.entities = [];
	this.voidSystems = [];
	this.entitySystems = [];
	this.managers = [];
	this.tag = 'cx.World';
}

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
World.prototype.addSystem = function ( system )
{
	system.world = this;
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
 * Render step
 * @return {[type]} [description]
 */
World.prototype.render = function()
{
	for(var s = 0, sLen = this.voidSystems.length; s < sLen; s++) {
		var system = this.voidSystems[s];
		system.render();
	}
}

/**
* update step
*/
World.prototype.update = function ( ) {

	this._updateVoidSystem();
	this._updateEntitySystem();
}

World.prototype._updateVoidSystem = function()
{
	for(var s = 0, sLen = this.voidSystems.length; s < sLen; s++) {
		var system = this.voidSystems[s];
		system.update();
	}
};

World.prototype._updateEntitySystem = function()
{
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
