/**
 * [Entity description]
 */
cx.Entity = Class.extend({
	components : [],

	init : function(){
		this.components = [];
	},

	addComponent : function ( component ) {
		this.components.push( component );
	},

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