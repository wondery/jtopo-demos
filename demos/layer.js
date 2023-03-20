import {
    Stage,
    Layer,
    Node,CircleNode,
    Link, Style
} from './download/jtopo-1.4.6_trial-esm-min.js';


var stage = new Stage('divId');

// 背景层-固定
var bgLayer = new Layer('bg');
stage.addChild(bgLayer);

// 添加到stage后才可以设置背景
bgLayer.css({
    background: "white url(./demo/img/layer_bg.jpeg) no-repeat",
    backgroundSize: '100% 100%',
});

// 中间层-节点和连线
var nodeLayer = new Layer('layer1');
stage.addChild(nodeLayer);

// 前景层-带动画
var cloudLayer = new Layer('cloud');
cloudLayer.wheelZoom = false;
cloudLayer.draggable = false;

var cloudNode = new Node(null, 0, -100, 64, 64);
cloudNode.setImage('./demo/img/cloud_layer.png', true);
cloudLayer.addChild(cloudNode);

stage.addChild(cloudLayer);

var nodeStyle = new Style({
    background: 'orange',
    color: 'white'
});

function newNode(text, x, y) {
    var node = new CircleNode(text, x, y, 42, 42);
    node.style = nodeStyle;
    return node;
}

var node1 = newNode('node1', 220, 320);
var node2 = newNode('node2', 470, 120);

var link = new Link(null, node1, node2, 'nearest', 'nearest');
link.css('borderColor', 'orange');
link.css('borderWidth', 2);

nodeLayer.addChild(node1);
nodeLayer.addChild(node2);
nodeLayer.addChild(link);

stage.show();

// animation
var dx = 2;
setInterval(function () {
    cloudNode.x += dx;
    if (cloudNode.x < 0 || cloudNode.x + 100 >= stage.width) {
        dx = -dx;
    }
    cloudLayer.update();
}, 1000 / 24);