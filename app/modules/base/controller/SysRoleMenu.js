const {
  modules: {
    base: {
      service: { SysRoleMenu },
    },
  },
  helper: {
    api: { success },
  },
} = Chan;

class SysRoleMenuController {

  async list(req, res, next) {
    try {
      const id = req.query.id;
      const data = await SysRoleMenu.list({role_id:id});
      res.json({ ...success, data });
    } catch (err) {
      next(err);
    }
  }

}

export default SysRoleMenuController;
