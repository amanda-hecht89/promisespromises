const fs = require('fs/promises');
const { waitForDebugger } = require('inspector');
const path = require('path');

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

  

}

module.exports = SimpleDb;
