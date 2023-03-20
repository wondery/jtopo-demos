import {
    Stage,
    Layer,
    Node,
    Link,
    regClass,
    Style
} from './download/jtopo-1.4.6_trial-esm-min.js';


var stage = new Stage('divId');
var layer = new Layer();
stage.addChild(layer);

// 自定义连线: 需要重写Link对象的draw 和 updatePoints 方法.
class MyLink extends Link {

    /**
     * 构造器
     * @constructor
     * @param {string} text 文本
     * @param {DisplayObject} start 开始节点对象
     * @param {DisplayObject} end  结束节点对象
     * @param {string} beginPosition 开始节点对象的‘定位点’
     * @param {string} endPosition  结束节点对象的‘定位点’
     */
    constructor(text, start, end, beginPosition, endPosition) {
        super(text, start, end, beginPosition, endPosition);

        /* 文本位置
         * 原点:[1, 0.5] 其中:
         *   1: 表示第二条线段 （本例link一共分为三段，取值范围就是: 0-2, 可以修改并测试）
         *   0.5: 表现线段的中点
         */
        this.label.origin = [1, 0.5];
    }

    /**
     * 按顺序返回连线的所有点坐标
     * @overwrite
     * @returns Array 点坐标数组: [{x, y},....]
     */
    updatePoints() {
        // 计算出a、z两个端点
        const az = this.calcAZ();
        const a = az[0];
        const z = az[1];

        let m1 = {x: a.x + 100, y:a.y};
        let m2 = {x: a.x + 100, y:z.y};

        this.points = [a, m1, m2, z];
        return this.points;
    }

    /**
     * 绘制图形
     * @overwrite
     */
    draw(ctx) {
        let points = this.points;
        
        ctx.beginPath();
        ctx.lineWidth = this.mySize;  // style中的lineWith就不再步生效了

        ctx.moveTo(points[0].x, points[0].y);
        for(let i=1; i<points.length; i++){
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        // 鼠标拾取最后一次stroke的路径(固定模式，一般情况不需要修改)
        this.mousePickupStroke(ctx);
    }
}

// 自定义属性
MyLink.prototype.mySize = 2;

 // 如果需要序列化必须执行该句
regClass(MyLink, ['mySize']);


// 节点样式
var nodeStyle = new Style({
    'border': '1px solid orange',
    'font': 'bold 14px 仿宋'
});

var fromNode = new Node('A');
fromNode.translateTo(300, 200);
fromNode.resizeTo(60, 60);
fromNode.style = nodeStyle;

var toNode = new Node('Z', 200, 300, 60, 60);
toNode.style = nodeStyle;

var link = new MyLink('Link', fromNode, toNode);
link.css({
    'borderColor': 'green'
});

layer.addChild(link);
layer.addChild(fromNode);
layer.addChild(toNode);

stage.show();