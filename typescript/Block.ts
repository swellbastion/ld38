class Block extends Orbital {
    sprite;
    body;

    constructor(rotation, outwardDistance, width) {
        super(rotation, outwardDistance + 8);
        this.sprite = game.phaser.add.sprite(this.position.x, this.position.y, 'block');
        this.sprite.width = width;
        this.sprite.angle = rotation;
        this.sprite.anchor.set(.5, .5);
    }

    update() {
        
    }
}