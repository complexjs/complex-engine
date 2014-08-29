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
Entity.prototype.remove = Entity.prototype.removeComponent;

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
