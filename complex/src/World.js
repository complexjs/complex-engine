/**
 * Holds all the current entities and systems
 */
cx.World = Class.extend({
	entities : [],
    systems : [],
    tag : 'cx.World',

    addEntity : function ( entity ) {
		this.entities.push(entity);
	},

	addSystem : function ( system ){
		Log.d(this, 'add system '+system.tag )
		this.systems.push(system);
	},

	getSystem : function( systemName ) {
		for(var i = 0, len = this.systems.length; i < len; i++){
			var system = this.systems[i];
			if(system.tag == systemName){
				return system;
			}
		}
		return null;
	},

	update : function ( ) {

		for(var s = 0, sLen = this.systems.length; s < sLen; s++) {
			var system = this.systems[s];

			if(system.type == system.TYPE_VOID){
				system.update();
			} else if(system.type == system.TYPE_PROCESS){
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
						
						if( !hasEntityComponent) {
							updateEntity = false;
						}

					}

					if(updateEntity){
						system.update(entity, entityComponents);				
					}
				}	
			}
		}
	}
});
