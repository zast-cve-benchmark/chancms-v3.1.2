import dayjs from "dayjs";
const {
  config,
  modules: {
    base: {
      service: { ConfigType },
    },
  },
  helper: {
    utils: { setToken, getToken, bcrypt },
    api: { success, fail },
  },
} = Chan;

class ConfigTypeController {


  async list(req, res, next) {
    try {
      const query = req.query || {};
      const data = await ConfigType.list(query);
      res.json({ ...success, data });
    } catch (err) {
      next(err);
    }
  }
  // 增
  async create(req, res, next) {
    try {
      const body = req.body;
      const data = await ConfigType.create(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 查
  async detail(req, res, next) {
    try {
      let {id} = req.query;
     
      const data = await ConfigType.detail(id);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // // 删除
  async delete(req, res, next) {
    try {
      const { id } = req.query;
      const data = await ConfigType.delete(id);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 改
  async update(req, res, next) {
    try {
      const params = req.body;
      const data = await ConfigType.update(params);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }


}

export default ConfigTypeController;
