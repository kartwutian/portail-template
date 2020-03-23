/**
 *
 * @param allApis
 * @param tags
 * @returns {{ string : {path: string, method: string, name: string}[]}}
 */
function generateApi(allApis, tags) {
  const initModel = generateInitModelData(tags);
  const modelTags = tags
    .filter(item => item.desc === "前端所属模块")
    .map(item => item.name);
  allApis.forEach(api => {
    const currentApi = {
      name: (() => {
        // TODO：生成api的名字，还得改进
        const index = api.path.lastIndexOf("/");
        return api.path.substring(index + 1);
      })(),
      method: api.method,
      path: api.path,
      desc: api.title
    };
    if (api.tag && api.tag.length) {
      let isDefault = true; // 标记是否需要加入到默认列表，如果已经在模块下，则不需要再push到__default
      api.tag.forEach(modelName => {
        if (modelTags.includes(modelName)) {
          if (isDefault) isDefault = false;
          initModel[modelName].push(currentApi);
        } else {
          // 防止重复push
          if (isDefault && !initModel.__default.includes(currentApi)) {
            initModel.__default.push(currentApi);
          }
        }
      });
    } else {
      initModel.__default.push(currentApi);
    }
  });
  return initModel;
}

function generateInitModelData(tags) {
  return tags.reduce(
    (prev, next) => {
      if (next.desc === "前端所属模块") {
        // 约定desc字段为“前端所属模块”的name为前端model的名字
        prev[next.name] = [];
      }
      return prev;
    },
    { __default: [] }
  ); // __default 存放默认全局的api,即没有设置tag为前端所属模块的api
}

exports.generateApi = generateApi;
