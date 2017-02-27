# cxEntitySystem

This is one of the core functionality of the complex-engine.
A system reacts on the components attached to an entity and renders/processes the
components data. Basically there are two types of systems. The `cxEntitySystem` is the system, that acts on a
group of entities, that own a specific or a list of cxComponents. This is configured in the systems constructor.


    import {cxEntitySystem} from 'complex-engine';
    
    export default class MyCustomSystem extends cxEntitySystem
    {
        constructor ()
        {
            super();
            this.components = ['tag.of.other.component'];
            
            this.tag = 'my.customsystem';
        }
     ...
     
     
 # [API](http://complexjs.github.io/complex-engine/index.html#cxentitysystem)