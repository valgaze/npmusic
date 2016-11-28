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

function selectRandom() {
  var config = require("../config.json");
  var songs = config.content;
  var seed = Math.floor(Math.random() * songs.length);
  var songObj = songs[seed];
  return songObj;
}

function validNPMCommand(command) {
  var config = require("../config.json");
  return !!config["npmCommands"][command];
}

function fetchSongs(target) {
  var config = require("../config.json");
  var songs = config.content;
  if (target) {
    for (var i = 0; i < songs.length; i++) {
      var songObj = songs[i];
      if (songObj["tag"] == target) {
        return songObj;
      }
    }
    console.log("No song tagged as '" + target + '", proceeding with fallback');
    return {"source":config.defaultSong};
  } else {
    songs.forEach(function(songObj) {
      displaySong(songObj);
    });
  }
}

function displaySong(songObj) {
  var title = songObj["title"] ? songObj["title"] : "[Unlabled Song]";
  var artist = songObj["artist"] ? songObj["artist"] : "[Unlabled artist]";
  var tag = songObj["tag"] ? " [" + songObj["tag"] + "]" : "";
  console.log(title + " by " + artist + tag);
}

module.exports = {
  add: add,
  fetchSongs: fetchSongs,
  displaySong: displaySong,
  writeConfig: writeConfig,
  selectRandom: selectRandom,
  validNPMCommand: validNPMCommand
};
