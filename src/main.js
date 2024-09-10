const { createBot } = require('blockmind');
const CustomRepository = require('./database/repositories/customRepository');
const initializeCustomModel = require("./database/models/custom/customModelSQLite");

const botOptions = {
    host: 'mc.masedworld.net',
    username: 'fsdfsdfsdffsd',
    COMMAND_PREFIX: '@',
    MC_SERVER: 1,
    dbType: 'sqlite',
    version: "1.20.1",

    customModels: {
        sqlite: {
            CustomModel: initializeCustomModel,
        }
    },
    customRepositories: {
        custom: CustomRepository,
    }
};

async function createCustomBot(botOptions) {
    const bot = await createBot(botOptions);

    if (botOptions.customRepositories && botOptions.customRepositories.custom) {
        const customRepository = new botOptions.customRepositories.custom(botOptions.dbType);
        await customRepository.initialize();
        bot.customRepository = customRepository;
    }

    return bot;
}

createCustomBot(botOptions).then(async (bot) => {
    console.log(`Bot is running with prefix: ${bot.COMMAND_PREFIX}`);

    bot.on('message', async (jsonMsg) => {
        const message = jsonMsg.toString();
        console.log(message);
    });

    const newItem = await bot.customRepository.create({ name: 'testItem', value: 10 });
    const item = await bot.customRepository.findByName('testItem');
    console.log(item);
});
