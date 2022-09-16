const fs = require('fs/promises');
const { waitForDebugger } = require('inspector');
const path = require('path');
const crypto = require('crypto');

class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }

  get(id) {
    const path = `${this.dirPath}/${id}.json`;
    return fs.readFile(path)
      .then((fishies) => {
        return JSON.parse(fishies.toString());
      });
  }

  save(obj) {
    const id = crypto.randomBytes(8).toString('hex');
    const newObj = { ...obj, id };
    return fs.writeFile(`${this.dirPath}/${id}.json`, JSON.stringify(newObj).then(() => newObj));
  }

}

module.exports = SimpleDb;
