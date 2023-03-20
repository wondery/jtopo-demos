import {
    Animation,
    Stage,
    Layer,
    Node,
} from './download/jtopo-1.4.6_trial-esm-min.js';

// jtopo只自带了一个非常简单的动画实现，复杂动画可以配合第三方动画库，类似的还可以配合第三方物理引擎

var stage = new Stage('divId');
var layer = new Layer();
layer.css({
    background: "white url('./demo/img/grid.png') repeat",
});
stage.addChild(layer);

var node = new Node('动画演示', stage.width / 2 - 100, stage.height / 2 - 100, 100, 100);
node.css({
    'border': '1px solid black',
    'backgroundColor': '#00FF00',
    'textPosition': 'center',
});
layer.addChild(node);
stage.show();

// 在6000毫秒内，n从0逐渐变为2*Math.PI
let animation = new Animation(0, 2 * Math.PI, 6000, function (n) {
	// 旋转节点
    node.rotateTo(n);
    // 重绘
    layer.update();
});

// 播放
animation.play().then(() => {
    node.text = '正常结束';
}).catch(() => {
    node.text = '终止或结束';
});

node.on('mouseenter', () => {
    animation.pause();
});

node.on('mouseout', () => {
    animation.continue();
});

node.on('click', () => {
    animation.stop();
});

node.on('dblclick', () => {
    animation.play();
});


// 配合第三方动画库：animeJs
import anime from './download/anime.es.js';
anime({
  targets: [node, node.style],
  x: {
    value: node.x + 100,
  },
  // 样式的背景颜色
  backgroundColor:{
  	value: '#FF0000',
  },

  update: ()=>{
    // 每一帧更新画面
  	layer.update();
  },

  // 时间用时
  duration: 1000,
  // 缓动效果
  easing: 'easeInOutQuad',
  // 往复
  direction: 'alternate',
  // 循环播放
  loop: true,
});