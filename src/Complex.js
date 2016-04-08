/**
 * Complex Core
 */
class Complex
{
	/**
	 *
	 */
	constructor()
	{
		/**
		 * Version
		 * @type {String}
		 */
		this.version = "%%VERSION%%";

		/**
		 * the scene
		 * @type {cxScene}
		 */
		this.scene = null;

		console.log("Complex "+this.version);
	}

	/**
	 * load a scene to be rendered
	 * @param  {cxScene} cxScene [description]
	 */
	loadScene ( cxScene )
	{
		cxScene.cx = this;
		this.scene = cxScene;
		this.scene.load();
	}

	/**
	 * render the loaded scene
	 */
	update ()
	{
		this.scene.update();
	}
}
