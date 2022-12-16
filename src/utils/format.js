/*
 * @Author: shaolong
 * @Date: 2022-12-06 10:08:22
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-16 10:56:28
 * @Description:
 */

// 循环递归数组
export function trimAsyncRoutes(routes, parenUrl) {
  try {
    const cloneData = JSON.parse(JSON.stringify(routes)); // 对源数据深度克隆
    const trimRoutes = [];
    cloneData.forEach((item) => {
      // 目录和菜单进行递归
      if ([1, 2].includes(item.type)) {
        const obj = {
          element: item.component ? item.component : "Layouts",
          hidden: item.hidden,
          path: parenUrl ? parenUrl + "/" + item.url : "/" + item.url,
          meta: {
            label: item.title,
            icon: item.icon
          }
        };

        if (item.children && item.children.length > 0) {
          obj.children = trimAsyncRoutes(item.children, obj.path);
        }
        trimRoutes.push(obj);
      }
    });
    return trimRoutes;
  } catch (error) {
    console.log(error);
  }
}

// 深拷贝
export function deepCopy(obj, wekmap = new WeakMap()) {
  // symbol作为值直接返回一个新的symbol
  if (typeof obj === "symbol") return Symbol(obj.description);
  if (typeof obj === "function") return obj;
  if (!isObj(obj)) return obj;
  // 循环引用
  if (wekmap.has(obj)) return wekmap.get(obj);
  const newObj = Array.isArray(obj) ? [] : {};
  wekmap.set(obj, newObj);
  for (const key in obj) {
    newObj[key] = deepCopy(obj[key], wekmap);
  }
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  // symbol的值作为key
  for (const val of symbolKeys) {
    newObj[val] = deepCopy(obj[val], wekmap);
  }
  return newObj;
}

function isObj(obj) {
  const str = typeof obj;
  return str === "object" || (str === "function" && obj !== null);
}
