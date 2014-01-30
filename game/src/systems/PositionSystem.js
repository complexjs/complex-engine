var PositionSystem = cx.System.extend({
	init : function(){
	    this._super(['PositionComponent']);
	    this.tag = "PositionSystem";
	    this.components.push("PositionComponent");
	    this.type = this.TYPE_PROCESS;
	},
	
	update : function( entity, components ) {
	    var positionComponent = components["PositionComponent"];
	    
	    positionComponent.x += positionComponent.velocity.x;
	    positionComponent.y += positionComponent.velocity.y;
	    
	} 
});
