cx.World = function() {
	this.entities = [];
    this.systems = [];
}
cx.World.prototype.addEntity = function ( entity ) {
	this.entities.push(entity);
}

cx.World.prototype.addSystem = function ( system ) {
	this.systems.push(system);
}
cx.World.prototype.update = function() {
	for(var s = 0, sLen = this.systems.length; s < sLen; s++) {
		var system = this.systems[s];
		for(var e = 0, eLen = this.entities.length; e < eLen; e++){
			var entity = this.entities[e];
			var updateEntity = true

			for(var sC = 0, sCLen = system.components.length; sC < sCLen; sC++) {
				var systemComponent = system.components[sC];
				
				var hasEntityComponent = false;

				for(var eC = 0, eCLen = entity.components.length; eC < eCLen; eC++) {
					var entityComponent = entity.components[eC];
					if(entityComponent.name == systemComponent) {
						hasEntityComponent = true;
					}
				}
				if( !hasEntityComponent)
					updateEntity = false;

			}

			if(updateEntity){
				system.update(entity);
			}
		}	
	}
}