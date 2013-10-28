/**
 * ComplexJS
 * A pure JS based Component Entity System Framework
 * 
 * Author: Fabio Gianini
 * Version: 0.2
 * License: GNU
 * Mail: faebeee@gmail.com
 * Repo: https://github.com/faebeee/complexJS
 * 
 */
 
 var cx = {
    _world : null,
    setWorld : function(world)
    {
        cx.Core.setupWorld(world);
        this._world = world;
        
    },
    
    getWorld : function()
    {
        return this._world;
    },
};

cx.Util = {
    Log : function(data){
        console.log(data);
    }
}


cx.World = function()
{
    this._systems = [];
    this._entities = [];
    
    this.setSystem = function(system)
    {
        this._systems.push(system);
    }

    this.getSystem = function(systemName)
    {
        for(var s = 0; s < this._systems.length; s++)
        {
            if(this._systems[s].name == systemName)
                return this._systems[s];
        }
        return null;
    }
    
    this.createEntity = function()
    {
        cx.Util.Log("Create entity");
        return {
            id: null,
            _components : [],
            addComponent : function(component)
            {
                cx.Util.Log("Add component "+component.name)
                this._components[component.name] = component;
            },
            getComponent : function(componentName)
            {
                return this._components[componentName];
            }
        }    
    }
    
    this.getEntity = function(id)
    {
        return _entities[id];
    }
    
    this.addEntity = function(entity)
    {
        for(var e = 0; e < this._entities.length; e++)
        {
            if(this._entities[e] === null)
            {
                cx.Util.Log("Add Entity "+e);
                entity.id = e;
                this._entities[e] = entity;
                return entity;
            }
        }

        cx.Util.Log("Add Entity");
        entity.id = this._entities.length;
        this._entities.push(entity);
        return entity;
    }
    
    this.removeFromWorld = function(entity)
    {
        cx.Util.Log("Remove "+entity.id);
        delete this._entities[entity.id];
    }
    
    this.update = function()
    {
        for(var s = 0; s < this._systems.length; s++)
        {
            var system = this._systems[s];
            if(system._components.length == 0){
                system.update();
                continue;
            }

            for(var e = 0; e < this._entities.length; e++)
            {
                var isValid = true;
                var entity = this._entities[e];
                for(var c = 0; c < system._components.length; c++)
                {
                    var component = system._components[c];
                    if(!entity._components[component])
                    {                        
                        isValid = false;
                        break;
                    }
                }

                if(isValid)
                    system.update(entity);
            }
        }
    }
}


cx.Manager = function(name, data)
{
    data.name = name;
    Class.define(name, data);
}

/**
 *  Define the Component class. Component is available with 'name' 
 */
cx.Component = function(name, data)
{
    data.name = name; 
    Class.define(name, data)
}

/**
 * Define a new System. Available as class with name 'name'
 */
cx.System = function(name, components, data)
{
    if(!data.update)
        data.update = function(entity){};

    data._components = components;

    data.name = name; 
    Class.define(name, data)
};

/**
 *  Preset Classes
 */
 cx.Core = {
    setupWorld : function(world)
    {
        cx.Manager("TagManager", {
            _entities : [],
            
            register : function(entity, tag)
            {
                this._entities[tag] = entity.id;
            },
            
            load : function(tag)
            {
                return cx.getWorld().getEntity(this._entities[tag]);
            }
        }); 
        
        world.setSystem(new TagManager());
    }

};