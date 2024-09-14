## Repositories and Examples

| 🔗 **Main Repositories**                                    | 📘 **Specific Examples**                                                     |
|-------------------------------------------------------------|------------------------------------------------------------------------------|
| 🌐 [Main Repository](https://github.com/mmeerrkkaa/blockmind/tree/main) | 🛠 [Create Custom Database Models](https://github.com/blockmindJS/blockmind-example/blob/main/README_Database_Models.md) |
| 📂 [Example Repository](https://github.com/mmeerrkkaa/blockmind-example) | ⚡ [Quickstart Readme](https://github.com/mmeerrkkaa/blockmind-example/blob/main/Readme.quickstart.md) |


```js
const { createBot } = require('blockmind');
const CustomRepository = require("./database/repositories/customRepository");
const { commandHandler } = require('blockmind');
const { Permission } = require('blockmind');
const { Group } = require('blockmind');

const botOptions = {
    host: 'localhost',
    username: '',
    dbType: 'sqlite',
    version: '1.20.1',
    password: '',
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
        local: 333,
        global: 5000,
        clan: 350,
        private: 4500
    },

    pluginsAutoUpdate: true,

    plugins: [
        {
            name: 'AuthPlugin',
            type: 'github',
            repoUrl: 'https://github.com/mmeerrkkaa/examplePlugins',
            localPath: './plugins/CustomAuthPlugin',
            options: {
                MC_SERVER: '1',
            }
        }
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


    bot.on('chat', async (username, message) => { // This is an example of message handling for a local server
        if (!bot.host === 'localhost') return;

        await commandHandler(bot, 'local', username, message);
    });

    bot.on('message', async (jsonMsg) => {
        const message = jsonMsg.toString();
        console.log(message);
    });




});
```
