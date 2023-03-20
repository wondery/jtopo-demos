import {
    Stage,
    Layer,
    Node,
    AutoBoundLayout,
    randomColor,
} from './download/jtopo-1.4.6_trial-esm-min.js';


var stage = new Stage('divId');
var layer = new Layer();
layer.css({
	background: '#F1F1F1',
});
stage.addChild(layer);


// 容器的边界和尺寸,会随着子节点自动变化
var group = new Node('Group', 300, 400, 100, 100);
group.css({
    'border': '1px dashed gray',
    'shadowColor': '#E0E0E0',
    'shadowBlur': 7,
    'shadowOffsetX': 2,
    'shadowOffsetY': 2,
    'font': 'bold 10px arial',
    'background': "white url('./demo/img/grid.png') repeat",
});
layer.addChild(group);

function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

for (var i = 0; i < 10; i++) {
    var node = new Node();
    node.setXY(rand(10, 400), rand(10, 400));
    node.resizeTo(32, 32);
    node.textOffsetY = 2;
    node.css('background', randomColor());
    group.addChild(node);
}

var autoBoundLayout = new AutoBoundLayout();
autoBoundLayout.doLayout(group);

stage.on('mousedrag', function (e) {
    //todo
    autoBoundLayout.doLayout(group);
});

stage.translateToCenter();
stage.show();