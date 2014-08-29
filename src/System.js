/**
 * [System description]
 *
 * @constructor
 * @param {[type]} arrayOfComponents [description]
 */
var System = function()
{
    GameObject.call(this);

    this.world = null;
};

System.prototype = Object.create(GameObject.prototype);
System.prototype.constructor = System;
System.prototype.name = 'cx.System';

/**
 * called as soon the system has been added to the world object
 */
System.prototype.addedToWorld = function() {};

/**
 * Called when an entity has been added to the world
 * @param  {cx.Entity} entity [description]
 */
System.prototype.entityCreated = function(entity) {};

/**
 * Called when an entity has been removed from world
 * @param  {cx.Entity} entity [description]
 */
System.prototype.entityDestroyed = function(entity) {};

System.prototype.entityAddedComponent = function(entity, component) {};

System.prototype.entityRemovedComponent = function(entity, component) {};

System.prototype.receivedEvent = function(type, data) {};

System.prototype.update = function(time, dt) {};

System.prototype.render = function(alpha) {};

cx.System = System;