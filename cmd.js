const http = require('http');
const path = require('path');
const { spawn } = require('node:child_process');

const npmPath = path.join(process.env.APPDATA, 'npm', 'npm.cmd');

let child;
const options = { cwd: __dirname };
const app = http.createServer((req, res) => {
    child = spawn(npmPath, ['run', 'dev'], options);
    res.end('ok');

})

app.listen(1337, () => {
    console.log('create server at 127.0.0.1:1337');

    child = spawn(npmPath, ['run', 'dev'], options);

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    }
    )
})