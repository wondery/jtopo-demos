import {
    jtopo,
    Stage,
    Layer,
    Node,
    Link,
    randomColor,
} from './download/jtopo-1.4.6_trial-esm-min.js';

var CircleNode = CircleNode;
var FoldLink = jtopo.FoldLink;

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

var nodes = [];
var links = [];

function node(x, y, img, name) {
    var node = new Node(name);
    node.setImage('./demo/img/pstn/' + img, true);
    node.translateTo(x, y);
    nodes.push(node);
    return node;
}

function linkNode(nodeA, nodeZ, text) {
    var link = new FoldLink(text,nodeA, nodeZ);
    link.css({
        'borderWidth': 3,
        'borderColor' : randomColor()
    });
    links.push(link);
    return link;
}

var s1 = node(49, 41, 'satellite_antenna.png', 'Satellitte Feed');
var s2 = node(57, 136, 'antenna.png', 'Off air');
var s3 = node(57, 251, 'msc.png', 'Programing');

var r1 = node(143, 43, 'router.png');
var r2 = node(143, 63, 'router.png');
var r3 = node(143, 83, 'router.png');
var r4 = node(143, 103, 'router.png');
var r5 = node(143, 123, 'router.png', 'Encoder');

var r6 = node(243, 123, 'router.png', 'Scrambler');
linkNode(r1, r6);
linkNode(r2, r6);
linkNode(r3, r6);
linkNode(r4, r6);
linkNode(r5, r6);

var r7 = node(143, 180, 'router.png');
var r8 = node(143, 200, 'router.png');
linkNode(r7, r6);
linkNode(r8, r6);

var dataCloud = node(316, 113, 'cloud.png');
links.push(new Link(null,dataCloud, r6));

var tw130 = node(436, 107, 'tw130.png');
links.push(new Link(null,tw130, dataCloud));

var pstn = node(316, 176, 'cloud.png');
linkNode(pstn, tw130);

var wdm = node(525, 114, 'wdm.png', 'WDM');
links.push(new Link(null,wdm, tw130));

var testing = node(568, 128, 'testing.png');
links.push(new Link(null,testing, wdm));

var wdm2 = node(607, 114, 'wdm.png', 'WDM');
links.push(new Link(null,wdm2, testing));

var mainframe = node(654, 152, 'mainframe.png');
linkNode(mainframe, wdm2);

var phone = node(738, 173, 'phone.png', 'Phone');
linkNode(phone, mainframe);

var host = node(730, 225, 'host.png', 'Pc');
linkNode(host, mainframe);

var router2 = node(706, 282, 'router2.png', 'STB');
linkNode(router2, mainframe);

var terminal = node(669, 326, 'terminal.png', 'IPTV/SDV');
linkNode(terminal, router2);

var modem = node(623, 49, 'modem.png', 'Modem');
var pc = node(742, 7, 'host.png');
var router3 = node(671, 73, 'router2.png');
var terminal3 = node(736, 100, 'terminal.png');

linkNode(pc, modem);
linkNode(router3, modem);
linkNode(terminal3, router3);

layer.addChilds(links);
layer.addChilds(nodes);

var r2Alarm = new jtopo.TipNode('2 M');
r2.addChild(r2Alarm);

var alarm1 = new jtopo.TipNode("1 M");
testing.addChild(alarm1);

var alarm2 = new jtopo.TipNode("2 M");

alarm2.css('background', 'green');
router2.addChild(alarm2);

stage.show();
stage.translateToCenter();

// 动画
var link = links[4];
link.css({
    'lineDash': [6, 4],
    'borderColor': 'red'
});

new jtopo.Animation(0, 1, 10000, function (n) {
    link.css({
        'lineDashOffset': n * 100
    });
    layer.update();
}).play();