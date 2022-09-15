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
    return fs.writeFile(`${this.dirPath}/${id}.json`, JSON.stringify(obj))
      .then((id) => {return id;});
  }

}

module.exports = SimpleDb;
