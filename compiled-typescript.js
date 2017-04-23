var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var levels = [
    {
        blocks: [
            [Math.PI * 2, 0, 0],
        ]
    }
];
var startScreenState = {
    create: function () {
        var _this = this;
        this.add.text(0, 0, 'press any key to start', { fill: 'white' });
        this.input.keyboard.onDownCallback = function () {
            _this.input.keyboard.onDownCallback = null;
            _this.state.start('play');
        };
    }
};
var playState = {
    preload: function () {
        this.load.image('player', 'images/player.png');
        this.load.image('planet', 'images/planet.png');
        this.load.image('block', 'images/block.png');
    },
    create: function () {
        this.add.sprite(game.width / 2, game.height / 2, 'planet').anchor.setTo(.5, .5);
        this.add.sprite(game.width / 2, game.height / 2 - 166, 'player').anchor.setTo(.5, .5);
        game.loadLevel(0);
    },
    update: function () {
        for (var _i = 0, _a = game.levelObjects.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            block.update();
        }
    }
};
var GameObject = (function () {
    function GameObject(rotation, outwardDistance) {
        this.rotation = rotation;
        this.outwardDistance = outwardDistance;
        this.setRotation(this.rotation);
    }
    GameObject.prototype.setRotation = function (rotation) {
        this.rotation = rotation;
        this.setPostionFromRotation();
    };
    GameObject.prototype.setPostionFromRotation = function () {
        var x = game.width / 2, y = game.planetTop.y - this.outwardDistance, centerX = game.width / 2, centerY = game.height / 2;
        this.position = {
            x: Math.cos(this.rotation) * (x - centerX) - Math.sin(this.rotation) * (y - centerY) + centerX,
            y: Math.sin(this.rotation) * (x - centerX) + Math.cos(this.rotation) * (y - centerY) + centerY
        };
    };
    return GameObject;
}());
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(rotation, outwardDistance, width) {
        var _this = _super.call(this, rotation, outwardDistance) || this;
        _this.width = width;
        _this.sprite = game.phaser.add.sprite(_this.position.x, _this.position.y, 'block');
        _this.sprite.anchor.set(.5, .5);
        return _this;
    }
    Block.prototype.update = function () {
        this.setRotation(this.rotation + .1);
        this.sprite.position = this.position;
    };
    return Block;
}(GameObject));
var Game = (function () {
    function Game() {
        this.width = 640;
        this.height = 640;
        this.planetRadius = 150;
        this.planetTop = { x: this.width / 2, y: this.height / 2 - this.planetRadius };
        this.phaser = new Phaser.Game(this.width, this.height);
        this.levelObjects = { blocks: [], spikes: [] };
        this.phaser.state.add('startScreen', startScreenState);
        this.phaser.state.add('play', playState);
        this.phaser.state.start('startScreen');
    }
    Game.prototype.loadLevel = function (number) {
        for (var group in this.levelObjects)
            this.levelObjects[group] = [];
        for (var _i = 0, _a = levels[number].blocks; _i < _a.length; _i++) {
            var blockData = _a[_i];
            this.levelObjects.blocks.push(new Block(blockData[0], blockData[1], blockData[2]));
        }
    };
    return Game;
}());
var game = new Game;
