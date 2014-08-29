// Build by LittleHelper. Build Date : Fri Aug 29 2014 16:28:22 GMT+0200 (CEST)




// FILE >> src/complex.js
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



// FILE >> src/GameObject.js
/**
 * @constructor
 */
var GameObject = function()
{
};

GameObject.prototype.name = 'cx.GameObject';

GameObject.prototype.isOneOf = function(gameObjs)
{
    var gameObjsLength = gameObjs.length,
        gameObj = null,
        i = 0;

    var isOneOf = false;

    for (i = 0; i < gameObjsLength; ++i)
    {
        gameObj = gameObjs[i];
        isOneOf = this.isA(gameObj);

        if (!isOneOf)
        {
            return false;
        }
    }

    return isOneOf;
};

GameObject.prototype.isA = function(gameObj)
{
    if (typeof gameObj == 'function')
    {
        return this.name == gameObj.prototype.name;
    }
    else
    {
        return this.name == gameObj;
    }
};

cx.GameObject = GameObject;


// FILE >> src/Component.js
/**
 * The component object
 *
 * @constructor
 * @param {[type]} data [description]
 */
var Component = function()
{
    GameObject.call(this);
};

Component.prototype = Object.create(GameObject.prototype);
Component.prototype.constructor = Component;
Component.prototype.name = 'cx.Component';

cx.Component = Component;



// FILE >> src/Entity.js
/**
 * [init description]
 * @constructor
 */
var Entity = function(world, createdInWorld)
{
    if (!createdInWorld) return world.createEntity();

    GameObject.call(this);

    this.components = null;
    this.componentsByName = null;
    this.tags = null;

    this.world = world;
    this.alive = true;
};

Entity.prototype = Object.create(GameObject.prototype);
Entity.prototype.constructor = Entity;
Entity.prototype.name = 'cx.Entity';

Entity.prototype.reset = function()
{
    this.components = [];
    this.componentsByName = {};
    this.tags = [];
};

/**
 * add component to this entity
 * @param {cx.Component} component [description]
 */
Entity.prototype.addComponent = function(component)
{
    if (Array.isArray(component))
    {
        this._addMultipleComponents(component);
    }
    else
    {
        this._addSingleComponent(component);
    }

    return this;
};

Entity.prototype.addComponents = Entity.prototype.addComponent;
Entity.prototype.add = Entity.prototype.addComponent;

Entity.prototype._addSingleComponent = function(component)
{
    if (!(component instanceof Component))
    {
        throw new Error('"component" is not of type cx.Component');
    }

    if (this.componentsByName[component.name])
    {
        throw new Error('Component of this type already exists in entity.');
    }

    this.components.push(component);
    this.componentsByName[component.name] = component;

    this.world._entityAddedComponent(this, component);
};

Entity.prototype._addMultipleComponents = function(components)
{
    var componentsLength = components.length,
        component = null,
        i = 0;

    for (i = 0; i < componentsLength; ++i)
    {
        component = components[i];
        this._addSingleComponent(component);
    }
};

/**
 * [getComponent description]
 * @param {string} componentName [description]
 * @return {cx.Component|null}
 */
Entity.prototype.getComponent = function(component)
{
    var componentName = (component.prototype ? component.prototype.name : undefined) || component,
        component = this.componentsByName[componentName];

    return component != undefined ? component : null;
};

Entity.prototype.get = Entity.prototype.getComponent;

Entity.prototype.hasComponent = function(component)
{
    if (Array.isArray(component))
    {
        return this._hasMultipleComponents(component);
    }
    else
    {
        return this._hasSingleComponent(component);
    }
};

Entity.prototype.hasComponents = Entity.prototype.hasComponent;
Entity.prototype.has = Entity.prototype.hasComponent;

Entity.prototype._hasSingleComponent = function(component)
{
    var componentName = (component.prototype ? component.prototype.name : undefined) || component;
    return this.componentsByName[componentName] ? true : false;
};

Entity.prototype._hasMultipleComponents = function(components)
{
    var componentsLength = components.length,
        component = null,
        i = 0;

    for (i = 0; i < componentsLength; ++i)
    {
        component = components[i];

        if (!this._hasSingleComponent(component))
        {
            return false;
        }
    }

    return componentsLength == 0 ? false : true;
};

/**
 * [removeComponent description]
 * @param {string} componentName [description]
 */
Entity.prototype.removeComponent = function(component)
{
    if (typeof component == 'string')
    {
        this._removeByName(component);
    }
    else if (component.prototype ? component.prototype.name : undefined)
    {
        this._removeByName(component.prototype.name);
    }
    else if (Array.isArray(component))
    {
        this._removeMultiple(component);
    }
    else
    {
        this._removeByComponent(component);
    }

    return this;
};

Entity.prototype.removeComponents = Entity.prototype.removeComponent;
Entity.prototype.remove = Entity.prototype.remove;

Entity.prototype._removeMultiple = function(components)
{
    var componentsLength = components.length,
        component = null,
        i = 0;

    for (i = 0; i < componentsLength; ++i)
    {
        component = components[i];

        if (typeof component == 'string')
        {
            this._removeByName(component);
        }
        else if (component.prototype ? component.prototype.name : undefined)
        {
            this._removeByName(component.prototype.name);
        }
        else
        {
            this._removeByComponent(component);
        }
    }
};

Entity.prototype._removeByName = function(componentName)
{
    var component = this.componentsByName[componentName],
        index = this.components.indexOf(component);

    if (index != -1)
    {
        this.components.splice(index, 1);       
        delete this.componentsByName[componentName];    

        this.world._entityRemovedComponent(this, component);
    }
};

Entity.prototype._removeByComponent = function(component)
{
    var index = this.components.indexOf(component);

    if (index != -1)
    {
        this.components.splice(index, 1);
        delete this.componentsByName[component.name];

        this.world.entityRemovedComponent(this, component);
    }
};

/**
 * Destroy entity and remove it from the world
 */
Entity.prototype.destroy = function()
{
    this.alive = false;
};

cx.Entity = Entity;



// FILE >> src/System.js
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


// FILE >> src/EntitySystem.js
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
    

    if (entity.has(this.components))
    {
        this.entityAdded(entity);
    }
};

EntitySystem.prototype.entityRemovedComponent = function(entity, component) 
{
    if (entity.has(this.components))
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


// FILE >> src/World.js
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


// FILE >> src/Manager.js
/**
 * Represents a manager to handle additional data
 *
 * @constructor
 */
var Manager = function()
{
    GameObject.call(this);

    this.world = null;
};

Manager.prototype = Object.create(GameObject.prototype);
Manager.prototype.constructor = Manager;
Manager.prototype.name = 'cx.Manager';

cx.Manager = Manager;



// FILE >> src/end.js
})(this);