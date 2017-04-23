class Game {
    width = 640;
    height = 640;
    planetRadius = 150;
    planetTop = {x: this.width / 2, y: this.height / 2 - this.planetRadius};
    phaser = new Phaser.Game(this.width, this.height);
    physicsWorld = new p2.World({gravity: [0, 1000]});
    levelObjects = {blocks: [], spikes: []};
    player;
    controls;
    currentLevel;

    constructor() {
        this.phaser.state.add('startScreen', startScreenState);
        this.phaser.state.add('play', playState);
        this.phaser.state.start('startScreen');
    }

    loadLevel(number) {
        for (const group in this.levelObjects) this.levelObjects[group] = [];
        for (const blockData of levels[number].blocks) 
            this.levelObjects.blocks.push(
                new Block(
                    blockData[0] * Math.PI / 180,
                    blockData[1], 
                    blockData[2]
                )
            );
    }
}

const game = new Game;