#Tutorial 01

In this tutorial we create a simple drawing app where we draw rectangles on the mouses position.

## Setup
   
To start we need two files. a `index.html` and a `app.js`. 

Inside the `app.js` file we'll put all the game logic.

**index.html**
    
    <script src="../../build/bundle.js"></script>

    <canvas id="canvas" width="400" height="400"/>
    
    <script src="./app.js"></script>
    
**app.js**

Here we just load the complex engine and start updating it.
    
    const complex = cx.Complex.getInstance();
    
    function render() {
        complex.update();
        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);


## Create a scene

First thing is, that we have to create a new Scene. That scene have to extend from the `Scene` class provided by the `complex-engine`.

At the beginning of the file we put

    class MyScene extends cx.Scene {
        constructor() {
            super('MainScene');// set a name
            this.canvas = document.getElementById('canvas');
        }
        
        load() {
        }
    }
    
This defines our scene. In the `load` method we put the code to build the world we wan't to play.
Like adding systems, managers and create entities

## Create an entity

Creating a new entity is very simple.

    let player = new cx.Entity("Player");
    this.world.addEntity(player);
    
this code creates an entity and adds it to the world. This code goes into the `load` method 
of our scene.

## Create a component
The component 

