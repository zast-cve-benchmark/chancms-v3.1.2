//测试配置模板数据

export default {
  home:{
    news:{
      method: "getArticleListByCid",
      params: {
        cid: 6,
        start: 0,
        len: 3,
        excludeAttr: ["1"], // 排除 attr 为 1 的记录
      },
      field: ["id", "title", "path", "description","createdAt"],
      show: true,
    }
  },
  list:{
    articleList: {
      method: "list",
      params: { pageSize: 10 },
    },
 
    //当前栏目热门数据
    hot: {
      method: "getArticlePvList",
      params: { len: 10 },
      field: ["id", "title", "path", "pv"],
      show: true,
    },
  },
  article:{
    hot: {
      method: "getArticlePvList",
      params: { len: 10 },
      field: ["id", "title", "path","img", "pv","description"],
      show: true,
    },
  }
    
}
  