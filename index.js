const fs = require("fs");
const myArgs = process.argv.slice(2);
const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(1000, 1000);
const ctx = canvas.getContext("2d");
const { layers, width, height } = require("./config");
const edition = myArgs.length > 0 ? Number(myArgs[0]) : 1;

let metadata = [];
let attributes = [];
let hash = [];
let decodedHash = [];

const addMetadata = (_edition) => {
    let date = Date.now();
    
    let tempMetadata = {
        hash: hash.join(''),
        edition: _edition,
        decodedHash,
        date,
        attributes,
    };

    metadata.push(tempMetadata);
    attributes = [];
    hash = [];
    decodedHash = [];
};

const addAttributes = (_element, _layer) => {
    let tempAttributes = {
        id: _element.id,
        layer: _layer.name,
        name: _element.name,
        rarity: _element.rarity,
    };

    attributes.push(tempAttributes);
    hash.push(_layer.id)
    hash.push(_element.id)
    decodedHash.push({
        [_layer.id]: _element.id
    })
}

const saveLayer = (_canvas, _edition) => {
  fs.writeFileSync(`./output/${_edition}.png`, _canvas.toBuffer("image/png"));
};

const drawLayer = async (_layer, _edition) => {
  let element =
    _layer.elements[Math.floor(Math.random() * _layer.elements.length)];

  addAttributes(element, _layer);

  const image = await loadImage(`${_layer.location}${element.fileName}`);

  console.log("drawing");
  ctx.drawImage(
    image,
    _layer.position.x,
    _layer.position.y,
    _layer.size.width,
    _layer.size.height
  );

  console.log(`Saving ${_layer.name} Image`);
  saveLayer(canvas, _edition);
};

for (let i = 0; i <= edition; i++) {
  layers.forEach((layer) => {
    addMetadata(i);
    drawLayer(layer, i);
  });
}


fs.readFile('./output/_metadata.json', (err, data) => {
    if(err) throw err;

    fs.writeFileSync('./output/_metadata.json', JSON.stringify(metadata));
})