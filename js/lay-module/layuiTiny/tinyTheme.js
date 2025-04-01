/**
 * date: 2025/04/01
 * author: Mr. Xie
 * version: 1.0.0
 * description:layuiTiny theme框架扩展
 */
layui.define(["jquery", "layer"], function (exports) {
  var $ = layui.$,
    layer = layui.layer;

  var tinyTheme = {
    /**
     * 主题配置项
     * @param skinId
     * @returns {{headerLogo, menuLeftHover, headerRight, menuLeft, headerRightThis, menuLeftThis}|*|*[]}
     */
    config: function (skinId) {
      var bgColorConfig = [
        {
          "primary-900": "#6F94F4", // 最深色
          "primary-800": "#82A3F6",
          "primary-700": "#95B2F8",
          "primary-600": "#A8C1FA",
          "primary-500": "#BBD0FC", // 中间色
          "primary-400": "#CEDFFF",
          "primary-300": "#E1EEFF",
          "primary-200": "#F0F6FF",
          "primary-100": "#F8FBFF", // 最浅色
        },
        {
          "primary-900": "#0A2F8E",
          "primary-800": "#0D3CB4",
          "primary-700": "#1048D9",
          "primary-600": "#255DEE",
          "primary-500": "#4A79F1",
          "primary-400": "#7095F4",
          "primary-300": "#96B1F7",
          "primary-200": "#BCCDF9",
          "primary-100": "#E2E9FC",
        },
        {
          "primary-900": "#990016",
          "primary-800": "#C1001C",
          "primary-700": "#EA0022",
          "primary-600": "#FF1437",
          "primary-500": "#FF3D5A",
          "primary-400": "#FF657C",
          "primary-300": "#FF8E9F",
          "primary-200": "#FEB7C2",
          "primary-100": "#FFE0E4",
        },
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
        {
          "primary-900": "#995B00",
          "primary-800": "#C17300",
          "primary-700": "#EA8B00",
          "primary-600": "#FFA014",
          "primary-500": "#FFB03D",
          "primary-400": "#FFC165",
          "primary-300": "#FFD18E",
          "primary-200": "#FEE2B7",
          "primary-100": "#FFF2E0",
        },
        {
          "primary-900": "#6F1B7D",
          "primary-800": "#8C239E",
          "primary-700": "#AA2AC0",
          "primary-600": "#BE3ED4",
          "primary-500": "#C960DB",
          "primary-400": "#D581E3",
          "primary-300": "#E0A3EA",
          "primary-200": "#EBC4F2",
          "primary-100": "#F6E5F9",
        },
        {
          "primary-900": "#008799",
          "primary-800": "#00ABC1",
          "primary-700": "#00D0EA",
          "primary-600": "#14E4FF",
          "primary-500": "#3DE9FF",
          "primary-400": "#65EDFF",
          "primary-300": "#8EF2FF",
          "primary-200": "#B7F6FE",
          "primary-100": "#E0FBFF",
        },
        {
          "primary-900": "#8B0D38",
          "primary-800": "#B01147",
          "primary-700": "#D51456",
          "primary-600": "#EA296A",
          "primary-500": "#ED4E84",
          "primary-400": "#F1739E",
          "primary-300": "#F598B8",
          "primary-200": "#F8BDD1",
          "primary-100": "#FCE3EB",
        },
        {
          "primary-900": "#273271",
          "primary-800": "#32408F",
          "primary-700": "#3C4DAE",
          "primary-600": "#5062C2",
          "primary-500": "#6F7DCC",
          "primary-400": "#8D98D7",
          "primary-300": "#ABB4E2",
          "primary-200": "#CACFEC",
          "primary-100": "#E8EAF7",
        },
        {
          "primary-900": "#997200",
          "primary-800": "#C19100",
          "primary-700": "#EAAF00",
          "primary-600": "#FFC414",
          "primary-500": "#FFCE3D",
          "primary-400": "#FFD865",
          "primary-300": "#FFE28E",
          "primary-200": "#FEEDB7",
          "primary-100": "#FFF7E0",
        },
        {
          "primary-900": "#5F4339",
          "primary-800": "#795548",
          "primary-700": "#936757",
          "primary-600": "#A77B6B",
          "primary-500": "#B69285",
          "primary-400": "#C5A99F",
          "primary-300": "#D5C0B8",
          "primary-200": "#E4D7D2",
          "primary-100": "#F3EDEB",
        },
      ];
      if (skinId === undefined) {
        return bgColorConfig;
      } else {
        return bgColorConfig[skinId];
      }
    },

    /**
     * 初始化
     * @param options
     */
    render: function (options) {
      options.listen = options.listen || false;
      var skinId = sessionStorage.getItem("layuiTinySkin");
      const newOptions = {
        ...options,
        skinThemeDefault: skinId || 0,
      };

      const themeConfig = tinyTheme.config(newOptions.skinThemeDefault);

      const cssVars = {};

      Object.entries(themeConfig).forEach(([key, value]) => {
        cssVars[`--${key}`] = value;
      });

      const root = document.documentElement;
      root.style.cssText += Object.entries(cssVars)
        .map(([key, value]) => `${key}: ${value};`)
        .join("\n");

      if (options.listen) tinyTheme.listen(newOptions);
    },

    /**
     * 构建主题选择html
     * @param options
     * @returns {string}
     */
    buildBgColorHtml: function (options) {
      options.skinId = options.skinId || 0;
      var skinId = parseInt(sessionStorage.getItem("layuiTinySkin"));
      if (isNaN(skinId)) skinId = options.skinId;
      var bgColorConfig = tinyTheme.config();
      var html = "";
      $.each(bgColorConfig, function (key, val) {
        if (key === skinId) {
          html += '<li class="layui-this" data-skin-theme="' + key + '">\n';
        } else {
          html += '<li data-skin-theme="' + key + '">\n';
        }
        html += `<a href="javascript:;" data-skin="skin-blue" style="background: ${val["primary-900"]};" class="block w-full h-full ">
          </a>`;
      });
      return html;
    },

    /**
     * 监听
     * @param options
     */
    listen: function (options) {
      $("body").on("click", "[data-bgcolor]", function () {
        var loading = layer.load(0, { shade: false, time: 2 * 1000 });
        var bgColorHtml = tinyTheme.buildBgColorHtml(options);
        var html = `
          <div class="layuiTiny-color">
            <div class="color-content">
              <ul class="grid grid-cols-6 gap-3">
                ${bgColorHtml}
              </ul>
            </div>
          </div>`;
        layer.open({
          type: 1,
          title: "配色方案",
          offset: "r",
          anim: "slideLeft", // 从右往左
          area: ["320px", "100%"],
          shade: 0.1,
          shadeClose: true,
          id: "skin-theme-popup",
          content: html,
          success: function (index, layero) {},
          end: function () {
            $(".layuiTiny-select-bgcolor").removeClass("layui-this");
          },
        });
        layer.close(loading);
      });

      $("body").on("click", "li[data-skin-theme]", function () {
        var skinId = $(this).attr("data-skin-theme");
        $(".layuiTiny-color .color-content ul .layui-this").attr("class", "");
        $(this).attr("class", "layui-this");
        sessionStorage.setItem("layuiTinySkin", skinId);

        tinyTheme.render({
          skinThemeDefault: skinId,
          listen: false,
        });
      });
    },
  };

  exports("tinyTheme", tinyTheme);
});
