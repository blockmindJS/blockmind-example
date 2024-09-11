```js
const { createBot } = require('blockmind');
const { commandHandler } = require('blockmind');

const botOptions = {
    host: 'localhost', //
    username: 'dsad',
    dbType: 'sqlite',
    version: '1.20.1',
    COMMAND_PREFIX: '@',
};

createBot(botOptions).then(async (bot) => {
    console.log(`Bot is running with prefix: ${bot.COMMAND_PREFIX}`);
    
    bot.on('chat', async (username, message) => {
        if (!bot.host === 'localhost') return;

        await commandHandler(bot, 'local', username, message);
    });

    bot.on('message', async (jsonMsg) => {
        const message = jsonMsg.toString();
        console.log(message);
    });

});

```
