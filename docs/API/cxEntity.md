The cxEntity class is the basic entity class. You can attach components to it. Those components are a kind of a dataholder. This data will then be processed by the system, which makes some position calculation or modify values and renders the new data.

# API


## constructor( name:String(optional) ) : void

the constructor takes a name. so later when you debug you can easily identify the entity.


## addComponent( component:cxComponent ) : void 

adds a component to the entity. Warning you can have multiple components with the same `tag` per entity


## getComponents ( tag : String) : cxComponent[]

get all components with the speicified tag


## hasComponent(tag: String):Bool

check if the entity has components with the given tag

## removeComponent(tag:String):void

remove a component with the given tag

## getAllComponents():cxComponent[]

get a list of components attached to the entity

## destroy():void

Remove the entity from the world

## getWorld(): cxWorld

get the world the entity is attached to

