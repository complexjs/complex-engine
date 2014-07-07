cx.VoidSystem = cx.System.extend({
    init : function(){
		this._super();
		this.type = this.TYPE_VOID;
	},

    /**
    * @param entity Entity object
    * called when an entity is added to world
    */
    added : function( entity ){},


    /**
    * @param entity Entity object
    * called when an entity isremoved from world
    */
    removed : function( entity ){},

});
