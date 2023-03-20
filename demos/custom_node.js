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
layer.css({
    background: "white url('./demo/img/grid.png') repeat",
});
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