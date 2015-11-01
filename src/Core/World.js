class World {
	constructor () {
		this.entities = [];
		this.voidSystems = [];
		this.entitySystems = [];
		this.managers = [];
		this.tag = 'cx.World';
	}

	/**
	 * [addEntity description]
	 */
	addEntity (entity) {
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
	 * [removeEntity description]
	 * @param  {[type]} entity [description]
	 * @return {[type]}        [description]
	 */
	removeEntity ( entity ) {
		this._entityDeleted(entity);
		delete this.entities[entity.index];
	}

	/**
	 * [getEntity description]
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 */
	getEntity ( index ) {
		if(this.entities[index] == undefined){
					throw "Entity "+index+" not found";
		}
		return this.entities[index];
	}

	/**
	 * [getEntities description]
	 * @return {[type]} [description]
	 */
	getEntities () {
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
	 * [addSystem description]
	 * @param { cx.System} system [description]
	 */
	addSystem ( system ) {
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
	 * [getSystem description]
	 * @param  {[type]} system [description]
	 * @return {[type]}        [description]
	 */
	getSystem ( system ) {
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

		throw "System "+systemName+" not found";
	}

	/**
	 * [getSystems description]
	 * @param  {[type]} type [description]
	 * @return {[type]}      [description]
	 */
	getSystems ( type ) {
		if(type == 'process'){
			return this.entitySystems;
		}
		if(type == 'void'){
			return this.voidSystems;
		}
	}

	/**
	 * [removeSystem description]
	 * @param  {[type]} system [description]
	 * @return {[type]}        [description]
	 */
	removeSystem ( system ) {
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
	 * [addManager description]
	 * @param {cx.Manager} manager [description]
	 */
	addManager ( manager) {
		manager.world = this;
		this.managers.push(manager);
	}

	/**
	 * [getManager description]
	 * @param  {string} name [description]
	 * @return {[type]}      [description]
	 */
	getManager (name) {
		for(var i = 0, len = this.managers.length; i < len; i++){
			var manager = this.managers[i];
			if(manager.tag == name){
				return this.managers[i];
			}
		}

		throw "System "+name+" not found";
	}

	/**
	 * [render description]
	 * @return {[type]} [description]
	 */
	render () {
		for(var s = 0, sLen = this.voidSystems.length; s < sLen; s++) {
			var system = this.voidSystems[s];
			system.render();
		}
	}

	/** [step description] */
	step () {
		this.update();
		this.render();
	}

	/**
	 * [update description]
	 * @return {[type]} [description]
	 */
	update ( ) {
		this._updateVoidSystem();
		this._updateEntitySystem();
	}

	/**
	 * [_updateVoidSystem description]
	 * @return {[type]} [description]
	 */
	_updateVoidSystem () {
		for(var s = 0, sLen = this.voidSystems.length; s < sLen; s++) {
			var system = this.voidSystems[s];
			system.update();
		}
	}

	/**
	 * [_updateEntitySystem description]
	 * @return {[type]} [description]
	 */
	_updateEntitySystem () {
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
	 * [_getFreeEntitySlot description]
	 * @return {[type]} [description]
	 */
	_getFreeEntitySlot () {
		for(var e = 0, len = this.entities.length; e < len; e++){
			var entity = this.entities[e];
			if(entity == null || entity == undefined){
				return e;
			}
		}
		return null;
	}

	/**
	 * [_getFreeProcessSystemSlot description]
	 * @return {[type]} [description]
	 */
	_getFreeProcessSystemSlot () {
		for(var s = 0, len = this.entitySystems.length; s < len; s++){
			var system = this.entitySystems[s];
			if(system == undefined || system == null ){
				return s;
			}
		}
		return null;
	}

	/**
	 * [_getFreeVoidSystemSlot description]
	 * @return {[type]} [description]
	 */
	_getFreeVoidSystemSlot () {
		for(var s = 0, len = this.voidSystems.length; s < len; s++){
			var system = this.voidSystems[s];
			if(system == undefined || system == null ){
				return s;
			}
		}
		return null;
	}

	/**
	 * [_entityAdded description]
	 * @param  {[type]} entity [description]
	 * @return {[type]}        [description]
	 */
	_entityAdded ( entity ) {
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
	 * [_entityDeleted description]
	 * @return {[type]} [description]
	 */
	_entityDeleted ( entity ) {
		for(var s=0,len=this.voidSystems.length; s<len;s++){
			var system = this.voidSystems[s];
			system.removed(entity);
		}
		for(var s=0,len=this.entitySystems.length; s<len;s++){
			var system = this.entitySystems[s];
			system.removed(entity);
		}
	}

}

cx.World = World;
