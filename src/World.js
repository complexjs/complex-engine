/**
 * Holds all the current entities and systems
 *
 * @constructor
 */
var World = function()
{
    cx.GameObject.call(this);

    this.entities = [];
    this.systems = [];
    this.managers = [];

    this._entityPool = [];
    this._freeEntitiyIndicies = [];
};

World.prototype = Object.create(cx.GameObject.prototype);
World.prototype.constructor = World;
World.prototype.name = 'cx.World';

World.prototype.createEntity = function()
{
    var entity = this._entityPool.pop() || new cx.Entity(this, true),
        index = this._freeEntitiyIndicies.pop() || this.entities.length;

    entity.reset();
    this.entities[index] = entity;

    this._entityCreated(entity);

    return entity;
};

World.prototype.getEntitesWithComponent = function(component)
{
    var entitiesLength = this.entities.length,
        entity = null,
        i = 0;

    var entitiesWithComponent = [];

    for (i = 0; i < entitiesLength; ++i)
    {
        entity = this.entities[i];

        if (entity.alive && entity.hasComponent(component))
        {
            entitiesWithComponent.push(entity);
        }
    }

    return entitiesWithComponent;
};

World.prototype.getEntitesWithComponents = World.prototype.getEntitesWithComponent;

/**
* Return all entities
* @return {cx.Entity[]}
*/
World.prototype.getEntities = function()
{
    var entities = [];

    for(var e = 0, len = this.entities.length; e < len; e++)
    {
        var entity = this.entities[e];

        if(!entity || !entity.alive)
        {
            continue;
        }

        entities.push(entity);
    }

    return entities;
};

/**
* add system to world
* @param {cx.System} system [description]
*/
World.prototype.addSystem = function(system)
{
    system.world = this;
    this.systems.push(system);
    system.addedToWorld();
};

/**
* Remove a system from the world
* @param {cx.System|string} system
*/
World.prototype.removeSystem = function(system)
{
    var index = this.systems.indexOf(system);

    if (index != -1)
    {
        this.systems.splice(index, 1);
    }
};

/**
* add manager to world
* @param {cx.Manager} manager [description]
*/
World.prototype.addManager = function(manager)
{
    manager.world = this;
    this.managers.push(manager);
};

/**
* get a manager
* @param  {string} name [description]
* @return {cx.Manager}      [description]
*/
World.prototype.getManager = function(name)
{
    for(var i = 0, len = this.managers.length; i < len; i++)
    {
        var manager = this.managers[i];

        if(manager.name == name)
        {
            return this.managers[i];
        }
    }

    return null;
};

/**
 * Update
 */
World.prototype.update = function(time, dt)
{
    var entitiesLength = this.entities.length,
        entity = null,
        i = 0;

    // Cleanup destroyed entities
    for (i = 0; i < entitiesLength; ++i)
    {
        entity = this.entities[i];

        if (!entity) continue;

        if (!entity.alive)
        {
            this.entities[i] = null;

            this._entityPool.push(entity);
            this._freeEntitiyIndicies.push(i);
            this._entityDestroyed(entity);
        }
    }

    var systemsLength = this.systems.length,
        system = null;

    for (i = 0; i < systemsLength; ++i)
    {
        system = this.systems[i];
        system.update(time, dt);
    }
};

World.prototype.render = function(alpha)
{
    var systemsLength = this.systems.length,
        system = null,
        i = 0;

    for (i = 0; i < systemsLength; ++i)
    {
        system = this.systems[i];
        system.render(alpha);
    }
};

World.prototype._entityAddedComponent = function(entity, component)
{
    var systemLength = this.systems.length,
        system = null,
        i = 0;

    for (i = 0; i < systemLength; ++i)
    {
        system = this.systems[i];
        system.entityAddedComponent(entity, component);
    }
};

World.prototype._entityRemovedComponent = function(entity, component)
{
    var systemLength = this.systems.length,
        system = null,
        i = 0;

    for (i = 0; i < systemLength; ++i)
    {
        system = this.systems[i];
        system.entityRemovedComponent(entity, component);
    }
};


World.prototype._entityCreated = function(entity)
{
    var systemLength = this.systems.length,
        system = null,
        i = 0;

    for (i = 0; i < systemLength; ++i)
    {
        system = this.systems[i];
        system.entityCreated(entity);
    }
};

World.prototype._entityDestroyed = function(entity)
{
    var systemLength = this.systems.length,
        system = null,
        i = 0;

    for (i = 0; i < systemLength; ++i)
    {
        system = this.systems[i];
        system.entityDestroyed(entity);
    }
};

cx.World = World;