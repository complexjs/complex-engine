var cx = {
    _world : null,
    setWorld : function(world)
    {
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

cx.Component = function(name, data)
{
    data.name = name; 
    Class.define(name, data)
}

cx.System = function(name, components, data)
{
    if(!data.update)
        data.update = function(entity){};

    data._components = components;

    data.name = name; 
    Class.define(name, data)
};