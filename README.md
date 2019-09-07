# ComplexJS

ComplexJS is a JS written Component Entity System for HTML5 Gamedevelopment.

It's strong structure enforces you to write seperated code in a very reusable way. This means that you can reuse the components
already created in other projects and add them to a new one.

Due to the Component Entity System architecture you are required to do seperation of concern
within your code. Also you (should)have more simpler, clearer and more maintainable files.

**NOTE** `complex` is just a game engine. It doesn't provide any renderer functionality or game logic.

## Npm
    npm i complex-engine --save

# How To
[Getting started](/doc/GettingStarted.md)

# Modules
To improve your dev experience there are some modules
which provide already written systems and other helpers

0. [complex-theejs](https://github.com/complexjs/complex-threejs)
0. [complex-scripting](https://github.com/complexjs/complex-scripting)

# API 
[API Reference](http://complexjs.github.io/complex-engine/index.html)

# Concept
The idea behind (yet another game engine) `complex-engine` to have a lot of reusable code which you can reuse
across multiple projects. `complex-engine` follows the [Component Entity System](https://en.wikipedia.org/wiki/Entity_component_system) pattern.

Basically you have entities on the screen which represents all single instances of something. Those entities
hold a list of components which define it's behaviour. The component is just like a store for data.
For example if we want a entitiy to be drawn at a certain position, we need some coordinates. Lets say we need a
`x`, `y`, `width` and `height` variable for that. Those variable will be stored in the component. 
The business logic (in our case the rendering/drawing) will be written in a system. The system
receives every entity, and does something with it's attached components data.
