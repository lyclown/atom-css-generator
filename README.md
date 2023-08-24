# Vite Atom CSS Generator 插件

一个简单的Vite插件，用于从Vue 3模板中的类名自动生成原子级CSS样式，并自动注入到项目中。

## 安装

使用npm或yarn或pnpm进行安装:

```bash
npm i vite-plugin-atom-css-generator
yarn add vite-plugin-atom-css-generator
pnpm add vite-plugin-atom-css-generator
```

## 使用方法

1. 在你的vite.config.js中引入并使用此插件：

```
import atomCssGenerator from 'vite-plugin-atom-css-generator';

export default {
  plugins: [
    atomCssGenerator({ outputPath: 'desired_output_path' }),
    // ...其他插件
  ]
}
```


#### ⚠️ 必须放在@vitejs/plugin-vue插件的前面

```
plugins:[atomCssGenerator(),vue()]
```

3. 在Vue组件的模板中使用特定格式的类名，例如：fc-fff。在构建时，插件将自动生成如下的CSS：

```
.fc-fff { color: #fff; }
```

3. 构建项目后，style.css将自动被生成在指定的outputPath目录中，并自动注入到项目的HTML文件中。

## 配置

以下是插件可接受的配置选项：

* outputPath (可选): 指定生成的style.css文件的路径。默认值为public。
  例子：

```
atomCssGenerator({ outputPath: 'assets/styles' })
```

使用上述配置，style.css将被生成在assets/styles目录中，并在HTML中自动注入为/assets/styles/style.css。

## 原子类名规则

目前，此插件只支持以下格式的原子类名：

### 类名规则

#### 颜色类

| 类名            | 样式描述   | 示例                                           |
| --------------- | ---------- | ---------------------------------------------- |
| `fc-{color}`  | 文字颜色   | `.fc-333 { color: #333; }`                   |
| `bgc-{color}` | 背景颜色   | `.bgc-f2f2f2 { background-color: #f2f2f2; }` |
| `bc-{color}`  | 边框颜色   | `.bc-ccc { border-color: #ccc; }`            |
| `btc-{color}` | 上边框颜色 | `.btc-000 { border-top-color: #000; }`       |
| `brc-{color}` | 右边框颜色 | `.brc-333 { border-right-color: #333; }`     |
| `bbc-{color}` | 下边框颜色 | `.bbc-f00 { border-bottom-color: #f00; }`    |
| `blc-{color}` | 左边框颜色 | `.blc-0f0 { border-left-color: #0f0; }`      |

#### 边距类

| 类名          | 样式描述 | 示例                                 |
| ------------- | -------- | ------------------------------------ |
| `m-{size}`  | 外边距   | `.m-20 { margin: 20px; }`          |
| `mt-{size}` | 上外边距 | `.mt-10 { margin-top: 10px; }`     |
| `mr-{size}` | 右外边距 | `.mr-15 { margin-right: 15px; }`   |
| `mb-{size}` | 下外边距 | `.mb-30 { margin-bottom: 30px; }`  |
| `ml-{size}` | 左外边距 | `.ml-5 { margin-left: 5px; }`      |
| `p-{size}`  | 内边距   | `.p-20 { padding: 20px; }`         |
| `pt-{size}` | 上内边距 | `.pt-10 { padding-top: 10px; }`    |
| `pr-{size}` | 右内边距 | `.pr-15 { padding-right: 15px; }`  |
| `pb-{size}` | 下内边距 | `.pb-30 { padding-bottom: 30px; }` |
| `pl-{size}` | 左内边距 | `.pl-5 { padding-left: 5px; }`     |

#### 宽高大小类

| 类名                | 样式描述 | 示例                                              |
| ------------------- | -------- | ------------------------------------------------- |
| `w-{size}`        | 宽度     | `.w-100 { width: 100px; }`                      |
| w-{size}p           | 宽度%    | `.w-50p { width: 50%; }`                        |
| `h-{size}`        | 高度     | `.h-200 { height: 200px; }`                     |
| h-{size}p           | 高度%    | `.h-50p {height`: 50%; }                        |
| `fs-{size}`       | 字体大小 | `.fs-14 { font-size: 14px; }`                   |
| `fw-{weight}`     | 字体粗细 | `.fw-bold { font-weight: bold; }`               |
| `fs-{style}`      | 字体样式 | `.fs-italic { font-style: italic; }`            |
| `td-{decoration}` | 文本装饰 | `.td-underline { text-decoration: underline; }` |

#### flex布局类

| 类名           | 样式描述     | 示例                                        |
| -------------- | ------------ | ------------------------------------------- |
| `d-flex`     | Flexbox布局  | `.d-flex { display: flex; }`              |
| `fd-column`  | 纵向布局     | `.fd-column { flex-direction: column; }`  |
| `jc-center`  | 水平居中     | `.jc-center { justify-content: center; }` |
| `ai-stretch` | 垂直拉伸对齐 | `.ai-stretch { align-items: stretch; }`   |

#### 边框类

| 类名                           | 样式描述 | 示例                                                     |
| ------------------------------ | -------- | -------------------------------------------------------- |
| `bw-{width}`                 | 边框宽度 | `.bw-2 { border-width: 2px; }`                         |
| `bs-{style}`                 | 边框样式 | `.bs-dashed { border-style: dashed; }`                 |
| `bc-{color}`                 | 边框颜色 | `.bc-333 { border-color: #333; }`                      |
| `bt-{width}-{color}-{style}` | 上边框   | `.bt-1-f00-solid { border-top: 1px #f00 solid; }`      |
| `br-{width}-{color}-{style}` | 右边框   | `.br-2-0f0-dotted { border-right: 2px #0f0 dotted; }`  |
| `bb-{width}-{color}-{style}` | 下边框   | `.bb-3-00f-double { border-bottom: 3px #00f double; }` |
| `bl-{width}-{color}-{style}` | 左边框   | `.bl-1-fff-dashed { border-left: 1px #fff dashed; }`   |

#### 布局类

| 类名           | 样式描述 | 示例                                    |
| -------------- | -------- | --------------------------------------- |
| `p-relative` | 相对定位 | `.p-relative { position: relative; }` |
| `p-absolute` | 绝对定位 | `.p-absolute { position: absolute; }` |
| `p-fixed`    | 固定定位 | `.p-fixed { position: fixed; }`       |

#### 鼠标样式类

| 类名          | 样式描述 | 示例                                |
| ------------- | -------- | ----------------------------------- |
| `c-pointer` | 鼠标手形 | `.c-pointer { cursor: pointer; }` |
| `c-wait`    | 鼠标等待 | `.c-wait { cursor: wait; }`       |

#### 其他类

| 类名          | 样式描述     | 示例                                   |
| ------------- | ------------ | -------------------------------------- |
| `o-hidden`  | 内容溢出隐藏 | `.o-hidden { overflow: hidden; }`    |
| `ox-scroll` | 水平滚动     | `.ox-scroll { overflow-x: scroll; }` |
| `oy-auto`   | 垂直自动     | `.oy-auto { overflow-y: auto; }`     |

### 预定义的实用样式

| 类名          | 样式描述                          |
| ------------- | --------------------------------- |
| te-ellipsis   | 单行文本溢出显示省略号            |
| te-ellipsis-2 | 多行文本溢出显示省略号 (最多两行) |
| grid-3cols    | 使用 Grid 实现三列布局            |
| card-shadow   | 实现一个卡片的阴影边框            |

## 常见问题

### 我可以扩展原子类名规则吗？

目前，此插件固定了原子类名规则。要添加更多规则，你需要直接编辑插件的源代码。

### 为什么我的style.css没有被注入？

确保outputPath的配置正确，并且HTML中存在 `</head>`标签，因为插件是将 `<link>`标签插入到此位置的。
