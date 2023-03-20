import {
    Stage,
    Layer,
    CircleNode,
    CurveLink,
    ArcLink,
    ForceDirectLayout,
    randomColor,
} from './download/jtopo-1.4.6_trial-esm-min.js';

var stage = new Stage('divId');
var layer = new Layer();
stage.addChild(layer);
layer.css({
    'shadowColor': '#E0E0E0',
    'shadowBlur': 7,
    'shadowOffsetX': 2,
    'shadowOffsetY': 2,
    'background': "white url('./demo/img/grid.png') repeat",
});

// Node:
var counter = 0;

function newNode() {
    //var id = ;
    var node = new CircleNode('node:' + (counter++));
    node.setRadius(10);
    node.x = rand(100, 300);
    node.y = rand(100, 300);

    node.css('background', randomColor());
    layer.addChild(node);
    return node;
};


function newLink(nodeA, nodeZ, deep) {
    var MyLink = (deep == 1) ? ArcLink : CurveLink;

    var link = new MyLink('', nodeA, nodeZ, 'center', 'center');
    link.css('borderColor', randomColor());
    link.css('borderWidth', 2);
    layer.addChild(link);
    return link;
}

function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// 根节点
var rootNode = newNode();
rootNode.setXY(300, 300);
rootNode.setRadius(35);
rootNode.css('background', 'orange');

// 递归随机生成一些节点和连线
function randomNew(fromNode, deep) {
    if (deep == 0) {
        return;
    }

    // 子节点数量3-4个
    var childNum = rand(3, 4);
    for (var i = 0; i < childNum; i++) {
        var toNode = newNode();
        toNode.setRadius(deep * 10);
        newLink(fromNode, toNode, deep);
        randomNew(toNode, deep - 1);
    }
}

// 生成3层树形结构的图，节点坐标随机
randomNew(rootNode, 3);

// 从根节点应用布局
var layout = new ForceDirectLayout(rootNode, stage.width, stage.height);

var timer = setInterval(function () {
    // 斥力布局需要多次调用applyForce迭代
    // 还有一些参数可以调节，本例为了保持简单暂略去
    layout.applyForce();
}, 10);

layer.frames = 60;
stage.show();