import {
    jtopo,
    Stage,
    Layer,
    Node, CircleNode,
    BezierLink,
    CircleLayout,
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
    'font': 'bold 10px arial',
    'background': "white url('./demo/img/grid.png') repeat",
});

var nodes = [];

function addNode(text) {
    var node = new CircleNode(text, 1, 1, 40, 40);
    node.x = stage.width * Math.random();
    node.y = stage.height * Math.random();
    node.css('background', randomColor());
    layer.addChild(node);
    nodes.push(node);
    return node;
}

function addLink(nodeA, nodeZ) {
    var link = new BezierLink(null, nodeA, nodeZ);
    layer.addChild(link);
    return link;
}

var rootNode = new CircleNode('root', stage.width * 0.5, stage.height * 0.5, 40, 40);
rootNode.css('background', 'orange');
layer.addChild(rootNode);

for (var i = 0; i < 20; i++) {
    var node = addNode();
    addLink(rootNode, node);
}

var layout = new CircleLayout();

// 动画时间, 毫秒, 不设置,就没有动画效果.
layout.setTime(1000);

// 布局的每一步回调（这里是刷新画面）
layout.onLayout(() => layer.update());

layout.setCenter(stage.width * 0.5, stage.height * 0.5);

function animation() {
    layout.setAngle(0, Math.PI);

    // 圆最小半径
    layout.setMinRadius(260);

    // 布局, 结束后调整尺寸再次布局， 反复几次
    layout.doLayout(nodes).then(() => {
        layout.setAngle(2 * Math.PI, Math.PI);
        return layout.doLayout(nodes);

    }).then(() => {
        layout.setAngle(0, 2 * Math.PI);
        layout.setMinRadius(150);

        return layout.doLayout(nodes);
    }).then(() => {
        setTimeout(animation, 1000);
    });
}
animation();