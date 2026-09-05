class SysUserRoleService extends Chan.Service {
  constructor() {
    super();
    this.model = "sys_user_role"; // 假设表名为'sys_menus'
    this.pageSize = 100; // 最大每页条数
  }

  /**
   * @description 根据菜单ID查找菜单信息
   * @param {number} id - 菜单ID
   * @returns {Promise<Object|null>} 返回找到的菜单对象或null
   */
  async detail(id) {
    const res = await super.findById({ query:{user_id:id}});
    return res;
  }
 

}

export default SysUserRoleService;
