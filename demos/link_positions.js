import {
    Stage,
    Layer,
    Node,
    BezierLink,
    CircleNode,
    CircleLayout,
    randomColor
} from './download/jtopo-1.4.6_trial-esm-min.js';


var stage = new Stage('divId');
var layer = new Layer();
stage.addChild(layer);
// 全局样式
layer.css({
    'shadowColor': '#E1E1E1',
    'shadowBlur': 5,
    'shadowOffsetX': 3,
    'shadowOffsetY': 3,
    'font': 'bold 10px arial'
});
// Link可以连接到Node上的不同位置

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
 * nearest : nearest  两节点边框上最接近的位置
 */
var positions = [
  'lt', 'ct', 'rt', 
  'lm', 'center', 'rm', 
  'lb', 'cb', 'rb', 
  'nearest'];

var nodes = [];

function addNode(text){
	var node = new Node(text, 50, 150, 36, 36);
	node.css('font', '13px arial');
	layer.addChild(node);
  node.css('background', randomColor());
  	nodes.push(node);
	return node;
}

function addLink(nodeA, nodeZ, index){
  	var positionA = positions[index];
  	nodeZ.text = positionA;
  	
	var link = new BezierLink(null, nodeA, nodeZ, 'center', positionA);
	
	link.css('font', 'bold 13px arial');
  	//link.css('borderWidth', 2);
	layer.addChild(link);
	return link;
}

var centerNode = new CircleNode('center', stage.width/2, stage.height/2, 50, 50);
centerNode.css('background', randomColor());
centerNode.css('font', 'bold 12px arial');
layer.addChild(centerNode);

for(var i=0; i<positions.length; i++){
	var node = addNode();
	addLink(centerNode, node, i);
}

var layout = new CircleLayout();
layout.setCenter(stage.width/2, stage.height/2);
layout.setMinRadius(180);
layout.doLayout(nodes);

stage.show();