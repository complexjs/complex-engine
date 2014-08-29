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


<h1>Getting started</h1>
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
@TODO

<h3>Use a system</h3>
To make a system working you have to add it to the `cx.World`
<pre>
world.addSystem(new MySystem());
</pre>

<h3>Get a system</h3>
To retrive a system you can call `getSystem(name)` where you have access to the world object.
The parameter `tag` is the tag property of each system and should be unique

<pre>
world.getSystem("PixiSystem")
</pre>

<h2>Entities</h2>
An entity is just a holder for several components.

<h3>Create entity</h3>
<pre>
var hero = new cx.Entity();
</pre>

<h3>Add entity</h3>
To process and access all the components added to an entity you have to add it to the `cx.World` object. So every tick the systems can handle and modify the components data
<pre>
world.addEntity(hero);
</pre>

<h2>Components</h2>
@TODO

<h3>Add a component</h3>
To process the data in an component for a specific entity we have to add the component to that entity
<pre>
var hero = new cx.Entity();
hero.addComponent(new ScriptComponent());
</pre>
From now on you can access the `ScriptComponent` on the heroEntity

<h3>Get a component</h3>
To access the component and its data you can access it via its unique name
<pre>
var scriptComponent = hero.getComponent("cx.ScriptComponent");
</pre>

<h2>Demos</h2>
<a href="https://github.com/faebeee/complex-demo">Here</a>

<a href="https://github.com/faebeee/complex-demo/tree/master/shootemup">shootemup</a>

<h2>Contribution</h2>
Just contribute. It's OpenSource

<h2>Contact</h2>
<a href="https://twitter.com/faebeee">@Twitter</a><br>
<a href="https://plus.google.com/u/0/113673733496424994581/posts">+Google</a>
