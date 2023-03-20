// jtopo提供了若干极简的UI组件，
// 耦合较低，方便修改扩展；也可以舍弃，完全使用自己的UI。
import {
    Stage,
    Layer,
    Node,
    Link,Tooltip
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
tooltip.setHtml('小提示: 可以是html哦');

node.on('mousemove', function (event) {
    var eventDetails = event.details;
    tooltip.showAt(eventDetails.x, eventDetails.y);
});
