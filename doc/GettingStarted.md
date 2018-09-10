# Installation

# Example

- [Simple](./example/tutorial01/index.html)

# Steps to create an game

- Create a `cxScene`
- Add all the `cxSystem` to the `cxWorld`
- Create `cxEntities` and add the `cxComponents`
- Add the `cxEntities` to the `cxWorld`
- Start the update loop

## Create a `cxScene`

    class MyScene extends cx.cxScene {
        constructor() {
            super("MainScene");
        }

        // Create everything that is required for this scene to be rendered.
        // Add systems and entities
        load() {
            this.world.addSystem(new MySystem());
            this.createPlayer();
        }

        createPlayer() {
            let player = new cx.cxEntity("Player");
            player.addComponent(new MyComponent('hello'));
            this.world.addEntity(player);
        }
    }

## Create a `cxSystem`

    class MySystem extends cx.cxEntitySystem {
        constructor() {
            super();
            this.components = ['my.component'];
        }

        update(entitiy) {
        }
    }

## Render

    const complex = cx.Complex.getInstance();

    complex.loadScene(new MyScene());

    function render() {
        complex.update();
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
