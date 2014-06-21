<h1>ComplexJS</h1>
ComplexJS is a JS written Component Entity System for HTML5 Gamedevelopment.
ComplexJS has the ability not to slow your development time down.
With it's Component Entity System there is a high rate of reusable code for your later projects.
<h2>Build</h2>
You can build ComplexJS by your own. There is a dev.js script where all the files are defined which will be compiled to gether into build/complex.js
Therefore you need to install `littlehelper` via npm 
<pre>
$ npm install littlehelper
</pre>


<h2>Getting started</h2>
Createa HTMLFile containing your view.
Add ComplexJS as a source
`<script type="text/javascript" src="./libs/complex.js"></script>`
    
<h2>World</h2>
The world is the mainobject holding all the entities and systems.
If you want to make your game work you have to write an update loop and call `world.update` every tick
Therefore I created a small lib called <a href="https://github.com/faebeee/Animloop">Animloop.js</a>

<h3>Create the world</h3>

<pre>
var world = new cx.World();
</pre>

<h3>Update the world</h3>
Override the updatefunction of the animloop object. After calling `animloop.init()` the function `animloop.update()` is called every tick
<pre>
animloop.update = function(){
    world.update();
}
animloop.init();
</pre>

<h2>Systems</h2>
The system is handling the datahandling of all components. For example moving around a object or rendering all entities to the canvas.
There where 2 different systemtypes `cx.EntitySystem` and `cx.VoidSystem`

<h3>cx.EntitySystem</h3>
The EntitySystem is a system which reacts on entites which owns the same components as configured in the system

<pre>
var MySystem = cx.EntitySystem.extend({
    tag : "MySystem", // used to identify the system and retrive it back from the world
    components : ["PositionComponent", "SizeComponents"], // the value of the tag property in your components

    //constructor
    init : function(){

    },
     /**
     * called for an entity if the required components are matching these of the entity
     * @param entity
     * @param componens Key Value store. Components can be accessed with the componentName `components["myComponent"]`
     */
    update : function( entity, componens){
        //do what ever you want with your entity and its components
    }
});
</pre>

<h3>cx.VoidSystem</h3>
VoidSystem is a system which does not react on each entity but is called everytime `world.update` is called. With this system you can easily implement other libraries like PIXI.js where you only have to call `update()` once every tick

<pre>
var PixiSystem = cx.VoidSystem.extend({
    tag : 'PixiSystem',

    init : function(){
        this.stage = new PIXI.Stage(0x66FF99);
        this.renderer = PIXI.autoDetectRenderer(400, 300);
        this.type = this.TYPE_VOID;

        document.body.appendChild(this.renderer.view);
    },

    //called when an entity is added to world
    added : function ( entity ){
        var spriteComponent = null
        if ( (spriteComponent = entity.getComponent('sprite')) != null ){
            this.stage.addChild(spriteComponent.sprite);
        }
    },

    update: function () {
        this.renderer.render(this.stage);
    }
});
</pre>

<h3>Use a system</h3>
To make a system working you have to add it to the `cx.World`
<pre>
world.addSystem(new MySystem());
</pre>

<h3>Get a system</h3>
To retrive a system you can call `getSystem(name)` where you have access to the world object.
The parameter `name` is the tag property of each system and should be unique

<pre>
world.getSystem("PixiSystem")
</pre>

<h2>Entities</h2>
Coming soon...

<h2>Components</h2>
Coming soon...

<h2>Scripting</h2>
Coming soon...

<h2>Contribution</h2>
Just contribute. It's OpenSource

<h2>Contact</h2>
<a href="https://twitter.com/faebeee">@Twitter</a><br>
<a href="https://plus.google.com/u/0/113673733496424994581/posts">+Google</a>