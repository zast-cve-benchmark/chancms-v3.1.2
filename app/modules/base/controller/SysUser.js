import dayjs from "dayjs";
const {
  config,
  modules: {
    base: {
      service: { SysUser ,SysMenu},
    },
  },
  helper: {
    utils: { setToken, getToken, bcrypt },
    api: { success, fail },
  },
} = Chan;

class SysUserController {

  async login(req, res, next) {
    try {
      let { username, password } = req.body;
      console.log('Login attempt:', { username });
      
      const user = await SysUser.find(username);
      console.log('User found:', user ? { id: user.id, username: user.username, status: user.status } : 'null');
      
      if (!user) {
        console.log('Login failed: User not found');
        res.json({ ...fail, msg: "用户名或密码错误！" });
        return;
      }
      
      console.log('Comparing passwords...');
      console.log('Input password:', password);
      console.log('Stored hash:', user.password);
      
      const match = await bcrypt.compare(password, user.password);
      console.log('Password match result:', match);
      
      if (user && match) {
        const { id, status } = user;
        console.log('Login successful, generating token');
        
        // 设置token
        const token = setToken(
          { uid: id, username },
          config.token.KEY,
          config.token.TIME
        );
        
        const data = { status, username, token };
        console.log('Token generated:', { token: token.substring(0, 20) + '...' });
        
        // 获取用户菜单
        const menus = await SysMenu.allRouter(id);
        console.log('Menus retrieved:', menus ? 'success' : 'failed');
        
        console.log('Response structure:', { 
          code: success.code, 
          msg: success.msg,
          data_keys: Object.keys(data),
          menus_included: !!menus 
        });
        
        res.json({ ...success, data: data, menus });
      } else {
        console.log('Login failed: Password mismatch');
        res.json({ ...fail, msg: "用户名或密码错误！" });
      }
    } catch (err) {
      console.error('Login error:', err);
      res.json({ ...fail, msg: "用户名或密码错误！" });
      console.error('SysUserController.login-->', err);
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const query = req.query || {};
      const data = await SysUser.list(query);
      res.json({ ...success, data });
    } catch (err) {
      next(err);
    }
  }
  // 增
  async create(req, res, next) {
    try {
      const body = req.body;
      body.password = await bcrypt.hash(body.password, config.secretcms.key);
      const data = await SysUser.create(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 查
  async detail(req, res, next) {
    try {
      let {id} = req.query;
      if (!id) {
        const token = req.cookies.token;
        if (!token) {
          return res.json({ ...fail, msg: "请先登录" });
        }
        const user = await getToken(token, config.token.KEY);
        id = user.uid;
      }
      const data = await SysUser.detail(id);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // // 删除
  async delete(req, res, next) {
    try {
      const { id } = req.query;
      const data = await SysUser.delete(id);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 改
  async update(req, res, next) {
    try {
      let {userId,username,status,role_id,password} = req.body;
      let params = {userId,username,status,role_id}
      if (password) {
        password = await bcrypt.hash(password, config.secretcms.key);
        params.password = password;
      }
      const data = await SysUser.update(params);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }


}

export default SysUserController;
