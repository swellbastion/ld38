const playState = {
    preload() {
        this.load.image('player', 'images/player.png');
        this.load.image('planet', 'images/planet.png');
    },
    create() {
        this.add.sprite(game.width / 2, game.height / 2, 'planet').anchor.setTo(.5, .5);
        this.add.sprite(game.width / 2, game.height / 2 - 166, 'player').anchor.setTo(.5, .5);
    }
};