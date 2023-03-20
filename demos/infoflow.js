import {
    jtopo,
    Stage,
    Layer,
    Node,CircleNode,
    Link, FoldLink, FlexionalLink, BezierLink,
    randomColor,
    Layout,
} from './download/jtopo-1.4.6_trial-esm-min.js';

var stage = new Stage('divId');
var layer = new Layer();

stage.addChild(layer);

// 全局样式
layer.css({
    'shadowColor': '#E1E1E1',
    'shadowBlur': 5,
    'shadowOffsetX': 3,
    'shadowOffsetY': 3,
    'font': 'bold 11px arial',
    'background': "white url('./demo/img/grid.png') repeat",
});

var nodes = [];
var links = [];

function addNode(text, x, y) {
    var node = new CircleNode(text, x, y);
    node.setRadius(14);
    node.css({
        'borderColor': '#E1E1E1',
        'backgroundColor': randomColor()
    });
    nodes.push(node);

    var n = 0;
    node.on('mouseenter', function () {
        this.text = 'over times:' + n++;
    });
    node.on('mouseout', function () {
        this.text = text;
    });
    return node;
}

function addLink(nodeA, nodeZ, text) {
    var link = new BezierLink(text, nodeA, nodeZ, 'center', 'lm');
    link.css({
        'borderColor': '#E1E1E1',
    });
    links.push(link);
    return link;
}

var rootNode = addNode('接入', 200, 225);

for (var i = 0; i < 4; i++) {
    var node = addNode('起点_' + i, 40, 150 + i * 60);
    var link = new FlexionalLink(null, node, rootNode, 'center', 'lm');
    // var link = new FlexionalLink(null, node, rootNode, 'center', 'lm');
    link.css({
        'borderWidth': 5,
        'borderColor': '#E1E1E1',
    });
    link.direction = 'horizontal';

    links.push(link);
}

var fwNode = addNode('防火', rootNode.x + 50, 184);
addLink(rootNode, fwNode);

var cloudNode = addNode('云', fwNode.x + 50, 218);
addLink(fwNode, cloudNode);

var fw2Node = addNode('防火2', cloudNode.x + 100, 184);
addLink(cloudNode, fw2Node);


var group = new Node('区域A', 500, 260, 130, 240);
group.css({
    'borderColor': '#E1E1E1',
    'color': 'black',
    'backgroundColor': 'rgba(0,200,0,0.5)',
});

var hostNode = new CircleNode('终端', 20, 20);
hostNode.setRadius(12);
hostNode.css('background', randomColor());

addLink(fw2Node, hostNode);

for (var i = 0; i < 3; i++) {
    var node = new CircleNode('结束_' + i, 60, 70 + i * 50);
    node.setRadius(12);
    node.css({
        'backgroundColor': randomColor(),
        'borderColor': '#E1E1E1',
    });

    var link = new FoldLink(null, hostNode, node);
    link.css({
        'borderWidth': 5,
        'borderColor': '#E1E1E1',
    });
    link.direction = 'vertical';

    group.addChild(link);
    group.addChild(node);
}
group.addChild(hostNode);

layer.addChild(group);
layer.addChilds(links);
layer.addChilds(nodes);
stage.translateToCenter();
stage.show();

// 动画
var beginNode = layer.findFirst('text', '起点_3');
var offset = 0;

// 遍历链路
var objects = Layout.travel(beginNode);

function flow(objects, n) {
    if (n == objects.length) {
        return;
    }

    var obj = objects[n];
    obj.css({
        lineDash: [5, 2],
        border: '3px red dashed'
    });
    var offset = 0;

    setInterval(function () {
        if (++offset > 16) offset = 0;
        obj.css({
            lineDashOffset: -offset
        });

        layer.update();
    }, 300);

    setTimeout(function () {
        flow(objects, n + 1);
    }, 250);
}

flow(objects, 0);