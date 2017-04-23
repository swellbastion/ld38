class Block extends Orbital {
    sprite;
    body;

    constructor(rotation, outwardDistance, width) {
        super(rotation, outwardDistance + 8);
        const height = 16;

        this.body = new p2.Body({position: [this.position.x, this.position.y]});
        this.body.addShape(new p2.Box({width: width, height: height}));
        this.body.angle = rotation;
        game.physicsWorld.addBody(this.body);
        this.sprite = game.phaser.add.sprite(this.body.position[0], this.body.position[1], 'block');
        this.sprite.width = this.body.shapes[0].width;
        this.sprite.rotation = rotation;
        this.sprite.anchor.set(.5, .5);
    }

    update() {
        
    }
}