//  deploy/index.js里面
const scpClient = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const server = require('../../server');
// const server  = require('../../settings');
// console.log(1,server);
const spinner = ora(
    '正在发布到' +
    (process.env.NODE_ENV === 'prod' ? '生产' : '测试') +
    '服务器...'
);

// 在执行shell命令后，把开始上传部署项目代码放到这里面
spinner.start();
scpClient.scp(
    server.dist,
    {
        host: server.host,
        port: server.port,
        username: server.username,
        password: server.password,
        path: server.path
    },
    function (err) {
        spinner.stop();
        if (err) {
            console.log(chalk.red('发布失败.\n'));
            throw err;
        } else {
            console.log(
                chalk.green(
                    'Success! 成功发布到' +
                    (process.env.NODE_ENV === 'prod'
                        ? '生产'
                        : '测试') +
                    '服务器! \n'
                )
            );
        }
    }
);
// conn.end();