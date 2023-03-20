import {
    Stage,
    Layer,
    Node,
} from './download/jtopo-1.4.6_trial-esm-min.js';


var stage = new Stage('divId');
var layer = new Layer('default');
layer.wheelZoom = false; // 禁用默认的鼠标缩放

stage.addChild(layer);
stage.setMode('drag');
stage.hideToolbar();

// 只需创建少量节点（这里16个节点）
// 数据按需加载，有后台配合的话，可以无限滚动

function upateTileNode(node) {
    var level = 12;
    var beginX = 771;
    var beginY = 251;
    var tileSize = 256; // 瓦片尺寸

    node.x = node.tileX * tileSize;
    node.y = node.tileY * tileSize;

    var tileX = beginX + node.tileX;
    var tileY = beginY - node.tileY;

    // 百度的地图瓦片
    var url = 'http://online3.map.bdimg.com/tile/?qt=tile&x=' + tileX + '&y=' + tileY + '&z=' + level + '&styles=pl';
    node.setImage(url, true);
}

// 初始化瓦片图 4x4
var tileNodes = [];

function initTileNodes() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var node = new Node();
            node.tileX = j;
            node.tileY = i;
            layer.addChild(node);
            tileNodes.push(node);
        }
    }
}

// 绘制
function paintTiles() {
    tileNodes.forEach(upateTileNode);
}

// 上下左右滚动
function scroll(dx, dy) {
    tileNodes.forEach(function (node) {
        node.tileX += dx;
        node.tileY += dy;
    });
    paintTiles();
}


// 拖拽加载数据
stage.on('mousedrag', function (e) {
    var minNode = tileNodes[0]; // 左上角
    var maxNode = tileNodes[tileNodes.length - 1]; // 右下角

    if (layer.x + minNode.x > 0) {
        scroll(-1, 0);
    } else if (layer.x + maxNode.x + maxNode.width < stage.width) {
        scroll(1, 0);
    }

    if (layer.y + minNode.y > 0) {
        scroll(0, -1);
    } else if (layer.y + maxNode.y + maxNode.height < stage.height) {
        scroll(0, 1);
    }

});

initTileNodes();
paintTiles();

stage.show();