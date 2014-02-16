<h1>ComplexJS</h1>
ComplexJS is a JS written Component Entity System for HTML5 Gamedevelopment.
ComplexJS has the ability not to slow your development time down.
With it's Component Entity System there is a high rate of reusable code for your later projects.



<h2>Getting started</h2>
Create an index.html file and add Class.js from /complex/libs/Class.js and complex.js from /complex/build/complex.js
Create an Canvas element inside of the body tag
Create a file where you store the initial startup script. (take a look @ /game/src/game.js)
Now you're ready to implement your systems and components


<h2>Create a Component</h2>
<i>Resources: /game/src/components</i>

A Component is a simple object storing data for a specific entity. There should be no logic in them. The logic is part of a system where the system update the data
of the component like the position of a sprite.

1. Create a new File with the name of the Component For example 'PositionComponent'(PositionComponent.js). The only data that should be in this component are the X and Y positions of an entity.

2. Register the File inside your game. For this whe have to put the filename of PositionComponent.js inside the startup script.
    In my case the startup script is called game.js insinde of /game/src

3. Relate your component to an entity by calling '.addComponent(new PositionComponent(10, 5));'

<h2>Contribution</h2>
Just contribute. It's OpenSource

<h2>Contact</h2>
<a href="https://twitter.com/faebeee">@Twitter</a><br>
<a href="https://plus.google.com/u/0/113673733496424994581/posts>+Google</a>