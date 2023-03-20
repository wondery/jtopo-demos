import {
    Stage,
    Layer,
    Node,
    Link,
    randomColor,
    CurveLink,
    CircleNode,
    Graph, TreeLayout
} from './download/jtopo-1.4.6_trial-esm-min.js';


var stage = new Stage('divId');
var layer = new Layer();
layer.css({
    background: "white url('./demo/img/grid.png') repeat",
});

stage.addChild(layer);


function addNode(text) {
    var x = 0;
    var y = 0;

    var node = new CircleNode(text, x, y);
    node.setRadius(17);
    node.css({
        'borderWidth': 3,
        'borderColor': '#E1E1E1',
        'background': randomColor(),
        'font': '12px arial',
        'color': 'black'
    });
    layer.addChild(node);
    return node;
}

function addLink(nodeA, nodeZ) {
    var link = new CurveLink('', nodeA, nodeZ);
    link.css('borderWidth', 4);
    layer.addChild(link);
    return link;
}

var rootNode = addNode('root');

function gen(parentNode, deep, maxDeep) {
    var n = 2;
    for (var i = 0; i < n; i++) {
        var node = addNode(deep + '-' + i);
        addLink(parentNode, node);

        if (deep < maxDeep) {
            gen(node, deep + 1, maxDeep);
        }
    }
}

gen(rootNode, 1, 3);

var objects = layer.children;


// 方向: up、down、left、right
// 左右间隔量 40， 上下间隔量 80
var layout = new TreeLayout('down');
layout.setMargin(0, 50, 80);

// 动画时间, 毫秒, 不设置,就没有动画效果.
layout.setTime(1200);

// 布局的每一步回调（这里是刷新画面）
layout.onLayout(() => layer.update());

// 布局后的中心
layout.setCenter(stage.width * 0.5, stage.height * 0.5);

let vTrees = new Graph(objects).toTrees();
// 这里只取第一颗虚拟树
let vTree = vTrees[0];

function animation() {
    layout.setDirection('down');

    // 布局, 结束后调整尺寸再次布局， 反复几次
    layout.doLayout(vTree).then(() => {
        layout.setMargin(0, 40, 60);
        return layout.doLayout(vTree);
    }).then(() => {
        layout.setDirection('right');
        return layout.doLayout(vTree);
    }).then(() => {
        layout.setDirection('up');
        return layout.doLayout(vTree);
    }).then(() => {
        layout.setDirection('left');
        return layout.doLayout(vTree);
    }).then(animation);
}

animation();