import {
    Stage,
    Layer,
    Node,
} from './download/jtopo-1.4.6_trial-esm-min.js';

var stage = new Stage('divId');
var layer = new Layer('default');
stage.addChild(layer);

var node = new Node('From', 200, 150, 40, 40);
node.setImage('./demo/img/laptop.png', true);
layer.addChild(node);
layer.css({
    background: "white url('./demo/img/grid.png') repeat",
});
stage.show();

// 鼠标点击
node.on('click', function (event) {
    // 更详细的事件信息，
    // 比如：鼠标在画布上的x，y坐标, 鼠标状态（是否拖拽开始、结束）, 相对于上一次鼠标位置的偏移量(dx,dy)等
    let eventDetails = event.details;

    node.text = 'click';
    console.log('click');
});

// 鼠标双击
node.on('dblclick', function (event) {
    console.log('dblclick');
    node.text = 'dblclick';
});

// 鼠标进入
node.on('mouseenter', function (event) {
    console.log('mouseenter');
    node.text = 'mouseenter';
});

// 鼠标移动
node.on('mousemove', function (event) {
    console.log('mousemove');
    node.text = 'mousemove';
});

// 鼠标离开
node.on('mouseout', function (event) {
    node.text = 'mouseout';
    console.log('mouseout');
});

// 鼠标按下
node.on('mousedown', function (event) {
    console.log('mousedown');
    node.text = 'mousedown';
});

// 鼠标松开
node.on('mouseup', function (event) {
    console.log('mouseup');
    node.text = 'mouseup';
});

// 鼠标拖拽
node.on('mousedrag', function (event) {
    console.log('mousedrag');
    node.text = 'mousedrag';
});

// 鼠标拖拽结束
node.on('mousedragend', function (event) {
    console.log('mousedragend');
    node.text = 'mousedragend';
});


node.on('touchstart', function (event) {
    node.text = 'touchstart';
});

node.on('touchmove', function (event) {
    node.text = 'touchmove';
});

node.on('touchend', function (event) {
    node.text = 'touchend';
});

// --- 下面是较为高级的事件处理示例
// 阻止默认拖拽处理, 参考:Html事件的preventDefault() 说明
function preventDefaultDrag(e) {
    e.preventDefault();
}

function disabledDefaultMouseDragHandler(obj) {
    obj.on('mousedrag', preventDefaultDrag);
}

function enabledDefaultMouseDragHandler(obj) {
    obj.removeEventListener('mousedrag', preventDefaultDrag);
}

// 阻止默认拖拽处理
node.on('mousedrag', preventDefaultDrag);

// 定义自己的拖拽处理
function customDragHandler(event) {
    // 每次拖拽偏移量
    console.log(event.dx + ' - ' + event.dy);
    //....

    // 还可以再次抛出自己的事件
    node.dispatchEvent(new Event('myEvent'));
}
// 使用自己的事件处理 （on 等价 addEventListener，简写而已）
node.on('mousedrag', customDragHandler);

// 捕获自己抛出的自定义事件
node.on('myEvent', function (event) {
    console.log('我的事件');
    console.log(event);
});

// 恢复默认拖拽
node.removeEventListener('mousedrag', preventDefaultDrag);

// 删除自己的拖拽处理
node.removeEventListener('mousedrag', customDragHandler);