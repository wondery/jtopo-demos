import {
    Stage, Layer, Node,
    AutoFoldLink, Link,
    Tooltip,randomColor,
    TreeLayout, Graph,
} from './download/jtopo-1.4.6_trial-esm-min.js';

var stage = new Stage('divId');
var layer = new Layer();
layer.css({
    background: "white url('./demo/img/grid.png') repeat",
});
stage.addChild(layer);
stage.show();

// 实验性演示，正式发布版本中不包含3D功能

// 双击鼠标：2D 和 3D视图之间切换
stage.on('dblclick', e => {
    if (layer.view == '2d') {

        //为转换后舒服，可以先将所有节点组成的矩形中心平移到0,0
      	layer.translateObjectsCenterTo(layer.getAllNodes(), 0, 0);
        
        layer.setView('3d');
      	
      	// 隐藏或显示背景平面图
      	layer.render.planeMesh.visible = false;
    } else {
        layer.setView('2d');
    }
});

function addNode(text) {
    var x = 0;
    var y = 0;

    var node = new Node(text, x, y, 32, 32);
    node.setImage('./demo/img/pstn/router.png');

    // 3D立方体贴图-6个面 (left, right, top, bottom, front, back)
    node.css3D({
        materials : [
         './demo/img/pstn/router.png', 
         './demo/img/pstn/msc.png', 
         './demo/img/pstn/router.png',
         './demo/img/pstn/wdm.png', 
         './demo/img/pstn/modem.png', 
         './demo/img/pstn/terminal.png',
       ]
   });
    layer.addChild(node);
    return node;
}

function addLink(nodeA, nodeZ) {
    var link = new AutoFoldLink('link', nodeA, nodeZ, 'cb', 'ct');
    link.css({
        border: '4px solid ',
      	borderColor: randomColor()
    });
    // 3D流动贴图
    link.css3D({
        flowMaterial: Math.random() < 0.5 ? './demo/img/luobo2.png' : './demo/img/luobo3.png',
    });
    layer.addChild(link);
    return link;
}

var rootNode = addNode('root');

function gen(parentNode, deep, maxDeep) {
    var n = 2;
    for (var i = 0; i < n; i++) {
        var node = addNode(deep + '-' + i);
        addLink(parentNode, node);

        if (deep < maxDeep) {
            gen(node, deep + 1, maxDeep);
        }
    }
}
gen(rootNode, 1, 3); 

{ // 树形布局
    var layout = new TreeLayout('down');
    layout.setMargin(0, 50, 70);
    layout.setCenter(0, 0);
    let objects = layer.children;
    let vTrees = new Graph(objects).toTrees();
    let vTree = vTrees[0];
    layout.setDirection('down');

    layout.doLayout(vTree).then(e => {
        // 居中
        stage.translateToCenter();
        // 刷新
        layer.update();
    });
}


// 鼠标指向小提示
var tooltip = new Tooltip(stage);
tooltip.setHtml('小提示: 可以是html哦');

stage.on('mouseup', function (event) {
    var eventDetails = event.details;
    const pickedObject = stage.pickedObject;
    if (pickedObject != null) {
        if (pickedObject.isNode) {
            tooltip.setHtml(`
            <li>节点信息: ${pickedObject.id}_${pickedObject.text}</li>
            <li style="color:red"> 流量: 3000</li>
            <li style="color:orange">状态: 负载高</li>
            <li>数据: 667</li>
        `);
        } else {
            tooltip.setHtml(`
            <li>管道信息: ${pickedObject.id}</li>
            <li style="color:green">状态: 畅通</li>
            <li style="color:red"> 流速: ${Math.random().toFixed(3) * 100}</li>
        `);
        }
        tooltip.showAt(eventDetails.x, eventDetails.y);
    }
});
window.layer = layer;