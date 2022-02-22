const axios = require('axios')
const { exec } = require('child_process')
const fs = require('fs')
const json = require('format-json')
const path = require('path')
const https = require('https')
/**
* generateJSON: Generates a JSON file
* @param {String} filename: name of the file
* @param {Object} data: JSON data object
* @returns _path: path of file
* @called
**/
const generateJSON = ({ filename, data }) => {
  try {
    let _path = path.resolve(__dirname, filename)
    fs.writeFileSync(_path, json.diffy(data), 'utf-8')
    return _path
  } catch (e) {
    throw new Error(`Generate JSON: ${e}`)
  }
}
/**
* readJSONFile: Reads a JSON file
* @param {String} filename: name of the file
* @returns json: parsed json
* @called
**/
const readJSONFile = (filename) => {
  try {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, filename), 'utf-8'))
  } catch (e) {
    throw new Error(`Read JSON file: ${e}`)
  }
}
/**
* fetchData: fetches data from a url with params
* @param {String} url: website url
* @param {Object} params: params for fetch request
* @returns data: json
* @called
**/
const fetchData = ({ url, params={} }) => {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
      .finally(() => console.log('Data fetched!'));
  });
}
/**
* curl: fetches data from a url(include query params in request)
* @param {String} url: website url
* @returns data: json
* @called
**/
const curl = (url) => {
  return new Promise((resolve, reject) => {
    exec(`curl -v ${url}`, (err, stdout, stderr) => {
      if (err) reject(err)
      if (stdout) resolve(JSON.parse(stdout))
      resolve(null)
    })
  });
}

const saveImageToDisk = ({ url, imagePath }) => {
  try {
    const file = fs.createWriteStream(imagePath)
    const request = https.get(url, (res) => {
      res.pipe(file)
    })
  } catch (e) {
    throw new Error(`Save image to disk: ${e}`)
  }
}

module.exports = {
  curl,
  fetchData,
  generateJSON,
  readJSONFile,
  saveImageToDisk
}
