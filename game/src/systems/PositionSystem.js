var PositionSystem = cx.System.extend({
	init : function(){
	    this._super();
	    this.tag = "PositionSystem";
	    this.components.push("Position");
	    
	}
});
