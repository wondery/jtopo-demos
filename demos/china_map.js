import {
    jtopo,
    Stage,
    Layer,
    Node,PolygonNode,
    Link,BezierLink,Tooltip,
    randomColor,
} from './download/jtopo-1.4.6_trial-esm-min.js';

var stage = new Stage('divId');
var layer = new Layer();
stage.addChild(layer);

var nodeMap = {};

// 地图局部，数据来源互联网，只是技术点演示，不涉及其他任何其他问题（数据精确度、是否完善等）
// 绘制
function draw(data) {
    data.features.forEach(function (feature) {
        var properties = feature.properties;
        var name = properties.name;
        var type = feature.geometry.type;

        if (type == 'Polygon') {
            var coordinates = feature.geometry.coordinates[0];
            addPolygonNode(name, coordinates, properties);
        } else if (type == 'MultiPolygon') {
            var coordinatesArr = feature.geometry.coordinates[0];
            coordinatesArr.forEach(function (coordinates) {
                addPolygonNode(name, coordinates, properties);
            });
        }
    });
    stage.show();
    stage.translateToCenter();
    stage.showOverview();

    addLink('北京', '河南', 'orange');
    addLink('河南', '山东', 'orange');
    addLink('山东', '上海', 'orange');

    addLink('河南', '云南', 'orange');
    addLink('河南', '宁夏', 'orange');

    addLink('四川', '青海', 'blue');
    addLink('青海', '新疆', 'blue');

}

function addPolygonNode(name, coordinates, properties) {
    coordinates = coordinates.map(function (c) {
        return [c[0] * 10, -c[1] * 10];
    });

    // 使用多边形节点 PolygonNode
    var node = new PolygonNode(name);
    node.setUserData(properties);
    node.draggable = false;
    // 设置多边形节点的坐标数组
    node.setCoordinates(coordinates);
    node.css({
        'textPosition': 'center',
        'textBaseline': 'middle',
        'color': 'white',
        'font': '3px arial',
        'borderWidth': 1,
        'lineJoin': 'round',
        'borderColor': 'black',
        'background': randomColor()
    });

    // demo简单，不去自动计算了
    if (name == '内蒙古') {
        node.textOffsetY = 30;
    }
    if (name == '河北') {
        node.textOffsetX = -10;
    }
    if (name == '甘肃') {
        node.textOffsetY = -10;
    }
    nodeMap[name] = node;
    // 增加鼠标悬信息浮框
    addTooltip(node);

    layer.addChild(node);
}

function addLink(from, to, color) {
    var fromNode = nodeMap[from];
    var toNode = nodeMap[to];
    var name = '';

    var link = new BezierLink(name, fromNode, toNode);
    link.css({
        'borderColor': color,
        'lineDash': [6, 2]
    });
    link.mouseEnabled = false;
    link.zIndex = fromNode.zIndex + 1;
    layer.addChild(link);

    flowLink(link);
}


// 加载数据，完成后调用draw绘制
fetch('./demo/data/china_map.json')
    .then(response => response.json())
    .then(draw);


// 连线流动
function flowLink(link) {
    var offset = 0;
    setInterval(function () {
        if (++offset > 16) offset = 0;

        link.css({
            lineDashOffset: -offset
        });
        
        layer.update();
    }, 1000 / 24);
}


// ---------- 下面是增加交互，可有可无 ----------
// 鼠标放到节点上，会出现一个漂浮的信息框
var tooltip = new Tooltip(stage);
tooltip.setHtml();

function addTooltip(node) {
    var properties = node.getUserData();

    node.on('mousemove', function (event) {
        let details = event.details;
        let html = `
        <div>业务信息:
        <ul style="padding-left:20px">
            <li>地区 : <span style="color:green;">${properties.name}</span></li>
            <li>参数 : <span style="color:orange;">123</span></li>
            <li>参数2 : <span style="color:red;">456</span></li>
            <li>参数3 : <span style="color:blue;">xxx</span></li>
        </ul>
        </div>`;
        tooltip.setHtml(html);
        tooltip.showAt(details.x, details.y);
    });
}