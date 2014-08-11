cx.VoidSystem = cx.System.extend({
    init : function(){
		this._super();
		this.type = this.TYPE_VOID;
	},

    /**
     * Called when an entity has been added to the world
     * @param  {cx.Entity} entity [description]
     */
    added : function( entity ){},

    /**
     * Called when an entity has been removed from world
     * @param  {cx.Entity} entity [description]
     */
    removed : function( entity ){},

    /**
    * Called every tick
    */
    update : function(){}
});
