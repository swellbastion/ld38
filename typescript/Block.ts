class Block extends GameObject {
    sprite;

    constructor(rotation, outwardDistance, public width) {
        super(rotation, outwardDistance);
        this.sprite = game.phaser.add.sprite(this.position.x, this.position.y, 'block');
        this.sprite.anchor.set(.5, .5);
    }

    update() {
        this.setRotation(this.rotation + .1);
        this.sprite.position = this.position;
    }
}