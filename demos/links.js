import {
    Stage,
    Layer, Animation,
    Node, TextNode, PolygonNode, ArrowNode, TipNode, Style, CircleNode,
    Link, AutoFoldLink, CurveLink, ArcLink, BezierLink,
    randomColor,
} from './download/jtopo-1.4.6_trial-esm-min.js';


var stage = new Stage('divId');
var layer = new Layer('default');

stage.addChild(layer);

// 全局样式
layer.css({
    font: 'bold 11px arial',
    background: "white url('./demo/img/grid.png') repeat",
});

function newPolygonNode(text, x, y) {
    var node = new PolygonNode(text, x, y, 40, 40);
    node.edges = 6;
    node.css({
        border: '3px #E1E1E1 solid',
        background: randomColor(),
        color: 'black'
    });
    layer.addChild(node);
    return node;
}

var node0 = newPolygonNode('', 305, 305);
var node1 = newPolygonNode('Node1', 480, 305);
var node2 = newPolygonNode('Node2', 151, 420);
var node3 = newPolygonNode('Node3', 151, 155);
var node4 = newPolygonNode('Node4', 480, 166);
var node5 = newPolygonNode('Node5', 480, 420);


// 第一个折线
{
    var autoFoldLink1 = new AutoFoldLink("AutoFoldLink-1", node3, node0, 'rm', 'lm');
    autoFoldLink1.css('lineDash', [6, 2]);
    autoFoldLink1.direction = 'horizontal';
    layer.addChild(autoFoldLink1);
}

// Link
{
    var link = new Link("Link");
    link.setBegin(node0, 'rm');
    link.setEnd(node1, 'lm');

    link.css({
        border: '2px solid green',
        lineDash: [6, 2]
    });

    // 起止偏移
    link.beginOffset = {
        x: 0,
        y: -5
    };
    link.endOffset = {
        x: 0,
        y: -5
    };

    link.label.css({
        'textBaseline': 'bottom'
    });

    // 箭头
    link.setEndArrow(new ArrowNode());
    link.endArrow.css(link.style);

    layer.addChild(link);
}

// Link2
{
    let link = new Link("Link2");
    link.setBegin(node1, 'lm');
    link.setEnd(node0, 'rm');

    link.css({
        border: 'solid 2px black',
    });

    link.label.css({
        textBaseline: 'top'
    });

    // 起止偏移
    link.beginOffset = {
        x: 0,
        y: 5
    };
    link.endOffset = {
        x: 0,
        y: 5
    };

    layer.addChild(link);
}


// 右上角曲线
{

    var curveLink = new CurveLink("", node0, node4, 'ct', 'lm');
    // 显示在开始节点的上面
    curveLink.zIndex = node0.zIndex + 1;

    // 文本
    curveLink.setLabel(new TipNode('CurveLink'));

    // 开始箭头
    curveLink.setBeginArrow(new CircleNode());
    curveLink.getBeginArrow().setRadius(5);

    // 有自己独立的样式
    curveLink.getBeginArrow().style = new Style({
        backgroundColor: 'black',
    });

    // 开始位置朝向结束方向偏移距离
    curveLink.beginOffset = 8;

    // 结束箭头
    curveLink.setEndArrow(new ArrowNode());

    layer.addChild(curveLink);
}


// 红色闪烁折线
{
    var autoFoldLink = new AutoFoldLink("", node0, node2, 'cb', 'rm');
    autoFoldLink.css({
        border: 'solid 3px red',
        color: 'red',
    });

    // 结束点的位置偏移
    autoFoldLink.endOffset = -10;

    // 结束箭头
    let endArrow = new Node('N');
    endArrow.setImage('./demo/img/arrow_left.jpeg');
    autoFoldLink.setEndArrow(endArrow);

    endArrow.originAutoRotate = false;
    endArrow.style = new Style();
    endArrow.resizeTo(15, 15);

    layer.addChild(autoFoldLink);

    let textStyle = new Style({
        textPosition: 'center',
        textAlign: 'center',
        textBaseline: 'middle',
    });
    // 线上增加一些点缀
    for (let i = 1; i <= 5; i += 1) {
        let textNode = new TextNode(i);
        textNode.style = textStyle;
        // 节点不随连线角度旋转
        textNode.originAutoRotate = false;

        // 索引1的线段上，t=i/6, 这个计算稍微麻烦
        textNode.origin = [1, i / 6];
        autoFoldLink.addChild(textNode);
    }

    for (let i = 1; i <= 5; i += 1) {
        let textNode = new TextNode('<' + i);
        textNode.style = textStyle;
        // 文本方向自动调节，不会出现文字倒置，影响阅读
        textNode.autoDirection = true;

        // 索引3的线段上，t=i/6, 这个计算稍微麻烦
        textNode.origin = [3, i / 6];

        autoFoldLink.addChild(textNode);
    }
}

// 圆弧线
{
    var arcLink = new ArcLink('ArcLink', node1, node5, 'rm', 'rm');
    arcLink.direction = -1;
    arcLink.css('lineDash', [6, 2]);
    layer.addChild(arcLink);

    for (let i = 0.1; i < 0.9; i += 0.2) {
        let node = new PolygonNode('', 0, 0, 10, 10);
        node.edges = 3 + Math.ceil(i * 5);
        node.css({
            background: randomColor(),
        });
        node.on('mousedown', e => {
            node.scaleTo(2, 2);
        });
        node.on('mouseup', e => {
            node.scaleTo(1, 1);
        });
        node.origin = [0, i];
        arcLink.addChild(node);
    }
}

// 贝塞尔
{
    var bezierLink = new BezierLink('BezierLink', node2, node3, 'ct', 'lm');
    layer.addChild(bezierLink);
    stage.show();
    let node = new Node('', 0, 0, 20, 10);
    node.css({
        background: 'green',
    });
    node.origion = [0, 0];
    bezierLink.addChild(node);

    // n在5000毫秒内，从0逐渐变为1
    new Animation(0, 1, 5000, function (n) {
        node.origin[1] = n;
    }).play().then(() => {

        // 结束后再从1变成0
        new Animation(1, 0, 5000, function (n) {
            node.origin[1] = n;
        }).play();
    });
}

// animation
var alpha = 1;
var offset = 0;
var v = 1 / 24;

function animation() {
    alpha += v;
    if (alpha > 1 || alpha < 0.3) {
        v = -v;
    }
    if (++offset > 16) offset = 0;

    autoFoldLink.css({
        borderColor: 'rgba(248,143,65,' + alpha + ')',
    });

    link.css({
        lineDashOffset: -offset
    });
    arcLink.css({
        lineDashOffset: -offset
    });
    autoFoldLink1.css({
        lineDashOffset: -offset
    });
    bezierLink.css({
        lineDashOffset: -offset
    });

    layer.update();
    requestAnimationFrame(animation);
}

animation();