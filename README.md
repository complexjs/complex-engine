# ComplexJS

ComplexJS is a JS written Component Entity System for HTML5 Gamedevelopment.
ComplexJS has the ability not to minimize your development time.
With it's Component Entity System there is a high rate of reusable code for your later projects.

## Concept
ComplexJS is a Component Entity System Framework. This means it provides you the functionality to build something bigger. It comes
with a lot of extensions already. Those can be found [here](https://github.com/complexjs).

If there is no extension that works for you, you can easily create your own. Check out the `Module` section of this documentation

## Installation

ComplexJS is a node module available via `npm`

    npm install complex-engine --save

To kickstart your project there is a `yeoman` generator to create a
empty project skeleton.
Therefore you need to install yeoman and the generator

    npm install yeoman -g

and the generator

    npm install generator-complex -g

and you are ready to create your project now

## Setup

To create a new project we can use the yeoman generator to speed up
the setup process.

    yo complex

Follow the instructions.
For more commands provided by the generator check out the
[repo](https://github.com/complexjs/generator-complex)

## Structure

The project is setup in a very easy way

- index.html
- gulpfile.js
- src
    - App.js
    - Scene
    - Components
    - ...
- dist

Check out the [Example Project](https://github.com/faebeee/complex-lab)

### index.html
this is the main html for your application. I here you build your gui,
load the App script style your page and so on...

### gulpfile.js
Here you define your build process to compile your game

### src
This is the folder where all your game related code goes. In here you
put all your new modules code, custom scripts provided by `complex-scripting`, your additional scenes, managers, components, systems and so on.

### src/App.js
This is the main entry point for your game. In here you start
the render loop and load your initial `cxScene`

### src/Scene
Here you store all of your custom scenes. In those scenes you
setup your game. You create/load your entities, add and configure
the used systems

## Module

If there is no module that works for you, you can easily create your own.
Therefore we need again the yeoman generator

    yo complex:module

after following the dialogue you should have your module skeleton.
From there you can implement nearly any library/framework like `Pixi` or `ThreeJS`. When you have an awesome module, let me know and I'll list it in the modulelist.

### complex-modules
- [complex-threejs](https://github.com/complexjs/complex-threejs)
- [complex-stats](https://github.com/complexjs/complex-stats)
- [complex-scripting](https://github.com/complexjs/complex-scripting)
- [complex-physicsjs](https://github.com/complexjs/complex-physicsjs)
- [complex-debug](https://github.com/complexjs/complex-debug)
- [complex-tmx-loader](https://github.com/complexjs/complex-tmx-loader)
- [complex-json-loader](https://github.com/complexjs/complex-json-loader)

### Community modules
Coming soon...
