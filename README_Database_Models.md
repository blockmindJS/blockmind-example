
# Custom Model Creation Example

This example demonstrates how to create and integrate custom models into your database using the **BlockMind** framework.

### Step 1: Create the Custom Model

First, create a new folder `database/models` (or any other you prefer). Inside this folder, create a file called `CustomModel.js` and insert the following code:

```js
const { DataTypes } = require('sequelize');

function initializeCustomModel(sequelize) {
    const CustomModel = sequelize.define('CustomModel', {
        name: {
            type: DataTypes.STRING,
        },
        value: {
            type: DataTypes.INTEGER,
        },
    });

    return CustomModel;
}

module.exports = initializeCustomModel;
```

Here, we define a simple model named `CustomModel` with two fields: `name` (a string) and `value` (an integer).

### Step 2: Load the Custom Model

To avoid confusion in later steps, we’ll load our custom model into the bot's configuration.

```js
const botOptions = {
    customModels: {
        sqlite: {
            CustomModel: require('./database/models/customModelSQLite'),
        },
    },
};
```

We’ve assigned the model the name `CustomModel`. You can now retrieve this model for future tasks:

```js
const models = await getModels();
const model = models.CustomModel;
```

### Step 3: Create a Custom Repository

In the `database` folder, create a `repositories` folder, and inside it, create a file named `customRepository.js` with the following content:

```js
const { getModels } = require('blockmind');

class CustomRepository {
    constructor() {
        this.model = null;
    }

    async initialize() {
        const models = await getModels();
        this.model = models.CustomModel; // Model name: CustomModel
        
        if (!this.model) {
            throw new Error('CustomModel is not initialized properly');
        } else {
            console.log("CustomModel initialized successfully");
        }
    }

    async create(data) {
        if (!this.model) {
            throw new Error('CustomModel is not initialized. Call initialize() first.');
        }
        return await this.model.create(data);
    }

    async findByName(name) {
        if (!this.model) {
            throw new Error('CustomModel is not initialized. Call initialize() first.');
        }
        return await this.model.findOne({ where: { name } });
    }

    async update(name, data) {
        const instance = await this.findByName(name);
        if (instance) {
            return await instance.update(data);
        }
        return null;
    }

    async delete(name) {
        const instance = await this.findByName(name);
        if (instance) {
            return await instance.destroy();
        }
        return null;
    }
}

module.exports = CustomRepository;
```

This repository class provides common methods for creating, finding, updating, and deleting entries in the `CustomModel`.

### Step 4: Register the Model and Repository

To register your custom model and repository, modify your `botOptions` as follows:

```js
const CustomRepository = require("./database/repositories/customRepository");

const botOptions = {
    customModels: {
        sqlite: {
        CustomModel: require('./database/models/customModelSQLite'),
        },
    },
    customRepositories: {
        custom: CustomRepository,
    },
};
```

Upon restarting the bot, your database will synchronize with the new model.

### Step 5: Using the Custom Repository

For testing, you can now interact with the custom model using the repository. Here's an example of how you can create, retrieve, and log an entry:

```js
createBot(botOptions).then(async (bot) => {
    console.log(`Bot is running with prefix: ${bot.COMMAND_PREFIX}`);

    const customRepository = new CustomRepository();
    await customRepository.initialize();
    await customRepository.create({ name: 'test', value: 1 });
    console.log(await customRepository.findByName('test'));
});
```

### Step 6: Expanding to MongoDB

While this example focuses on SQLite, the same approach can be applied to MongoDB with minor adjustments. Stay tuned for Part 2, where we’ll explore MongoDB integration.
