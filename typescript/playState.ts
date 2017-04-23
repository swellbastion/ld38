const playState = {

    preload() {
        this.load.image('player', 'images/player.png');
        this.load.image('planet', 'images/planet.png');
        this.load.image('block', 'images/block.png');
        this.load.image('nextLevelTrigger', 'images/next-level.png');
    },

    create() {
        this.add.sprite(game.width / 2, game.height / 2, 'planet').anchor.setTo(.5, .5);
        game.player = new Player;

        const planetSurfaceBody = new p2.Body({position: [game.width / 2 - 1, game.planetTop.y + 4]})
        planetSurfaceBody.addShape(new p2.Box({width: 2, height: 8}))
        game.physicsWorld.addBody(planetSurfaceBody);

        game.loadLevel(0);
        game.controls = new Controls;
    },

    update() {
        game.physicsWorld.step(1/60);
        game.player.update();
        for (const block of game.levelObjects.blocks) block.update();
        for (const trigger of game.levelObjects.nextLevelTriggers) trigger.update();
    }
};