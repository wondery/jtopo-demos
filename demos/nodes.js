// 频繁用到的先导入一下，减少打字数
import {
    jtopo,
    Stage,
    Layer,
    Node,
    CircleNode,
    Animation,
    TextNode,
    VideoNode,
    PolygonNode,
    RatioNode,
    randomColor,
} from './download/jtopo-1.4.6_trial-esm-min.js';

// 根据一个现有的DIV的ID来创建顶层'场景‘对象：Stage
var stage = new Stage('divId');

// 一个Stage下面可以有多个'层',Layer
var layer = new Layer();

// 全局样式
layer.css({
    font: 'bold 11px arial',
    background: "white url('./demo/img/grid.png') repeat",
});

// 一般步骤，将Layer放入到‘场景’中
stage.addChild(layer);

var node = new Node('Node');
// 节点的坐标
node.setXY(84, 50);
// 尺寸
node.resizeTo(40, 40);
// 线型
node.css({
    border: '1px solid black',
    lineDash: [6, 2]
});

// 圆形节点
{
    var circleNode = new CircleNode('Circle', 181, 48);
    // 半径
    circleNode.setRadius(25);

    circleNode.css({
        border: '2px solid gray',
        background: '#00B5AD',
        textPosition: 'center',
        textBaseline: 'middle',
        color: 'white',
    });
}

var imgNode = new Node('Image or SVG', 300, 48, 40, 40);
imgNode.setImage('./demo/svg/demo.svg');
imgNode.css({
    backgroundSize: '100% 100%',
});

var rotateNode = new Node('Rotate', 425, 53, 40, 40);
rotateNode.rotateTo(0.2);
// 圆角半径
rotateNode.roundRadius = 10;
rotateNode.css({
    border: '2px solid gray',
    textPosition: 'ct',
    textAlign: 'center',
    textBaseline: 'bottom',
    color: 'rgba(255,0,0,0.7)'
});

var textNode = new TextNode('This is a\nTextNode with \ntext warp.', 81, 283);

textNode.autoSize = true;

textNode.css({
    padding: 5,
    lineHeight: 12,
    border: 'solid 2px #E1E1E1',
    font: 'italic 12px arial',
    color: 'rgba(0, 154, 147,1)'
});

// 节点可以组合，下面创建一个TipNode，作为另外一个节点的角标
var tipNode = new CircleNode('3');
tipNode.css({
    border: '1px solid #E1E1E1', // 边框颜色
    background: 'red', // 填充颜色：红色
    textPosition: 'center', // 文本位置：居中
    textBaseline: 'middle', // 文本定位基线，参考:html5-canvas API
    color: 'white' // 文本颜色
});
// 圆节点的半径
tipNode.setRadius(8);

// 平移中心点到imgNode的右上角
// 子节点的坐标是相对于父节点的,
// 比如子节点的坐标为0,0的话，显示出来就位于父节点的左上角
tipNode.translateCenterTo(imgNode.width, 0);
tipNode.draggable = false;

// 把上面创建的红色圆角标作为imgNode的子节点
imgNode.addChild(tipNode);

// 视频节点
var videoNode = new VideoNode('视频双击', 80, 346, 100, 60);
// 封面图片：未播放时显示
videoNode.setImage('./demo/img/camer.png');
// 视频源：支持类型参考各浏览器，MP4、mov等
videoNode.setVideo('./demo/video/video_demo.mov');
videoNode.textOffsetY = 5;

// 双击播放
videoNode.on('dblclick', function () {
    videoNode.play();
});
// 播放结束,显示封面图片
videoNode.onEnded(function () {
    videoNode.showCover();
});

for (var i = 3; i < 8; i++) {
    var polyNode = new PolygonNode('多边_' + i, i * 90 - 200, 165, 50, 50);
    polyNode.css({
        'background': randomColor(),
        'color': 'black',
        'border': '#E1E1E1 3px solid',
    });
    polyNode.textOffsetY = 5;
    polyNode.edges = i;
    polyNode.roundRadius = 6;
    layer.addChild(polyNode);
}

// 将上面的节点都放入Layer, 这里统一放了，实际上节点创建后就可以放入了
layer.addChild(videoNode);
layer.addChild(circleNode);
layer.addChild(node);
layer.addChild(imgNode);
layer.addChild(rotateNode);
layer.addChild(textNode);

var htmlNode = new Node('HTML混合', 228, 283, 250, 130);

// 创建一个Html作为图片对象
var htmlImage = new jtopo.HtmlImage(`
<div xmlns="http://www.w3.org/1999/xhtml"
    style="height:97%;background-color:#eeeeee; border:2px white solid;">

	<center><h4 style="color:orange;margin:0px;">居中标题</h4></center>

	<ul style="text-align:left;background-color:#65472f;font-size:14px;">
	  <li style="color:#e9d9bf"><i>斜体-颜色-E9D9BF</i></li>
	  <li style="color:white"><strong>加粗-白色</strong></li>
	</ul>

    <img src="./demo/img/laptop.png" width="40" height="30"/>
<div>`, htmlNode.width, htmlNode.height);
//顶层div的 xmlns 属性必须指定
//支持的html特性有限，需要开发时做测试验证

// 使用html类型的图片对象
htmlNode.setImage(htmlImage);
layer.addChild(htmlNode);

var ratioNode = new RatioNode('', 83, 465, 100, 33);
ratioNode.ratio = 0;

ratioNode.css({
    color: 'black',
    border: '2px solid gray',
    padding: 1,
    ratioColor: 'orange',
});

layer.addChild(ratioNode);


var ratioNode2 = new RatioNode('', 283, 465, 80, 40);
ratioNode2.ratio = 0.65;
ratioNode2.direction = 'up';
ratioNode2.css({
    border: '2px solid black',
    ratioColor: 'gray'
});

layer.addChild(ratioNode2);

// 最后一步：显示出来
stage.show();

// 循环变化： n在5000毫秒内，从0逐渐变为1，然后从1变为0，循环10次
new Animation(0, 1, 5000, function (n) {
    // 用n来修改节点虚线的偏移，实现流动效果
    node.css('lineDashOffset', n * 100);

    // 用n来修改节点的旋转
    rotateNode.rotateTo(n * Math.PI * 2);

    // 用n来修改节点的红色角标
    tipNode.text = '' + Math.ceil(n * 10);

    ratioNode.css({
        'ratioColor': n > 0.8 ? 'orange' : 'green'
    });
    ratioNode.ratio = n;
    ratioNode.text = Math.round(n * 100) + '%';
    ratioNode2.ratio = n;
    // 重绘
    layer.update();
}).play();