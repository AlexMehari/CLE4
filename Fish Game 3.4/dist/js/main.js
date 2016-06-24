var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(l, x, y, width, height, tagName) {
        this.direction = 1;
        this.level = l;
        this.div = document.createElement(tagName);
        this.level.div.appendChild(this.div);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    GameObject.prototype.getBounds = function () {
        return new Rectangle(this.x, this.y, this.width, this.height);
    };
    GameObject.prototype.setDirection = function (direction) {
        this.direction = direction;
    };
    GameObject.prototype.getDirection = function () {
        return this.direction;
    };
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(" + this.direction + ")";
    };
    GameObject.prototype.drawreverse = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(-1)";
    };
    GameObject.prototype.playSound = function (type) {
        switch (type) {
            case "smallfish":
                var sound = new Howl({ urls: ['js/howler.js-master/smallfish.mp3'] }).play();
                break;
            case "bigfish":
                var sound = new Howl({
                    urls: ['js/howler.js-master/bigfish.mp3'],
                    volume: 0.15
                }).play();
                break;
            case "thunder":
                var sound = new Howl({ urls: ['js/howler.js-master/thunder.mp3'] }).play();
                break;
            case "clock":
                var sound = new Howl({ urls: ['js/howler.js-master/clock.mp3'] }).play();
                break;
            case "coin":
                var sound = new Howl({ urls: ['js/howler.js-master/coin.mp3'] }).play();
                break;
            case "coinsmall":
                var sound = new Howl({ urls: ['js/howler.js-master/coinsmall.mp3'] }).play();
                break;
            case "star":
                var sound = new Howl({ urls: ['js/howler.js-master/star.mp3'] }).play();
                break;
            default:
                break;
        }
    };
    return GameObject;
}());
var BigFish = (function (_super) {
    __extends(BigFish, _super);
    function BigFish(l, x, y, width, height, tagName, fishNumber) {
        _super.call(this, l, x, y, width, height, tagName);
        this.speed = 1;
        this.multiplier = (5 * Math.random()) + 5;
        if (fishNumber % 2 == 0) {
            this.randomDirection = 1;
        }
        else {
            this.randomDirection = 0;
        }
    }
    BigFish.prototype.update = function () {
        if (this.randomDirection < 0.5) {
            this.x -= this.multiplier * this.speed;
            if (this.speed < 0.25)
                this.speed += 0.001;
            else if (this.speed < 1)
                this.speed += 0.1;
            if (this.x < 0 - this.width) {
                this.randomDirection = 1;
                this.y = (innerHeight - this.height) * Math.random();
                this.multiplier = (5 * Math.random()) + 5;
            }
        }
        else {
            this.x += this.multiplier * this.speed;
            if (this.speed < 0.25)
                this.speed += 0.001;
            else if (this.speed < 1)
                this.speed += 0.1;
            if (this.x > innerWidth) {
                this.randomDirection = 0;
                this.y = (innerHeight - this.height) * Math.random();
                this.multiplier = (5 * Math.random()) + 5;
            }
        }
    };
    BigFish.prototype.getDirection = function () {
        return this.randomDirection;
    };
    BigFish.prototype.slowDown = function () {
        this.speed = 0;
    };
    return BigFish;
}(GameObject));
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(l, x, y, width, height, tagName) {
        _super.call(this, l, x, y, width, height, tagName);
        this.type = tagName;
    }
    Box.prototype.update = function (multiplier) {
        this.y += 2.5;
        this.multiplier = multiplier;
        var counter = 2500 * Math.random() + 2500;
        if (this.y > counter) {
            var randomizerX = Math.random();
            this.x = (innerWidth) * randomizerX;
            var randomizerY = (-innerHeight * Math.random() * this.multiplier) - innerHeight;
            this.y = randomizerY;
        }
    };
    Box.prototype.getBoxType = function () {
        return this.type;
    };
    Box.prototype.eaten = function () {
        var randomizerX = Math.random();
        this.x = innerWidth * randomizerX;
        var randomizerY = (-innerHeight * Math.random() * this.multiplier) - innerHeight;
        this.y = randomizerY * this.multiplier;
    };
    return Box;
}(GameObject));
var SmallFish = (function (_super) {
    __extends(SmallFish, _super);
    function SmallFish(l, x, y, width, height, tagName, randomDirection, boost) {
        _super.call(this, l, x, y, width, height, tagName);
        this.multiplier = (5 * Math.random()) + 2.5;
        this.speed = 1;
        this.fishIsBoost = 0;
        this.randomDirection = randomDirection;
        this.boost = boost;
        this.show = boost;
    }
    SmallFish.prototype.update = function () {
        if (this.boost) {
            if ((!this.x && !this.y) || !this.y && this.show) {
                var randomizerX = Math.random();
                var randomizerY = Math.random();
                if (!this.y && this.show) {
                    this.speed = 1;
                }
                if (randomizerX < 0.5) {
                    this.x = innerWidth + this.width;
                    this.randomDirection = 0;
                }
                else {
                    this.x = 0 - this.width;
                    this.randomDirection = 1;
                }
                this.y = (innerHeight - this.height) * randomizerY;
                this.multiplier = (5 * Math.random()) + 2.5;
            }
            if (this.randomDirection < 0.5) {
                this.x -= this.multiplier * this.speed;
                if (this.speed < 0.25)
                    this.speed += 0.001;
                else if (this.speed < 1)
                    this.speed += 0.1;
                if (this.x < 0 - this.width) {
                    this.x = innerWidth + this.width;
                    this.y = (innerHeight - this.height) * Math.random();
                    this.multiplier = (5 * Math.random()) + 2.5;
                }
            }
            else {
                this.x += this.multiplier * this.speed;
                if (this.speed < 0.25)
                    this.speed += 0.001;
                else if (this.speed < 1)
                    this.speed += 0.1;
                if (this.x > innerWidth) {
                    this.x = 0 - this.width;
                    this.y = (innerHeight - this.height) * Math.random();
                    this.multiplier = (5 * Math.random()) + 2.5;
                }
            }
        }
        else {
            this.x = 0 - this.width;
            this.y = 0;
            this.show = true;
        }
    };
    SmallFish.prototype.getDirection = function () {
        return this.randomDirection;
    };
    SmallFish.prototype.getBoost = function () {
        return this.boost;
    };
    SmallFish.prototype.getFishIsBoost = function () {
        return this.fishIsBoost;
    };
    SmallFish.prototype.setBoost = function (boost, type) {
        this.boost = boost;
        this.fishIsBoost = type;
    };
    SmallFish.prototype.eaten = function () {
        this.x = 0;
        this.y = 0;
    };
    SmallFish.prototype.slowDown = function () {
        this.speed = 0;
    };
    return SmallFish;
}(GameObject));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(l, x, y, width, height, tagName, player) {
        _super.call(this, l, x, y, width, height, tagName);
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.speed = 1;
        this.gp = false;
        this.randomDirection = Math.random();
        if (player == 1) {
            this.upKey = 87;
            this.downKey = 83;
            this.leftKey = 65;
            this.rightKey = 68;
        }
        else {
            this.upKey = 38;
            this.downKey = 40;
            this.leftKey = 37;
            this.rightKey = 39;
        }
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        this.player = player;
    }
    Player.prototype.checkGamepad = function (player) {
        var gp = navigator.getGamepads()[player];
        if (gp) {
            this.gp = true;
            var axeLF = gp.axes[0];
            var axeLF2 = gp.axes[1];
            if (axeLF < -0.5) {
                this.inputLeft = true;
                this.inputRight = false;
            }
            else if (axeLF > 0.5) {
                this.inputLeft = false;
                this.inputRight = true;
            }
            else {
                this.inputLeft = false;
                this.inputRight = false;
            }
            if (axeLF2 < -0.5) {
                this.inputDown = true;
                this.inputUp = false;
            }
            else if (axeLF2 > 0.5) {
                this.inputDown = false;
                this.inputUp = true;
            }
            else {
                this.inputDown = false;
                this.inputUp = false;
            }
        }
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.upKey:
                this.upSpeed = 7.5;
                break;
            case this.downKey:
                this.downSpeed = -7.5;
                break;
            case this.leftKey:
                this.leftSpeed = -10;
                this.setDirection(-1);
                break;
            case this.rightKey:
                this.rightSpeed = 10;
                this.setDirection(1);
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.upKey:
                this.upSpeed = 0;
                break;
            case this.downKey:
                this.downSpeed = 0;
                break;
            case this.leftKey:
                this.leftSpeed = 0;
                break;
            case this.rightKey:
                this.rightSpeed = 0;
                break;
        }
    };
    Player.prototype.update = function () {
        if (this.player === 1) {
            this.checkGamepad(0);
        }
        else if (this.player === 2) {
            this.checkGamepad(1);
        }
        if (this.gp) {
            if (this.inputLeft) {
                if (this.x + this.leftSpeed <= 0) {
                    this.leftSpeed = 0;
                    this.x = 0;
                }
                else {
                    this.leftSpeed = -10;
                }
                this.setDirection(-1);
            }
            else {
                this.leftSpeed = 0;
            }
            if (this.inputRight) {
                if (this.x + this.rightSpeed >= innerWidth - this.width) {
                    this.rightSpeed = 0;
                    this.x = innerWidth - this.width;
                }
                else {
                    this.rightSpeed = 10;
                }
                this.setDirection(1);
            }
            else {
                this.rightSpeed = 0;
            }
            if (this.inputDown) {
                if (this.y + this.downSpeed <= 10) {
                    this.downSpeed = 0;
                    this.y = 0;
                }
                else {
                    this.downSpeed = 7.5;
                }
            }
            else {
                this.downSpeed = 0;
            }
            if (this.inputUp) {
                if (this.y + this.upSpeed >= innerHeight - this.height) {
                    this.upSpeed = 0;
                    this.y = innerHeight - this.height;
                }
                else {
                    this.upSpeed = -7.5;
                }
            }
            else {
                this.upSpeed = 0;
            }
        }
        if (!this.gp) {
            if (this.x + this.leftSpeed <= 0) {
                this.leftSpeed = 0;
            }
            else if (this.x + this.rightSpeed >= innerWidth - this.width) {
                this.rightSpeed = 0;
            }
            else if (this.y + this.upSpeed <= 0) {
                this.upSpeed = 0;
            }
            else if (this.y + this.downSpeed >= innerHeight - this.height) {
                this.downSpeed = 0;
            }
        }
        this.x += (this.leftSpeed + this.rightSpeed) * this.speed;
        this.y -= (this.upSpeed + this.downSpeed) * this.speed;
        if (this.speed > 1.25)
            this.speed -= 0.001;
        else if (this.speed > 1)
            this.speed -= 0.1;
        else if (this.speed < 0.75)
            this.speed += 0.001;
        else if (this.speed < 1)
            this.speed += 0.1;
    };
    Player.prototype.speedUp = function () {
        this.speed = 1.5;
    };
    Player.prototype.slowDown = function () {
        this.speed = 0.5;
    };
    Player.prototype.getPlayer = function () {
        return this.player;
    };
    Player.prototype.autoSwim = function (winner) {
        var multiplier;
        if (winner) {
            multiplier = 1;
        }
        else {
            multiplier = 0.25;
        }
        if (this.randomDirection < 0.5) {
            this.x -= 10 * multiplier;
            this.direction = -1;
            if (this.x < 0 - this.width) {
                this.randomDirection = 1;
                if (winner) {
                    this.y = (innerHeight - this.height) / 2 * Math.random();
                }
                else {
                    this.y = (innerHeight - this.height) / 2 + ((innerHeight - this.height) / 2 * Math.random());
                }
            }
        }
        else {
            this.x += 10 * multiplier;
            this.direction = 1;
            if (this.x > innerWidth) {
                this.randomDirection = 0;
                if (winner) {
                    this.y = (innerHeight - this.height) / 2 * Math.random();
                }
                else {
                    this.y = (innerHeight - this.height) / 2 + ((innerHeight - this.height) / 2 * Math.random());
                }
            }
        }
    };
    return Player;
}(GameObject));
var Level = (function () {
    function Level(g) {
        this.gameOver = false;
        this.game = g;
        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        this.height = innerHeight;
        this.width = innerWidth;
        this.div.style.height = this.height + "px";
        this.div.style.width = this.width + "px";
        this.display = new ScoreDisplay(this);
        this.playSong(this.gameOver);
        this.smallFishes = new Array();
        for (var i = 1; i <= 15; i++) {
            var randomizerX = Math.random();
            var randomizerY = Math.random();
            var width = 132;
            var height = 100;
            var x = (innerWidth - width) * randomizerX;
            var y = innerHeight / 2 * randomizerY;
            var boost = void 0;
            if (i <= 10) {
                boost = false;
            }
            else {
                boost = true;
            }
            this.smallFishes.push(new SmallFish(this, x, y, width, height, "smallfish", randomizerX, boost));
        }
        this.bigFishes = new Array();
        for (var i = 1; i <= 2; i++) {
            var randomizerX = Math.random();
            var randomizerY = Math.random();
            var width = 468;
            var height = 102;
            var x = (innerWidth - width) * randomizerX;
            var y = innerHeight / 2 * randomizerY;
            this.bigFishes.push(new BigFish(this, x, y, width, height, "bigfish", i));
        }
        this.boxes = new Array();
        for (var i = 1; i <= 5; i++) {
            var multiplier = void 0;
            var type = void 0;
            var width = void 0;
            var height = void 0;
            switch (i) {
                case 1:
                    type = "star";
                    width = 96;
                    height = 96;
                    multiplier = 5;
                    break;
                case 2:
                    type = "coin";
                    width = 100;
                    height = 100;
                    multiplier = 3;
                    break;
                case 3:
                    type = "coinsmall";
                    width = 50;
                    height = 50;
                    multiplier = 1;
                    break;
                case 4:
                    type = "clock";
                    width = 100;
                    height = 100;
                    multiplier = 3;
                    break;
                case 5:
                    type = "thunder";
                    width = 45;
                    height = 100;
                    multiplier = 3;
                    break;
                default:
                    break;
            }
            var randomX = innerWidth * Math.random();
            var randomY = (-innerHeight * Math.random() * multiplier) - innerHeight;
            this.boxes.push(new Box(this, randomX, randomY, width, height, type));
        }
        var bottomY = innerHeight - 185;
        var leftX = innerWidth / 4;
        var rightX = innerWidth / 4 * 3;
        this.player = new Player(this, leftX, bottomY, 352, 125, "playerfish", 1);
        this.player2 = new Player(this, rightX, bottomY, 352, 125, "playerfish2", 2);
    }
    Level.prototype.update = function () {
        if (!this.gameOver) {
            this.player.update();
            this.player2.update();
        }
        else {
            switch (this.winner) {
                case 1:
                    this.player.autoSwim(true);
                    this.player2.autoSwim(false);
                    break;
                case 2:
                    this.player.autoSwim(false);
                    this.player2.autoSwim(true);
                    break;
                default:
                    break;
            }
        }
        var playerBounds = this.player.getBounds();
        var player2Bounds = this.player2.getBounds();
        for (var _i = 0, _a = this.smallFishes; _i < _a.length; _i++) {
            var fish = _a[_i];
            if (!this.gameOver) {
                var smallFishBounds = fish.getBounds();
                var hitSmallFish = playerBounds.hitsSmallFish(smallFishBounds);
                var hitSmallFish2 = player2Bounds.hitsSmallFish(smallFishBounds);
                if (hitSmallFish || hitSmallFish2) {
                    if (hitSmallFish) {
                        this.display.updateScores(10, 1);
                    }
                    else {
                        this.display.updateScores(10, 2);
                    }
                    fish.eaten();
                    fish.playSound("smallfish");
                    var boost = fish.getBoost();
                    var fishIsBoost = fish.getFishIsBoost();
                    if (boost && fishIsBoost) {
                        fish.setBoost(false, 1);
                    }
                }
            }
            fish.update();
        }
        for (var _b = 0, _c = this.bigFishes; _b < _c.length; _b++) {
            var fish = _c[_b];
            if (!this.gameOver) {
                var bigFishBounds = fish.getBounds();
                var hitBigFish = playerBounds.hitsBigFish(bigFishBounds);
                var hitBigFish2 = player2Bounds.hitsBigFish(bigFishBounds);
                if (hitBigFish || hitBigFish2) {
                    if (hitBigFish) {
                        this.display.updateScores(-1, 1);
                    }
                    else {
                        this.display.updateScores(-1, 2);
                    }
                    fish.playSound("bigfish");
                }
            }
            fish.update();
        }
        for (var _d = 0, _e = this.boxes; _d < _e.length; _d++) {
            var box = _e[_d];
            var type = box.getBoxType();
            if (!this.gameOver) {
                var boxBounds = box.getBounds();
                var hitBox = playerBounds.hitsBox(boxBounds);
                var hitBox2 = player2Bounds.hitsBox(boxBounds);
                if (hitBox || hitBox2) {
                    switch (type) {
                        case "clock":
                            box.eaten();
                            box.playSound("clock");
                            for (var _f = 0, _g = this.bigFishes; _f < _g.length; _f++) {
                                var fish = _g[_f];
                                fish.slowDown();
                            }
                            for (var _h = 0, _j = this.smallFishes; _h < _j.length; _h++) {
                                var fish = _j[_h];
                                fish.slowDown();
                            }
                            if (hitBox) {
                                this.player.speedUp();
                                this.player2.slowDown();
                            }
                            else {
                                this.player2.speedUp();
                                this.player.slowDown();
                            }
                            break;
                        case "coin":
                            box.eaten();
                            box.playSound("coin");
                            if (hitBox) {
                                this.display.updateScores(100, 1);
                            }
                            else {
                                this.display.updateScores(100, 2);
                            }
                            break;
                        case "coinsmall":
                            box.eaten();
                            box.playSound("coinsmall");
                            if (hitBox) {
                                this.display.updateScores(50, 1);
                            }
                            else {
                                this.display.updateScores(50, 2);
                            }
                            break;
                        case "star":
                            box.eaten();
                            box.playSound("star");
                            for (var _k = 0, _l = this.smallFishes; _k < _l.length; _k++) {
                                var fish = _l[_k];
                                var boost = fish.getBoost();
                                if (!boost) {
                                    fish.setBoost(true, 1);
                                }
                            }
                            break;
                        case "thunder":
                            box.eaten();
                            box.playSound("thunder");
                            for (var _m = 0, _o = this.smallFishes; _m < _o.length; _m++) {
                                var fish = _o[_m];
                                fish.eaten();
                                if (hitBox) {
                                    this.display.updateScores(5, 1);
                                }
                                else {
                                    this.display.updateScores(5, 2);
                                }
                                var boost = fish.getBoost();
                                var fishIsBoost = fish.getFishIsBoost();
                                if (boost && fishIsBoost) {
                                    fish.setBoost(false, 1);
                                    if (hitBox) {
                                        this.display.updateScores(5, 1);
                                    }
                                    else {
                                        this.display.updateScores(5, 2);
                                    }
                                }
                            }
                    }
                }
            }
            switch (type) {
                case "clock":
                    box.update(3);
                    break;
                case "coin":
                    box.update(3);
                    break;
                case "coinsmall":
                    box.update(1);
                    break;
                case "star":
                    box.update(5);
                    break;
                case "thunder":
                    box.update(3);
            }
        }
    };
    Level.prototype.draw = function () {
        for (var _i = 0, _a = this.smallFishes; _i < _a.length; _i++) {
            var fish = _a[_i];
            var direction = fish.getDirection();
            if (direction < 0.5) {
                fish.drawreverse();
            }
            else {
                fish.draw();
            }
        }
        for (var _b = 0, _c = this.bigFishes; _b < _c.length; _b++) {
            var fish = _c[_b];
            var direction = fish.getDirection();
            if (direction < 0.5) {
                fish.drawreverse();
            }
            else {
                fish.draw();
            }
        }
        for (var _d = 0, _e = this.boxes; _d < _e.length; _d++) {
            var box = _e[_d];
            box.draw();
        }
        this.player.draw();
        this.player2.draw();
    };
    Level.prototype.setGameOver = function (gameOver, player) {
        this.gameOver = gameOver;
        this.playSong(gameOver);
        this.winner = player;
    };
    Level.prototype.playSong = function (gameOver) {
        if (!gameOver) {
            var sound = new Howl({
                urls: ['js/howler.js-master/background.mp3'],
                loop: true,
            }).play();
        }
        else {
            var sound = new Howl({
                urls: ['js/howler.js-master/gameover.mp3'],
                volume: 1
            }).play();
        }
    };
    return Level;
}());
var Game = (function () {
    function Game() {
        this.level = new Level(this);
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.gameLoop = function () {
        this.level.update();
        this.level.draw();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Rectangle = (function () {
    function Rectangle(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    Rectangle.prototype.hitsBigFish = function (rec1) {
        if ((this.x < rec1.x + rec1.width && this.x + this.width > rec1.x && this.y < rec1.y + rec1.height && this.height + this.y > rec1.y) == true) {
            return true;
        }
        else {
            return false;
        }
    };
    Rectangle.prototype.hitsSmallFish = function (rec1) {
        if ((this.x < rec1.x + rec1.width && this.x + this.width > rec1.x && this.y < rec1.y + rec1.height && this.height + this.y > rec1.y) == true) {
            return true;
        }
        else {
            return false;
        }
    };
    Rectangle.prototype.hitsBox = function (rec1) {
        if ((this.x < rec1.x + rec1.width && this.x + this.width > rec1.x && this.y < rec1.y + rec1.height && this.height + this.y > rec1.y) == true) {
            return true;
        }
        else {
            return false;
        }
    };
    return Rectangle;
}());
var ScoreDisplay = (function () {
    function ScoreDisplay(l) {
        this.score = 0;
        this.s1 = 0;
        this.s2 = 0;
        this.div = document.getElementsByTagName("ui")[0];
        this.div2 = document.getElementsByTagName("ui2")[0];
        this.div3 = document.getElementsByTagName("ui3")[0];
        this.level = l;
        this.div.innerHTML = "0";
        this.div2.innerHTML = "0";
    }
    ScoreDisplay.prototype.updateScores = function (score, player) {
        if (player == 1) {
            this.s1 += score;
            if (this.s1 < 0) {
                this.s1 = 0;
            }
        }
        else {
            this.s2 += score;
            if (this.s2 < 0) {
                this.s2 = 0;
            }
        }
        this.display();
        this.gameOver();
    };
    ScoreDisplay.prototype.getScores = function (player) {
        if (player == 1) {
            return this.s1;
        }
        else {
            return this.s2;
        }
    };
    ScoreDisplay.prototype.display = function () {
        this.div.innerHTML = "" + Math.floor(this.s1);
        this.div2.innerHTML = "" + Math.floor(this.s2);
    };
    ScoreDisplay.prototype.gameOver = function () {
        if (this.s1 >= 1000) {
            this.div3.innerHTML = "Blauw heeft gewonnen!";
            this.level.setGameOver(true, 1);
        }
        else if (this.s2 >= 1000) {
            this.div3.innerHTML = "Groen heeft gewonnen!";
            this.level.setGameOver(true, 2);
        }
    };
    return ScoreDisplay;
}());
//# sourceMappingURL=main.js.map