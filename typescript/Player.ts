class Player extends GameObject {
    height = 32;
    position = {x: game.planetTop.x, y: game.planetTop.y - this.height / 2};
    sprite;
    body = new p2.Body({mass: 5, position: this.positionObjectToArray()});

    constructor() {
        super();
        this.sprite = game.phaser.add.sprite(this.position.x, this.position.y, 'player');
        this.sprite.anchor.set(.5, .5);
        game.physicsWorld.addBody(this.body);
    }

    update() {
        this.sprite.position = this.position = this.positionFromPhysics();
    }
}