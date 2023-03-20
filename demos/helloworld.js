// Hello!
// 欢迎学习jtopo，耐心看完这个简单的例子，后续其他所有例子的
// 流程你基本上也都清楚了，很划算的！
// 下面开始：

// 最新版本已经采用标准ESM模块化，可以直接import
import {
    Stage,
    Layer,
    Node,
    Link
} from './download/jtopo-1.4.6_trial-esm-min.js';


// 根据一个DIV的id创建顶层对象：Stage
// 注：'divId' 需换成你页面实际的divd的id或者dom对象
var stage = new Stage('divId');

// 一个Stage下面可以有多个'层',Layer
// 多个Layer可以配合，比如有背景层，有动画层，有交互、展示层等
var layer = new Layer();

// 背景
layer.css({
    background: "white url('./demo/img/grid.png') repeat",
});

// 一般步骤，将Layer放入到Stage中
stage.addChild(layer);

// 创建一个节点：new Node('文本', x，y，宽度, 高度)';
var fromNode = new Node('From', 200, 200, 48, 48);

// 设置一张图片
fromNode.setImage('./demo/img/node1.png');

// 创建另一个节点
var toNode = new Node('To');
toNode.setXY(400, 200);
toNode.resizeTo(64, 64);

// 可以用类似css语法设置更多属性, 涉及语法详细可以参考CSS相关教程。
toNode.css({
    width: 48,
    height: '48px',
    border: 'solid 1px gray',
    borderRadius: 5,
    background: "white url('./demo/img/node2.png') no-repeat",
    backgroundSize: '32px 32px',
    backgroundPosition: 'center center',
    font: 'bold 11px arial',
    color: 'gray',
    zIndex: 2,
});

// 连线 new Link('文本',开始节点,结束节点);
var link = new Link('Link', fromNode, toNode);

// 线的属性
link.css({
    border: 'solid 2px gray',
});

// 线上文本标签的样式
link.label.css({
    font: 'bold 11px arial',
    color: 'orange',
});

// 将创建好的图元对象放入layer中
layer.addChild(fromNode);

// 也可以一次添加多个
layer.addChilds([toNode, link]);

// 最后一步：显示
stage.show();

// 恭喜！
// 你可以动手尝试修改这些代码，然后点击下面的“运行”按钮