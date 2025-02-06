import fs from 'fs';
import path from 'path';
import { Worker } from 'worker_threads';
import ModelList from "../../src/data/model-index.Khronos.json" with { type: "json" };

async function* getFiles(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    //const res = path.resolve(dir, dirent.name);
    const res = path.join(dir, dirent.name);
    
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

const models = ModelList.map((m) => {
  return m.label;
});

const ModelMap = {};
ModelList.forEach(item => {
  ModelMap[item.label] = item;
});
const ModelMap2 = {};

const model_directory = '/home/nick/Documents/Projects/Web/glTF-Render-Fidelity/glTF-Sample-Assets/Models';

const tasks = [];
await (async () => {
  for await (const f of getFiles(model_directory)) {
    const ext = path.extname(f);
    if (ext !== ".json") continue;
    const metadata = JSON.parse(fs.readFileSync(f, 'utf8'));

    if (!metadata) {
      continue;
    }
    if(!metadata.name) {
      /* Files like model-index.Khronos.json and model-index.json*/
      continue;
    }
    const model = ModelMap[metadata.name];

    const name = metadata.name.replace(/\s+/g, '');
    ModelMap2[name] = {};
    ModelMap2[name].name = name;
    ModelMap2[name].label = metadata.name;
    ModelMap2[name].description = metadata.summary;
    ModelMap2[name].tags = metadata.tags;

    ModelMap2[name].variants = model && model.variants;
  }
})();

console.log('ModelList', ModelList.length);
console.log('ModelMap', Object.keys(ModelMap).length);
console.log('ModelMap2', Object.keys(ModelMap2).length);

const jsonData = JSON.stringify(ModelMap2, null, 2); // The `null, 2` makes the output pretty-printed
fs.writeFileSync('src/data/model-index.Phasmatic.json', jsonData);