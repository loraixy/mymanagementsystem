// by lor 2023-07-04
const http = require('http');

const cp = require('child_process');

const path = require('path');

const net = require('net');

// 这里还有一个问题，这个地方并不是自动检索的，所以还是要手动切换一次，有些人的电脑上的npm没有npm.cmd
const npmPath = path.join(process.env.ProgramFiles, 'nodejs', 'npm.cmd');
// const npmPath = path.join(process.env.APPDATA, 'npm', 'npm.cmd');


// spawn的配置选项
let spawnOptions = {
    cwd: __dirname,
    stdio: ['inherit', 'pipe', 'pipe'],
    env: {
        FORCE_COLOR: '1'
    },
    // shell: true
};
// 服务配置
const config = {
    port: 8081,
    host: '127.0.0.1',
    viteHost: ''
};
// spwan返回值
let child = null;
// 记录当前连续的未使用端口数量
let count = 0;
// 最大连续未被使用端口数量
let continuity = 1;

/**
 * 检测端口占用情况
 * @param {number} port 
 * @param {string} host 
 * @returns {Promise<boolean>}
 */
function isPortAvailable(port, host) {
    return new Promise((resolve, reject) => {

        const server = net.createServer();

        server.once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(false);
            } else {
                reject(err);
            }
        });

        server.once('listening', () => {
            server.close();
            resolve(true);
        });

        server.listen(port, host);
    });
}
/**
 * 输出模式，和样式
 * @param {cp.ChildProcess} child 
 * @returns {Promise<void>}
 */
function commandOutput(child) {
    return new Promise((resolve, reject) => {
        try {

            child.stderr.on('data', (data) => {
                console.log('\x1b[1A\x1b[K', data.toString());

            })

            child.stdout.on('data', (data) => {
                console.log(data.toString());
                if (data.toString().includes('Local:') || data.toString().includes('--host')) {
                    // 在这里进行项目启动完毕后的处理
                    resolve()
                    console.log('npm run dev succeeded!');
                };
            });

            child.on('exit', (code) => {
                console.log(`child process exited with code ${code}`);
                console.log('当前已退,再次ctrl退出程序');
            });
        } catch (error) {
            reject(error);
        };
    });
};
/**
 * 创建服务
 * @param {number} port 
 * @param {string} host 
 */
function createServer(port, host) {
    const app = http.createServer((req, res) => {

        res.setHeader("Access-Control-Allow-Origin", "*");

        res.setHeader("Access-Control-Allow-Credentials", true);

        res.setHeader("Access-Control-Request-Method", "PUT,POST,GET,DELETE,OPTIONS");

        console.log(req.url)

        const url = req.url.split('?')[0]
        if (url === '/cmd') {

            console.log(child.pid);

            // 要终止的进程ID
            const processId = child.pid;

            // 根据操作系统选择不同的终止命令 暂时只有windows 单纯用kill我没办法把那个端口什么的也关闭，最后就采用了这个命令 child.kill('SIGINT')
            const killCommand = process.platform === 'win32' ? `taskkill /PID ${processId} /T /F` : `kill ${processId}`;

            // 执行终止命令
            cp.exec(killCommand, error => {
                if (error) {
                    console.error(`执行命令出错: ${error}`);
                    return;
                };
                console.log('子进程已关闭。');
            });

            console.log("url =>", req.url);

            let query = {
                cmd: 'dev',
                server: ''
            };

            req.url.split('?')[1]('&')

            console.log('query =>', query);
            spawnOptions = {
                ...spawnOptions,
                env: {
                    FORCE_COLOR: '1',
                    PORT: port,
                    VITE_PARENT_PORT: port,
                    VITE_PARENT_HOST: host,
                    VITE_API_BASE_URL: baseUrl
                },
            };
            child = cp.spawn(npmPath, ['run', query.cmd], spawnOptions);

            commandOutput(child).then(() => {
                res.end('hello');
            });
        } else {
            res.end('error')
        }
    });

    app.listen(port, host, () => {
        // 在控制台输出蓝色且加粗的文字 '\x1b[34;1m' val '\x1b[0m'
        port = app.address().port;
        console.log(app.address())
        console.log('create server at', '\x1b[34;1m', `${host}:\u001b[36m${app.address().port}\u001b[0m`, '\x1b[0m');

        console.log('cmd.js NODE_ENV =>', process.env.NODE_ENV, process.env.VITE_PORT);

        spawnOptions = {
            ...spawnOptions,
            env: {
                FORCE_COLOR: '1',
                PORT: port,
                VITE_PARENT_PORT: port,
                VITE_PARENT_HOST: host
            },
        };
        process.env.PORT = port; // 添加这一行
        child = cp.spawn(npmPath, ['run', process.env.NODE_ENV === 'development' ? 'dev' : process.env.NODE_ENV], spawnOptions);
        commandOutput(child);
    });

};
/**
 * 初始服务
 * @param {number} port 
 * @param {string} host 
 */
function init(port, host) {
    isPortAvailable(port, host)
        .then((available) => {
            if (available) {
                count++
                if (count >= continuity) {
                    // 可用，执行启动新的父进程的代码
                    createServer(port, host)
                    console.log(`\u001b[32mavailable:\u001b[0m Port ${port} is available.`);
                    count = 0
                } else {
                    // 不可用，端口已被占用
                    init(port + 1, host);
                    console.log(`\u001b[32mavailable:\u001b[0m Port ${port} is available.`);
                }

            } else {
                // 不可用，端口已被占用
                init(port + 1, host);
                console.log(`\u001b[35mprompt:\u001b[0m Port ${port} is already in use ${host}. Trying next port...`);
            }
        })
        .catch((err) => {
            console.error(err);
        });
};

init(config.port, config.host);