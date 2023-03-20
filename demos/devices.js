import {
    Stage,
    Layer,
    Node,
    Link, FoldLink, FlexionalLink,
    TipNode,
} from './download/jtopo-1.4.6_trial-esm-min.js';

var stage = new Stage('divId');
var layer = new Layer();
layer.css({
    background: "white url('./demo/img/grid.png') repeat",
});

stage.addChild(layer);

var nodes = [];
var links = [];

function node(x, y, img, text){
    var node = new Node(text);
    node.setImage('./demo/img/statistics/' + img, true);                
    node.translateTo(x, y);
    nodes.push(node);
    return node;
}

function linkNode(nodeA, nodeZ, f){
    var link;
    if(f){
        link = new FoldLink(null, nodeA, nodeZ);
    }else{
        link = new Link(null, nodeA, nodeZ);
    }
    link.direction = 'vertical';
    links.push(link);
    return link;
}

function hostLink(nodeA, nodeZ){                
    var link = new FlexionalLink (null, nodeA, nodeZ); 
  	link.direction = 'vertical';
    links.push(link);
    return link;
}



var s1 = node(305, 43, 'server.png');
s1.alarm = '2 W';
var s2 = node(365, 43, 'server.png');
var s3 = node(425, 43, 'server.png');

var g1 = node(366, 125, 'gather.png');
linkNode(s1, g1, true);
linkNode(s2, g1, true);
linkNode(s3, g1, true);

var w1 = node(324, 167, 'wanjet.png');
linkNode(g1, w1);
            
var c1 = node(364, 214, 'center.png');
linkNode(w1, c1);

var cloud = node(344, 259, 'cloud.png');
linkNode(c1, cloud);

var c2 = node(364, 328, 'center.png');
linkNode(cloud, c2);

var w2 = node(324, 377, 'wanjet.png');
linkNode(c2, w2);

var g2 = node(366, 411, 'gather.png');
linkNode(w2, g2);


var h1 = node(218, 510, 'host.png', 'vm1');
h1.alarm = '';
hostLink(g2, h1);
var h2 = node(292, 510, 'host.png', 'vm2');
hostLink(g2, h2);
var h3 = node(362, 510, 'host.png', 'vm3');
hostLink(g2, h3);
var h4 = node(447, 510, 'host.png', 'vm4');
hostLink(g2, h4);
var h5 = node(515, 510, 'host.png', 'vm5');
hostLink(g2, h5);

layer.addChilds(links);
layer.addChilds(nodes);


var alarm = new TipNode(" M1 ");
alarm.css('background', 'green');
alarm.css('borderColor', 'green');
alarm.translateTo(20, 0);
s1.addChild(alarm);

h4.addChild(new TipNode(" warning "));

stage.show();