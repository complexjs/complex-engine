var PlayerBehaviour = cx.Behaviour.extend({

	positionComponent : null,
    init : function() {
        this._super();

    },

    setup : function ( entity ) {
    	this.entity = entity;
    	this.positionComponent = entity.getComponent("Position");
    },

    update : function(){
    	
    	if ( Keyboard.isKeyPressed( 65 ) ) {
    		this.positionComponent.x += 5;
    	}
    }

});