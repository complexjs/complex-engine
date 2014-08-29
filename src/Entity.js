/**
 * [init description]
 */
(function(){
	var Entity = function()
	{
		ow.GameObject.call(this);
		this.components = [];
		this.alive = true;
		this.remove = false;
	}

	Entity.prototype = Object.create(cx.GameObject);
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
})();
