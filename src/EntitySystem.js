/**
* @constructor
*/
var EntitySystem = function()
{
    System.call(this);
    
    this.components = [];
};

EntitySystem.prototype = Object.create(System.prototype);
EntitySystem.prototype.constructor = EntitySystem;
EntitySystem.prototype.name = 'cx.EntitySystem';

EntitySystem.prototype.update = function(time, dt)
{
    var entities = this.world.getEntitesWithComponents(this.components),
        entitiesLength = entities.length,
        i = 0;

    for (i = 0; i < entitiesLength; ++i)
    {
        this.updateEntity(entities[i], time, dt);
    }
};

EntitySystem.prototype.render = function(alpha)
{
    var entities = this.world.getEntitesWithComponents(this.components),
        entitiesLength = entities.length,
        i = 0;

    for (i = 0; i < entitiesLength; ++i)
    {
        this.renderEntity(entities[i], alpha);
    }
};

EntitySystem.prototype.entityAddedComponent = function(entity, component) 
{
    if (!component.isOneOf(this.components)) return;

    if (entity.has(this.components))
    {
        this.entityAdded(entity);
    }
};

EntitySystem.prototype.entityRemovedComponent = function(entity, component) 
{
    if (!component.isOneOf(this.components)) return;

    if (!entity.has(this.components))
    {
        this.entityRemoved(entity);
    }
};

EntitySystem.prototype.entityAdded = function(entity)
{

};

EntitySystem.prototype.entityRemoved = function(entity)
{

};

/**
* Update entities
* @param  {cx.Entity} entity     [description]
* @param  {cx.Component[]} components [description]
*/
EntitySystem.prototype.updateEntity = function(entity, time, dt)
{

};

EntitySystem.prototype.renderEntity = function(entity, alpha)
{

};

cx.EntitySystem = EntitySystem;