const playState = {

    preload() {
        this.load.image('player', 'images/player.png');
        this.load.image('planet', 'images/planet.png');
        this.load.image('block', 'images/block.png');
    },

    create() {
        this.add.sprite(game.width / 2, game.height / 2, 'planet').anchor.setTo(.5, .5);
        game.player = new Player;
        game.loadLevel(0);
        game.controls = new Controls;
    },

    update() {
        game.physicsWorld.step(1/60);
        game.player.update();
        for (const block of game.levelObjects.blocks) block.update();
    }
};