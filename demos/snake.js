import {
    Stage,
    Layer,
    Node,
    randomColor
} from './download/jtopo-1.4.6_trial-esm-min.js';

var stage = new Stage('divId');
var layer = new Layer();
stage.addChild(layer);

var mapNode;
var appleNode;
var snakeNodes = [];

// 地图小格子尺寸
var size = 20;

// 地图尺寸
var map = {
    rows: 20,
    cols: 20,
    width: 20 * size,
    height: 20 * size
};

// 移动增量
var move = {
    dx: size,
    dy: 0
};

function initMap() {
    mapNode = new Node('点击开始', 50, 50, size * map.cols, size * map.rows);
    mapNode.css({
        strokeStyle: 'black',
        textPosition: 'ct',
        textAlign: 'center',
        textBaseline: 'bottom',
        font: 'bold 14px arial'
    });

    appleNode = new Node('', 0, 0, size, size);
    appleNode.css('background', 'red');

    appleNode.draggable = false;

    layer.addChild(mapNode);
    mapNode.addChild(appleNode);

    for (var i = 0; i < 5; i++) {
        var bodyNode = newBodyNode();

        if (i == 0) {
            bodyNode.css('background', '#009A93');
        }
    }
}

function initSnake() {
    for (var i = 0; i < snakeNodes.length; i++) {
        var node = snakeNodes[i];
        node.x = (snakeNodes.length - i) * size;
        node.y = 0;
    }
}


function newBodyNode() {
    var bodyNode = new Node();
    bodyNode.draggable = false;
    bodyNode.css({
        'background': randomColor()
    });
    bodyNode.resizeTo(size, size);
    snakeNodes.push(bodyNode);
    mapNode.addChild(bodyNode);
    return bodyNode;
}

var tailXY;

function growup() {
    var newTail = newBodyNode();
    newTail.resizeTo(size, size);
    newTail.x = tailXY.x;
    newTail.y = tailXY.y;
}

function forward() {
    var length = snakeNodes.length;
    // 记录尾巴坐标
    tailXY = {
        x: snakeNodes[length - 1].x,
        y: snakeNodes[length - 1].y,
    };
    for (var i = length - 1; i > 0; i--) {
        snakeNodes[i].x = snakeNodes[i - 1].x;
        snakeNodes[i].y = snakeNodes[i - 1].y;
    }
    snakeNodes[0].x += move.dx;
    snakeNodes[0].y += move.dy;
}

function hasTouchApple() {
    return (snakeNodes[0].x == appleNode.x && snakeNodes[0].y == appleNode.y);
}

function randomApple() {
    appleNode.x = Math.floor(Math.random() * map.cols) * size;
    appleNode.y = Math.floor(Math.random() * map.rows) * size;

    var head = snakeNodes[0];
    var isTouchHead = appleNode.x == head.x && appleNode.y == head.y;
    while (isTouchHead || isTouchBody(appleNode)) {
        appleNode.x = Math.floor(Math.random() * map.cols) * size;
        appleNode.y = Math.floor(Math.random() * map.rows) * size;
    }
}

function isDead() {
    if (snakeNodes[0].x < 0 || snakeNodes[0].x + 1 > map.width) {
        return true;
    }
    if (snakeNodes[0].y < 0 || snakeNodes[0].y + 1 > map.height) {
        return true;
    }
    return isTouchBody(snakeNodes[0]);
}

function isTouchBody(p) {
    for (var i = 1; i < snakeNodes.length; i++) {
        var e = snakeNodes[i];
        if (p.x == e.x && p.y == e.y) {
            return true;
        }
    }
    return false;
}

function initKeyboard() {
    document.addEventListener('keydown', function (event) {
        event.preventDefault();

        var code = event.code;
        if (code == 'ArrowDown' && move.dy != -size) {
            move.dx = 0;
            move.dy = size;
        } else if (code == 'ArrowLeft' && move.dx != size) {
            move.dx = -size;
            move.dy = 0;
        } else if (code == 'ArrowUp' && move.dy != size) {
            move.dx = 0;
            move.dy = -size;
        } else if (code == 'ArrowRight' && move.dx != -size) {
            move.dx = size;
            move.dy = 0;
        }
    });
}

var timer = null;

function gameOver() {
    move = {
        dx: size,
        dy: 0
    };
    window.clearInterval(timer);
    mapNode.text = '游戏结束';
}

initKeyboard();
initMap();

initSnake();

mapNode.on('click', function () {
    if (mapNode.text == '点击开始' || mapNode.text == '游戏结束') {
        start();
    }
});

function start() {
    mapNode.text = '键盘方向键控制';

    initSnake();
    randomApple();

    timer = setInterval(function () {
        forward();

        if (hasTouchApple()) {
            growup();
            randomApple();
        }

        if (isDead()) {
            gameOver();
        }

        layer.update();

    }, 300); // 速度
}

stage.translateToCenter();
stage.show();