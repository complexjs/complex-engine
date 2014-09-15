/**
* @constructor
*/
var EntitySystem = function()
{
	cx.System.call(this);
	this.components = [];
	this.type = cx.System.TYPE_PROCESS;
}

EntitySystem.prototype = Object.create(cx.System.prototype);
EntitySystem.prototype.constructor = EntitySystem;

/**
* Update entities
* @param  {cx.Entity} entity     [description]
* @param  {cx.Component[]} components [description]
*/
EntitySystem.prototype.update = function ( entity, components )
{

}

cx.EntitySystem = EntitySystem;
