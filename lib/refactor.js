const fs = require('fs/promises');
const { waitForDebugger } = require('inspector');
const path = require('path');
const crypto = require('crypto');

class Refactor {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }

  async get(id) {
    const way = `${this.dirPath}/${id}.json`;
    const object = await fs.readFile(way);
    return JSON.parse(object.toString());
  }

  async save(obj) {
    const id = crypto.randomBytes(8).toString('hex');
    const newObj = { ...obj, id };
    await fs.writeFile(`${this.dirPath}/${id}.json`, JSON.stringify(newObj));
    return newObj;
  }

  async getAll() {
    const files = await fs.readdir(this.dirPath);
    const filePromises = await Promise.all(files.map(async (file) => {
      await fs.readFile(`${this.dirPath}/${file}`);
      const id = file.replace('.json', '');
      return await this.get(id);
    }));
    return filePromises;
  }
  



}

module.exports = Refactor;
