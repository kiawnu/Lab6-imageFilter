/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const AdmZip = require("adm-zip"),
  fs = require("fs/promises"),
  fsc = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path"),
  zipFilePath = path.join(__dirname, "myfile.zip"),
  pathUnzipped = path.join(__dirname, "unzipped");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((res, rej) => {
    const zip = new AdmZip(pathIn);
    zip.extractAllToAsync(pathOut, true, (err) => {
      if (err) {
        return rej(err);
      }
      res();
    });
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return fs.readdir(dir).then((files) => {
    const imgPaths = [];
    files.forEach((value, i) => {
      if (path.extname(value) === ".png") {
        imgPaths.push(path.resolve("unzipped", value));
      }
    });
    return imgPaths;
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((res, rej) => {
    for (let i = 0; i < pathIn.length; i++) {
      const png = new PNG({ filterType: 4 });
      fsc
        .createReadStream(pathIn[i])
        .pipe(png)
        .on("parsed", () => {
          for (var y = 0; y < png.height; y++) {
            for (var x = 0; x < png.width; x++) {
              var idx = (png.width * y + x) << 2;

              const avgGray =
                (png.data[idx] + png.data[idx + 1] + png.data[idx + 2]) / 3;

              // gray it out
              png.data[idx] = avgGray;
              png.data[idx + 1] = avgGray;
              png.data[idx + 2] = avgGray;
            }
          }

          png
            .pack()
            .pipe(
              fsc.createWriteStream(`${pathOut}/${path.basename(pathIn[i])}`)
            );
          res("imgs grayscaled");
        })
        .on("error", (err) => {
          rej(err);
        });
    }
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
