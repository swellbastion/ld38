class GameObject {
    position;

    constructor(public rotation, public outwardDistance) {
        this.setRotation(this.rotation);
    }

    setRotation(rotation) {
        this.rotation = rotation;
        this.setPostionFromRotation();
    }

    setPostionFromRotation() {
        const x = game.width / 2,
              y = game.planetTop.y - this.outwardDistance,
              centerX = game.width / 2,
              centerY = game.height / 2;
        this.position = {
            x: Math.cos(this.rotation) * (x - centerX) - Math.sin(this.rotation) * (y - centerY) + centerX,
            y: Math.sin(this.rotation) * (x - centerX) + Math.cos(this.rotation) * (y - centerY) + centerY
        };
    }
}
