import {
    Stage,
    Layer,GridLayout,
    VideoNode,
} from './download/jtopo-1.4.6_trial-esm-min.js';

var stage = new Stage('divId');
var layer = new Layer();
stage.addChild(layer);

// 视频节点可以无极缩放（清晰度取决于视频质量）
function newVideo(name, image, video){
  var videoNode = new VideoNode(name, 20, 20, 300, 200);
  videoNode.setImage('./demo/img/' + image);
  videoNode.setVideo('./demo/video/' + video);
  layer.addChild(videoNode);

  videoNode.on('dblclick', function(){
    videoNode.play();
  });
  videoNode.onEnded(function(){
     videoNode.play();
  });
}

var names = ['公路', '超市A', '公路', '公路'];
var images = ['camer.png', 'camer.png', 'camer.png', 'camer.png'];
var videos = ['video_demo.mov', 'video_demo2.mov', 'video_demo2.mov', 'video_demo.mov'];

for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var image = images[i];
    var video = videos[i];
    newVideo(name, image, video);
}

var gridLayout = new GridLayout(2, 2);
gridLayout.doLayout(layer.children, 20,20);

stage.show();
stage.translateToCenter();

// 不断重绘
function animation(){
    layer.update();
    requestAnimationFrame(animation);
}
animation();