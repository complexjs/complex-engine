var cx = {
	version : "0.9.5",
	initFunctions : [],
	rendering : true,
	addInitFunction : function(cb){
		cx.initFunctions.push(cb);
	},

	init : function(){
		for(var i = 0, len = cx.initFunctions.length; i < len; i++){
			cx.initFunctions[i]();
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
				if(cx.rendering)
				{
					requestAnimFrame(loop);
					cx.loop.update();
				}
			})();
		}
	}
};

console.log("Complex "+cx.version);
