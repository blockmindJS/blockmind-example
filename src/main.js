const { createBot } = require('blockmind');
const CustomRepository = require("./database/repositories/customRepository");

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


    const newItem = await customRepository.create({ name: 'testItem', value: 10 });
    const item = await customRepository.findByName('testItem');
    console.log(item);
});
