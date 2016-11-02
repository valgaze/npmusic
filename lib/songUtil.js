"use strict";

function add(input) {
  var config = require("../config.json");
  if (typeof input === "string") {
    input = _add(input);
  }
  config["content"].push(input);
  return new Promise(function (resolve, reject) {
    writeConfig(config).then(function (output) {
      resolve();
    }).catch(function (e) {
      reject(e);
    });
  });
}

function _add(input) {
  var payload = {
    "url": undefined,
    "Artist": undefined,
    "Title": undefined
  };
  payload["url"] = input;

  return payload;
}

function writeConfig(jsonPayload) {
  var path = require('path');
  console.log("payload", jsonPayload);
  var fs = require('fs');
  var TARGET_FILE = path.resolve(__filename, "./../../") + "/config.json";
  console.log("TARGET_FILE", TARGET_FILE);
  return new Promise(function (resolve, reject) {
    fs.writeFile(TARGET_FILE, JSON.stringify(jsonPayload), function (err) {
      if (err) {
        console.log(err);
        reject(err);
        // process.exit(1);
      }
      resolve();
    });
  });
}

function fetchSong(index) {
  var config = require("../config.json");
  var songs = config.content;
  return songs[index];
}

function selectRandom() {
  var config = require("../config.json");
  var moods = config.moods;
  var moodLabels = Object.keys(moods);
  var seed = Math.floor(Math.random() * moodLabels.length);
  var label = moodLabels[seed];
  var song = moods[label];
  var songObj = config["content"][song];
  return songObj.url;
}

function validNPMCommand(command) {
  var config = require("../config.json");
  return !!config["npmCommands"][command];
}

module.exports = {
  add: add,
  fetchSong: fetchSong,
  writeConfig: writeConfig,
  selectRandom: selectRandom,
  validNPMCommand: validNPMCommand
};