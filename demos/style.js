var stage = new Stage('divId');
var layer = new Layer('default');
stage.addChild(layer);


// 样式大部分属性命名和效果都遵循Html5-Canvas的绘图定义
// 其本质是：绘制每个图元前 去修改Canvas 绘图环境context的属性

// 父节点只有某些属性可以影响到子节点（例如全局性的阴影、字体、
// 某些子节点的样式为空的时候父样式才可能生效）

// 全局字体
layer.css({
    // 字体，格式CSS-FONT
    'font': 'bold 12px 仿宋',
});

let circleNode = new CircleNode('径向渐变', 60, 300, 100);
let grd = new jtopo.RadialGradient(75, 50, 5, 90, 60, 100);
grd.addColorStop(0, '#2474b5');
grd.addColorStop(1, 'white');
circleNode.css({
    // 填充颜色,
    'background': grd,

    // 字体颜色
    'color': 'white',

    // 节点中间
    'textPosition': 'center',

    // 左右居中
    'textAlign': 'center',

    // 上下居中
    'textBaseline': 'middle'
});
layer.addChild(circleNode);

let node = new Node('图案填充', 200, 300, 150, 100);
let pattern = new jtopo.Pattern('./demo/img/pattern.jpg', 'repeat');
node.css({
    // 填充颜色, 也支持图片作为填充图案
    'background': pattern,
    'color': 'gray',
});
layer.addChild(node);


let node2 = new Stage('线性渐变', 400, 300, 150, 100);
let lineGrad = new jtopo.LinearGradient(0,0,170,0);
lineGrad.addColorStop(0, "white");
lineGrad.addColorStop(1, "#2474b5");
node2.css({
    // 填充颜色, 也支持图片作为填充图案
    'background': lineGrad,
    'color': 'gray'
});
layer.addChild(node2);



stage.show();