# Gettings Started
To create  new game/app you required a couple of things. First you have to create a an HTML file which
will load our compiled code. Then we have to setup our bundler. Then we have to create our scene, systems and components.
This sounds like a lot, but due to the pattern used in this engine (which will make your code reusable) we have to
create those things, which also lead to a good seperation of concern. If you are looking for a tiny engine just
to render something simple you might look for something simple like [Phaser](https://phaser.io/)

## HTML
Create the a basic markup

```
<html>
    <head></head>
    <body>
        <script src="./dist/bundle.js"></script>
    </body>
</html>

```

## Scene
Create an entry point for your app/game. In this file, we will spin up our engine, load
the desired scene and render it. If you are going to create a large scene with a lot of setup code
I recommend you to create a scene class. Otherwise the `complex-engine` exports a `Engine` class
which owns a `simpleScene` function. This method accepts a function which will automatically
create a new `Scene` and add it to the engine.

## Scene as a class
`MyScene.js`
```js
import {Scene} from 'complex-engine';
import * as THREE from 'three';

export default class MyScene extends Scene {
    constructor(){
        super('MyScene');
    }
    
    load() {
        // Register all required systems and managers and so on
        this.world.addVoidSystem(new RenderSystem(this.camera));

        // Create components
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);

        this.world.createEntity([
            new ThreeComponent(cube)
        ]);
    }
}
```

and in your `index.js` you're going to instanciate the scene and start the rendering
```js
import {Engine} from 'complex-engine';
import MyScene from './MyScene.js';

Engine
    .getInstance()
    .useScene(new MyScene())
    .start();
```


## Scene composing function
```js
Engine
    .getInstance()
    .simpleScene(function() {
        // Simple three.js setups
       

        // Register all required systems and managers and so on
        this.world.addVoidSystem(new RenderSystem());

        // Create components
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);

        this.world.createEntity([
            new ThreeComponent(cube)
        ]);
    })
    .start();
```

# Create Component
In order to link some data to an entity and later react to that data, we need components.
In our we, we have to link a `THREE.Mesh` which is the cube to an entity.
For this, we create a new file named `ThreeComponent.js`. This component is very simple and does not contain any
logic. It just accepts a mesh and stores it

```js
import { Component } from 'complex-engine';

export default class ThreeComponent extends Component {
    constructor(mesh) {
        super();
        this.mesh = mesh;
    }
}
```

# Create System
Now we are going to create our system. In this case it is `RenderSystem`. In this example we're
going to render a cube to the screen using [three.js](https://threejs.org/).

Now we're going to create a new file called `RenderSystem.js` where we code the threejs implementation.
In our case we're going to use a [`VoidSystem`](https://complexjs.github.io/complex-engine/VoidSystem.html).
(There are two types of systems: [`VoidSystem`](https://complexjs.github.io/complex-engine/VoidSystem.html and [`EntitySystem`](https://complexjs.github.io/complex-engine/EntitySystem.html)
This system is called once every update cycle and is therefore perfect for threejs to call the renderer and
update the screen.

```js
import { VoidSystem } from 'complex-engine';
import * as THREE from 'three';
import ThreeComponent from './ThreeComponent';

export default class RenderSystem extends VoidSystem {
    constructor() {
        super();
        this.camera = camera;
        this.scene = new THREE.Scene();
        this.renderer = renderer || new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    added(entity) {
        if (entity.hasComponent(ThreeComponent)) {
            this.scene.add(entity.getComponent(ThreeComponent).mesh);
        }
    }

    update() {
        this.renderer.render(this.scene, this.camera);
    }
}
```

We also have to implement the `added` function. This function is called, as soon as a new entity is added to the world.
With this you can do whatever you need to do. In our case, we want all entities which have a `ThreeComponent` attachet to them
to add it's mesh to the `THREE.Scene` otherwise the scene lacks of object and threejs won't render anything


