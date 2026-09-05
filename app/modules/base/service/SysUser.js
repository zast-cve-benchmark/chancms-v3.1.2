class SysUserService extends Chan.Service {
  constructor() {
    super();
    this.model = "sys_user"; // 假设表名为'sys_menus'
    this.pageSize = 100; // 最大每页条数
  }

  async find(username) {
    try {
      // 直接使用 knex 查询，而不是调用 super.findById
      const res = await this.knex(this.model)
        .where({ username })
        .select(["id", "username", "password", "status"])
        .first();
      
      console.log('Direct query result:', res);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * @description 根据菜单ID查找菜单信息
   * @param {number} id - 菜单ID
   * @returns {Promise<Object|null>} 返回找到的菜单对象或null
   */
  async detail(id) {
    const res = await super.findById({
      query: { id },
      field: ["id", "username", "avatar", "status"],
    });

    if (!res) {
      return null;
    }

    // 查询 sys_user_role 表获取角色信息
    const roles = await this.knex("sys_user_role")
      .select("role_id")
      .where("user_id", id);

    // 将角色信息添加到用户详情对象中
    res.roles = roles.map((role) => role.role_id);
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
  async list({cur = 1, pageSize = 10}) {
    try {
      // 查询个数
      const total = await this.knex(this.model).count("id", { as: "count" });
      const offset = parseInt((cur - 1) * pageSize);
      const list = await this.knex("sys_user as u")
        .select(
          "u.id",
          "u.username",
          "u.status",
          "r.id as role_id",
          "r.name as role_name",
          "r.key as role_value"
        )
        .leftJoin("sys_user_role as ur", "u.id", "ur.user_id")
        .leftJoin("sys_role as r", "ur.role_id", "r.id")
        .limit(pageSize)
        .offset(offset)
        .orderBy("u.id", "asc");

      const count = total[0].count || 1;
      return {
        count: count,
        total: Math.ceil(count / pageSize),
        current: cur,
        list: list,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 增
  async create({ role_id, ...params }) {
    try {
      // 等待事务完成
      await this.knex.transaction(async (trx) => {
        // 插入用户数据并获取新插入行的 id
        const [userId] = await trx(this.model).insert(params).returning("id");
        // 将用户和角色的关联信息插入到 sys_user_role 表中
        await trx("sys_user_role").insert({
          user_id: userId,
          role_id,
        });
        // 返回结果或确认信息
        return userId;
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  //改
  async update({userId,role_id, ...params }) {
    return this.knex.transaction(async (trx) => {
      try {
       // 更新 sys_role 表
      if (Object.keys(params).length > 0) {
        await trx(this.model).where("id", userId).update(params);
      }

      // 尝试更新 sys_user_role 表
      const rowsAffected = await trx("sys_user_role")
        .where("user_id", userId)
        .update({ role_id });

      // 如果没有更新任何行，则插入新记录
      if (rowsAffected === 0) {
        await trx("sys_user_role").insert({ user_id: userId, role_id });
      }

      return true; // 表示操作成功
      } catch (error) {
        console.error("Error updating role and menus:", error);
        throw error; // 抛出错误以便调用者知道操作失败
      }
    });
  }
}

export default SysUserService;
