/**
 * Holds all the current entities and systems
 */
cx.World = function() {
	this.entities = [];
    this.systems = [];
}
/**
 * Add a entity to the world
 * @param {[type]} entity [description]
 */
cx.World.prototype.addEntity = function ( entity ) {
	this.entities.push(entity);
}
/**
 * Add a system to the world
 * @param {[type]} system [description]
 */
cx.World.prototype.addSystem = function ( system ) {
	this.systems.push(system);
}

/**
 * [getSystem description]
 * @param  {[type]} systemName [description]
 * @return {[type]}            [description]
 */
cx.World.prototype.getSystem = function ( systemName ){
	for(var i = 0, len = this.systems.length; i < len; i++){
		var system = this.systems[i];
		if(system.tag == systemName){
			return system;
		}
	}
	return null;
}

/**
 * Update all entities
 * @return {[type]} [description]
 */
cx.World.prototype.update = function() {
	for(var s = 0, sLen = this.systems.length; s < sLen; s++) {
		var system = this.systems[s];
		if(system.type == system.TYPE_VOID){
			system.update();
			return;
		}
		for(var e = 0, eLen = this.entities.length; e < eLen; e++){
			var entity = this.entities[e];
			var entityComponents = [];
			var updateEntity = true

			for(var sC = 0, sCLen = system.components.length; sC < sCLen; sC++) {
				var systemComponent = system.components[sC];
				
				var hasEntityComponent = false;

				for(var eC = 0, eCLen = entity.components.length; eC < eCLen; eC++) {
					var entityComponent = entity.components[eC];

					entityComponents[entityComponent.name] = entityComponent;
					if(entityComponent.name == systemComponent) {
						hasEntityComponent = true;
					}
				}
				if( !hasEntityComponent)
					updateEntity = false;

			}

			if(updateEntity){
				system.update(entity, entityComponents);
			}
		}	
	}
}