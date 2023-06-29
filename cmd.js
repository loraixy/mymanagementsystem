// 还有问题，信息显示不完全，那个百分之多少的并没有展示全面
const http = require('http');

const cp = require('child_process');

const path = require('path');

const readline = require('readline');
// 这里还有一个问题，这个地方并不是自动检索的，所以还是要手动切换一次，有些人的电脑上的npm没有npm.cmd
const npmPath = path.join(process.env.ProgramFiles, 'nodejs', 'npm.cmd');
// const npmPath = path.join(process.env.APPDATA, 'npm', 'npm.cmd');

let child;

let rl;

const spawnOptions = {
    cwd: __dirname,
    stdio: ['inherit', 'pipe', 'pipe'],
    env: {
        FORCE_COLOR: '1'
    },
    // shell: true
};

function commandOutput(child) {
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
    });

    child.on('exit', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

const app = http.createServer((req, res) => {
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

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader("Access-Control-Allow-Credentials", true);

    res.setHeader("Access-Control-Request-Method", "PUT,POST,GET,DELETE,OPTIONS");

    console.log("url =>", req.url);

    let query = 'dev';

    if (req.url.split('=')[1]) {
        query = req.url.split('=')[1];
    }

    console.log('query =>', query);

    child = cp.spawn(npmPath, ['run', query], spawnOptions);

    commandOutput(child);

    res.end('hello');
})

app.listen(1337, () => {
    // 在控制台输出蓝色且加粗的文字 '\x1b[34;1m' val '\x1b[0m'
    console.log(`create server at`, '\x1b[34;1m', '127.0.0.1:1337', '\x1b[0m');

    // console.log('cmd.js NODE_ENV =>', process.env.NODE_ENV);

    child = cp.spawn(npmPath, ['run', 'dev'], spawnOptions);
    commandOutput(child);
})