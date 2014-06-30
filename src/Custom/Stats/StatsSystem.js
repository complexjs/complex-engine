var StatsSystem = cx.VoidSystem.extend({
	stats : null,
	tag : 'cx.statssystem',
	mode : {FPS : 0, MS : 1},

	init : function( mode, element ){
		this.stats = new Stats();
		mode = mode || this.mode.FPS;
		this.stats.setMode(mode); // 0: fps, 1: ms

		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.left = '0px';
		this.stats.domElement.style.top = '0px';

		if ( !element ){
			document.body.appendChild( this.stats.domElement );
		} else {
			element.appendChild( this.stats.domElement );
		}

		this.stats.begin();
	},

	added : function(){

	},
	
	update : function () {
		this.stats.end();

		this.stats.begin();
	},
});