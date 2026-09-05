// import BaseService from './base.js';
const { knex } = Chan;

class SiteService extends Chan.Service {

  model = "cms_site";

  //默认构造函数，可以不写
  constructor() {
    super();
  }

  // 基本信息
  async info() {
    try {
      let res = await this.all();
      return res[0] || {};
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
// 更新基本信息
  async updateInfo(body) {
    const { id, ...params } = body;
    try {
      const result = await this.update({query:{id:id}, params});
      return result ? "success" : "fail";
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  
}

export default SiteService;
