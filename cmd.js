const http = require('http');
const path = require('path');
const { spawn } = require('node:child_process');

const npmPath = path.join(process.env.APPDATA, 'npm', 'npm.cmd');

let child;
const options = { cwd: __dirname };
const app = http.createServer((req, res) => {
    child = spawn(npmPath, ['run', 'dev'], options);
   
    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);

        if (data.toString().includes('VITE')) {
            // 在这里进行项目启动完毕后的处理
            res.end('ok');
            console.log('npm run dev succeeded!')
        }
    })
    
})

app.listen(1337, () => {
    console.log('create server at 127.0.0.1:1337');

    child = spawn(npmPath, ['run', 'dev'], options);

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);

        if (data.toString().includes('VITE')) {
            // 在这里进行项目启动完毕后的处理
            console.log('npm run dev succeeded!')
        }
    })
})
