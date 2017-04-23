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
            [280, 0, 64],
            [50, 32, 32]
        ],
        nextLevelTriggers: [
            [200, 0]
        ]
    },
    {
        blocks: [
            [50, 32, 32]
        ],
        nextLevelTriggers: [
            [200, 0]
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
        this.load.image('nextLevelTrigger', 'images/next-level.png');
    },
    create: function () {
        this.add.sprite(game.width / 2, game.height / 2, 'planet').anchor.setTo(.5, .5);
        game.player = new Player;
        var planetSurfaceBody = new p2.Body({ position: [game.width / 2 - 1, game.planetTop.y + 4] });
        planetSurfaceBody.addShape(new p2.Box({ width: 2, height: 8 }));
        game.physicsWorld.addBody(planetSurfaceBody);
        game.loadLevel(0);
        game.controls = new Controls;
    },
    update: function () {
        game.physicsWorld.step(1 / 60);
        game.player.update();
        for (var _i = 0, _a = game.levelObjects.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            block.update();
        }
        for (var _b = 0, _c = game.levelObjects.nextLevelTriggers; _b < _c.length; _b++) {
            var trigger = _c[_b];
            trigger.update();
        }
    }
};
var GameObject = (function () {
    function GameObject() {
    }
    GameObject.prototype.positionObjectToArray = function () {
        return [this.position.x, this.position.y];
    };
    GameObject.prototype.positionFromPhysics = function () {
        return { x: this.body.position[0], y: this.body.position[1] };
    };
    return GameObject;
}());
var Orbital = (function () {
    function Orbital(rotation, outwardDistance) {
        this.outwardDistance = outwardDistance;
        this.body = { position: [], angle: 0 };
        this.setRotation(rotation);
    }
    Orbital.prototype.setRotation = function (rotation) {
        this.body.angle = rotation;
        this.setPostionFromRotation();
    };
    Orbital.prototype.setPostionFromRotation = function () {
        var x = game.width / 2, y = game.planetTop.y - this.outwardDistance, centerX = game.width / 2, centerY = game.height / 2;
        this.body.position = [
            Math.cos(this.body.angle) * (x - centerX) - Math.sin(this.body.angle) * (y - centerY) + centerX,
            Math.sin(this.body.angle) * (x - centerX) + Math.cos(this.body.angle) * (y - centerY) + centerY
        ];
    };
    Orbital.prototype.destroy = function () {
        game.physicsWorld.removeBody(this.body);
        this.sprite.destroy();
    };
    return Orbital;
}());
var Game = (function () {
    function Game() {
        this.width = 640;
        this.height = 640;
        this.planetRadius = 150;
        this.planetTop = { x: this.width / 2, y: this.height / 2 - this.planetRadius };
        this.phaser = new Phaser.Game(this.width, this.height);
        this.physicsWorld = new p2.World({ gravity: [0, 1000] });
        this.levelObjects = { blocks: [], nextLevelTriggers: [] };
        this.phaser.state.add('startScreen', startScreenState);
        this.phaser.state.add('play', playState);
        this.phaser.state.start('startScreen');
    }
    Game.prototype.loadLevel = function (number) {
        this.currentLevelNumber = number;
        for (var group in this.levelObjects) {
            for (var _i = 0, _a = this.levelObjects[group]; _i < _a.length; _i++) {
                var object = _a[_i];
                object.destroy();
            }
            this.levelObjects[group] = [];
        }
        for (var _b = 0, _c = levels[number].blocks; _b < _c.length; _b++) {
            var blockData = _c[_b];
            this.levelObjects.blocks.push(new Block(blockData[0] * Math.PI / 180, blockData[1], blockData[2]));
        }
        for (var _d = 0, _e = levels[number].nextLevelTriggers; _d < _e.length; _d++) {
            var trigger = _e[_d];
            this.levelObjects.nextLevelTriggers.push(new NextLevelTrigger(trigger[0], trigger[1]));
        }
    };
    Game.prototype.loadNextLevel = function () {
        this.loadLevel(this.currentLevelNumber + 1);
    };
    return Game;
}());
var game = new Game;
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(rotation, outwardDistance, width) {
        var _this = _super.call(this, rotation, outwardDistance + 8) || this;
        var height = 16;
        _this.body = new p2.Body({ position: [_this.body.position[0], _this.body.position[1]] });
        _this.body.addShape(new p2.Box({ width: width, height: height }));
        _this.body.angle = rotation;
        game.physicsWorld.addBody(_this.body);
        _this.sprite = game.phaser.add.sprite(_this.body.position[0], _this.body.position[1], 'block');
        _this.sprite.width = _this.body.shapes[0].width;
        _this.sprite.rotation = rotation;
        _this.sprite.anchor.set(.5, .5);
        return _this;
    }
    Block.prototype.update = function () {
        this.setRotation(this.body.angle + .01);
        this.sprite.position = { x: this.body.position[0], y: this.body.position[1] };
        this.sprite.rotation = this.body.angle;
    };
    return Block;
}(Orbital));
var Controls = (function () {
    function Controls() {
        var spacebar = game.phaser.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar.onDown.add(game.player.jump, game.player);
    }
    return Controls;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        var height = 32;
        var width = 32;
        _this.body = new p2.Body({
            mass: 5,
            position: [game.planetTop.x, game.planetTop.y - height / 2],
            fixedX: true,
            fixedRotation: true
        });
        _this.sprite = game.phaser.add.sprite(_this.body.position.x, _this.body.position.y, 'player');
        _this.sprite.anchor.set(.5, .5);
        _this.body.addShape(new p2.Box({ width: width, height: height }));
        game.physicsWorld.addBody(_this.body);
        return _this;
    }
    Player.prototype.update = function () {
        this.sprite.position = this.positionFromPhysics();
    };
    Player.prototype.jump = function () {
        this.body.applyImpulse([0, -2000]);
    };
    return Player;
}(GameObject));
var NextLevelTrigger = (function (_super) {
    __extends(NextLevelTrigger, _super);
    function NextLevelTrigger(rotation, outwardDistance) {
        var _this = _super.call(this, rotation, outwardDistance + 16) || this;
        var width = 32;
        var height = 32;
        _this.body = new p2.Body({
            position: [_this.body.position[0], _this.body.position[1]],
            collisionResponse: false
        });
        _this.body.addShape(new p2.Box({ width: width, height: height }));
        _this.body.angle = rotation;
        game.physicsWorld.addBody(_this.body);
        _this.sprite = game.phaser.add.sprite(_this.body.position[0], _this.body.position[1], 'nextLevelTrigger');
        _this.sprite.rotation = rotation;
        _this.sprite.anchor.set(.5, .5);
        return _this;
    }
    NextLevelTrigger.prototype.update = function () {
        this.setRotation(this.body.angle + .01);
        this.sprite.position = { x: this.body.position[0], y: this.body.position[1] };
        this.sprite.rotation = this.body.angle;
        if (this.body.overlaps(game.player.body))
            game.loadNextLevel();
    };
    return NextLevelTrigger;
}(Orbital));
