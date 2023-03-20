# jtopo最新版本（v1.4.6）的教程、示例代码和API文档
    demos 示例代码
    api_doc API文档

- [jtopo最新版本（v1.4.6）的教程、示例代码和API文档](#jtopo最新版本v146的教程示例代码和api文档)
  - [1. 前言](#1-前言)
  - [2. 安装导入](#2-安装导入)
    - [2.2. 一个基于Vue + vite + jtopo 的项目模板( 含有代码智能提示 )](#22-一个基于vue--vite--jtopo-的项目模板-含有代码智能提示-)
    - [2.3. 代码智能提示](#23-代码智能提示)
  - [3. 第一个程序（Helloword）](#3-第一个程序helloword)
  - [4. 基础讲解](#4-基础讲解)
    - [4.1. 顶层对象（Stage）](#41-顶层对象stage)
    - [4.2. 层对象（Layer）](#42-层对象layer)
    - [4.3. 节点对象（Node）](#43-节点对象node)
    - [4.4. 连线对象（Link）](#44-连线对象link)
    - [4.5. 外观样式（Style）](#45-外观样式style)
    - [4.6. 事件处理(鼠标交互)](#46-事件处理鼠标交互)
    - [4.7. 父子关系](#47-父子关系)
    - [4.8. zIndex](#48-zindex)
    - [4.9. 动画](#49-动画)
  - [5. 布局](#5-布局)
    - [5.1. 网格布局(GridLayout)](#51-网格布局gridlayout)
    - [5.2. 树形布局(TreeLayout)](#52-树形布局treelayout)
    - [5.3. 流式布局(FlowLayout)](#53-流式布局flowlayout)
    - [5.4. 自动边界布局(AutoBoundLayout)](#54-自动边界布局autoboundlayout)
    - [5.5. 斥力布局(ForceDirectLayout)](#55-斥力布局forcedirectlayout)
  - [6. 中级进阶](#6-中级进阶)
    - [6.1. 文本和定位](#61-文本和定位)
    - [6.2. 容器](#62-容器)
    - [6.3. 连接点](#63-连接点)
    - [6.4. 自定义属性](#64-自定义属性)
    - [6.5. 自定义节点](#65-自定义节点)
    - [6.6. jtopo坐标系统](#66-jtopo坐标系统)
      - [6.6.1. 理解坐标系：](#661-理解坐标系)
      - [6.6.2. 坐标原点: origin](#662-坐标原点-origin)
  - [7. 高级功能](#7-高级功能)
    - [7.1. 位置计算](#71-位置计算)
    - [7.2. 性能优化](#72-性能优化)
    - [7.3. 辅助绘图](#73-辅助绘图)
  - [8. 七、保存、加载](#8-七保存加载)
    - [8.1. 保存](#81-保存)
    - [8.2. 加载](#82-加载)
    - [8.3. 例子](#83-例子)
  - [9. 导出图片、下载、缩略图](#9-导出图片下载缩略图)
    - [9.1. 图片导出](#91-图片导出)
    - [9.2. 下载为json文件(目前仅支持单个Layer的场景)](#92-下载为json文件目前仅支持单个layer的场景)
    - [9.3. 缩略图控制](#93-缩略图控制)


<!-- title:  jtopo开发教程 --> 
<br>

## 1. 前言

本教程假设读者已经对javaScript、html有所了解。


## 2. 安装导入
新版本使用了部分ES6语法，模块化采用标准规范：ESM。

直接import即可，如下:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <script type="module">
            import {Stage, Layer, Node, Link, jtopo} from './download/jtopo-1.4.6_trial-esm-min.js';
            // ... 代码
       </script>
    </head>
    <body>
    </body>
</html>
```

### 2.2. 一个基于Vue + vite + jtopo 的项目模板( 含有代码智能提示 )

<a href="https://gitee.com/nengduan/jtopo_vue_vite" target="_black">https://gitee.com/nengduan/jtopo_vue_vite</a>

### 2.3. 代码智能提示
<a href="https://gitee.com/nengduan/jtopo_vue_vite/tree/master/jtopo_npm">辅助提示d.ts文件和使用样例</a>

## 3. 第一个程序（Helloword）

新建一个文本文件，命名为 helloword.html，文件内容：如下(可以复制粘贴到你的编辑器中）：
```html

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>jtopo helloworld</title>
</head>
<body>
    <!-- 用于渲染显示的div -->
    <div id="divId" style="height:600px;width:680px;border:1px solid gray"></div>

    <script type="module">
       import {Stage, Layer, Node, Link} from './download/jtopo-1.4.6_trial-esm-min.js';

        var stage = new Stage('divId');
        var layer = new Layer('default');
        stage.addChild(layer);

        var fromNode = new Node('From', 200, 200, 40, 40);
        var toNode   = new Node('To',   400, 200, 40, 40);

        // 设置节点填充颜色
        fromNode.css('background', 'orange');
        toNode.css('background', 'blue');

        var link = new Link('Link',fromNode,toNode);
        layer.addChild(link);

        layer.addChild(fromNode);
        layer.addChild(toNode);

        stage.show();
    </script>
</body>
</html>
```

script 标签里的 **type="module"** 不能缺少。

用浏览器打开该完整的helloworld.html，查看运行效果如下：

<img src="./images/md/helloworld.png"/>


<a href="http://www.jtopo.com/helloworld.html" target="_blank">在线运行</a>

参考：<a href="http://www.jtopo.com/demo.html" target="_blank">在线入门Demo</a>


## 4. 基础讲解

jtopo的核心对象有Stage、Layer、Canvas、Node、Link, 关系如下图：

<img src="./images/md/jtopo_sys.png"/>

Stage、Layer和Node关系


### 4.1. 顶层对象（Stage）
	
jtopo的核心对象之间存在层级结构，最顶层的为Stage，管理一个或者多个Layer，可以对Layer进行管理：添加、移除。

提供一些常规性的交互功能，比如：鼠标缩放、视图模式变换（普通、框选、拖拽、编辑、锁定）；

显示控制：按画布居中、1：1显示
导出图片等功能。

代码示例：
```js
	var stage = new Stage(“divId”);
	stage.show(); // 显示出来
```

详细的：<a href="http://www.jtopo.com/api_doc/Stage.html" target="_blank">Stage-API参考</a>

### 4.2. 层对象（Layer）
Layer 是一个抽象对象，默认是完全透明的，上层对象为Stage.

一个Layer下面可以有多个Node、Link对象，Node、Link对象只有放入Layer后才可能被绘制出来。

Layer 可以被平移、缩放，用户可以通过鼠标在画布上的拖拽 和 鼠标滚轮完成，也可以通过API来修改Layer的x、y坐标和缩放系数scaleX和scaleY实现同等效果。

一个Layer对象对应一个Canvas，多个Layer常用于画面逻辑分层，比如有的层绘制速度较慢，有的层绘制速度较快，有的层作为背景层，有的作为动画层。

代码示例：
```js
	var stage = new Stage();
	var layer = new Layer(“layer-1”);
	stage.addChild(layer); // 放入Stage
	//…
	stage.show(); // 显示出来
```
详细的：<a href="http://www.jtopo.com/api_doc/Layer.html" target="_blank">Layer-API参考</a>

### 4.3. 节点对象（Node）
用户操作的核心两个对象Node 、Link之一。

Node给人的形象是一个矩形，有坐标（x，y） 和 宽高尺寸（width、heigh）。

可以指定一个文本字符串，默认显示在中矩形的下面。

Node对象的外观可以通过css方法设置，核心的外观属性有：边框颜色、填充颜色、字体颜色、字体（大小、加粗等CSS Font支持的都可以）、圆角。

代码示例：
```js
	var stage = new Stage();
	var layer = new Layer(“layer-1”);
	stage.addChild(layer); // 放入Stage

	var node = new Node(“Node-1”);
    layer.addChild(node); // 放入Layer

	stage.show(); // 显示出来
```
各种Node效果如下: 

<img src="./images/md/nodes.png"/>

参考：<a href="http://www.jtopo.com/demo.html#Nodes" target="_blank">Node演示</a>

详细的：<a href="http://www.jtopo.com/api_doc/Node.html" target="_blank">Node-API参考</a>

### 4.4. 连线对象（Link）
用户操作的核心两个对象之一。

Link给人的形象是连线，有起始点和结束点，一般用来表示关系、流向等。

可以指定一个文本字符串，默认显示在连线的中间。

Link对象的外观可以通过css方法设置，核心的外观属性有：颜色、线条粗细、字体颜色、字体（大小、加粗等CSS Font支持的都可以）。
	
代码示例：
```js
    var link = new Link('Link',fromNode,toNode);
    layer.addChild(link);
```
各种Link效果如下: 

<img src="./images/md/links.png"/>

参考：<a href="http://www.jtopo.com/demo.html#Links" target="_blank">Link演示</a>
详细的：<a href="http://www.jtopo.com/api_doc/Link.html" target="_blank">Link-API参考</a>

### 4.5. 外观样式（Style）

样式大部分属性命名和效果都遵循和参考了Html5-css。

```js
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

let circleNode = new CircleNode('节点', 60, 300, 100);

// 可以用类似css语法设置更多属性, 涉及语法详细可以参考CSS相关教程。
circleNode.css({
    width: 48,
    height: '48px',
    border: 'solid 1px gray',
    borderRadius: 5,
    background: "white url('./demo/img/node2.png') no-repeat",
    backgroundSize: '32px 32px',
    backgroundPosition: 'center center',
    zIndex: 2,
    font: 'bold 11px arial',
    color: 'gray',
    textPosition: 'center', // 位置
    textAlign: 'center',    // 左右居中
    textBaseline: 'middle'     // 上下居中
});
layer.addChild(circleNode);


stage.show();
```


### 4.6. 事件处理(鼠标交互)

jtopo封装了鼠标行为，可以在Node或者Link对象上增加事件监听，代码示例：
```
var stage = new Stage('divId');
var layer = new Layer('default');
stage.addChild(layer);

var node = new Node('From', 200, 150, 40, 40);
node.setImage('./demo/img/laptop.png', true);
layer.addChild(node);

stage.show();

// 鼠标点击
node.on('click', function (event) {
    // 更详细的事件信息，
    // 比如：鼠标在画布上的x，y坐标, 鼠标状态（是否拖拽开始、结束）, 相对于上一次鼠标位置的偏移量(dx,dy)等
    let eventDetails = event.details;

    node.text = 'click';
    console.log('click');
});

// 鼠标双击
node.on('dblclick', function (event) {
    console.log('dblclick');
    node.text = 'dblclick';
});

// 鼠标进入
node.on('mouseenter', function (event) {
    console.log('mouseenter');
    node.text = 'mouseenter';
});

// 鼠标移动
node.on('mousemove', function (event) {
    console.log('mousemove');
    node.text = 'mousemove';
});

// 鼠标离开
node.on('mouseout', function (event) {
    node.text = 'mouseout';
    console.log('mouseout');
});

// 鼠标按下
node.on('mousedown', function (event) {
    console.log('mousedown');
    node.text = 'mousedown';
});

// 鼠标松开
node.on('mouseup', function (event) {
    console.log('mouseup');
    node.text = 'mouseup';
});

// 鼠标拖拽
node.on('mousedrag', function (event) {
    console.log('mousedrag');
    node.text = 'mousedrag';
});

// 鼠标拖拽结束
node.on('mousedragend', function (event) {
    console.log('mousedragend');
    node.text = 'mousedragend';
});


node.on('touchstart', function (event) {
    node.text = 'touchstart';
});

node.on('touchmove', function (event) {
    node.text = 'touchmove';
});

node.on('touchend', function (event) {
    node.text = 'touchend';
});

// --- 下面是较为高级的事件处理示例
// 阻止默认拖拽处理, 参考:Html事件的preventDefault() 说明
function preventDefaultDrag(e) {
    e.preventDefault();
}

function disabledDefaultMouseDragHandler(obj) {
    obj.on('mousedrag', preventDefaultDrag);
}

function enabledDefaultMouseDragHandler(obj) {
    obj.removeEventListener('mousedrag', preventDefaultDrag);
}

// 阻止默认拖拽处理
node.on('mousedrag', preventDefaultDrag);

// 定义自己的拖拽处理
function customDragHandler(event) {
    // 每次拖拽偏移量
    console.log(event.dx + ' - ' + event.dy);
    //....

    // 还可以再次抛出自己的事件
    node.dispatchEvent(new Event('myEvent'));
}
// 使用自己的事件处理 （on 等价 addEventListener，简写而已）
node.on('mousedrag', customDragHandler);

// 捕获自己抛出的自定义事件
node.on('myEvent', function (event) {
    console.log('我的事件');
    console.log(event);
});

// 恢复默认拖拽
node.removeEventListener('mousedrag', preventDefaultDrag);

// 删除自己的拖拽处理
node.removeEventListener('mousedrag', customDragHandler);
```

参考：<a href="http://www.jtopo.com/demo.html#Event" target="_blank">事件处理演示</a>

### 4.7. 父子关系

    Node和Link都有parent 和 children 属性

```
    //...

    layer.removeAllChild();     // 清空
    layer.children.length == 0; // true

    let node = new Node();
    layer.addChild(node);        // node.parent === layer -> true
    layer.chidlren[0] === node;  // true node 在 layer.chidlren集合里

    //...
    layer.addChild(node2); 
    layer.addChild(link3); 

    // 此时node、node2 和 link3 的 parent相同
```

### 4.8. zIndex

    zIndex用来控制前后遮挡关系（同父类下的直接子节点之间有效）.

    数值越大越靠前面，越小越靠后，前面会遮挡后面。

    Node 和 Link 默认的zIndex值分别为 2  和 1， 所以默认同层的Node遮盖Link。

```
    // 示例 ：
    fromNode.zIndex = 3;
    toNode.zIndex = 4;
    link.zIndex = toNode.zIndex + 1;

```

### 4.9. 动画
```


var stage = new Stage('divId');
var layer = new Layer();
stage.addChild(layer);

var node = new Node('动画演示', stage.width / 2 - 100, stage.height / 2 - 100, 100, 100);
node.css({
    'borderColor': 'black',
    'textPosition': 'center',
});
layer.addChild(node);

// 在6000毫秒内，n从0逐渐变为2*Math.PI
let animation = new Animation(0, 2 * Math.PI, 6000, function (n) {

    // 旋转
    node.rotateTo(n);

    // 重绘
    layer.update();
});

// 播放
animation.play().then(() => {
    node.text = '正常结束';
}).catch(() => {
    node.text = '终止或结束';
});

// 暂停
node.on('mouseenter', () => {
    animation.pause();
});

// 继续
node.on('mouseout', () => {
    animation.continue();
});

// 停止
node.on('click', () => {
    animation.stop();
});

// 播放
node.on('dblclick', () => {
    animation.play();
});

stage.show();
```
参考：<a href="http://www.jtopo.com/demo.html#Animation" target="_blank">动画演示</a>
详细的：<a href="http://www.jtopo.com/api_doc/anim.html" target="_blank">Animation-API参考</a>


## 5. 布局
布局功能允许用户把Node和Link按照一定形式调整相对坐标

### 5.1. 网格布局(GridLayout)
网格布局是较为简单的一种布局，把Node对象按照行、列的方式摆放

```js
// 存放要布局的节点数组
var nodes = [];

// 生成9个节点
for(var i=0; i<9; i++){
    var node = new Node(''+i, 0,0,32,32);
    nodes.push(node);
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

// 执行布局
gridLayout.doLayout(nodes).then(=> {
    // 布局执行结束
});
```
效果: 

<img src="./images/md/grid_layout.png"/>

参考：<a href="http://www.jtopo.com/demo.html#GridLayout" target="_blank">网格布局演示</a>

详细的：<a href="http://www.jtopo.com/api_doc/GridLayout.html" target="_blank">GridLayout-API参考</a>

### 5.2. 树形布局(TreeLayout)

树形布局根据Node和Link的关系自动找到根节点，然后递归式的逐级布局为一棵树的形状。
可以指定树的朝向。

```js

let objects = []; // Node和Link组成的集合

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

// 生成虚拟树，取第一棵
let vTrees = new Graph(objects).toTrees();
let vTree = vTrees[0];

// 执行布局
layout.doLayout(vTree).then(() => {
    // 结束
});


```
效果: 

<img src="./images/md/tree_layout.png"/>

参考：<a href="http://www.jtopo.com/demo.html#TreeLayout" target="_blank">树形布局演示</a>

详细的：<a href="http://www.jtopo.com/api_doc/TreeLayout.html" target="_blank">Layer-API参考</a>

### 5.3. 流式布局(FlowLayout)

圆形布局将多个节点以圆形进行布局。

```js
var stage = new Stage('divId');
var layer = new Layer();
stage.addChild(layer);
layer.css({
    'shadowColor': '#E0E0E0',
    'shadowBlur': 7,
    'shadowOffsetX': 2,
    'shadowOffsetY': 2,
    'font': 'bold 10px arial'
});

const nodes = [];
// 随机生成节点
for (var i = 0; i < 20; i++) {
    var node = new Node('' + i);
    node.resizeTo(32 + (50 * Math.random()),
     32 + (50 * Math.random()));
    node.textOffsetY = 2;
    node.x = stage.width * Math.random();
    node.y = stage.height * Math.random();
    node.css({
        'borderColor': null, // 无边框 
        'backgroundColor': randomColor()
    });
    nodes.push(node);
    layer.addChild(node);
}
stage.show();

// 流式布局
var layout = new FlowLayout();

layout.setSize(500);

// 动画时间, 毫秒, 不设置,就没有动画效果.
layout.setTime(1000);

// 节点间隔
layout.setMargin(0, 3);

// 布局的每一步回调（这里是刷新画面）
layout.onLayout(() => layer.update());

// 布局后的中心点
layout.setCenter(stage.width * 0.5, stage.height * 0.5);

// 布局, 结束后调整尺寸再次布局， 反复几次
layout.doLayout(nodes);
```
效果: 

<img src="./images/md/flow_layout.png"/>

参考：<a href="http://www.jtopo.com/demo.html#FlowLayout" target="_blank">流式局演示</a>

详细的：<a href="http://www.jtopo.com/api_doc/FlowLayout.html" target="_blank">FlowLayout-API参考</a>

### 5.4. 自动边界布局(AutoBoundLayout)

容器的边界和尺寸会随着多个子节点而自动变化

```js
var stage = new Stage('divId');
var layer = new Layer();
stage.addChild(layer);


// 创建一个叫group的容器，边界和尺寸,会随着子节点自动变化
var group = new Node('Group', 300, 400, 100, 100);
group.css({
    'backgroundColor': 'rgba(0, 128, 0, 0.5)'
});
layer.addChild(group);

function rand(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

// 向分组添加子节点
for(var i=0; i< 10; i++){
	var node = new Node();
    node.setXY(rand(10, 400), rand(10, 400));
  	node.resizeTo(32, 32);
    node.textOffsetY = 2;
	node.css('background', randomColor());
	group.addChild(node);
}

var autoBoundLayout = new AutoBoundLayout();
autoBoundLayout.doLayout(group);

stage.on('mousedrag', function(e){
    //todo
    autoBoundLayout.doLayout(group);
});

stage.translateToCenter();
stage.show();
```
效果: 

<img src="./images/md/autobound_layout.png"/>

参考：<a href="http://www.jtopo.com/demo.html#AutoBoundLayout" target="_blank">自动边界布局演示</a>

详细的：<a href="http://www.jtopo.com/api_doc/AutoBoundLayout.html" target="_blank">AutoBoundLayout-API参考</a>

### 5.5. 斥力布局(ForceDirectLayout)

模拟斥物理性质(质量,斥力和张力), 各个节点在力的相互作用下不断运动,直至最终达到力的平衡,完成自动布局.

```js

var layout = new ForceDirectLayout(rootNode, stage.width, stage.height);

// 斥力布局需要多次调用applyForce迭代
layout.applyForce();

```
效果: 

<img src="./images/md/force_layout.png"/>

参考：<a href="http://www.jtopo.com/demo.html#ForceDirectLayout" target="_blank">斥力布局演示</a>

详细的：<a href="http://www.jtopo.com/api_doc/ForceDirectLayout.html" target="_blank">ForceDirectLayout-API参考</a>

## 6. 中级进阶

### 6.1. 文本和定位

文本在节点上的位置可以调整。

文字定位由三个核心属性控制：**1. 位置 2. 文本对齐方式 2. 文本基线** 

1. 位置表示如下图：

<img src="./images/md/positions.png"/>

灰色矩形区域代表节点，节点文本的位置默认在下面中间(cb)的位置。

2. 文本对齐方式如下图：

<img src="./images/md/text_align.png"/>

3. 文本基线如下图：

<img src="./images/md/text_baseline.png"/>

4. 自定义偏移量
除上述三种方式，还可以通过设置：**textOffsetX**  和 **textOffsetY** 属性来设置文本的水平和垂直偏移量。


下面的代码展示了不同位置和对齐方式的组合：


```


var stage = new Stage('divId');
var layer = new Layer('default');
stage.addChild(layer);


// 文字定位由三个属性：1. 位置 2. 文本对齐方式 2. 文本基线
// 教程：http://www.jtopo.com/tutorial.html#41-文本和定位
// 参考：HTML5-Canvas：https://www.w3school.com.cn/tags/canvas_textbaseline.asp

/*
 * 位置表示： 水平（left-center-right) 垂直(top-middle-bottom)
 * lt : left-top	左上
 * ct : center-top  正上
 * rt : right-top   右上
 
 * lm : left-middle  左中
 * center : center   正中-中心
 * rm : right-bottom 右中
 * 
 * lb : left-bottom   左下
 * cb : center-bottom 正下
 * rb : right-bottom  右下
 * 
 */
var positions = [
  'lt', 'ct', 'rt', 
  'lm', 'center', 'rm', 
  'lb', 'cb', 'rb'];


var textAligns = ['center', 'left', 'right'];

var textBaselines = ['top', 'middle', 'bottom'];

var count = 0;

for (var i = 0; i < positions.length; i++) {
    for (var a = 0; a < textAligns.length; a++) {
        for (var b = 0; b < textBaselines.length; b++) {

            var node = new Node('T', 0,0, 30, 30);

            node.css({
              	'backgroundColor': randomColor(),
                textPosition: positions[i],
                textAlign: textAligns[a],
                textBaseline: textBaselines[b],
                fontColor: 'black',
            });
          	
            // 更细致的控制：水平和垂直方向的偏移量。
          	//node.textOffsetX = 5;
           // node.textOffsetY = 5;
          
            // 开始不好记忆，没关系
            // 可以把本例子当做字典，需要定位时，找一个满意的 'T' 所在的节点
            // 点击节点，查看具体的设置
            node.on('click', function () {
                var msg = 'textPosition: ' + this.getStyle('textPosition') + '\n' +
                    'textAlign:      ' + this.getStyle('textAlign') + '\n' +
                    'textBaseline: ' + this.getStyle('textBaseline');
                alert(msg);
            });

            layer.addChild(node);
        }
    }
}

// 9 x 9 的网格
var gridLayout = new GridLayout(9, 9);

gridLayout.setMargin(20, 20);
gridLayout.setCenter(stage.width*0.5, stage.height*0.5);
gridLayout.doLayout(layer.children);

stage.show();
```

执行结果:

<img src="./images/md/text_positions.png"/>

### 6.2. 容器

jtopo拥有强大的组合能力，每个Node都可以作为容器使用。

容器内的左上角，对于子元素来说就是子元素的原点（0，0)。

```js

// jtopo拥有强大的组合能力，
// 1. 每个Node或Link都可以作为容器使用
// 2. Link可以作为Node子元素，反之亦可以

// jtopo坐标系统：
// 1. 以Node为父容器时，父容器的左上角为坐标系原点[0,0]
// 2. 以Link为父容器时，坐标系原点表示法[线段索引, t值比例]
// 教程参考：http://www.jtopo.com/tutorial.html#47-jtopo坐标系统

var Layer = Layer;
var Node = Node;
var CircleNode = CircleNode;
var FoldLink = jtopo.FoldLink;

var stage = new Stage('divId');
var layer = new Layer('default');
stage.addChild(layer);

// 全局样式
layer.css({
    'font': '12px arial',
});

// 容器内的左上角，相对于子元素来说就是原点（0，0）
var container1 = new Node('最底层', 150, 150, 500, 400);
var container2 = new Node(null, 80, 80, 400, 300);
var container3 = new Node('最上层', 160, 160, 200, 100);

container1.css({
    'backgroundColor': '#3586E3',
    'borderWidth': 2
});
container2.css({
    'backgroundColor': '#FDD163',
    'borderColor': null, // 无边框
});
container3.css({
    'backgroundColor': '#D73417',
    'borderColor': 'black'
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
tip.css('background', '#FDD163');
tip.css('fontColor', '#D73417');
tip.css('strokeStyle', '#3586E3');
tip.translateTo(container2.width, 0);
tip.rotateTo(Math.PI / 4);
container2.addChild(tip);

var cantOutNode = new Node('出不去', 30, 30, 40, 40);
cantOutNode.setImage('./demo/img/laptop.png');
cantOutNode.css('fontColor', 'white');
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
    'borderWidth': 5,
    'borderColor': 'black'
});

// 可以通过调整zIndex改变显示的先后顺序（同级别之间有效）
link.zIndex = 2;
container3.zIndex = 1;
toNode.zIndex = 3;
cantOutNode.zIndex = 3;
container2.addChild(link);
container3.addChild(cantOutNode);

// 把一个圆形节添加到Link中，作为Link的子节点
{
    let circleNode = new CircleNode();
    circleNode.setRadius(6);
    circleNode.css({
        'borderWidth': 10,
        'borderColor': 'black',
        'backgroundColor': container2.style.fillStyle
    });
    circleNode.draggable = false;
    
    // 设置原点：[线段索引，在线段上的位置0-1, 例如：[0, 1]：表示在FoldLink的第一条线段的终点
    // [1, 0.5]：表示在FoldLink的第二条线段的中心点
    circleNode.origin = [1, 0];
    link.addChild(circleNode);
}

stage.show();
```

<img src="./images/md/container.png"/>

基于容器的概念，为多个Node组装成复杂对象提供了很大便利。

### 6.3. 连接点
连线可以连接到节点的不同位置上，节点默认有10个’连接点‘，通过 node.getPosition(name); 可以获取指定位置的坐标；

<img src="./images/md/positions.png"/>

如图：灰色矩形代表节点，上面标注了9个连接点（和文本定位是一样的），另外还有一个动态的连接点：edge表示节点的边框，是随着对端节点的位置自动计算出来的。


```js
/*
 * 位置表示： 水平（left-center-right) 垂直(top-middle-bottom)
 * lt : left-top	左上
 * ct : center-top  正上
 * rt : right-top   右上
 
 * lm : left-middle  左中
 * center : center   正中-中心
 * rm : right-bottom 右中
 * 
 * lb : left-bottom   左下
 * cb : center-bottom 正下
 * rb : right-bottom  右下
 * 
 * nearest: 两节点边框上最靠近的位置，不是固定的
 */

// 示例1
var position1 = 'center';
var position2 = 'ct';
var link = new Link(null, nodeA, nodeZ, position1, position2);
// 或者:
var link2 = new Link(null, nodeA, nodeZ, 'center', 'rb');
// ...
///

```

参考：

<img src="./images/md/linkpositions.png"/>

参考：<a href="http://www.jtopo.com/demo.html#LinkPosition" target="_blank">连接点演示</a>

### 6.4. 自定义属性
如果需要在节点或者连线上添加自定义的属性, 方法如下： 

``` 
    // 直接修改、读取属性 userData
    node.userData = {...};
``` 

所有节点和连线，名字为 **userData** 的属性jtopo不会做任何改动

**避免直接在对象上增加属性，这样避免了属性冲突和一些奇怪的问题，便于以后升级**


### 6.5. 自定义节点

```js
// 这里演示用简单节点组合为复杂节点

import {
    Stage,
    Layer,
    Node,
    CircleNode,
    HtmlImage
} from './download/jtopo-1.4.6_trial-esm-min.js';

var stage = new Stage('divId');
var layer = new Layer();
stage.addChild(layer);

function newMyNode(type, item) {
    var circle = new CircleNode('', 300, 300);
    circle.css({
        border: '1px dashed gray',
    });
    circle.setImage('./demo/img/laptop.png');
    circle.setRadius(25);

    var rect = new Node(type);
    rect.resizeTo(50, 25);
    rect.css({
        border: '2px gray solid',
        borderRadius: 10,
        textBaseline: 'middle',
        textPosition: 'center',
        backgroundColor: 'white'
    });
    rect.setXY(circle.width / 2 - rect.width / 2, circle.height + 3);

    var tableNode = new Node('', 100, 100);

    var htmlImage = new HtmlImage(`
<div xmlns="http://www.w3.org/1999/xhtml"
    style="height:97%;background-color:white; border:2px white solid;">
	<ul style="padding-left:20px;text-align:left;font-size:10px;">
	  	<li>${item}1    13:11</li>
	   	<li>${item}2    12:13</li>
 		<li>${item}3    13:13</li>
		<li>${item}4    14:12</li>
	</ul>
<div>`, 100, 100);
    tableNode.setImage(htmlImage, true);
    tableNode.setXY(-circle.width / 2, rect.y + rect.height);

    // 三者的包含关系
    circle.addChild(rect);
    circle.addChild(tableNode);

    // 锁定（子节点不再独立响应鼠标了，类似组合为一体的效果）
    circle.frozen = true;
    return circle;
}

let node = newMyNode('组合1', 'KK001');
let node2 = newMyNode('组合2', 'DD05');

node.setXY(100, 100);
node2.setXY(300, 100);

layer.addChild(node);
layer.addChild(node2);

stage.show();
```

执行结果：

<img src="./images/md/custom_node.png"/>


### 6.6. jtopo坐标系统

#### 6.6.1. 理解坐标系：
1. 画布坐标系：以canvas的左上角为原点0,0，固定永不变，不受浏览器缩放、滚动的影响。
2. 对象坐标系：以父容器的左上角为原点0,0, 相对坐标。 

对象坐标系举例：

    一个节点的x,y属性为2,2，直接父容器为Layer。

    Layer会随着鼠标的拖拽和缩放变化，节点在屏幕上的像素位置也跟着变化，但节点的x,y属性仍旧为2,2。

坐标转换举例：

```
   node.toStageXY(0, 0);          // 将获取节点左上角在画布坐标系（cavnas）上的坐标
   
   node.toStageXY(node.width, node.height) // 获取节点右下角在画布坐标(canvas)
   
   node.stageToLocalXY(100, 100) // 画布坐标(100,100)，转成node本地坐标
   
   layer.stageToLocalXY(100, 100) // 画布坐标100，100），转成layer的本地坐标
```

#### 6.6.2. 坐标原点: origin

仅当父容器对象为节点的时候，origin 的含义如下：

    origin = [坐标系原点x, 坐标系原点y]

例如:
```
    // 父容器为节点的时候
    let parent = new Node(...);
    let child = new Node(...);
    parent.addChild(child);
    child.origin = [3,3];
```
虽然可以这么做，但一般情况下父容器节点时并不需要，只需要修改child的x、y值即可.

当父节点为Link的时候，origin的重要性才能体现出来，origin的含义如下：

    origin = [线段索引，在线段上的位置0-1]

例如：
```
    let parent = new Link(...);
    let child = new TextNode(...);

    // child的原点将在线上的中心
    child.origin = [0, 0.5];
    parent.addChild(child);
```

线段索引的值不能等于或大于线段条数, 不同类型的连线线段条数 :

    1. Link、ArcLink、CurveLink、BezierLink 只有1条线段
    2. FoldLink 有2条线段
    3. AutoFoldLink 则有5条线段

更多示例:
```
    // child.parent 是 连线对象时
    child.origin = [0, 0.5]：表示在连线的第一条线段的中心点
    child.origin = [0, 0]：表示在连线的第一条线段的开始点
    child.origin =  [0, 1]：表示在连线的第一条线段的结束点 
    child.origin = [1, 0.5]：表示连线的第二条线段的中心点
```

## 7. 高级功能
### 7.1. 位置计算

Node 或 Link对象有一个getPoint(t)方法, t取值范围:[0-1]，可以获取对象上某一点的坐标。

对于Node, t在0-1期间的轨迹为矩形的一周：可以获取节点边框上任意一点:

<img src="./images/md/node_t.png"/>

例如：t = 0.25的时候，取矩形右上角的坐标，t=0.5的时候表示右下角的坐标。

对于矩形，t=0 和 t=1 两个点是重叠的。

<img src="./images/md/link_t.png"/>

对于Link，t在0-1期间的轨迹为起点到终点。

例如：t = 0时表示起点，t = 1时表示终点， t = 0.5时表示中点。


```js
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
        'backgroundColor': color,
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
    var p = node.getPoint(t/3);
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
```

执行结果：

<img src="./images/md/getpoint.png"/>

### 7.2. 性能优化
* 尽量减少画布上显示的对象个数（效果极为明显）;
    数据量较多时可以考虑：滚动展示 + 搜索功能

* 减少文本信息，文字的渲染非常耗时;
    **a)** 允许的话，先把文字隐藏，鼠标指向时再显示（效果非常明显）
    **b)** 可以考虑事先用画图软件把文字绘制到节点图片上（效果非常明显）

* 可以使用SVG作为图片，但性能比较差;
    事先把SVG转成png图片会更好
    
* 当画面不够流畅时，放弃阴影效果
    也可以考虑预先制作好有阴影效果的png

### 7.3. 辅助绘图

绘图时，可能会遇到复杂的坐标计算, jtopo提供了一个名为'Topo画家’的类来降低部分计算难度。


```js
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
```

如果用于自定义节点的内容绘制，记得节点的左上角为原点(0,0)

执行效果：

<img src="./images/md/topo_painter.png"/>

## 8. 七、保存、加载

### 8.1. 保存

```
    // 保存
    let json = layer.toFileJson();    
    
```

### 8.2. 加载
```
    // 加载
    layer.openJson(json);
    
```

### 8.3. 例子
```
var stage = new Stage('divId');
var layer = new Layer();

stage.addChild(layer);

// 创建节点连线
var fromNode = new Node('From', 200, 200, 48, 48);
fromNode.setName('jack');
fromNode.setImage('./demo/img/node1.png');

var toNode   = new Node('To');
toNode.setXY(400, 200);
toNode.resizeTo(48, 48);
toNode.setImage('./demo/img/node2.png');

var link = new Link('Link',fromNode,toNode);
link.css('borderWidth', 2);

layer.addChild(fromNode);
layer.addChild(toNode);
layer.addChild(link);


// 保存
var json = layer.toFileJson();

// 加载
layer.openJson(json);

// 一些引用已经没有了，需要通过find获取json序列化后的内容
let afterFromNode = layer.find('name', 'jack')[0];
console.log(afterFromNode.text);

stage.show();
```

参考：<a href="http://www.jtopo.com/demo.html#Serializer" target="_blank">保存加载演示</a>

## 9. 导出图片、下载、缩略图

### 9.1. 图片导出


```js
    stage.saveImageInfo();
```
### 9.2. 下载为json文件(目前仅支持单个Layer的场景)
```js
    stage.download(文件名); // 例如: stage.download('abc.json');
```

### 9.3. 缩略图控制
```js
     /**
     * 显示缩略图 （所在div的css属性position为 absolute）
     * <pre>
     * 可通过css样式来定位，例如：
     * */
    stage.showOverview({
        left: 0,
        bottom: -1
    });

    // 隐藏缩略图
    stage.hideOverview(); 

```




