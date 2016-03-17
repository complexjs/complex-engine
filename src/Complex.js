class Complex
{
	constructor()
	{
		this.version = "%%VERSION%%";
		this.scene = null;
		console.log("Complex "+this.version);
	}

	loadScene ( cxScene )
	{
		this.scene = cxScene;
		this.scene.load();
	}

	update ()
	{
		this.scene.update();
	}
}
