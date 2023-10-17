const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const { unzip, readDir, grayScale } = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

unzip(zipFilePath, pathUnzipped)
  .then(() => console.log("Extraction operation complete"))
  .then(() => readDir(pathUnzipped))
  .then((imgPaths) => {
    return grayScale(imgPaths, pathProcessed);
  })
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));
