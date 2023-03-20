import {
    Stage,
    Layer,
    Node,
    CircleNode,
    CurveLink,
    Animation
} from './download/jtopo-1.4.6_trial-esm-min.js';

var stage = new Stage('divId');
var layer = new Layer('default');
stage.addChild(layer);

// 演示：
// 获取节点上边框某一坐标
// 获取连线上某一个坐标
// Node 或 Link对象有一个getPoint(t)方法, t取值范围:[0-1]，可以获取对象上某一点的坐标
// 对于Node, t在0-1期间的轨迹为矩形的一周：可以获取节点边框上任意一点。
// 对于Link，t在0-1期间的轨迹为起点到终点，可以获取线条上任意一点。


// 矩形节点 (圆形节点也可以)
var node = new Node('Node', 100, 100, 400, 400);
node.css({
    'borderColor': 'gray',
    'borderWidth': 6
});
layer.addChild(node);

// 创建小球
function newBall(color, r) {
    var ball = new CircleNode(null, 0, 0, r);
    ball.css({
        'background': color,
        'borderWidth': 2
    });
    layer.addChild(ball);
    return ball;
}

// 在方框上运动
var redBall = newBall('red', 40);
var greenBall = newBall('green', 20);

// 在link上运动
var blueBall = newBall('blue', 20);

// 绕红色球运动
var ball4 = newBall('white', 10);
ball4.style.strokeStyle = 'black';

// 连线
var link = new CurveLink(null, redBall, greenBall);
link.css({
    'borderWidth': 2
});
layer.addChild(link);


// 动画
new Animation(0, 1, 6000, function (t) {
    // 红色小球
    var p = node.getPoint(t / 3);
    redBall.text = '' + t.toFixed(1);
    redBall.translateCenterTo(p.x, p.y);

    //绿色小球 1-t(与红色小球方向相反)
    var p2 = node.getPoint(1 - t);
    greenBall.translateCenterTo(p2.x, p2.y);

    layer.update();
}).play();

new Animation(0, 1, 3000, function (t) {
    // 蓝色小球
    var p3 = link.getPoint(t);
    blueBall.translateCenterTo(p3.x, p3.y);

    // 小小白球
    var p4 = redBall.getPoint(t);
    ball4.translateCenterTo(p4.x, p4.y);

    layer.update();
}).play();


stage.show();