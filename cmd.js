// 还有问题，信息显示不完全，那个百分之多少的并没有展示全面
const http = require('http');

const cp = require('child_process');

const path = require('path');

const readline = require('readline');

const net = require('net');

// 这里还有一个问题，这个地方并不是自动检索的，所以还是要手动切换一次，有些人的电脑上的npm没有npm.cmd
const npmPath = path.join(process.env.ProgramFiles, 'nodejs', 'npm.cmd');

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
}

let child;
let rl;
// 判断端口占用情况
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
// 输出模式，和样式
function commandOutput(child) {
    return new Promise((resolve, reject) => {
        try {
            // 创建交互式线程
            rl = readline.createInterface({
                input: child.stderr,
                output: process.stdout,
                terminal: false
            });

            rl.on('line', (line) => {
                // 用 "\x1b[1A\x1b[K" 清空上一个 console.log() 的输出
                console.log('\x1b[1A\x1b[K', line);
            });

            child.stdout.on('data', (data) => {
                console.log(data.toString());
                if (data.toString().includes('Local:')) {
                    // 在这里进行项目启动完毕后的处理
                    resolve()
                    console.log('npm run dev succeeded!');
                };
            });

            child.on('exit', (code) => {
                console.log(`child process exited with code ${code}`);
            });
        } catch (error) {
            reject(error);
        };
    });
};
// 服务创建
function createServer(port, host) {
    const app = http.createServer((req, res) => {

        res.setHeader("Access-Control-Allow-Origin", "*");

        res.setHeader("Access-Control-Allow-Credentials", true);

        res.setHeader("Access-Control-Request-Method", "PUT,POST,GET,DELETE,OPTIONS");

        console.log(child.pid);

        // 要终止的进程ID
        const processId = child.pid;

        // 根据操作系统选择不同的终止命令 暂时只有windows 单纯用kill我没办法把那个端口什么的也关闭，最好就采用了这个命令 child.kill('SIGINT')
        const killCommand = process.platform === 'win32' ? `taskkill /PID ${processId} /T /F` : `kill ${processId}`;

        // 执行终止命令
        cp.exec(killCommand, error => {
            if (error) {
                console.error(`执行命令出错: ${error}`);
                return;
            }
            console.log('子进程已关闭。');
        });

        console.log("url =>", req.url);

        let query = 'dev';

        if (req.url.split('=')[1]) {
            query = req.url.split('=')[1];
        }

        console.log('query =>', query);

        child = cp.spawn(npmPath, ['run', query], spawnOptions);

        commandOutput(child).then(() => {
            res.end('hello');
        });
    });

    app.listen(port, host, () => {
        // 在控制台输出蓝色且加粗的文字 '\x1b[34;1m' val '\x1b[0m'
        port = app.address().port;
        console.log('create server at', '\x1b[34;1m', `${host}:${app.address().port}`, '\x1b[0m');

        console.log('cmd.js NODE_ENV =>', process.env.NODE_ENV);
        spawnOptions = {
            ...spawnOptions,
            env: {
                FORCE_COLOR: '1',
                PORT: port + 1,
            },
        };
        process.env.PORT = port; // 添加这一行
        child = cp.spawn(npmPath, ['run', 'dev'], spawnOptions);
        commandOutput(child);
    });

};

function init(port, host) {
    isPortAvailable(port, host)
        .then((available) => {
            if (available) {
                // 可用，执行启动新的父进程的代码
                console.log(port, host)
                createServer(port, host)
                console.log(`Port ${port} is available.`);
            } else {
                // 不可用，端口已被占用
                init(port + 1, host);
                console.log(`Port ${port} is already in use ${host}. Trying next port...`);
            }
        })
        .catch((err) => {
            console.error(err);
        });
};

init(config.port, config.host);