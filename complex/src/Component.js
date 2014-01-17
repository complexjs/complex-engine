
/**
 * [Component description]
 * @param {[type]} data [description]
 */
cx.Component = Class.extend({
	init : function ( data ) {
		this.name = 'cx.Component';
		this.tag = this.name;

		for(entry in data){
			this[entry] = data[entry];
		}	
	}
});
