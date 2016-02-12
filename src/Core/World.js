/**
 *
 */
class cxWorld
{
	constructor ()
	{
		/**
		 * @type {cxEntity[]}
		 */
		this.entities = [];

		/**
		 * @type {cxVoidSystem[]}
		 */
		this.voidSystems = [];


		/**
		 * @type {cxEntitySystem[]}
		 */
		this.entitySystems = [];

		/**
		 * @type {cxManager[]}
		 */
		this.manager = [];

		/**
		 * @type {String}
		 */
		this.tag = 'cx.World';
	}

	/**
	 * Add entity to world
	 * @param {cxEntity} entity
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
	 * remove entity from world
	 * @param  {cxEntity} entity
	 */
	removeEntity ( entity )
	{
		this._entityDeleted(entity);
		delete this.entities[entity.index];
	}

	/**
	 * Get entity from world by its id
	 * @param  {int} int
	 * @return cxEntity
	 */
	getEntity ( index )
	{
		if(this.entities[index] == undefined)
		{
			throw "Entity "+index+" not found";
		}
		return this.entities[index];
	}

	/**
	 * Get all entities from world
	 * @return cxEntity[]
	 */
	getEntities ()
	{
		var entities = [];
		for(var e = 0, len=this.entities.length; e < len; e++)
		{
			var entity = this.entities[e];
			if(entity == undefined || entity == null){

				continue;
			}
			entities.push(entity);
		}
		return entities;
	}

	/**
	 * Add a system to world
	 * @param {cxSystem} system
	 */
	addSystem ( system ) {
		system.world = this;
		if ( system.type == cxSystem.getTypeProcess() )
		{
			var slot = this._getFreeProcessSystemSlot();
			if(slot != null)
			{
				this.entitySystems[slot] = system;
			}
			else
			{
				this.entitySystems.push(system);
			}
		}
		else if (system.type == cxSystem.getTypeVoid() )
		{
			var slot = this._getFreeProcessSystemSlot();
			if(slot != null)
			{
				this.voidSystems[slot] = system;
			}
			else
			{
				this.voidSystems.push(system);
			}
		}
		system.addedToWorld();
	}

	/**
	 * get a system
	 * @param  {string|cxSystem} system
	 * @return cxSystem
	 */
	getSystem ( system ) {
		var systemName = "";
		if ( typeof system == "string")
		{
			systemName = system;
		}
		else
		{
			systemName = system.tag;
		}

		for(var i = 0, len = this.entitySystems.length; i < len; i++)
		{
			var system = this.entitySystems[i];
			if ( system.tag == systemName )
			{
				return system;
			}
		}

		for(var i = 0, len = this.voidSystems.length; i < len; i++)
		{
			var system = this.voidSystems[i];
			if ( system.tag == systemName )
			{
				return system;
			}
		}

		throw "System "+systemName+" not found";
	}

	/**
	 * Get all systems
	 * @param  {string} type
	 * @return cxSystem[]
	 */
	getSystems ( type )
	{
		if(type == cxSystem.getTypeProcess()){
			return this.entitySystems;
		}
		if(type == cxSystem.getTypeVoid() ){
			return this.voidSystems;
		}
	}

	/**
	 * Remove system
	 * @param  {string|cxSystem} system
	 */
	removeSystem ( system ) {
		var systemName = "";
		if ( typeof system == "string")
		{
			systemName = system;
		}
		else
		{
			systemName = system.tag;
		}

		for(var i = 0, len = this.entitySystems.length; i < len; i++)
		{
			var system = this.entitySystems[i];
			if ( system.tag == systemName )
			{
				delete this.entitySystems[i];
			}
		}

		for(var i = 0, len = this.voidSystems.length; i < len; i++)
		{
			var system = this.voidSystems[i];
			if ( system.tag == systemName )
			{
				delete this.voidSystems[i];
			}
		}
	}

	/**
	 * Add Manager
	 * @param {cxManager} manager
	 */
	addManager ( manager)
	{
		manager.world = this;
		this.managers.push(manager);
	}

	/**
	 * Get Manager
	 * @param  {string} name
	 * @return cxManager
	 */
	getManager (name)
	{
		for(var i = 0, len = this.managers.length; i < len; i++)
		{
			var manager = this.managers[i];
			if(manager.tag == name)
			{
				return this.managers[i];
			}
		}

		throw "System "+name+" not found";
	}

	/**
	 * Render loop
	 */
	render ()
	{
		for(var s = 0, sLen = this.voidSystems.length; s < sLen; s++)
		{
			var system = this.voidSystems[s];
			system.render();
		}
	}

	/**
	 * world loop
	 */
	step ()
	{
		this.update();
		this.render();
	}

	/**
	 * Update method
	 */
	update ( )
	{
		this._updateVoidSystem();
		this._updateEntitySystem();
	}

	/**
	 * update systems
	 */
	_updateVoidSystem ()
	{
		for(var s = 0, sLen = this.voidSystems.length; s < sLen; s++)
		{
			var system = this.voidSystems[s];
			system.update();
		}
	}

	/**
	 * update systems
	 */
	_updateEntitySystem ()
	{
		for(var s = 0, sLen = this.entitySystems.length; s < sLen; s++)
		{
			var system = this.entitySystems[s];

			for(var e = 0, eLen = this.entities.length; e < eLen; e++)
			{
				var entity = this.entities[e];

				if(entity == null)
				{
					continue;
				}

				if(!entity.alive && entity.remove)
				{
					this.removeEntity(entity);
					continue;
				}

				if( !entity.alive )
				{
					continue;
				}
				var entityComponents = [];
				var updateEntity = true;

				for(var sC = 0, sCLen = system.components.length; sC < sCLen; sC++)
				{
					var systemComponent = system.components[sC];
					var hasEntityComponent = false;

					var entityComponent = entity.getComponent(systemComponent);
					if ( entityComponent != null )
					{
						entityComponents[systemComponent] = entityComponent;
						hasEntityComponent = true;
					}

					if( !hasEntityComponent)
					{
						updateEntity = false;
					}
				}

				if(updateEntity)
				{
					system.update(entity, entityComponents);
				}
			}
		}
	}

	/**
	 * recycle entityslots
	 * @return int
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
	 * recycle systemslot
	 * @return int
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
	 * recycle systemslot
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
	 * notify systems for new entity
	 * @param  {cxEntity} entity
	 */
	_entityAdded ( entity )
	{
		for(var s=0,len=this.voidSystems.length; s<len;s++)
		{
			var system = this.voidSystems[s];
			system.added(entity);
		}

		for(var s=0,len=this.entitySystems.length; s<len;s++)
		{
			var system = this.entitySystems[s];
			system.added(entity);
		}
	}

	/**
	 * notify systems for deleted entity
	 * @param  {cxEntity} entity
	 */
	_entityDeleted ( entity )
	{
		for(var s=0,len=this.voidSystems.length; s<len;s++)
		{
			var system = this.voidSystems[s];
			system.removed(entity);
		}

		for(var s=0,len=this.entitySystems.length; s<len;s++)
		{
			var system = this.entitySystems[s];
			system.removed(entity);
		}
	}

}
