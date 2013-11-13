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
    init : function(loader)
    {
        loader();
    }
};

cx.Engine = {
    currentScreen : null,
    world : null,
    setScreen : function(screen)
    {
        cx.Util.log("Set screen to "+screen.name)
        this.currentScreen = screen;
    },

    /** makes the world accessable for the systems */
    setWorld : function(world)
    {
        this.world = world;
    },

    update : function()
    {
        if(cx.Engine.currentScreen != null)
        {
            cx.Engine.currentScreen.update();
        }
    },
}

//ToDO
/**
 * [Input description]
 * @type {[type]}
 */
cx.Input = 
{
    isKeyDown : function()
    {

    }
}

/**
 *
 * @type {{log: Function}}
 */
cx.Util = {
    log : function(data){
        console.log("cx", data);
    },

    load : function(file)
    {
        var script = document.createElement("script");
        script.src = file;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}

/**
 * class cx.World
 * @constructor
 */
cx.World = function()
{
    this._systems = [];
    this._entities = [];

    /**
     * Add new system to the world
     * @param system
     */
    this.setSystem = function(system)
    {
        cx.Util.log(system.name+" added");
        system.world = cx.Engine.world;

        system.init();

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
        return {
            id: null,
            _components : [],
            addComponent : function(component)
            {
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
        return this._entities[id];
    }
    
    this.addEntity = function(entity)
    {
        for(var e = 0; e < this._entities.length; e++)
        {
            if(this._entities[e] === null)
            {
                entity.id = e;
                this._entities[e] = entity;
                return entity;
            }
        }

        entity.id = this._entities.length;
        this._entities.push(entity);
        return entity;
    }
    
    this.removeFromWorld = function(entity)
    {
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

/**
 *
 * @param name
 * @param data
 * @constructor
 */
cx.Manager = function(name, data)
{
    data.name = name;
    Class.define(name, data);
}

/**
 *
 * @param name
 * @param data
 * @constructor
 */
cx.Component = function(name, data)
{
    data.name = name; 
    Class.define(name, data)
}

/**
 *
 * @param name
 * @param components
 * @param data
 * @constructor
 */
cx.System = function(name, components, data)
{
    if(!data.update)
        data.update = function(entity){};

    data.world = {};
    if(!data.init)
        data.init = function(){}

    data._components = components;

    data.name = name; 
    Class.define(name, data)
};

/**
 *
 * @param name
 * @param data
 * @constructor
 */
cx.Screen = function(name, data)
{
    data.name = name;
    if(typeof data.update !== 'function')
        data.update = function(){}


    Class.define(name, data)
}

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



/**
 * HELPER CLASSES
 */
cx.Vector = function(x, y)
{
    this.x = x;
    this.y = y;
}