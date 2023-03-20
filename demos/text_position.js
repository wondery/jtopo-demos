import {
    Stage,
    Layer,
    Node,
    GridLayout,
    Link,
    randomColor,
} from './download/jtopo-1.4.6_trial-esm-min.js';

var stage = new Stage('divId');
var layer = new Layer('default');
layer.css({
    background: "white url('./demo/img/grid.png') repeat",
});
stage.addChild(layer);


// 文字定位由三个属性：1. 位置 2. 文本对齐方式 2. 文本基线
// 教程：http://www.jtopo.com/tutorial.html#41-文本和定位
// 参考：HTML5-Canvas：https://www.w3school.com.cn/tags/canvas_textbaseline.asp

/*
 * 位置表示： 水平（left-center-right) 垂直(top-middle-bottom)
 * lt : left-top	左上
 * ct : center-top  正上
 * rt : right-top   右上
 
 * lm : left-middle  左中
 * center : center   正中-中心
 * rm : right-bottom 右中
 * 
 * lb : left-bottom   左下
 * cb : center-bottom 正下
 * rb : right-bottom  右下
 * 
 */
var positions = [
    'lt', 'ct', 'rt',
    'lm', 'center', 'rm',
    'lb', 'cb', 'rb'
];


var textAligns = ['center', 'left', 'right'];

var textBaselines = ['top', 'middle', 'bottom'];

var count = 0;

for (var i = 0; i < positions.length; i++) {
    for (var a = 0; a < textAligns.length; a++) {
        for (var b = 0; b < textBaselines.length; b++) {

            var node = new Node('T', 0, 0, 30, 30);

            node.css({
                'background': randomColor(),
                textPosition: positions[i],
                textAlign: textAligns[a],
                textBaseline: textBaselines[b],
                fontColor: 'black',
            });

            // 更细致的控制：水平和垂直方向的偏移量。
            //node.textOffsetX = 5;
            // node.textOffsetY = 5;

            // 开始不好记忆，没关系
            // 可以把本例子当做字典，需要定位时，找一个满意的 'T' 所在的节点
            // 点击节点，查看具体的设置
            node.on('click', function () {
                var msg = 'textPosition: ' + this.getStyle('textPosition') + '\n' +
                    'textAlign:      ' + this.getStyle('textAlign') + '\n' +
                    'textBaseline: ' + this.getStyle('textBaseline');
                alert(msg);
            });

            layer.addChild(node);
        }
    }
}

// 9 x 9 的网格
var gridLayout = new GridLayout(9, 9);

gridLayout.setMargin(20, 20);
gridLayout.setCenter(stage.width * 0.5, stage.height * 0.5);
gridLayout.doLayout(layer.children);

stage.show();