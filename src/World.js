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
