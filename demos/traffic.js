import {
    jtopo,
    Stage,
    Layer,
    Node, CircleNode, TextNode,
    Link,Tooltip
} from './download/jtopo-1.4.6_trial-esm-min.js';


var stage = new Stage('divId');
var layer = new Layer();
stage.addChild(layer);


// 鼠标指向小提示
var tooltip = new Tooltip(stage);
tooltip.setHtml(`
<div>站点信息:
<ul style="padding-left:20px">
    <li>状态 : <span style="color:green;">良好</span></li>
    <li>参数 : <span style="color:orange;">123</span></li>
    <li>参数2 : <span style="color:red;">456</span></li>
    <li>参数3 : <span style="color:blue;">xxx</span></li>
</ul>
</div>`);

// key: id, value: Node
var stationMap = {};
var childs = [];

function draw(data) {

    // 站点标签
    data.labels.forEach(function (label) {
        var node = new TextNode(label.text, label.x, label.y);
        node.mouseEnabled = false;
        childs.push(node);
    });

    //  圆形站点
    data.stations.forEach(function (station) {
        var node = new CircleNode(null, station.x, station.y, 12);
        node.css('background', 'white');
        stationMap[station.id] = node;
        childs.push(node);

        // 增加鼠标悬信息浮框
        node.on('mousemove', function (event) {
            var eventDetails = event.details;
            // +5 ,防止遮挡住鼠标
            tooltip.showAt(eventDetails.x + 5, eventDetails.y + 5);
        });
    });

    // 线路
    data.lines.forEach(drawLine);

    layer.addChilds(childs);
    stage.show();
    stage.showOverview();
    stage.zoomFullStage();
}

function drawLine(line) {
    var preNode = null;

    line.stations.forEach(function (idOrObj) {
        var id = idOrObj.id ? idOrObj.id : idOrObj;

        var nextNode = stationMap[id];
        if (preNode == null) {
            preNode = nextNode;
            return;
        }

        var link = new Link(null, preNode, nextNode);

        link.css({
            borderWidth: 8,
            borderColor: line.color,
            font: 'bold 11px arial'
        });

        if (Math.random() > 0.95) {
            alarmLink(link);
        }
        childs.push(link);
        preNode = nextNode;
    });

}

// 加载数据，完成后调用draw绘制
fetch('./demo/data/Shanghai_Metro.json')
    .then(response => response.json())
    .then(draw);


// 动画
function alarmLink(link) {
    var alpha = 1;
    var v = 1 / 24;
    setInterval(function () {
        alpha += v;
        if (alpha > 1 || alpha < 0.3) {
            v = -v;
        }
        link.css({
            lineDash: [6, 2],
            borderColor: 'rgba(255,128,128,' + alpha + ')',
        });
        layer.update();
    }, 1000 / 24);
}