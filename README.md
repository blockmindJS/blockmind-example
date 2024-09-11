Основной репозиторий: https://github.com/mmeerrkkaa/blockmind/tree/main

Example Репозиторий: https://github.com/mmeerrkkaa/blockmind-example


```js
const { createBot } = require('blockmind');
const CustomRepository = require("./database/repositories/customRepository");
const { commandHandler } = require('blockmind');
const { Permission } = require('blockmind');
const { Group } = require('blockmind');

const botOptions = {
    host: 'localhost', // 'mc.masedworld.net', 'mc.mineblaze.net', 'mc.cheatmine.net', 'mc.mineblaze.net'
    username: 'dasd',
    dbType: 'sqlite',
    version: '1.20.1',
    COMMAND_PREFIX: '@',
    customModels: {
        sqlite: {
            CustomModel: require('./database/models/custom/customModelSQLite')
        }
    },
    customRepositories: {
        custom: CustomRepository
    },

    delayConfig: {
        local: 444,
        global: 5000,
        clan: 350,
        private: 4500
    },

    pluginsAutoUpdate: true,

    plugins: [
        { type: 'github', repoUrl: 'https://github.com/mmeerrkkaa/examplePlugins', localPath: './plugins/CustomAuthPlugin' }
    ]
};

createBot(botOptions).then(async (bot) => {
    console.log(`Bot is running with prefix: ${bot.COMMAND_PREFIX}`);

    // const customRepository = new CustomRepository();
    // await customRepository.initialize();

    //
    // const permissionManager = new Permission('sqlite');
    // await permissionManager.init();
    // await permissionManager.createPermission('admin.*', 'мяу');
    //
    // const groupManager = new Group('sqlite');
    // const group = new Group('Admin');
    // await group.init();
    //
    // if (!group.groupData) {
    //     await group.create({ name: 'Admin' });
    // }
    //
    // await group.addPermission('admin.*');
    // console.log('Текущие права:', group.getPermissions());
    // await group.removePermission('admin.*');


    bot.on('chat', async (username, message) => { // Это пример обработки сообщений для локального сервера
        if (!bot.host === 'localhost') return;

        await commandHandler(bot, 'local', username, message);
    });

    bot.on('message', async (jsonMsg) => {
        const message = jsonMsg.toString();
        console.log(message);
    });

});
```
