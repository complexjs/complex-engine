var TagManager = cx.Manager.extend({
    entities : [],
    init : function ( ) {
        this._super('TagManager');
    },
   
    getEntity : function( tag ){
        return this.entities[tag];
    },
   
    tagEntity : function ( tag, entity) {
        this.entities[tag] = entity.index;
    }
    
});