const { createBot } = require('blockmind');
const CustomRepository = require("./database/repositories/customRepository");
const {handleAuthMessage, handleWorldType} = require("./utils/joinStaffHandlers");

const botOptions = {
    host: 'mc.masedworld.net',
    username: 'testuser',
    dbType: 'sqlite',
    COMMAND_PREFIX: '@',
    customModels: {
        sqlite: {
            CustomModel: require('./database/models/custom/customModelSQLite')
        }
    },
    customRepositories: {
        custom: CustomRepository
    }
};

createBot(botOptions).then(async (bot) => {
    console.log(`Bot is running with prefix: ${bot.COMMAND_PREFIX}`);

    const customRepository = new CustomRepository();
    await customRepository.initialize();

    let wasInHub = false;


    const newItem = await customRepository.create({ name: 'testItem', value: 10 });
    const item = await customRepository.findByName('testItem');
    console.log(item);

    bot.on('spawn', async () => {
        console.log('Bot spawned.');
        const worldtype = await handleWorldType(bot);
        if (worldtype === 'Hub') {
            global.wasInHub = true;
            await bot.sendMessage('local', '/surv' + bot.MC_SERVER);
        } else if (worldtype === 'Survival') {
            // Бот авторизовался.
        }
    });

    bot.on('message', async (jsonMsg) => {
        const message = jsonMsg.toString();
        console.log(message);
        if (!wasInHub) await handleAuthMessage(bot, message);
    });
});
