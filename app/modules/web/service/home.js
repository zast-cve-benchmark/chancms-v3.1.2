let {
  modules: {
    web: {
      service: { common },
    },
  },
  helper: {
    merge,
    utils: { filterFields},
  },
  config: { data },
} = Chan;

import datajson from '../config/data.js';
data = merge(data, datajson)

class HomeService {
  constructor() {}


  async init() {
    try {
      const config = data.init;

      let apiCalls = {};

      // 构建要调用的api对象
      for (let key in config) {
        if (config[key].show !== false) {
          let method = config[key].method;
          let apiMethod = common[method];
          let params = { ...(config[key].params || {})};

          apiCalls[key] = apiMethod(params).then((data) => {
            if (config[key].field) {
              return filterFields(data, config[key].field);
            }
            return data;
          });
        }
      }

      // 使用Promise.all并行执行所有api调用，并通过解构赋值获取结果
      let results = await Promise.all(Object.values(apiCalls));

      // 合并结果到一个对象中
      let resultObject = {};
      let keys = Object.keys(apiCalls);
      results.forEach((result, index) => {
        resultObject[keys[index]] = result;
      });

      return resultObject;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  // 首页
  async home() {
    try {
      const config = data.home;
      let apiCalls = {};

      // 构建要调用的api对象
      for (let key in config) {
        if (config[key].show !== false) {
          let method = config[key].method;
          let apiMethod = common[method];
          let params = config[key].params;

          // 参数校验与转换
          if (params) {
            params.start = Math.max(0, parseInt(params.start, 10) || 0);
            params.len = Math.min(
              Math.max(1, parseInt(params.len, 10) || 5),
              100
            ); // 限制每页最多100条
            if (typeof params.attr === "string") {
              params.attr = params.attr.trim();
            }
          }

          apiCalls[key] = apiMethod(params).then((data) => {
            if (config[key].field) {
              return filterFields(data, config[key].field);
            }
            return data;
          });
        }
      }

      // 使用Promise.all并行执行所有api调用，并通过解构赋值获取结果
      let results = await Promise.all(Object.values(apiCalls));

      // 合并结果到一个对象中
      let resultObject = {};
      let keys = Object.keys(apiCalls);
      results.forEach((result, index) => {
        resultObject[keys[index]] = result;
      });

      return resultObject;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 列表页
  async list(cid, current = 1) {
    try {
      const config = data.list;

      let apiCalls = {};

      // 构建要调用的api对象
      for (let key in config) {
        if (config[key].show !== false) {
          let method = config[key].method;
          let apiMethod = common[method];
          let params = { ...(config[key].params || {}), cid, current };
          apiCalls[key] = apiMethod(params).then((data) => {
            if (config[key].field) {
              return filterFields(data, config[key].field);
            }
            return data;
          });
        }
      }

      // 使用Promise.all并行执行所有api调用，并通过解构赋值获取结果
      let results = await Promise.all(Object.values(apiCalls));

      // 合并结果到一个对象中
      let resultObject = {};
      let keys = Object.keys(apiCalls);
      results.forEach((result, index) => {
        resultObject[keys[index]] = result;
      });

      return resultObject;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  // 文章页
  async article({ id, cid }) {
    try {
      const config = data.article;
      let apiCalls = {};

      // 构建要调用的api对象
      for (let key in config) {
        if (config[key].show !== false) {
          let method = config[key].method;
          let apiMethod = common[method];
          let params = { ...(config[key].params || {}), id, cid };

          apiCalls[key] = apiMethod(params).then((data) => {
            if (config[key].field) {
              return filterFields(data, config[key].field);
            }
            return data;
          });
        }
      }

      // 使用Promise.all并行执行所有api调用，并通过解构赋值获取结果
      let results = await Promise.all(Object.values(apiCalls));

      // 合并结果到一个对象中
      let resultObject = {};
      let keys = Object.keys(apiCalls);
      results.forEach((result, index) => {
        resultObject[keys[index]] = result;
      });

      return resultObject;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 单页列表页
  async page(cid) {
    try {
      const config = data.page;

      let apiCalls = {};

      // 构建要调用的api对象
      for (let key in config) {
        if (config[key].show !== false) {
          let method = config[key].method;
          let apiMethod = common[method];
          let params = { ...(config[key].params || {}), cid };
          apiCalls[key] = apiMethod(params).then((data) => data);
        }
      }

      // 使用Promise.all并行执行所有api调用，并通过解构赋值获取结果
      let results = await Promise.all(Object.values(apiCalls));

      // 合并结果到一个对象中
      let resultObject = {};
      let keys = Object.keys(apiCalls);
      results.forEach((result, index) => {
        resultObject[keys[index]] = result;
      });

      return resultObject;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async search({ keywords = "", current = 1 }) {
    try {
      const config = data.search;

      let apiCalls = {};

      // 构建要调用的api对象
      for (let key in config) {
        if (config[key].show !== false) {
          let method = config[key].method;
          let apiMethod = common[method];
          let params = { ...(config[key].params || {}), keywords, current };
          apiCalls[key] = apiMethod(params).then((data) => data);
        }
      }

      // 使用Promise.all并行执行所有api调用，并通过解构赋值获取结果
      let results = await Promise.all(Object.values(apiCalls));

      // 合并结果到一个对象中
      let resultObject = {};
      let keys = Object.keys(apiCalls);
      results.forEach((result, index) => {
        resultObject[keys[index]] = result;
      });

      return resultObject;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async tag({ path, current = 1 }) {
    try {
      const config = data.tag;

      let apiCalls = {};

      // 构建要调用的api对象
      for (let key in config) {
        if (config[key].show !== false) {
          let method = config[key].method;
          let apiMethod = common[method];
          let params = { ...(config[key].params || {}), path, current };
          apiCalls[key] = apiMethod(params).then((data) => data);
        }
      }

      // 使用Promise.all并行执行所有api调用，并通过解构赋值获取结果
      let results = await Promise.all(Object.values(apiCalls));

      // 合并结果到一个对象中
      let resultObject = {};
      let keys = Object.keys(apiCalls);
      results.forEach((result, index) => {
        resultObject[keys[index]] = result;
      });
      return resultObject;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default HomeService;
