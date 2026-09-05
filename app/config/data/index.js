import home from "./home.js";
import list from "./list.js";
import article from "./article.js";
import page from "./page.js";
import search from "./search.js";
import tag from "./tag.js";
import init from "./init.js";
const config = {
  data: {
    ...home,
    ...list,
    ...article,
    ...page,
    ...search,
    ...tag,
    ...init
  },
};
export default config;
