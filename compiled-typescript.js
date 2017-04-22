var playState = {
    preload: function () {
        this.load.image('player', 'images/player.png');
        this.load.image('planet', 'images/planet.png');
    },
    create: function () {
        this.add.sprite(game.width / 2, game.height / 2, 'planet').anchor.setTo(.5, .5);
        this.add.sprite(game.width / 2, game.height / 2 - 166, 'player').anchor.setTo(.5, .5);
    }
};
var Game = (function () {
    function Game() {
        this.width = 640;
        this.height = 640;
        this.phaser = new Phaser.Game(this.width, this.height);
        this.phaser.state.add('startScreen', {
            create: function () {
                var _this = this;
                this.add.text(0, 0, 'press any key to start', { fill: 'white' });
                this.input.keyboard.onDownCallback = function () {
                    _this.input.keyboard.onDownCallback = null;
                    _this.state.start('play');
                };
            }
        });
        this.phaser.state.add('play', playState);
        this.phaser.state.start('startScreen');
    }
    return Game;
}());
var game = new Game;
