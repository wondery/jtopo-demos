import {
    Stage,
    Layer,
    Node,
    Link,randomColor,
} from './download/jtopo-1.4.6_trial-esm-min.js';


var stage = new Stage('divId');
var layer = new Layer();

layer.css({
    'background': "white url('./demo/img/grid.png') repeat",
});

// 节点数量
var nodeCount = 1000;
var nodeSize = 24;
var xyRange = nodeCount;

function rand(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function createNode(x, y, text) {
	var node = new Node('text'+x, x, y, nodeSize, nodeSize);
	node.css('background', randomColor());
    //node.setImage('./demo/img/laptop.png');
	return node;
}

function createLink(nodeA, nodeZ) {
	var link = new Link(null, nodeA, nodeZ);
	return link;
}

var childs = [];

var beginTime = (new Date()).getTime();

function randNode(){
	var  n = nodeCount  / 2;
  
	for (var i = 0; i < n; i++) {

		var x = rand(-xyRange, xyRange);
		var y = rand(-xyRange, xyRange);
		var nodeFrom = createNode(x, y);

		var x2 = rand(-xyRange, xyRange);
		var y2 = rand(-xyRange, xyRange);
		var nodeTo = createNode(x2, y2);

        //  连线的数量
		//var link = createLink(nodeFrom, nodeTo);
		//childs.push(link);
      
		childs.push(nodeFrom);
		childs.push(nodeTo);
	};
}
randNode();

layer.addChilds(childs);
stage.addChild(layer);
stage.show();

var usedTime = ((new Date()).getTime() - beginTime);
var s = '总数量: ' + childs.length + '  用时: ' + usedTime + ' 毫秒.'
msg(s);

function msg(s) {
    s += '<br/>当前为试用版, 图元总数量限制在1000个以内，超出1000不生效.';
	document.getElementById('tip_msg').innerHTML = s;
}
//stage.translateToCenter();
//stage.showOverview();
//stage.zoomFullStage();