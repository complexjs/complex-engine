/**
 * Logger
 * @type {Object}
 */
var Log = {
	/**
	 * [d description]
	 * @param  {[type]} tag  [description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	d : function (tag, data) {
		var _tag = Log._tag(tag);
		console.log(_tag, data);
	},

	/**
	 * [_tag description]
	 * @param  {[type]} tagObj [description]
	 * @return {[type]}        [description]
	 */
	_tag : function ( tagObj ) {
		if(tagObj.tag) {
			return tagObj.tag
		}

		if(typeof tagObj === 'string') {
			return tagObj.toString();
		}

	}
}