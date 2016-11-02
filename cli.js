"use strict";

var args = process.argv;
var PWD = args[1];
var npmArgs = args.slice(2);

var program = require('commander');
var config = require("./config.json");
var songUtil = require("./lib/songUtil");
var moodTypes = Object.keys(config.moods);

program.version('0.0.1')
  .option('-m, --mood [type]', 'What kind of music do you want to hear? ')
  .option('-t, --types', 'List all available music types')
  .option('-p, --path [path]', 'Play audio located at this path (youtube url)')
  .option('-a, --add [path]', 'Add audio to library located at this path (youtube url)')
  .option("-f, --fix", 'Attempt to install/update dependencies')
  .parse(process.argv);

if (program.fix) {
  var path = require('path');
  var fileDir = path.resolve(__filename, "..");
  var cwd = process.cwd();
  var COMMAND = "cd " + fileDir + " && npm run fix && cd " + cwd;
  var exec = require('child_process').exec;
  console.log("Applying fixes...");
  return exec(COMMAND, function (err, stdout, stderr) {
    if (err) {
      return console.error("Error:", err);
    }
    console.log("stdout", stdout);
  });
}

if (program.types) {
  //use logger
  console.log("*********************");
  console.log("Usage:");
  console.log("$ npmusic -m <mood_name>");
  console.log(moodTypes);
  return console.log("*********************");
}

if (program.path) {
  var url = program.path;
  return _play(url);
}

if (program.add) {
  var _url = program.add;
  return songUtil.add(_url).then(function (output) {
    console.log("Song added successfully");
  }).catch(function (e) {
    console.log("Error adding song", e);
  });
}

if (program.mood) {
  var index = config.moods[program.mood];
  var _url2 = config.content[index].url;
  var MUSICINST = _play(_url2);
  if (program.args.length) {
    npmInstall(MUSICINST, program.args);
  }
} else {
  var random = require("./lib/songUtil").selectRandom();

  var _MUSICINST = _play(random);
  if (program.args.length) {
    npmInstall(_MUSICINST, program.args);
  }
}

function _play(url) {
  var COMMAND = "mpv --no-video " + url;
  //mpv --no-video https://www.youtube.com/watch?v=0zz85g_7B_g
  var exec = require('child_process').exec;
  var inst = exec(COMMAND, function (err, stdout, stderr) {
    if (err) {
      // console.log("ERROR:", err);
      return;
    }
    console.log("stdout", stdout);
  });

  return inst;
}

function npmInstall(specialInst) {
  var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var rootCommand = payload[0];
  var spawn = require('child_process').spawn;
  if (songUtil.validNPMCommand(rootCommand)) {
    var cmd = spawn('npm', payload);
    cmd.stdout.on('data', function (data) {
      console.log(data.toString());
    });

    cmd.stderr.on('data', function (data) {
      console.log(data.toString());
    });

    cmd.on('exit', function (code) {
      console.log("\n\nDONE!", code);
      // const pid = specialInst.pid;
      // process.kill(pid);
      specialInst.kill();
    });
  } else {
    console.log("\"" + rootCommand + "\" does not appear to be a valid NPM command");
  }
}