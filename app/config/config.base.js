import path from "path";

const ROOT_PATH = process.cwd();
const APP_PATH = path.join(ROOT_PATH, "app");
const config = {};
config.appRoot = APP_PATH;
config.appName = "ChanCMS";
config.port = "81";
config.version = "v3.1.2";
config.versionTime = "2025-06-1";
config.authorEmail = "867528315@qq.com";
config.authorWechat = "yanyutao2014";
config.JSON_LIMIT = "100kb";
//默认静态资源目录和请求地址配置
config.statics = [
  {
    prefix: "/public/",
    dir: "app/public",
    maxAge: 0,
  },
];

config.modules = [
  "base",
  "cms",
  "api",
  "web",
];

//后台操作接口权限控制，不配置则不开启权限控制
config.perms = [
  "category",
  "article",
  "slide",
  "tag",
  "collect",
  "gather",
  "model",
  "field",
  "friendlink",
  "message",
  "user",
  "role",
  "menu",
];

config.plugins = ["plus-wechat"];

export default config;
