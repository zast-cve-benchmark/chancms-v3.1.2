import dayjs from "dayjs";
const {
  config,
  modules: {
    base: {
      service: { SysUserRole },
    },
  },
  helper: {
    utils: { setToken, getToken, bcrypt },
    api: { success, fail },
  },
} = Chan;

class SysUserRoleController {


  // 查
  async detail(req, res, next) {
    try {
      const {user_id} = req.query;
      const data = await SysUserRole.detail(user_id);
      res.json({ ...success, data: data });
     
    } catch (err) {
      next(err);
    }
  }

}

export default SysUserRoleController;
