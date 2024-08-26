const fs = require("fs")
const ect = require("ect-bin")
const glob = require("glob")
const Spritesmith = require("spritesmith")
const { execFile } = require("child_process")

const files = glob.sync("./sprite/*.png")
const out = "./src/asset/texture.png"
const dot = "ptc"
const sm = new Spritesmith()
sm.createImages(files, (err, images) => {
    const result = sm.processImages(images, { padding: 1 })
    const { image, properties, coordinates } = result

    image.on("end", () => execFile(ect, ["-strip", "-9", "--allfilters", out], err => {
        const stat = fs.statSync(out);
        console.log(stat.size);
    }))
    image.pipe(fs.createWriteStream(out))

    const { width, height } = properties
    const data = { 
        size: [width, height, 1], 
        frames: {}
    }
    for (const path in coordinates) {
        if (Object.hasOwnProperty.call(coordinates, path)) {
            const { x, y, width, height } = coordinates[path];
            const name = path.match(/sprite[\/\\](.+)\.png$/)
            if (name) {
                data.frames[name[1]] = [x, y, width, height]
            }
        }
    }
    if (data.frames[dot]) {
        let [UX, UY] = data.frames[dot]
        let [UW, UH] = data.size 
        data.dot = [
            Math.round((UX + 1.5) / UW * 100) / 100,
            Math.round((UY + 1.5) / UH * 100) / 100
        ]
    }
    fs.writeFileSync("./src/asset/texture.json", JSON.stringify(data))
})
