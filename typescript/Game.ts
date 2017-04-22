class Game {
    width = 640;
    height = 640;
    phaser = new Phaser.Game(this.width, this.height);
    constructor() {

        this.phaser.state.add('startScreen', {
            create() {
                this.add.text(0, 0, 'press any key to start', {fill: 'white'});
                this.input.keyboard.onDownCallback = () => {
                    this.input.keyboard.onDownCallback = null;
                    this.state.start('play');
                }
            }
        });

        this.phaser.state.add('play', playState)
        this.phaser.state.start('startScreen')
    }
}

const game = new Game;