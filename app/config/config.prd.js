import base from "./config.base.js";
import data from "./data/index.js";
const config = { ...base, ...data };

//mysql配置
config.db = [
  {
    client: "mysql2",
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "chancms",
    debug: false,
  },
];

//web端口
config.port = "7001";

//静态资源
config.statics = [...base.statics];

// 缓存
config.cache = false;

// jwt 配置
config.token = {
  KEY: "ChanCMS",
  TIME: "1d",
  REFRESH: false, //是否开启刷新token
};

// bcrypt 加盐
config.secretcms = {
  key: 10,
};

//cors
config.cors = {
  origin: "*", //或者['http://localhost:8080', 'http://localhost:8081']
};

//多个views
config.views = []; //path.join(config.appRoot, `modules/web/view`)

// 模板缓存 dev 环境不缓存 prod 环境缓存
config.env = "prd";

config.logger = {
  level: "tiny",
};

export default config;

