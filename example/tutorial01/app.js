// This system we use to handle the canvas stuff. For example in the update method we could call the `clearRect` function
class CanvasSystem extends cx.VoidSystem {
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    update() {
    }
}

// This system will draw all SquareComponents on the screen
class CanvasDrawSystem extends cx.EntitySystem {
    constructor() {
        super();
        // Here we define the required entities. The update method will only be called with the entities that match all required components
        this.components = [SquareComponent];
    }

    // This method os called by the engine, as soon as everything is ready. Here we reference other required systems or managers
    addedToWorld() {
        this.canvaSystem = this.world.getSystem(CanvasSystem);
    }

    update(entity) {
        const components = entity.getComponents(SquareComponent);
        for (let i = 0; i < components.length; i++) {
            const squareComponent = components[i];
            this.canvaSystem.ctx.fillRect(squareComponent.x - squareComponent.width / 2, squareComponent.y - squareComponent.height / 2, squareComponent.width, squareComponent.height);
        }
    }
}

// This system will write the stored mouse position in the manager to all `SquareComponents`
class PositionMapperSystem extends cx.EntitySystem {
    constructor() {
        super();
        this.components = [SquareComponent];
    }

    addedToWorld() {
        this.mouseManager = this.world.getManager(MouseInputManager);
    }

    update(entity) {
        const components = entity.getComponents(SquareComponent);
        for (let i = 0; i < components.length; i++) {
            const squareComponent = components[i];
            squareComponent.x = this.mouseManager.x;
            squareComponent.y = this.mouseManager.y;
        }
    }
}

// This is our component. It stores data. In this case it will store the x/y coordinates as well as the size of the rectangle that will be drawn
class SquareComponent extends cx.Component {
    constructor(width, height) {
        super();
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
    }
}

// This manager will handle the mouse interaction with the canvas.
class MouseInputManager extends cx.Manager {
    constructor(element) {
        super();
        this.x = 0;
        this.y = 0;
        element.addEventListener('mousemove', this.onMouseMoved(this));
        element.addEventListener('mouseover', this.onMouseMoved(this));
    }

    onMouseMoved(self) {
        return (event) => {
            self.x = event.clientX;
            self.y = event.clientY;
        }
    }
}

// This is our main entry point. In a scene we build the world. We attach all required systems to it. Add all managers
// and entities.
class MyScene extends cx.Scene {
    constructor() {
        super("MainScene");
        this.canvas = document.getElementById('canvas');
    }
    // This method is called internally as soon as you call `Complex.loadScene`
    load() {
        this.world.addManager(new MouseInputManager(this.canvas));

        this.world.addSystem(new CanvasSystem(this.canvas));
        this.world.addSystem(new CanvasDrawSystem());
        this.world.addSystem(new PositionMapperSystem());

        this.createPointer();
    }

    createPointer() {
        let pointer = new cx.Entity("Pointer");
        pointer.addComponent(new SquareComponent(5, 5));
        this.world.addEntity(pointer);
    }
}

const complex = cx.Complex.getInstance();

// After the scene has been created we load it
complex.loadScene(new MyScene());

// and start to render it
function render() {
    complex.update();
    requestAnimationFrame(render);
}

requestAnimationFrame(render);
