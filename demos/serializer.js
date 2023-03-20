import {
    Stage,
    Layer,
    Node,
    Link,
} from './download/jtopo-1.4.6_trial-esm-min.js';


var stage = new Stage('divId');
var layer = new Layer();

stage.addChild(layer);


// 创建一个节点：new Node('文本', x，y，宽度, 高度)';
// 所有参数都是可选项，也可以稍后赋值
var fromNode = new Node('From', 200, 200, 48, 48);
fromNode.setName('jack');

// 设置图片
fromNode.setImage('./demo/img/node1.png');

// 创建另一个节点
var toNode   = new Node('To');

// x,y
toNode.setXY(400, 200);

// 大小
toNode.resizeTo(48, 48);

toNode.setImage('./demo/img/node2.png');

// 连线 new Link('文本',开始节点,结束节点);
var link = new Link('Link',fromNode,toNode);

// 设置样式：粗细
link.css('borderWidth', 2);

// 将节点和连线都加入到Layer中
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