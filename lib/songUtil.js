function add(input) {
  const config = require("../config.json");
  if (typeof input === "string") {
    input = _add(input);
  }
  config["content"].push(input);
  console.log("\n\nNEW CONTENT", config);
  return new Promise((resolve, reject) => {
    writeConfig(config).then((output) => {
      resolve();
    }).catch((e) => {
      reject(e);
    })
  });
}

function _add(input) {
  let payload = {
    "url":undefined,
    "Artist":undefined,
    "Title":undefined
  }
  payload["url"] = input;

  return payload;
}

function fetchSong(index) {
  const config = require("../config.json");
  const songs = config.content;
  return songs[index];
}

function writeConfig (jsonPayload) {
  const path = require('path');
  console.log("payload", jsonPayload)
  const fs = require('fs');
  const TARGET_FILE = path.resolve(__filename, "./../") +  "config.json";
  return new Promise((resolve, reject) => {
    fs.writeFile(TARGET_FILE, JSON.stringify(jsonPayload), function(err) {
      if (err) {
        console.log(err);
        reject(err);
        // process.exit(1);
      }
      resolve();
    });
  });
}


function selectRandom () {
  const config = require("../config.json");
  const moods = config.moods;
  const moodLabels = Object.keys(moods);
  const seed = Math.floor(Math.random() * moodLabels.length)
  const label = moodLabels[seed];
  const song = moods[label];
  const songObj = config["content"][song]
  return songObj["url"];
}



module.exports = {
 add,
 fetchSong,
 writeConfig,
 selectRandom
}
