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
     * @param {cx.entity} entity [description]
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
	 * Remove entity from world and trigger codes from systems
	 */
	removeEntity : function(entity){
		this._deleteFromSystems(entity);
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
	 * add system to world
	 * @param {cx.VoidSystem|cx.EntitySystem} system [description]
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
	 * @param  {string} systemName [description]
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
	*	Remove a system from the world
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
				return manager;
			}
		}
		return null;
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

	_getFreeEntitySlot : function(){
		for(var e = 0, len = this.entities.length; e < len; e++){
			var entity = this.entities[e];
			if(entity == null || entity == undefined){
				return e;
			}
		}
		return null;
	},

	_getFreeProcessSystemSlot : function(){
		for(var s = 0, len = this.processSystems.length; s < len; s++){
			var system = this.processSystems[s];
			if(system == undefined || system == null ){
				return s;
			}
		}
		return null;
	},

	_getFreeVoidSystemSlot : function(){
		for(var s = 0, len = this.voidSystems.length; s < len; s++){
			var system = this.voidSystems[s];
			if(system == undefined || system == null ){
				return s;
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

	_deleteFromSystems : function( entity ){
		for(var s=0,len=this.voidSystems.length; s<len;s++){
			var system = this.voidSystems[s];
			system.removed(entity);
		}
	},
});
