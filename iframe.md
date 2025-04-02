# 使用说明（iframe 版本）

# 更新说明

- 优化主题配色方案

# 基础参数一览表

> 以下参数是`tinyAdmin.render();`初始化时进行传入。

| 参数                | 说明                | 类型   | 默认值 | 备注                                                                       |
| ------------------- | ------------------- | ------ | ------ | -------------------------------------------------------------------------- |
| iniUrl              | 初始化接口          | string | null   | 实际使用，请对接后端接口动态生成，格式请参考文件：`api/init.json`          |
| clearUrl            | 缓存清理接口        | string | null   | 实际使用，请对接后端接口动态生成，格式请参考文件：`api/init.json`          |
| urlHashLocation     | 是否打开 hash 定位  | bool   | false  | 开启后，会显示路由信息，刷新页面后将定位到当前页                           |
| skinThemeDefault    | 主题默认配置        | int    | 0      | 如需添加更多主题信息，请在`js/lay-module/layuiTiny/tinyTheme.js`文件内添加 |
| multiModule         | 是否开启多模块      | bool   | false  | 个人建议开启                                                               |
| menuChildOpen       | 是否默认展开菜单    | bool   | false  | 个人建议关闭                                                               |
| loadingTime         | 初始化加载时间      | 0      | 0      | 建议 0-2 之间                                                              |
| pageAnim            | iframe 窗口动画     | bool   | false  | 添加 tab 或者切换时的过渡动漫                                              |
| maxTabNum           | 最大的 tab 打开数量 | int    | 20     | 防止打开太多的 tab 窗口导致页面卡死                                        |
| clickHomeTabRefresh | 点击首页 tab 刷新   | bool   | false  |                                                                            |

> 示例说明

```js
var options = {
  iniUrl: "api/init.json", // 初始化接口
  clearUrl: "api/clear.json", // 缓存清理接口
  urlHashLocation: true, // 是否打开hash定位
  skinThemeDefault: 0, // 主题默认配置
  multiModule: true, // 是否开启多模块
  menuChildOpen: false, // 是否默认展开菜单
  loadingTime: 0, // 初始化加载时间
  pageAnim: true, // iframe窗口动画
};
tinyAdmin.render(options);
```

# 后台模板初始化

- 在`index.html`文件内进行初始化
- 引入`lay-config.js`文件，请根据实际情况修改里面扩展的路径。
- 引入 tinyAdmin 模块，根据需要传入初始化参数，执行`tinyAdmin.render(options);` 方法。
- 初始化 api 接口返回的参数可以参考`api目录下的init.json文件`或者查看使用说明的第二点的参数说明

> 示例说明

```js
layui.use(["jquery", "layer", "tinyAdmin"], function () {
  var $ = layui.jquery,
    layer = layui.layer,
    tinyAdmin = layui.tinyAdmin;

  var options = {
    iniUrl: "api/init.json", // 初始化接口
    clearUrl: "api/clear.json", // 缓存清理接口
    urlHashLocation: true, // 是否打开hash定位
    skinThemeDefault: 0, // 主题默认配置
    multiModule: true, // 是否开启多模块
    menuChildOpen: false, // 是否默认展开菜单
    clickHomeTabRefresh: true, // 点击首页tab刷新
  };
  tinyAdmin.render(options);
});
```

# 初始化 api 接口返回的参数说明

- `homeInfo` 是首页信息
- `logoInfo` 是 logo 信息
- `menuInfo` 是头部模块和左侧菜单对应的信息

> 示例说明

```json
{
  "homeInfo": {
    "title": "首页",
    "href": "page/welcome-1.html?t=1"
  },
  "logoInfo": {
    "title": "LAYUI MINI",
    "image": "images/logo.png",
    "href": ""
  },
  "menuInfo": [
    {
      "title": "常规管理",
      "icon": "fa fa-address-book",
      "href": "",
      "target": "_self",
      "child":[...]
    },
    {
      "title": "组件管理",
      "icon": "fa fa-lemon-o",
      "href": "",
      "target": "_self",
      "child":[...]
    },
    {
      "title": "其它管理",
      "icon": "fa fa-slideshare",
      "href": "",
      "target": "_self",
      "child":[...]
    }
  ]
}
```

# 缓存清理接口返回的参数说明

> 返回参数对应的事例(code：0，清除缓存失败；code：1，表示清除缓存成功；)

```json
{
  "code": 1,
  "msg": "清除服务端缓存成功"
}
```

# 在页面中弹出新的 Tab 窗口（标签）

- 如需在页面中弹出新的 Tab 窗口，请参考下方代码。（备注：需要引入`tinyTab.js`文件）
- 参数说明（layuiTiny-content-href：页面链接，data-title：标题）
- 调用方法进行监听：`tinyTab.listen();`
- 示例在`page/welcome-1.html`页面中有

> 示例说明

```js
<a
  href="javascript:;"
  layuiTiny-content-href="page/user-setting.html"
  data-title="基本资料"
>
  基本资料
</a>;

layui.use(["form", "tinyTab"], function () {
  var form = layui.form,
    layer = layui.layer,
    tinyTab = layui.tinyTab;

  tinyTab.listen();
});
```

# 在页面中弹出新的 Tab 窗口（JS 方法）

- 如需在页面中弹出新的 Tab 窗口，请参考下方代码。（备注：需要引入`tinyTab.js`文件）
- 参数说明（href：页面链接，title：标题）

> 示例说明

```js
layui.use(["form", "tinyTab"], function () {
  var form = layui.form,
    layer = layui.layer,
    tinyTab = layui.tinyTab;

  // 打开新的窗口
  tinyTab.openNewTabByIframe({
    href: "page/form.html",
    title: "按钮示例",
  });
});
```

# 在 iframe 页面中关闭当前 Tab 窗口

- 如需在 iframe 页面中，请参考下方代码。（备注：tinyTab.js 文件）
- 调用方法：`tinyTab.deleteCurrentByIframe();`
- 示例在`user-password.html`,`user-setting.html`页面中都有

> 示例说明

```js
layui.use(["form", "tinyTab"], function () {
  var form = layui.form,
    layer = layui.layer,
    tinyTab = layui.tinyTab;

  //监听提交
  form.on("submit(saveBtn)", function (data) {
    var index = layer.alert(
      JSON.stringify(data.field),
      {
        title: "最终的提交信息",
      },
      function () {
        layer.close(index);
        tinyTab.deleteCurrentByIframe();
      }
    );
    return false;
  });
});
```

# 后台主题方案配色

系统已内置 11 套主题配色，如果需要自定义皮肤配色，请在`tinyTheme.config`方法内按相同格式添加。

> 示例说明

```js
var bgColorConfig = [
  {
    "primary-900": "#2E6A30",
    "primary-800": "#3A873D",
    "primary-700": "#47A34A",
    "primary-600": "#5BB75F",
    "primary-500": "#77C47A",
    "primary-400": "#94D096",
    "primary-300": "#B0DDB2",
    "primary-200": "#CDE9CE",
    "primary-100": "#E9F5EA",
  },
];
```

# 常见问题

- <font color=red>修改 js 后刷新页面未生效，请尝试清除浏览器缓存。</font>
- IIS 环境下请配置支持解析`.json`格式文件

# 备注信息

- 菜单栏建议最多四级菜单，四级以后菜单显示并没有那么友好。
