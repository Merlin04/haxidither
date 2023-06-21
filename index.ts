import RgbQuant from "rgbquant";
import { Ranges } from "./ranges";
import { createInstantiatorMap } from "./instantiatorMap";

/*await*/(async function(){

const IMG_URL = "https://assets.hackclub.com/flag-standalone.png";
const NEW_WIDTH = 200;
const data = await fetch(IMG_URL).then((r) => r.blob());
// decode from png
const img = await createImageBitmap(data);
const canvas = document.createElement("canvas");
canvas.width = NEW_WIDTH
canvas.height = img.height * (NEW_WIDTH / img.width);
console.log(canvas.width, canvas.height);
const ctx = canvas.getContext("2d")!;
ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
console.log(imgData.data.length);

// remove transparent pixels (white background)
imgData.data.forEach((v, i) => i % 4 === 3 && v === 0 && [0, 1, 2, 3].forEach(n => imgData.data[i - n] = 255));

const q = new RgbQuant({
    colors: 2,
    method: 2,
    boxSize: [8, 8],
    boxPxls: 2,
    initColors: 4096,
    minHueCols: 2000,
    dithKern: "FloydSteinberg",
    dithDelta: 0,
    dithSerp: false,
    palette: [[0, 0, 0], [255, 255, 255]],
    reIndex: false,
    useCache: false,
    cacheFreq: 10,
    colorDist: "euclidean"
});
q.sample(imgData);
const r: Uint8Array = q.reduce(imgData);
// now we have the pixels
const t = (new Turtle()).up();
// the width of the actual canvas is in "units"
// so we need to convert an x, y into a "unit"
const unitWidth = canvas.width / 50;
const coordToUnit = (x: number, y: number): [number, number] => {
    return [(canvas.width - x) / unitWidth, (canvas.height - y) / unitWidth];
};

const u32 = new Uint32Array(r.buffer);
const rows = createInstantiatorMap<number, Ranges>(() => new Ranges());
for(let i = 0; i < u32.length; i++) {
    const x = i % canvas.width;
    const y = Math.floor(i / canvas.width);
    const u = coordToUnit(x, y);
    u32[i] === /*4294967295*/ 4278190080 && rows.get(u[1]).addRange([u[0], u[0] + 0.5])/* && console.log("drew pixel")*/;
}

for(const row of rows.keys()) {
    for(const [start, end] of rows.get(row).ranges) {
        t.goTo(start, row).down().forward(end - start).up();
    }
}
drawTurtles(t);

})();