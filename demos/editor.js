/*
jtopo提供了编辑器的基础功能.
UI部分需要根据项目需求做扩展和定制, 该demo主要演示核心功能。

快捷键：(仅当鼠标在画布上时有效)
    1. ctrl+c/v/x 、delete    ：复制 、粘贴、剪切、删除
    2. ctrl+z 、ctrl+shift+z  ：撤销、重做
    3. ctrl+a             : 全选
    4. ctrl+i             : 反向全选
    5. shift+c            : 复制选中对象的样式
    6. shift+v            : 将复制的样式应用选中的同类对象上
    7. ctrl+s             : 临时保存浏览器缓存（关闭后仍然存在）
    8. ctrl+o             : 加载最后一次的临时保存内容 
    9. 方向键：            : 微调所有选中节点的坐标
    10. h                 : 隐藏/显示 右侧属性栏
    11. g                 : 自动对选中的节点做网格式布局（节点需在同一父节点内)
    12. t                 : 自动对选中的节点做树形布局（结构需满足树形，节点在同一父节点内)
  
鼠标：
    1. 左键：选择节点 或 框选多个 (按住ctrl增加选中或者剔除选中)
    2. 右键：拖拽画布
    3. 滚轮：缩放
    4. 按住Shift再拖拽，可以把节点放到另一个节点内(建立父/子关系)
    5. 按住Ctrl，可以画线到连线上任意位置 和 节点边框任意位置

保存打开本地:
    1. 工具栏最右侧两个按钮

操作系统：
    MacOS系统下: 把ctrl换成cmd
    1. cmd + backspace  : 和delete一样是删除

UI定制扩展：
    左侧图标栏 和 右侧属性修改栏 耦合极低，可以替换成自定义的。
*/
import {
    Stage,
    Layer,
    Editor,
    Node,
    ArrowNode,
    Link,
    IconsPanel,
    PropertiesPanel, 
} from './download/jtopo-1.4.6_trial-esm-min.js';

// 主题
let theme = {
    backgroud: "white url('./demo/img/grid.png') repeat",
    borderWidth: 3,
    lineColor: '#000000',
    lineFontColor: '#000000',
    textNodeColor: '#000000',
    fontColor: '#000000',
};

let stage = new Stage('divId');
let layer = new Layer();
stage.addChild(layer);
stage.show();

let editor = new Editor(stage);
stage.setMode('edit');


// 方便调试
window.editor = editor;
window.stage = stage;
window.layer = layer;

// 左侧图元面板配置
const leftPanelConfig = {
    items: [{
            name: '直线',
            className: 'Link',
            iconHtml: `
            <svg width="100%" height="100%">
            <line x1="5" y1="21" x2="35" y2="21" stroke="black" stroke-width="1"/>
            </svg>`,
            properties: {
                text: '一条直线',
                css: {
                    'borderWidth': theme.borderWidth,
                    'borderColor': theme.lineColor,
                    'color': theme.lineFontColor,
                }
            }
        },
        {
            name: '折线',
            className: 'AutoFoldLink',
            iconHtml: `
            <svg width="100%" height="100%">
            <line x1="5" y1="10" x2="30" y2="10" stroke="black" stroke-width="1"/>
            <line x1="30" y1="10" x2="30" y2="35" stroke="black" stroke-width="1"/>
            </svg>`,
            properties: {
                text: '折线',
                css: {
                    'borderWidth': theme.borderWidth,
                    'borderColor': theme.lineColor,
                    'color': theme.lineFontColor,
                }
            }
        },
        {
            name: '矩形',
            className: 'Node',
            iconHtml: `
            <svg width="100%" height="100%">
            <rect width="30" height="22" x="6" y = "9"
            stroke="black" stroke-width="1" fill="white"/>
            </svg>
        `,
            properties: {
                width: 100,
                height: 50,
                text: '文字',
                css: {
                    'background': '#FFFFFF',
                    'borderWidth': 1,
                    'borderColor': '#000000',
                    'color': theme.fontColor,
                    'textPosition': 'center',
                    'textAlign': 'center',
                    'textBaseline': 'middle',
                    'font': 'bold 14px arial',
                }
            }
        },

        {
            name: '圆形',
            className: 'CircleNode',
            iconHtml: `
            <svg width="100%" height="100%">
            <circle cx="20" cy="20" r="15" 
                stroke="black" stroke-width="1" fill="white"/>
            </svg>
        `,
            properties: {
                text: '圆形',
                radius: 12,
                css: {
                    'borderWidth': 1,
                    'borderColor': '#000000',
                    'textPosition': 'center',
                    'textAlign': 'center',
                    'textBaseline': 'middle',
                    'font': 'bold 12px',
                    'background': '#FFFFFF',
                    'color': theme.fontColor,
                }
            }
        },
        
        {
            name: '多边形',
            className: 'PolygonNode',
            iconHtml: `
        <svg width="100%" height="100%">
        <polygon points="21,5, 36,21, 21,36, 5,21"
        stroke="black" stroke-width="1" fill="white"/>
        </svg>
        `,
            properties: {
                text: '多边形',
                edges: 3,
                css: {
                    'borderWidth': 1,
                    'borderColor': '#000000',
                    'textPosition': 'center',
                    'textAlign': 'center',
                    'textBaseline': 'middle',
                    'background': '#FFFFFF',
                    'color': theme.fontColor,
                }
            }
        },
        {
            name: '文字',
            className: 'TextNode',
            iconHtml: `
            <div width="100%" height="100%" style="font-size:12px;padding-left:7px;padding-top:10px;font-weight:bold;">
                文字
            </div>
        `,
            properties: {
                text: '文本文字',
                width: 100,
                height: 50,
                autoSize: false,
                autoDirection: false,
                css: {
                    'borderColor': '#FFFFFF',
                    'textPosition': 'center',
                    'textAlign': 'center',
                    'textBaseline': 'middle',
                    'font': 'bold 14px arial',
                    'color': theme.textNodeColor,
                }
            }
        },
        {
            name: '云',
            className: 'Node',
            iconHtml: `
            <img width="100%" style="padding:2px;" src="./demo/img/cloud.png"/>
        `,
            properties: {
                text: '终端',
                image: './demo/img/cloud.png',
                padding: 1,
                ratio: 0.78,
                css: {
                    'borderWidth': 1,
                    'color': theme.fontColor,
                }
            }
        },
        {
            name: '终端',
            className: 'Node',
            iconHtml: `
            <img width="100%" style="padding:2px;" src="./demo/img/pstn/terminal.png"/>
         `,
            properties: {
                text: '终端',
                image: './demo/img/pstn/terminal.png',
                sizeToImage: true,
                css: {
                    'textPosition': 'cb',
                    'borderWidth': 0,
                    'color': theme.fontColor,
                }
            }
        }
    ]
};

// 从节点画出线的线配置
editor.LinkClassName = 'AutoFoldLink';
// 样式
editor.newLinkProperties = {
    css: {
        'borderWidth': 3,
        'borderColor': theme.lineColor
    }
};


// 创建左侧的图标面板，并设置图标数据
let iconPanel = new IconsPanel(stage);
iconPanel.setConfig(leftPanelConfig).show();

// 右侧属性编辑面板
let propertiesPanel = new PropertiesPanel(editor);

// 左侧拖拽开始
iconPanel.on('dragstart', function (event) {
    const config = event.config;
    event.dataTransfer.setData('drop_data', JSON.stringify(config));
});

// 画布接收到拖拽结束
editor.on('drop', function (event) {
    const json = event.dataTransfer.getData('drop_data');
    const config = JSON.parse(json);

    // 画布上生成的实例
    editor.record('添加');

    const nodeOrLink = editor.create(config);

    if (nodeOrLink instanceof Node) {
        nodeOrLink.text = '节点-' + nodeOrLink.id;
    } else {
        nodeOrLink.label.text = '连线-' + nodeOrLink.id;

        nodeOrLink.css({
            'lineJoin': 'round',
        });
        nodeOrLink.label.css({
            'textBaseline': 'bottom',
            'color': theme.lineFontColor,
        });

        let arrowNode = new ArrowNode();
        arrowNode.resizeTo(10, 6);
        nodeOrLink.setEndArrow(arrowNode);
    }

    editor.recordEnd('添加');

    // 在右侧显示属性面板
    propertiesPanel.showProperty(nodeOrLink);
});

// 鼠标点中的对象在右侧显示属性面板
stage.on('mousedown', function (e) {
    const pickedObject = stage.pickedObject;
    window.target = pickedObject;
    if (pickedObject) {
        propertiesPanel.showProperty(pickedObject);
    }
});

// 左下角显示缩略图
stage.showOverview({
    left: 0,
    bottom: -1
});

// 打开最后一次保存
editor.openLasted(); 

layer.css({
    background: theme.backgroud,
});
