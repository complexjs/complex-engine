'use strict';

(function(global)
{

var cx = 
{
	version : "0.9.4",
	initFunctions : [],
	addInitFunction : function(cb)
	{
		cx.initFunctions.push(cb);
	},
	init : function()
	{
		for(var i = 0, len = cx.initFunctions.length; i < len; i++)
		{
			cx.initFunctions[i]();
		}
	}
};

global.cx = cx;

console.log("Complex "+ cx.version);
