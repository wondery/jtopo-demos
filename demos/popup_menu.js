// jtopo 提供若干极简的UI组件，满足一般情况
// 组件耦合较低，方便修改扩展；也可以舍弃，完全使用自己的UI。
// 这里演示: 1. Tooltip 2. PopupMenu

import {
    Stage,
    Layer,
    Node,
    Link,Tooltip, PopupMenu
} from './download/jtopo-1.4.6_trial-esm-min.js';

var stage = new Stage('divId');
var layer = new Layer('default');
layer.css({
    background: "white url('./demo/img/grid.png') repeat",
});

var node = new Node('鼠标放上来', 200, 150, 64, 64);
node.setImage('./demo/img/laptop.png');

layer.addChild(node);
stage.addChild(layer);
stage.show();

// 鼠标指向小提示
var tooltip = new Tooltip(stage);
tooltip.setHtml('小提示:右击弹出菜单');

// 鼠标在节点上移动时显示
node.on('mousemove', function (event) {
    var eventDetails = event.details;
    tooltip.showAt(eventDetails.x, eventDetails.y);
});

// 右键菜单
var popupMenu = new PopupMenu(stage);
popupMenu.setHtml(`
    <div class="header">编辑</div>
    <a>剪切</a>
    <a>复制</a>
    <a>粘贴</a>
    <a>删除</a> 
    <hr></hr>
    <div class="header">功能</div>
    <a>上移一层</a>
    <a>移至顶部</a>
    <a>下移一层</a>
    <a>移至底部</a>
`);

// 菜单选择事件处理
popupMenu.on('select', function (event) {
    //event.item： 选中的菜单文本
    var item = event.item;
    node.text = item;
});

// 鼠标按下时隐藏
stage.on('mousedown', function () {
    popupMenu.hide();
});

// 右键松开时显示
node.on('mouseup', function (event) {
    // 取画布上的坐标x,y
    var eventDetails = event.details;

    if (event.button == 2) { // right button
        popupMenu.showAt(eventDetails.x, eventDetails.y);
    }
});
