class SysRoleMenuService extends Chan.Service {
  constructor() {
    super();
    this.model = "sys_role_menu"; // 假设表名为'sys_menus'
    this.pageSize = 100; // 最大每页条数
  }

  /**
   * @description 获取分页菜单列表
   * @param {Object} options - 分页查询参数
   * @returns {Promise<Object>} 包含菜单列表、总数等信息的对象
   */
  async list(query) {
    let res = await super.query({
      current: 1,
      pageSize: this.pageSize,
      query,
      field: ["role_id", "menu_id"],
    });
    return res;
  }

}

export default SysRoleMenuService;
