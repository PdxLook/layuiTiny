/**
 * date: 2025/03/31
 * author: Mr. Xie
 * description: 此处放 layui 自定义扩展
 * version: 1.0.0
 */

(function () {
  "use strict";

  // 获取当前脚本路径，确保 rootPath 的获取更稳健
  window.rootPath = (function () {
    const scripts = document.scripts;
    const currentScript = scripts[scripts.length - 1]?.src || "";
    return currentScript.substring(0, currentScript.lastIndexOf("/") + 1);
  })();

  // 确保 layui 对象存在，防止报错
  if (typeof layui === "undefined") {
    console.error("Layui 未加载，请检查依赖。");
    return;
  }

  // 配置 layui 扩展模块
  layui
    .config({
      base: window.rootPath + "lay-module/",
      version: true,
    })
    .extend({
      tinyAdmin: "layuiTiny/tinyAdmin",
      tinyMenu: "layuiTiny/tinyMenu",
      tinyTab: "layuiTiny/tinyTab",
      tinyTheme: "layuiTiny/tinyTheme",
      step: "step-lay/step", // 分步表单扩展
      tableSelect: "tableSelect/tableSelect", // table选择扩展
      iconPickerFa: "iconPicker/iconPickerFa", // fa图标选择扩展
      echarts: "echarts/echarts", // echarts图表扩展
      echartsTheme: "echarts/echartsTheme", // echarts图表主题扩展
      wangEditor: "wangEditor/wangEditor", // wangEditor富文本扩展
      layarea: "layarea/layarea", //  省市县区三级联动下拉选择器
    });
})();
