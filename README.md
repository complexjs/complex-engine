# ComplexJS

ComplexJS is a JS written Component Entity System for HTML5 Gamedevelopment.

It's strong structure enforces you to write seperated code in a very reusable way. This means that you can reuse the components
already created in other projects and add them to a new one.

Due to the Component Entity System architecture you are required to do seperation of concern
within your code. Also you (should)have more simpler, clearer and more maintainable files.

**NOTE** `complex` is just a game engine. It doesn't provide any renderer functionality or game logic.

# Installation

## Web

    <script src="https://unpkg.com/complex-engine@/build/bundle.js"></script>

Now everything is available under the scope `cx`

Exp: `new cx.cxEntity()` or `cx.Complex.getInstance()`

## Npm

    npm i complex-engine --save


# How To
[Getting started](/doc/GettingStarted.md)

# API 
[API Reference](http://complexjs.github.io/complex-engine/index.html)


# Concept
You can have multiple scenes. Every scene is a scene or a stage in your game. Within this scene
the complete World lives. In that world you have all your entities, managers and systems.

## System
A system is a class that contains business logic to process the data for an entity.

Exp. If you want to draw a square at the mouse position, you'll have two systems. One that draws the square on the canvas/screen
and the other that will update the mouse position in the component.

You can simply create a system that uses the [PIXI]() renderer to draw your sprites or shapes

## Component
A component is similar to a store. It holds data that is bound/mapped to a specific entity. 

In the example above, we would have a component that will hold four properties. X/Y coordinates and the width and height of the square that have to be drawn.

## Entity
An entity is bucket with multiple components. Every entity can have an unlimited amount of components.

## Manager
A manager is something like an interface to external stuff. 

For our example, we would create a manager that creates eventlistener on the body and then store those mouse position in it's data. A system then consumes those data and writes it to the components. Our manager would be something like a `MouseInputManager`. The manager only has the x/y coordinates of the mouse
