const fs = require('fs/promises');
const crypto = require('crypto');
const path = require('path');
const SimpleDb = require('../lib/simple-db');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('simple database', () => {

  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it('GET id return obj by id', async () => {
    const fish = {
      type: 'clown'
    };
    const id = crypto.randomBytes(8).toString('hex');
    await fs.writeFile(`${TEST_DIR}/${id}.json`, JSON.stringify(fish));
    const db = new SimpleDb(TEST_DIR);
    const result = await db.get(id);
    expect(result).toEqual(fish); 
  });

  it('save should save an object', async () => {
    const objToSave = {
      name: 'weeee',
      age: 'new'
    };
    const db = new SimpleDb(TEST_DIR);
    const obj = await db.save(objToSave);
    expect(await db.get(obj.id)).toEqual({ ...objToSave, id: expect.any(String) });
  });

  it('getall() should return all objects in directory', async () => {
    const objects = [
      { age: 'that', name: 'sluzurp' },
      { age: 'too young', name: 'wee' },
      { age: 'old enough', name: 'woo' },
    ];

    const db = new SimpleDb(TEST_DIR);
    objects.forEach(async object => {
      await db.save(object);
    });

    expect(await db.getAll()).toEqual([
      {
        id: expect.any(String),
        name: expect.any(String),
        age: expect.any(String)
      },
      {
        id: expect.any(String),
        name: expect.any(String),
        age: expect.any(String)
      },
      {
        id: expect.any(String),
        name: expect.any(String),
        age: expect.any(String)
      }
    ]);
  });



});
