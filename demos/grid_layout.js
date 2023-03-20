import {
    Stage,
    Layer,
    Node,
    Link,
    randomColor,
    GridLayout
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
stage.show();

const nodes = [];

// 随机生成节点
{
    var rows = 5;
    var cols = 8;
    for (var i = 0; i < rows * cols; i++) {
        var node = new Node('' + i);
        node.resizeTo(32, 32);
        node.textOffsetY = 2;
        node.x = stage.width * Math.random();
        node.y = stage.height * Math.random();
        node.css({
            'borderColor': null, // 无边框 
            'background': randomColor()
        });
        nodes.push(node);
        layer.addChild(node);
    }
}

// 网格式布局
var layout = new GridLayout(rows, cols);

// 节点间隔
layout.setMargin(40, 40, 0, 0);

// 动画时间, 毫秒, 不设置,就没有动画效果.
layout.setTime(1500);

// 布局的每一步回调（这里是刷新画面）
layout.onLayout(() => layer.update());

// 布局后的中心
// 布局后的中心点
layout.setCenter(stage.width * 0.5, stage.height * 0.5);

function animation() {

    // 布局, 结束后调整尺寸再次布局， 反复几次
    layout.doLayout(nodes).then(() => {
        layout.setSize(8, 5);
        layout.setMargin(20, 20);

        return layout.doLayout(nodes);
    }).then(() => {
        layout.setSize(10, 4);

        return layout.doLayout(nodes);
    }).then(()=> {
        layout.setSize(4, 10);
        layout.setMargin(10, 10);

        // 一直循环
        return layout.doLayout(nodes);
    }).then(animation);
}

animation();