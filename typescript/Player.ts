class Player extends GameObject {
    sprite;
    body;

    constructor() {
        super();

        const height = 32;
        const width = 32;

        this.body = new p2.Body({
            mass: 5, 
            position: [game.planetTop.x, game.planetTop.y - height / 2]
        });
        this.sprite = game.phaser.add.sprite(this.body.position.x, this.body.position.y, 'player');
        this.sprite.anchor.set(.5, .5);
        this.body.addShape(new p2.Box({width: width, height: height}))
        game.physicsWorld.addBody(this.body);
    }

    update() {
        const lowestAllowedYPosition = game.planetTop.y - this.body.shapes[0].height / 2;
        if (this.body.position[1] > lowestAllowedYPosition) 
            this.body.position[1] = lowestAllowedYPosition;
        this.sprite.position = this.positionFromPhysics();
    }

    jump() {
        this.body.applyForce([0, -100000]);
    }
}