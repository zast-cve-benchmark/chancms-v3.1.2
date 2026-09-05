class ConfigService extends Chan.Service {
  constructor() {
    super();
    this.model = "sys_config";
    this.pageSize = 100;
  }

  /**
   * @description 根据菜单ID查找菜单信息
   * @param {number} id - 菜单ID
   * @returns {Promise<Object|null>} 返回找到的菜单对象或null
   */
  async detail(id) {
    const res = await super.findById({
      query: { id },
      field: [
        "id",
        "type_code",
        "config_key",
        "config_value",
        "status",
        "remark",
      ],
    });
    return res;
  }

  /**
   * @description 删除菜单
   * @param {number} id - 要删除的菜单ID
   * @returns {Promise<boolean>} 操作是否成功
   */
  async delete(id) {
    let res = await super.delete({ id });
    return res;
  }

  /**
   * @description 获取分页菜单列表
   * @param {Object} options - 分页查询参数
   * @returns {Promise<Object>} 包含菜单列表、总数等信息的对象
   */
  async list({
    query,
    field = [
      "id",
      "type_code",
      "config_key",
      "config_value",
      "status",
      "remark",
    ],
  }) {
    let res = await super.query({
      current: 1,
      pageSize: this.pageSize,
      query,
      field,
    });
    return res;
  }

  // 增
  async create(body) {
    try {
      const result = await super.insert(body);
      return result ? "success" : "fail";
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async update(body) {
    const { id, ...params } = body;
    try {
      const result = await super.update({ query: { id: id }, params });
      return result ? "success" : "fail";
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async updateMany(updates = []) {
    try {
      const result = await super.updateMany(updates);
      return result ? "success" : "fail";
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default ConfigService;
