import fs from 'fs';
import path from 'path';
import { Worker } from 'worker_threads';
//import ModelList from "../../src/data/model-index.Khronos.json" with { type: "json" };

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

const ModelList = await fetch("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/refs/heads/main/Models/model-index.json").then(res => res.json()).catch(e => {return []});

const ModelMap = {};
ModelList.forEach(item => {
  ModelMap[item.name] = item;
});
const ModelMap2 = {};

const model_directory = await fetch("https://api.github.com/repos/KhronosGroup/glTF-Sample-Assets/contents/Models").then(res => res.json()).catch(e => {return []});
console.log("Dir #:", Object.keys(model_directory).length);

const official_engine_names = new Map([
  ["model-viewer",  "three.js"],
  ["filament",      "filament.js"],
  ["babylon",       "babylon.js"],
  ["gltf-sample-viewer","gltf-sample-viewer"],
  ["three-gpu-pathtracer", "three-gpu-pathtracer"],
  ["stellar",       "Dassault STELLAR"],
  ["vray" ,         "Chaos Group V-Ray"],
  ["blender-cycles","Blender Cycles"],
  //["rhodonite","rhodonite"]
]);

const model_directory_local = await fs.promises.readdir("./public/images/goldens", { withFileTypes: true });
await (async () => {
  for await (const dir of model_directory_local.filter((e,i) => i>=0)) {
    if(!dir.isDirectory()) continue;
    if(!dir.name.startsWith("khronos-")) continue;

    const name = dir.name.slice(8);
    const folderpath = `Models/${name}`;
    //console.log("Model", name);

    const model = ModelMap[name];
    if(model == null) 
    {
      console.log("Cannot find ", name)
      continue;
    }
    
    const metadata = await fetch(`https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/refs/heads/main/${folderpath}/metadata.json`).then(res => res.json()).catch(e => null);
    const gltf = await fetch(`https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/refs/heads/main/${folderpath}/glTF/${name}.gltf`).then(res => res.json()).catch(e => null);
    const glb = model && model.variants && model.variants['glTF-Binary'];

    const images_filenames = await fs.promises.readdir(`./public/images/goldens/khronos-${name}`, { withFileTypes: true });

    const images = [];
    for(const img_file of images_filenames)
    {
      const engine = img_file.name.split("-golden.png")[0];
      const thumbnail_name = img_file.name.slice(0, img_file.name.length - 4)

      if(official_engine_names.has(engine))
      {
        images.push({
          name: official_engine_names.get(engine),
          image: `/images/goldens/khronos-${name}/${img_file.name}`,
          thumbnail: `/thumbnails/goldens/khronos-${name}/${thumbnail_name}.thumb.webp`,
        })
      }
      else
      {
        console.log("It does not have", engine);
      }
    }

    if(model && metadata && images.length > 0)
    {
      const name = encodeURIComponent(metadata.name.replace(/\s+/g, ''));
      ModelMap2[name] = {};
      ModelMap2[name].name = metadata.name.replace(/\s+/g, '');
      ModelMap2[name].label = metadata.name;
      ModelMap2[name].description = metadata.summary;
      ModelMap2[name].tags = metadata.tags;
      ModelMap2[name].variants = model && model.variants;
      ModelMap2[name].extensionsUsed = gltf? gltf.extensionsUsed : [];
      ModelMap2[name].downloadModel = glb? `https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/refs/heads/main/${folderpath}/glTF-Binary/${glb}` : undefined
      ModelMap2[name].images = images;
    }   
  }
})();

console.log('ModelList', ModelList.length);
console.log('ModelMap', Object.keys(ModelMap).length);
console.log('ModelMap2', Object.keys(ModelMap2).length);

const jsonData = JSON.stringify(ModelMap2, null, 2); // The `null, 2` makes the output pretty-printed
fs.writeFileSync('src/data/model-index.Phasmatic.json', jsonData);