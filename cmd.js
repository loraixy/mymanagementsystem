// const http = require('http');
// const path = require('path');
// const { spawn } = require('node:child_process');

// const npmPath = path.join(process.env.APPDATA, 'npm', 'npm.cmd');

// let child;
// const options = { cwd: __dirname };
// const app = http.createServer((req, res) => {
//     child = spawn(npmPath, ['run', 'dev'], options);

//     child.stdout.on('data', (data) => {
//         console.log(`stdout: ${data}`);

//         if (data.toString().includes('VITE')) {
//             // 在这里进行项目启动完毕后的处理
//             res.end('ok');
//             console.log('npm run dev succeeded!')
//         }
//     })

// })

// app.listen(1337, () => {
//     console.log('create server at 127.0.0.1:1337');

//     child = spawn(npmPath, ['run', 'dev'], options);

//     child.stdout.on('data', (data) => {
//         console.log(`stdout: ${data}`);

//         if (data.toString().includes('VITE')) {
//             // 在这里进行项目启动完毕后的处理
//             console.log('npm run dev succeeded!')
//         }
//     })
// })

// // 还有问题，信息显示不完全，那个百分之多少的并没有展示全面
// const http = require('http');

// const cp = require('child_process');

// const path = require('path');

// const readline = require('readline');
// // 这里还有一个问题，这个地方并不是自动检索的，所以还是要手动切换一次，有些人的电脑上的npm没有npm.cmd
// const npmPath = path.join(process.env.ProgramFiles, 'nodejs', 'npm.cmd');
// // const npmPath = path.join(process.env.APPDATA, 'npm', 'npm.cmd');

// let child;

// let rl;

// const spawnOptions = {
//     cwd: __dirname,
//     stdio: ['inherit', 'pipe', 'pipe'],
//     env: {
//         FORCE_COLOR: '1'
//     },
//     // shell: true
// };

// function commandOutput(child) {
//     // 创建交互式线程
//     rl = readline.createInterface({
//         input: child.stderr,
//         output: process.stdout,
//         terminal: false
//     });

//     rl.on('line', (line) => {
//         // 用 "\x1b[1A\x1b[K" 清空上一个 console.log() 的输出
//         console.log('\x1b[1A\x1b[K', line);
//     });

//     child.stdout.on('data', (data) => {
//         console.log(data.toString());
//     });

//     child.on('exit', (code) => {
//         console.log(`child process exited with code ${code}`);
//     });
// }

// const app = http.createServer((req, res) => {
//     console.log(child.pid);

//     // 要终止的进程ID
//     const processId = child.pid;

//     // 根据操作系统选择不同的终止命令 暂时只有windows 单纯用kill我没办法把那个端口什么的也关闭，最好就采用了这个命令 child.kill('SIGINT')
//     const killCommand = process.platform === 'win32' ? `taskkill /PID ${processId} /T /F` : `kill ${processId}`;

//     // 执行终止命令
//     cp.exec(killCommand, error => {
//         if (error) {
//             console.error(`执行命令出错: ${error}`);
//             return;
//         }
//         console.log('子进程已关闭。');
//     });

//     res.setHeader("Access-Control-Allow-Origin", "*");

//     res.setHeader("Access-Control-Allow-Credentials", true);

//     res.setHeader("Access-Control-Request-Method", "PUT,POST,GET,DELETE,OPTIONS");

//     console.log("url =>", req.url);

//     let query = 'dev';

//     if (req.url.split('=')[1]) {
//         query = req.url.split('=')[1];
//     }

//     console.log('query =>', query);

//     child = cp.spawn(npmPath, ['run', query], spawnOptions);

//     commandOutput(child);

//     res.end('hello');
// })

// app.listen(1337, () => {
//     // 在控制台输出蓝色且加粗的文字 '\x1b[34;1m' val '\x1b[0m'
//     console.log(`create server at`, '\x1b[34;1m', '127.0.0.1:1337', '\x1b[0m');

//     // console.log('cmd.js NODE_ENV =>', process.env.NODE_ENV);

//     child = cp.spawn(npmPath, ['run', 'dev'], spawnOptions);
//     commandOutput(child);
// })

// 还有问题，信息显示不完全，那个百分之多少的并没有展示全面
const http = require('http');

const cp = require('child_process');

const path = require('path');

const readline = require('readline');


const net = require('net');

function isPortAvailable(port) {
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

        server.listen(port, '127.0.0.1');
    });
}

// 示例使用
const port = 8081;
isPortAvailable(port)
    .then((available) => {
        if (available) {
            // 可用，执行启动新的父进程的代码
            console.log(`Port ${port} is available.`);
        } else {
            // 不可用，端口已被占用
            console.log(`Port ${port} is already in use.`);
        }
    })
    .catch((err) => {
        console.error(err);
    });
// 这里还有一个问题，这个地方并不是自动检索的，所以还是要手动切换一次，有些人的电脑上的npm没有npm.cmd
const npmPath = path.join(process.env.ProgramFiles, 'nodejs', 'npm.cmd');

let child;

let rl;

let port;

let spawnOptions = {
    cwd: __dirname,
    stdio: ['inherit', 'pipe', 'pipe'],
    env: {
        FORCE_COLOR: '1'
    },
    // shell: true
};

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
                }
            });

            child.on('exit', (code) => {
                console.log(`child process exited with code ${code}`);
            });
        } catch (error) {
            reject(error);
        }
    })
}

function createServer(port) {
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
    })

    app.listen(port, () => {
        process.env.PORT = port; // 添加这一行
        // 在控制台输出蓝色且加粗的文字 '\x1b[34;1m' val '\x1b[0m'
        port = app.address().port;
        console.log('create server at', '\x1b[34;1m', `127.0.0.1:${app.address().port}`, '\x1b[0m');

        console.log('cmd.js NODE_ENV =>', process.env.NODE_ENV);
        spawnOptions = {
            ...spawnOptions,
            env: {
                FORCE_COLOR: '1',
                PORT: port,
            },
        }
        child = cp.spawn(npmPath, ['run', 'dev'], spawnOptions);
        commandOutput(child);
    })

    app.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is already in use. Trying next port...`);
            createServer(port + 1); // 递归调用，尝试下一个端口号
        } else {
            console.error('Server error:', err);
        }
    });
}

createServer(8081)