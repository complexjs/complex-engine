var Complex = {
	version : "1.1.0",
	initFunctions : [],
	rendering : true,
	addInitFunction : function(cb){
		Complex.initFunctions.push(cb);
	},

	init : function(){
		for(var i = 0, len = Complex.initFunctions.length; i < len; i++){
			Complex.initFunctions[i]();
		}
	},

	loop : {
		update : function(){},
		init : function ( ) {
			// shim layer with setTimeout fallback
			window.requestAnimFrame = (function(){
				return  window.requestAnimationFrame       ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame    ||
				function( callback ){
					window.setTimeout(callback, 1000 / 60);
				};
			})();

			(function loop(){
				if(Complex.rendering)
				{
					requestAnimFrame(loop);
					Complex.loop.update();
				}
			})();
		}
	}
};

console.log("Complex "+Complex.version);
