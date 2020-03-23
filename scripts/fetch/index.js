/**
 * 这个文件用于生成api.json
 */

const http = require("http");
const fs = require("fs");
const { generateApi } = require("./utils");

const config = {
  cookie:
    "sidebar_collapsed=false; UM_distinctid=16bab037033492-0334d3098d3e51-e343166-15f900-16bab037034964; CNZZDATA5879641=cnzz_eid%3D1596962110-1561939403-%26ntime%3D1561939403; _yapi_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEzLCJpYXQiOjE1NzIyMzEyOTIsImV4cCI6MTU3MjgzNjA5Mn0.Us1tgRJsZvNkl3MEX-1zGu4TIBSCrFuBD44TEJDJkoo; _yapi_uid=13",
  tagsPath: "/api/project/get?id=107",
  apisPath: "/api/interface/list?page=1&limit=1000&project_id=107"
};

function getOptions(path) {
  return {
    hostname: "183.131.202.93",
    port: 9071,
    path,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: config.cookie
    }
  };
}

let tagsData = "";
let apisData = "";

const req = http.request(getOptions(config.tagsPath), res => {
  res.setEncoding("utf8");
  res.on("data", chunk => {
    tagsData += chunk;
  });
  res.on("end", () => {
    console.log("获取标签ok");
    tagsData = JSON.parse(tagsData.toString());
    console.log(tagsData);
    const req1 = http.request(getOptions(config.apisPath), res => {
      res.setEncoding("utf8");
      res.on("data", chunk => {
        apisData += chunk;
      });
      res.on("end", () => {
        console.log("获取所有api ok");
        apisData = JSON.parse(apisData.toString());
        console.log(apisData);
        fs.writeFileSync(
          "./scripts/fetch/api.json",
          JSON.stringify(
            generateApi(apisData.data.list, tagsData.data.tag),
            null,
            2
          )
        );
      });
    });

    req1.on("error", e => {
      console.error(`请求遇到问题: ${e.message}`);
    });

    req1.end();
  });
});

req.on("error", e => {
  console.error(`请求遇到问题: ${e.message}`);
});

req.end();
