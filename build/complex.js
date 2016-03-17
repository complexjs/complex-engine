var Complex = {
	version : "1.1.0",
	initFunctions : [],
	rendering : true,
	addInitFunction : function(cb){
		Complex.initFunctions.push(cb);
	},

	init : function(){
		for(var i = 0, len = Complex.initFunctions.length; i < len; i++){
			Complex.initFunctions[i]();
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
				if(Complex.rendering)
				{
					requestAnimFrame(loop);
					Complex.loop.update();
				}
			})();
		}
	}
};

console.log("Complex "+Complex.version);

/**
 * 
 */
class cxManager
{
    constructor()
    {
        /**
         * Tag
         * @type {string}
         */
        this.tag = null;

        /**
         * @type {cxWorld}
         */
        ths.world = null;
    }

    /**
     * @return {string}
     */
    getTag ()
    {
        return this.tag;
    }

    /**
     * @return {cxWorld}
     */
    getWorld ()
    {
        return this.world;
    }


}

/**
 *
 */
class cxComponent
{
    constructor ()
    {
        /**
         * Tag
         * @type {string}
         */
        this.tag = null;
    }

    /**
     * get tag
     * @return {string}
     */
    getTag ()
    {
        return this.tag;
    }
}

/**
 *
 */
class cxEntity
{
	/**
	 * @param  {string} name Name of the entity
	 */
	constructor (name)
	{
		name = name || "Entity";
		/**
		 * [components description]
		 * @type {cxComponent[]}
		 */
		this.components = [];

		/**
		 * [alive description]
		 * @type {Boolean}
		 */
		this.alive = true;

		/**
		 * [remove description]
		 * @type {Boolean}
		 */
		this.remove = false;

		/**
		 * [world description]
		 * @type {cxWorld}
		 */
		this.world = null;

		/**
		 * name of the entity
		 * @type {string}
		 */
		this.name = name;
	}

	/**
	 * Add a component to the entity
	 * @param {cxComponent} component
	 */
	addComponent ( component )
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
	 * Get a component from the entity by its tag name
	 * @param  {string} componentName
	 * @return cxComponent
	 */
	getComponent ( componentName )
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
	 * Get a component from the entity by its tag name
	 * @param  {string} componentName
	 * @return cxComponent
	 */
	hasComponent ( componentName )
	{
		for(var i = 0, len = this.components.length; i < len; i++)
		{
			var component = this.components[i];
			if(component.tag == componentName)
			{
				return true;
			}
		}
		return false;
	}

	/**
	 * remove a component from the entity
	 * @param  {string} componentName
	 */
	removeComponent ( componentName )
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
	 * Get all components from the entity
	 * @return cxComponent[]
	 */
	getComponents () {
		return this.components;
	}

	/**
	 * Reuses old component slots in the array
	 * @return int
	 */
	_getFreeSlot ()
	{
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
	 * Kills the entity
	 */
	destroy ()
	{
		this.alive = false;
		this.remove = true;
	}

	/**
	 * Get the worlobject from the entity
	 * @return cxWorld
	 */
	getWorld ()
	{
		return this.world;
	}

	/**
	 * Set the worldobject
	 * @param {cxWorld} world
	 */
	setWorld ( world )
	{
		this.world = world;
	}
}

class cxScene
{
    constructor( name )
    {
        this.name = name;
        this.world = new cxWorld();
        this.load();
    }

    load ()
    {

    }

    update ()
    {

    }
}

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

/**
 * 
 */
class cxEntitySystem extends cxSystem
{
	constructor ()
	{
		super();

		/**
		 * @type {String[]}
		 */
		this.components = [];

		this.type = cxSystem.getTypeProcess();
	}

	/**
	 * @param  {cxEntity} entity
	 * @param  {cxComponent[]} components
	 */
	update (entity, components)
	{

	}

	/**
	 * @param  {cxEntity} entity
	 * @param  {cxComponent[]} components
	 */
	render ( entity, components)
	{

	}
}

/**
 * 
 */
class cxSystem
{
    constructor ()
    {
        /**
         * @type {string}
         */
        this.tag = null;

        /**
         * @type {cxWorld}
         */
        this.world = null;
    }

    /**
     * get notified when system is added to world
     */
    addedToWorld ()
    {

    }

    /**
     * get notified when entity is added to world
     * @param  {cxEntity} entity
     */
    added (entity)
    {

    }

    /**
     * get notified when entity is removed from world
     * @param  {cxEntity} entity
     */
    removed ( entity )
    {

    }

    /**
     * @return string
     */
    static getTypeProcess ()
    {
        return "type_process";
    }

    /**
     * @return string
     */
    static getTypeVoid ()
    {
        return "type_void";
    }
}

/**
 * 
 */
class cxVoidSystem extends cxSystem
{
    constructor()
    {
        super();
        this.type = cxSystem.getTypeVoid();
    }

    /**
     * update system
     */
    update ()
    {

    }

    /**
     * render system
     */
    render ()
    {

    }
}
