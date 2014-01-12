/**
 * [Engine description]
 */
cx.Engine = function ( ) {
	this.tag = "cx.Engine";
    this.entities = [];
    this.systems = [];

    Log.d(this, 'engine created');

    /**
     * [update description]
     * @return {[type]} [description]
     */
    this.update = function () {
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

    /**
     * [addEntity description]
     * @param {[type]} entity [description]
     */
    this.addEntity = function( entity ) {
    	entity.id = this.entities.length;
    	this.entities.push(entity);
    }

    this.addSystem = function ( system ) {
    	system.init();
    	this.systems.push(system);
    }
}
