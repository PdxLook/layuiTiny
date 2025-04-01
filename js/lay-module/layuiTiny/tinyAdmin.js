/**
 * date: 2025/04/01
 * author: Mr. Xie
 * version: 1.0.0
 * description: layuiTiny 主体框架扩展
 */
layui.define(
  ["jquery", "tinyMenu", "element", "tinyTab", "tinyTheme"],
  function (exports) {
    var $ = layui.$,
      layer = layui.layer,
      tinyMenu = layui.tinyMenu,
      tinyTheme = layui.tinyTheme,
      element = layui.element,
      tinyTab = layui.tinyTab;

    if (!/http(s*):\/\//.test(location.href)) {
      var tips =
        "请先将项目部署至web容器（Apache/Tomcat/Nginx/IIS/等），否则部分数据将无法显示";
      return layer.alert(tips);
    }

    var tinyAdmin = {
      /**
       * 后台框架初始化
       * @param options.iniUrl   后台初始化接口地址
       * @param options.clearUrl   后台清理缓存接口
       * @param options.urlHashLocation URL地址hash定位
       * @param options.skinThemeDefault 默认皮肤
       * @param options.multiModule 是否开启多模块
       * @param options.menuChildOpen 是否展开子菜单
       * @param options.loadingTime 初始化加载时间
       * @param options.pageAnim iframe窗口动画
       * @param options.maxTabNum 最大的tab打开数量
       */
      render: function (options) {
        options.iniUrl = options.iniUrl || null;
        options.clearUrl = options.clearUrl || null;
        options.urlHashLocation = options.urlHashLocation || false;
        options.skinThemeDefault = options.skinThemeDefault || 0;
        options.multiModule = options.multiModule || false;
        options.menuChildOpen = options.menuChildOpen || false;
        options.loadingTime = options.loadingTime || 1;
        options.pageAnim = options.pageAnim || false;
        options.maxTabNum = options.maxTabNum || 20;
        $.getJSON(options.iniUrl, function (data) {
          if (data == null) {
            tinyAdmin.error("暂无菜单信息");
          } else {
            tinyAdmin.renderLogo(data.logoInfo);
            tinyAdmin.renderClear(options.clearUrl);
            tinyAdmin.renderHome(data.homeInfo);
            tinyAdmin.renderAnim(options.pageAnim);
            tinyAdmin.listen();
            tinyMenu.render({
              menuList: data.menuInfo,
              multiModule: options.multiModule,
              menuChildOpen: options.menuChildOpen,
            });
            tinyTab.render({
              filter: "layuitinyTab",
              urlHashLocation: options.urlHashLocation,
              multiModule: options.multiModule,
              menuChildOpen: options.menuChildOpen,
              maxTabNum: options.maxTabNum,
              menuList: data.menuInfo,
              homeInfo: data.homeInfo,
              listenSwichCallback: function () {
                tinyAdmin.renderDevice();
              },
            });
            tinyTheme.render({
              skinThemeDefault: options.skinThemeDefault,
              listen: true,
            });
            tinyAdmin.deleteLoader(options.loadingTime);
          }
        }).fail(function () {
          tinyAdmin.error("菜单接口有误");
        });
      },

      /**
       * 初始化logo
       * @param data
       */
      renderLogo: function (data) {
        var html =
          '<a href="' +
          data.href +
          '"><img src="' +
          data.image +
          '" alt="logo"><h1>' +
          data.title +
          "</h1></a>";
        $(".layuiTiny-logo").html(html);
      },

      /**
       * 初始化首页
       * @param data
       */
      renderHome: function (data) {
        sessionStorage.setItem("layuiTinyHomeHref", data.href);
        $("#layuiTinyHomeTabId").html(
          '<span class="layuiTiny-tab-active"></span><span class="disable-close">' +
            data.title +
            '</span><i class="layui-icon layui-unselect layui-tab-close">ဆ</i>'
        );
        $("#layuiTinyHomeTabId").attr("lay-id", data.href);
        $("#layuiTinyHomeTabIframe").html(
          '<iframe width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0"  src="' +
            data.href +
            '"></iframe>'
        );
      },

      /**
       * 初始化缓存地址
       * @param clearUrl
       */
      renderClear: function (clearUrl) {
        $(".layuiTiny-clear").attr("data-href", clearUrl);
      },

      /**
       * 初始化iframe窗口动画
       * @param anim
       */
      renderAnim: function (anim) {
        if (anim) {
          $("#layuiTiny-bg-color").after(
            '<style id="layuiTiny-page-anim">' +
              ".layui-tab-item.layui-show {animation:moveTop 1s;-webkit-animation:moveTop 1s;animation-fill-mode:both;-webkit-animation-fill-mode:both;position:relative;height:100%;-webkit-overflow-scrolling:touch;}\n" +
              "@keyframes moveTop {0% {opacity:0;-webkit-transform:translateY(30px);-ms-transform:translateY(30px);transform:translateY(30px);}\n" +
              "    100% {opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}\n" +
              "}\n" +
              "@-o-keyframes moveTop {0% {opacity:0;-webkit-transform:translateY(30px);-ms-transform:translateY(30px);transform:translateY(30px);}\n" +
              "    100% {opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}\n" +
              "}\n" +
              "@-moz-keyframes moveTop {0% {opacity:0;-webkit-transform:translateY(30px);-ms-transform:translateY(30px);transform:translateY(30px);}\n" +
              "    100% {opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}\n" +
              "}\n" +
              "@-webkit-keyframes moveTop {0% {opacity:0;-webkit-transform:translateY(30px);-ms-transform:translateY(30px);transform:translateY(30px);}\n" +
              "    100% {opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}\n" +
              "}" +
              "</style>"
          );
        }
      },

      fullScreen: function () {
        var el = document.documentElement;
        var rfs = el.requestFullScreen || el.webkitRequestFullScreen;
        if (typeof rfs != "undefined" && rfs) {
          rfs.call(el);
        } else if (typeof window.ActiveXObject != "undefined") {
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript != null) {
            wscript.SendKeys("{F11}");
          }
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen();
        } else if (el.oRequestFullscreen) {
          el.oRequestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen();
        } else {
          tinyAdmin.error("浏览器不支持全屏调用！");
        }
      },

      /**
       * 退出全屏
       */
      exitFullScreen: function () {
        var el = document;
        var cfs =
          el.cancelFullScreen || el.webkitCancelFullScreen || el.exitFullScreen;
        if (typeof cfs != "undefined" && cfs) {
          cfs.call(el);
        } else if (typeof window.ActiveXObject != "undefined") {
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript != null) {
            wscript.SendKeys("{F11}");
          }
        } else if (el.msExitFullscreen) {
          el.msExitFullscreen();
        } else if (el.oRequestFullscreen) {
          el.oCancelFullScreen();
        } else if (el.mozCancelFullScreen) {
          el.mozCancelFullScreen();
        } else if (el.webkitCancelFullScreen) {
          el.webkitCancelFullScreen();
        } else {
          tinyAdmin.error("浏览器不支持全屏调用！");
        }
      },

      /**
       * 初始化设备端
       */
      renderDevice: function () {
        if (tinyAdmin.checkMobile()) {
          $(".layuiTiny-tool i").attr("data-side-fold", 1);
          $(".layuiTiny-tool i").attr("class", "fa fa-outdent");
          $(".layui-layout-body").removeClass("layuiTiny-mini");
          $(".layui-layout-body").addClass("layuiTiny-all");
        }
      },

      /**
       * 初始化加载时间
       * @param loadingTime
       */
      deleteLoader: function (loadingTime) {
        setTimeout(function () {
          $(".layuiTiny-loader").fadeOut();
        }, loadingTime * 1000);
      },

      /**
       * 成功
       * @param title
       * @returns {*}
       */
      success: function (title) {
        return layer.msg(title, {
          icon: 1,
          shade: this.shade,
          scrollbar: false,
          time: 2000,
          shadeClose: true,
        });
      },

      /**
       * 失败
       * @param title
       * @returns {*}
       */
      error: function (title) {
        return layer.msg(title, {
          icon: 2,
          shade: this.shade,
          scrollbar: false,
          time: 3000,
          shadeClose: true,
        });
      },

      /**
       * 判断是否为手机
       * @returns {boolean}
       */
      checkMobile: function () {
        var ua = navigator.userAgent.toLocaleLowerCase();
        var pf = navigator.platform.toLocaleLowerCase();
        var isAndroid =
          /android/i.test(ua) ||
          (/iPhone|iPod|iPad/i.test(ua) && /linux/i.test(pf)) ||
          /ucweb.*linux/i.test(ua);
        var isIOS = /iPhone|iPod|iPad/i.test(ua) && !isAndroid;
        var isWinPhone = /Windows Phone|ZuneWP7/i.test(ua);
        var clientWidth = document.documentElement.clientWidth;
        if (!isAndroid && !isIOS && !isWinPhone && clientWidth > 1024) {
          return false;
        } else {
          return true;
        }
      },

      /**
       * 监听
       */
      listen: function () {
        /**
         * 清理
         */
        $("body").on("click", "[data-clear]", function () {
          var loading = layer.load(0, { shade: false, time: 2 * 1000 });
          sessionStorage.clear();

          // 判断是否清理服务端
          var clearUrl = $(this).attr("data-href");
          if (clearUrl != undefined && clearUrl != "" && clearUrl != null) {
            $.getJSON(clearUrl, function (data, status) {
              layer.close(loading);
              if (data.code != 1) {
                return tinyAdmin.error(data.msg);
              } else {
                return tinyAdmin.success(data.msg);
              }
            }).fail(function () {
              layer.close(loading);
              return tinyAdmin.error("清理缓存接口有误");
            });
          } else {
            layer.close(loading);
            return tinyAdmin.success("清除缓存成功");
          }
        });

        /**
         * 刷新
         */
        $("body").on("click", "[data-refresh]", function () {
          $(".layui-tab-item.layui-show")
            .find("iframe")[0]
            .contentWindow.location.reload();
          tinyAdmin.success("刷新成功");
        });

        /**
         * 监听提示信息
         */
        $("body").on("mouseenter", ".layui-nav-tree .menu-li", function () {
          if (tinyAdmin.checkMobile()) {
            return false;
          }
          var classInfo = $(this).attr("class"),
            tips = $(this).prop("innerHTML"),
            isShow = $(".layuiTiny-tool i").attr("data-side-fold");
          if (isShow == 0 && tips) {
            tips =
              "<ul class='layuiTiny-menu-left-zoom layui-nav layui-nav-tree layui-this'><li class='layui-nav-item layui-nav-itemed'>" +
              tips +
              "</li></ul>";
            window.openTips = layer.tips(tips, $(this), {
              tips: [2, "#fff"],
              time: 300000,
              skin: "popup-tips",
              success: function (el) {
                var left = $(el).position().left - 10;
                $(el).css({ left: left });
                element.render();
              },
            });
          }
        });

        $("body").on("mouseleave", ".popup-tips", function () {
          if (tinyAdmin.checkMobile()) {
            return false;
          }
          var isShow = $(".layuiTiny-tool i").attr("data-side-fold");
          if (isShow == 0) {
            try {
              layer.close(window.openTips);
            } catch (e) {
              console.log(e.message);
            }
          }
        });

        /**
         * 全屏
         */
        $("body").on("click", "[data-check-screen]", function () {
          var check = $(this).attr("data-check-screen");
          if (check == "full") {
            tinyAdmin.fullScreen();
            $(this).attr("data-check-screen", "exit");
            $(this).html('<i class="fa fa-compress"></i>');
          } else {
            tinyAdmin.exitFullScreen();
            $(this).attr("data-check-screen", "full");
            $(this).html('<i class="fa fa-arrows-alt"></i>');
          }
        });

        /**
         * 点击遮罩层
         */
        $("body").on("click", ".layuiTiny-make", function () {
          tinyAdmin.renderDevice();
        });
      },
    };

    exports("tinyAdmin", tinyAdmin);
  }
);
