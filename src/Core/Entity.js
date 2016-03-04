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
