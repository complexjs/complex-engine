class Entity {

	constructor () {
		this.components = [];
		this.alive = true;
		this.remove = false;

		this.world = null;
	}

	/**
	 * [addComponent description]
	 * @param {cx.Component} component [description]
	 */
	addComponent ( component ) {
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
	 * @param  {string} componentName [description]
	 * @return {cx.Component}               [description]
	 */
	getComponent ( componentName ) {
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
	 * @param  {string} componentName [description]
	 * @return {[type]}               [description]
	 */
	removeComponent ( componentName ){
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
	 * @return {[type]} [description]
	 */
	getComponents () {
		return this.components;
	}

	/**
	 * [_getFreeSlot description]
	 * @return {[type]} [description]
	 */
	_getFreeSlot () {
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
	 * [destroy description]
	 * @return {[type]} [description]
	 */
	destroy () {
		this.alive = false;
		this.remove = true;
	}

	/**
	 * [getWorld description]
	 * @return {[type]} [description]
	 */
	getWorld () {
		return this.world;
	}

	/**
	 * [setWorld description]
	 * @param {[type]} world [description]
	 */
	setWorld ( world ) {
		this.world = world;
	}

}

cx.Entity = Entity;
