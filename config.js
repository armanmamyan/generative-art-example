const width = 1000;
const height = 1000;
const dir = __dirname;
const fs = require('fs');

const rarity = [
    {key: '', val: 'original'},
    {key: '_', val: 'rare'},
    {key: '_sr', val: 'super rare'}
]

const addRarity = (_str) => {
    let itemRarity;
    rarity.forEach((r) => {
        if(_str.includes(r.key)){
            itemRarity = r.val;
        }
    });
    return itemRarity;
}

const cleanName =((_str) => {
    let fullName = _str.slice(0, -4);
    rarity.forEach((r) => {
        fullName.replace(r.key, '');
    });

    return fullName;
})

const getElements = (path) => {
    return fs
        .readdirSync(path)
        .filter(item => !/(^|\/)\.[^\/\.]/g.test(item))
        .map((i, index) => ({
            id: index + 1,
            name: cleanName(i),
            fileName: i,
            rarity: addRarity(i)
        }))
}


const layers = [
    {
        id: 1,
        name: "background",
        location: `${dir}/layers/background/`,
        elements: getElements(`${dir}/layers/background/`),
        position: {
            x: 0,
            y: 0
        },
        size: {
            width,
            height
        }
    },
    {
        id: 2,
        name: "ball",
        location: `${dir}/layers/ball/`,
        elements:  getElements(`${dir}/layers/ball/`),
        position: {
            x: 0,
            y: 0
        },
        size: {
            width,
            height
        }
    },
    {
        id: 3,
        name: "eye color",
        location: `${dir}/layers/eye color/`,
        elements:  getElements(`${dir}/layers/eye color/`),
        position: {
            x: 0,
            y: 0
        },
        size: {
            width,
            height
        }
    },
    {
        id: 4,
        name: "iris",
        location: `${dir}/layers/iris/`,
        elements:  getElements(`${dir}/layers/iris/`),
        position: {
            x: 0,
            y: 0
        },
        size: {
            width,
            height
        }
    },
    {
        id: 5,
        name: "shine",
        location: `${dir}/layers/shine/`,
        elements:  getElements(`${dir}/layers/shine/`),
        position: {
            x: 0,
            y: 0
        },
        size: {
            width,
            height
        }
    },
    {
        id: 6,
        name: "bottom lid",
        location: `${dir}/layers/bottom lid/`,
        elements:  getElements(`${dir}/layers/bottom lid/`),
        position: {
            x: 0,
            y: 0
        },
        size: {
            width,
            height
        }
    },
    {
        id: 7,
        name: "top lid",
        location: `${dir}/layers/top lid/`,
        elements:  getElements(`${dir}/layers/top lid/`),
        position: {
            x: 0,
            y: 0
        },
        size: {
            width,
            height
        }
    },
];

module.exports = { layers, width, height}