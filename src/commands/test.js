const { Command } = require('blockmind');
class TestCommand extends Command {
    constructor() {
        super({
            name: 'test',
            argsCount: 0,
            permissions: 'admin.test',
            allowedChatTypes: ['global', 'private'],
        });
    }

    async handler(bot, typeChat, user) {
        console.log(user);
        console.log(user);
        console.log(user);
        await bot.sendMessage(typeChat, `Команда test выполнена, ${user.username}!`, user.username);
    }
}

module.exports = TestCommand;
