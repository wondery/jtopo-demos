import {
    Stage,
    Layer,
    Link, TopoPainter
} from './download/jtopo-1.4.6_trial-esm-min.js';


var stage = new Stage('divId');
var layer = new Layer('default');
stage.addChild(layer);


// 绘图时，可能会遇到坐标计算
// jtopo提供了一个名为'Topo画家’的类来降低部分计算难度

// 可以试着用笔在纸上体会绘制过程

// 确定两点
var a = {
    x: 200,
    y: 200
};
var z = {
    x: 400,
    y: 400
};

// 创建一个’Topo画家‘
var tp = new TopoPainter();
tp.beginPath();

// 移动到点a，面向点z，前进100像素(划线)
tp.moveTo(a).faceTo(z).forward(100);

// 移动到点z，面向点a，前进100个像素(划线)
tp.moveTo(z).faceTo(a).forward(100);

// 移动到点a和z的中点，面向a， 向左转30度，绘制并记录下点位置
var angle = 30 / 180 * Math.PI;
tp.moveToMiddle(a, z).faceTo(a).turnLeft(angle).forward(40).mark('P1');

// 移动到点a和z的中点, 面向z， 向右转30度，绘制并记录下点位置
tp.moveToMiddle(a, z).faceTo(a).turnRight(angle).forward(40).mark('P2')

// 连接点 P1 和 P2
//tp.moveToMark('P1').forwardToMark('P2');

tp.stroke();
// 绘图完毕

// 生成canvas的绘制指令代码，可以复制粘贴到程序里
var code = tp.toCmd();
console.log(code);
/* 如下：
ctx.beginPath();
ctx.moveTo(200,200);
ctx.lineTo(270.71067811865476,270.71067811865476);
ctx.moveTo(400,400);
ctx.lineTo(329.28932188134524,329.28932188134524);
ctx.moveTo(300,300);
ctx.lineTo(261.36296694843725,289.64723819589915);
ctx.moveTo(300,300);
ctx.lineTo(289.64723819589915,261.36296694843725);
ctx.stroke();
*/

// 也可以直接编译成函数调用
var draw = tp.toFunction();
/*
等价于：
var draw = function(ctx) {
    ctx.beginPath();
    ctx.beginPath();
    ctx.moveTo(200,200);
    ctx.lineTo(270.71067811865476,270.71067811865476);
    ctx.moveTo(400,400);
    ctx.lineTo(329.28932188134524,329.28932188134524);
    ctx.moveTo(300,300);
    ctx.lineTo(261.36296694843725,289.64723819589915);
    ctx.moveTo(300,300);
    ctx.lineTo(289.64723819589915,261.36296694843725);
    ctx.stroke();
    ...
    ctx.stroke();
}
*/

// 用连线呈现出来
var link = new Link(null, a, z);
link.css({
    'borderWidth': 5
});
link.draw = draw;

layer.addChild(link);

stage.show();