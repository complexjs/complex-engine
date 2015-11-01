class EntitySystem extends cx.System {

	constructor () {
		super.constructor();

		this.components = [];
		this.type = cx.System.getTypeProcess();
	}

	update (entity, components) {

	}

	render ( entity, components){

	}
}

cx.EntitySystem = EntitySystem;
