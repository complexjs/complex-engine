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
