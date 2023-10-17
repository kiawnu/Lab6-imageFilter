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
const AdmZip = require("adm-zip");
const fs = require("fs");

unzip(zipFilePath, pathUnzipped)
  .then(() => console.log("Extraction operation complete"))
  .then(() => readDir(pathUnzipped))
  .then((imgPaths) => console.log(imgPaths))
  .catch((err) => console.log(err));
