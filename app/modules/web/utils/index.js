const {helper, config:{data}} = Chan;

const {
  utils: { pages, getChildrenId, treeById, filterFields, htmlDecode },
} = helper;

/**
 * @description 根据导航栏目获取首页视图文件
 * @param {*} nav 导航栏目
 */
export const homeView = (nav) => {
  let view = "index.html";
  if (
    Array.isArray(nav) &&
    nav.length > 0 &&
    nav[0].pinyin == "home" &&
    nav[0].listView
  ) {
    view = nav[0].listView;
  }
  return view;
};

/**
 * @description 获取列表页参数
 * @param {*} req
 * @returns {object}
 */
export const listGetParams = (req) => {
  const { template, category } = req.app.locals;

  const { cate = "", cid } = req.params;
  const current = parseInt(req.params.current, 10) || 1;
  // 当前栏目和当前栏目下所有子导航
  const navSub = getChildrenId(cate || cid, category);
  const _cate = navSub?.cate || {};
  const id = cid || _cate.id;
  return { template, category, cate: _cate, id, current };
};

/**
 * @description 列表页数据解析
 * @param {*} param0
 * @returns {object}
 */
export const listDataParse = ({ id, category, cate, current, data }) => {
  let position = treeById(id, category).filter((item) => item); // 确保过滤掉可能的空值
 
  //当前栏目父子层级栏目
  let subnav ={}
  position.map((item,index)=>{
    subnav[`level${index+1}`] = item
  })

  //当前位置
  const positionField = ["id", "name", "path"];
  position = filterFields(position, positionField);

  //文章数量
  const count = data.articleList.count;

  // 分页
  let pageHtml = "";
  if (position.length > 0) {
    const lastPath = position[position.length - 1].path; // 提前存储最后一个元素的路径
    const href = `${lastPath}/index`;
    pageHtml = pages(
      current,
      count,
      data?.list?.articleList?.params?.pageSize || 10,
      href
    );
  }

  // 获取模板
  const view = cate?.listView || "list.html";
  return { pageHtml, view, position,subnav };
};

export const articleGetParams = (req) => {
  const { template, category } = req.app.locals;
  let { id } = req.params;
  if (id.includes(".html")) {
    id = id.replace(".html", "");
  }
  return { id, template, category };
};

export const articleDataParse = ({ article, cid, category }) => {
  article.content = htmlDecode(article.content);
  // 扩展字段
  Object.getOwnPropertyNames(article.field).forEach(function (key) {
    if (
      typeof article.field[key] == "string" &&
      article.field[key].includes("{")
    ) {
      article.field[key] = JSON.parse(article.field[key]);
    }
  });
  // 当前栏目和当前栏目下所有子导航
  const navSub = getChildrenId(cid, category);
  let cate = navSub?.cate || {};
  // 当前位置
  const position = treeById(cid, category);
  //获取模板
  let view = article.articleView || cate.articleView;
  return { article, cate, position, view };
};

export const searchParams = (req) => {
  const { template } = req.app.locals;
  const { keywords, current = 1 } = req.params;
  let key = keywords.slice(0, 10);
  return { current: +current, template, keywords: key };
};

export const searchDataParse = ({ data, keywords, current }) => {
  // 分页
  let { count = 0, list = [] } = data.search;
  let href = `/search/${keywords}/words`;

  let pageHtml = pages(
    current,
    count,
    data?.search?.search?.params?.pageSize || 10,
    href
  );

  list.forEach((ele) => {
    ele.titles = ele.title.replace(
      new RegExp(keywords, "gi"),
      `<span class='c-red'>${keywords}</span>`
    );
  });

  return { list, pageHtml };
};

export const tagParams = (req) => {
  const { template } = req.app.locals;
  const { path, current = 1 } = req.params;
  const { tag } = req.query;
  return { current: +current, template, path, tag };
};

export const tagDataParse = ({ data, current, tag, path }) => {
  //分页
  let { count } = data.tags;
  let href = `/tags/${path}/tag`;
  let query = `?tag=${tag}`;
  let pageHtml = pages(
    current,
    count,
    data?.tag?.tags?.params?.pageSize || 10,
    href,
    query
  );
  return { pageHtml };
};