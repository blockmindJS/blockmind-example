const { getModels } = require('blockmind');

class CustomRepository {
    constructor(dbType) {
        this.dbType = dbType;
        this.model = null;
    }

    async initialize() {
        const models = await getModels();
        this.model = models.CustomModel;

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
