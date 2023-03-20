// jtopo拥有强大的组合能力，
// 1. 每个Node或Link都可以作为容器使用
// 2. Link可以作为Node子元素，反之亦可以

// jtopo坐标系统：
// 1. 以Node为父容器时，父容器的左上角为坐标系原点[x,y], 默认为[0,0]
// 2. 以Link为父容器时，坐标系原点表示法[线段索引, t值比例]
// 教程参考：http://www.jtopo.com/tutorial.html#47-jtopo坐标系统
import {
    jtopo,
    Stage,
    Layer, Animation,
    Node, TextNode, PolygonNode, ArrowNode, TipNode, Style, CircleNode,
    Link, FoldLink, AutoFoldLink, CurveLink, ArcLink, BezierLink
} from './download/jtopo-1.4.6_trial-esm-min.js';


var stage = new Stage('divId');
var layer = new Layer('default');
layer.css({
    background: "white url('./demo/img/grid.png') repeat",
});
stage.addChild(layer);

// 容器内的左上角，相对于子元素来说就是原点（0，0）
var container1 = new Node('最底层', 150, 150, 500, 400);
var container2 = new Node(null, 80, 80, 400, 300);
var container3 = new Node('最上层', 160, 160, 200, 100);

container1.css({
    backgroundColor: '#3586E3',
    borderWidth: 2
});
container2.css({
    backgroundColor: '#FDD163',
    borderColor: null, // 无边框
});
container3.css({
    backgroundColor: '#D73417',
    borderColor: 'black'
});
container3.textOffsetY = 8;

layer.addChild(container1);
container1.addChild(container2);
container2.addChild(container3);

var toNode = new Node('在第二层', 30, 30, 40, 40);
toNode.css('fontColor', 'white');
toNode.setImage('./demo/img/laptop.png');
container2.addChild(toNode);

var tip = new TipNode("第二层角标");
tip.css({
    backgroundColor: 'gray',
    color: 'white',
    border: '1px solid black',
});
tip.translateTo(container2.width, 0);
tip.rotateTo(Math.PI / 4);
container2.addChild(tip);

var cantOutNode = new Node('出不去', 30, 30, 40, 40);
cantOutNode.setImage('./demo/img/laptop.png');
cantOutNode.css('color', 'white');

// 增加一个限制：不允许拖拽出父节点
cantOutNode.on('mousedrag', function (e) {
    var p = this.parent;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x + this.width > p.width) {
        this.x = p.width - this.width
    }
    if (this.y + this.height > p.height) {
        this.y = p.height - this.height;
    }
});

var link = new FoldLink(null, toNode, cantOutNode, 'center', 'ct');
link.css({
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: 'black'
});

// 可以通过调整zIndex改变显示的先后顺序（同容器内同级别之间有效）
link.zIndex = 2;
container3.zIndex = 1;
toNode.zIndex = 3;
cantOutNode.zIndex = 3;
container2.addChild(link);
container3.addChild(cantOutNode);

// 把一个圆形节添加到Link中，作为Link的子节点
{
    let circleNode = new CircleNode();
    circleNode.setRadius(12);
    circleNode.css({
        border: '6px solid black',
        backgroundColor: container2.style.backgroundColor,
    });
    circleNode.draggable = false;

    // 设置原点：[线段索引，在线段上的位置0-1], 例如：
    // [0, 0.5]：表示在连线的第一条线段的中心点
    // [0, 0]：表示在连线的第一条线段的开始点
    // [0, 1]：表示在连线的第一条线段的结束点 
    // [1, 0.5]：表示连线的第二条线段的中心点

    // 不同类型的连线线段条数不同：
    // 1. Link、ArcLink、CurveLink、BezierLink只有1条线段
    // 2. FoldLink由2条线段
    // 3. AutoFoldLink则有5条线段
    // 详见开发教程的第五章-坐标原点小节:http://www.jtopo.com/tutorial.html#%E5%9D%90%E6%A0%87%E5%8E%9F%E7%82%B9-origin
    circleNode.origin = [1, 0];

    link.addChild(circleNode);
}

stage.show();