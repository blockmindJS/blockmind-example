const { Command } = require('blockmind');
class TestCommand extends Command {
    constructor() {
        super({
            name: 'test',
            argsCount: 0,
            permissions: 'user.say',
            allowedChatTypes: ['local', 'private'],
        });
    }

    async handler(bot, typeChat, user) {
        console.log(user);
        await bot.sendMessage(typeChat, `Команда test выполнена, ${user.username}!`, user.username);
    }
}

module.exports = TestCommand;
