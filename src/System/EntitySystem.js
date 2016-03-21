/**
 * A system reacting on entities with specifiy components
 */
class cxEntitySystem extends cxSystem
{
	constructor ()
	{
		super();

		/**
		 * Name of components the entity should have
		 * @type {array}
		 */
		this.components = array();

		/**
		 * Type of the process
		 * @type {string}
		 */
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
