/**
 * [Entity description]
 */
cx.Entity = Class.extend({
	components : [],
    /**
     * constructor
     */
	init : function(){
		this.components = [];
	},

    /**
     * add a component to the entity
     * @param component
     */
	addComponent : function ( component ) {
		this.components.push( component );
	},

    /**
     * get a component by its name
     * @param componentName
     * @returns {*}
     */
	getComponent : function ( componentName ) {
		for(var i = 0, len = this.components.length; i < len; i++){
			var component = this.components[i];
			if(component.name == componentName){
				return component;
			}
		}
		return null;
	}
});