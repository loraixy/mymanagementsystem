// by lor 2023-08-26
// 写的并不是很好， 第一次尝试nodejs的命令行
// 不过还是有点不错的
const http = require("http");

const cp = require("child_process");

const path = require("path");

const net = require("net");

const fs = require("fs");

// 这里还有一个问题，这个地方并不是自动检索的，所以还是要手动切换一次，有些人的电脑上的npm没有npm.cmd
// const npmPath = path.join(process.env.ProgramFiles, 'nodejs', 'npm.cmd');
let npmPath = null;

// 第一个路径
const npmPath1 = path.join(process.env.ProgramFiles, "nodejs", "npm.cmd");
// 第二个路径
const npmPath2 = path.join(process.env.APPDATA, "npm", "npm.cmd");

// 检查第一个路径是否存在
if (fs.existsSync(npmPath1)) {
  console.log("执行第一个路径上的操作");
  npmPath = npmPath1;
  // 执行第一个路径上的操作
} else if (fs.existsSync(npmPath2)) {
  console.log("执行第二个路径上的操作");
  npmPath = npmPath2;
  // 执行第二个路径上的操作
} else {
  console.log("两个路径都不存在，报错");
  // 报错或执行其他操作
}

// spawn的配置选项
let spawnOptions = {
  cwd: __dirname,
  stdio: ["inherit", "pipe", "pipe"],
  env: {
    FORCE_COLOR: "1",
  },
  // shell: true
};
// 服务配置
const config = {
  port: 8081,
  host: "127.0.0.1",
  viteHost: "",
};
// spawn返回值
let child = null;

/**
 * 检测端口占用情况
 * @param {number} port
 * @param {string} host
 * @returns {Promise<boolean>}
 */
function isPortAvailable(port, host) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(false);
      } else {
        reject(err);
      }
    });

    server.once("listening", () => {
      server.close();
      resolve(true);
    });

    server.listen(port, host);
  });
}
/**
 * 输出模式，和样式
 * @param {cp.ChildProcess} child
 * @returns {Promise<unknown>}
 */
function commandOutput(child) {
  return new Promise((resolve, reject) => {
    try {
      child.stderr.on("data", (data) => {
        console.log("\x1b[1A\x1b[K", data.toString());
      });

      child.stdout.on("data", (data) => {
        console.log(data.toString());
        if (
          data.toString().includes("Local:") ||
          data.toString().includes("--host")
        ) {
          // 在这里进行项目启动完毕后的处理
          resolve();
          console.log("npm run dev succeeded!");
        }
      });

      child.on("exit", (code) => {
        console.log(`child process exited with code ${code}`);
        console.log("当前已退,再次ctrl退出程序");
      });
    } catch (error) {
      reject(error);
    }
  });
}
/**
 * 创建服务
 * @param {number} port
 * @param {string} host
 */
function createServer(port, host) {
  const app = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader("Access-Control-Allow-Credentials", true);

    res.setHeader(
      "Access-Control-Request-Method",
      "PUT,POST,GET,DELETE,OPTIONS"
    );

    console.log(req.url);

    const url = req.url.split("?")[0];

    if (url === "/cmd") {
      console.log(child.pid, process.env.VITE_API_BASE_URL);

      // 要终止的进程ID
      const processId = child.pid;

      // 根据操作系统选择不同的终止命令 暂时只有windows 单纯用kill我没办法把那个端口什么的也关闭，最后就采用了这个命令 child.kill('SIGINT')
      const killCommand =
        process.platform === "win32"
          ? `taskkill /PID ${processId} /T /F`
          : `kill ${processId}`;

      // 执行终止命令
      cp.exec(killCommand, (error) => {
        if (error) {
          console.error(`执行命令出错: ${error}`);
          return;
        }
        console.log("子进程已关闭。");
      });

      console.log("url =>", req.url);

      let query = {
        cmd: "dev",
        serve: "",
      };

      const queryStr = req.url.split("?")[1].split("&");

      const cmdStrArr = {};
      queryStr.forEach((item) => {
        const key = item.split("=")[0];
        const value = item.split("=")[1];

        cmdStrArr[key] = value;
      });

      query = {
        ...query,
        ...cmdStrArr,
      };
      // custom
      console.log("query =>", query);
      spawnOptions = {
        ...spawnOptions,
        env: {
          FORCE_COLOR: "1",
          PORT: port,
          VITE_PARENT_PORT: port,
          VITE_PARENT_HOST: host,
          ...(query.serve && query.cmd === "custom"
            ? {
                VITE_API_BASE_URL: query.serve,
                VITE_NODE_ENV: "custom",
                VITE_APP_TITLE: "custom",
              }
            : {}),
        },
      };
      child = cp.spawn(npmPath, ["run", query.cmd], spawnOptions);

      commandOutput(child).then(() => {
        res.end("hello");
      });
    } else if (url == "/create-file") {
      const options = {
        hostname: "192.168.2.200",
        port: 5000,
        path: "/api/Myfromwork/GetMenus",
        method: "GET",
      };

      const request = http.request(options, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          console.log(data); // 请求结果在这里处理

          // test().then((data) => {
          //     console.log(data)
          //     res.writeHead(200, {
          //         'Content-Type': 'application/json' // 设置响应头
          //     });
          //     res.end(data);
          // })
          const folderPath = path.resolve(
            "src",
            "views",
            "pages",
            `test`,
            `test`
          );
          const filePathVue = path.resolve(
            "src",
            "views",
            "pages",
            `test`,
            `test`,
            "test.vue"
          );
          const filePathMeta = path.resolve(
            "src",
            "views",
            "pages",
            `test`,
            `test`,
            "page.ts"
          );

          const N = "\n";
          fs.mkdirSync(folderPath, { recursive: true });

          fs.writeFileSync(
            filePathVue,
            `<script lang="ts" setup name="test">${N}      console.log('test');${N}</script>${N}<template>${N}    <div>test</div>${N}</template>
                    `,
            { flag: "w", encoding: "utf-8" }
          );

          fs.writeFileSync(
            filePathMeta,
            `export default {${N}  name: 'test',${N}  savePage: true,${N}  title: 'test',${N}  premiss: '1',${N}  // 在工作中需要做许多关于提示保存的, 然后以前的项目经常没有,用户那边需要关闭时的一个保存提示.就加上了这个${N}  isSave: false,${N}  menu: 'Navigation test'${N}}`,
            { flag: "w", encoding: "utf-8" }
          );
          res.writeHead(200, {
            "Content-Type": "application/json", // 设置响应头
          });
          res.end(data);
        });
      });

      request.on("error", (error) => {
        res.end("error");
        const folderPath = path.resolve(
          "src",
          "views",
          "pages",
          `test`,
          `test`
        );
        const filePathVue = path.resolve(
          "src",
          "views",
          "pages",
          `test`,
          `test`,
          "test.vue"
        );
        const filePathMeta = path.resolve(
          "src",
          "views",
          "pages",
          `test`,
          `test`,
          "page.ts"
        );

        const N = "\n";
        fs.mkdirSync(folderPath, { recursive: true });

        fs.writeFileSync(
          filePathVue,
          `<script lang="ts" setup name="test">${N}      console.log('test');${N}</script>${N}<template>${N}    <div>test</div>${N}</template>
                `,
          { flag: "w", encoding: "utf-8" }
        );

        fs.writeFileSync(
          filePathMeta,
          `export default {${N}  name: 'test',${N}  savePage: true,${N}  title: 'test',${N}  premiss: '1',${N}  // 在工作中需要做许多关于提示保存的, 然后以前的项目经常没有,用户那边需要关闭时的一个保存提示.就加上了这个${N}  isSave: false,${N}  menu: 'Navigation test'${N}}`,
          { flag: "w", encoding: "utf-8" }
        );

        console.error(error); // 处理请求错误
      });

      request.end("ok");
    } else {
      res.end("error");
    }
  });

  app.listen(port, host, () => {
    // 在控制台输出蓝色且加粗的文字 '\x1b[34;1m' val '\x1b[0m'
    port = app.address().port;
    console.log(app.address());
    console.log(
      "create server at",
      "\x1b[34;1m",
      `${host}:\u001b[36m${app.address().port}\u001b[0m`,
      "\x1b[0m"
    );

    console.log("cmd.js NODE_ENV =>", process.env.NODE_ENV);

    spawnOptions = {
      ...spawnOptions,
      env: {
        FORCE_COLOR: "1",
        PORT: port,
        VITE_PARENT_PORT: port,
        VITE_PARENT_HOST: host,
      },
    };
    process.env.PORT = port; // 添加这一行
    child = cp.spawn(
      npmPath,
      [
        "run",
        process.env.NODE_ENV === "development" ? "dev" : process.env.NODE_ENV,
      ],
      spawnOptions
    );
    commandOutput(child);

    const folderPath = "./src/views/pages";
    // 需要封装一下才行
    fs.watch(folderPath, (eventType, filename) => {
      console.log(`文件 ${filename} 发生了 ${eventType} 事件`);
    });
  });
}
/**
 * 初始服务
 * @param {number} port - 端口
 * @param {string} host - 主机
 */
function init(port, host) {
  isPortAvailable(port, host)
    .then((available) => {
      if (available) {
        //  ANSI 转义码 把终端输出的颜色做更改
        console.log(`\u001b[32mavailable:\u001b[0m Port ${port} is available.`);
        // 可用，执行启动新的父进程的代码
        createServer(port, host);
      } else {
        // 不可用，端口已被占用
        init(port + 1, host);
        console.log(
          `\u001b[35mprompt:\u001b[0m Port ${port} is already in use ${host}. Trying next port...`
        );
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

init(config.port, config.host);
