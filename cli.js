const args = process.argv;
const PWD = args[1];
const npmArgs = args.slice(2);

const program = require('commander');
const config = require("./config.json");
const songUtil = require("./lib/songUtil");
const moodTypes = Object.keys(config.moods);

program
  .version('0.0.1')
  .option('-m, --mood [type]', 'What kind of music do you want to hear? ')
  .option('-t, --types', 'List all available music types')
  .option('-p, --path [path]', 'Play audio located at this path (youtube url)')
  .option('-a, --add [path]', 'Add audio to library located at this path (youtube url)')
  .option("-f, --fix", 'Attempt to install/update dependencies')
  .parse(process.argv);

if (program.fix) {
  const path = require('path');
  const fileDir = path.resolve(__filename, "..");
  const cwd = process.cwd();
  const COMMAND = `cd ${fileDir} && npm run fix && cd ${cwd}`;
  const exec = require('child_process').exec;
  console.log("Applying fixes...");
  const inst = exec(COMMAND, (err, stdout, stderr) => {
    if (err) {
      console.error("Error:", err);
      return;
    }
    console.log("stdout", stdout);
  });
  return;
}


if (program.types) {
  //use logger
  console.log("*********************");
    console.log(moodTypes);
  console.log("*********************");
}

if (program.path) {
  const url = program.path;
  return _play(url);
}

if (program.add) {
  const url = program.add;
  songUtil.add(url).then((output) => {
    console.log("Song added successfully");
  }).catch((e) => {
    console.log("Error adding song", e);
  })
}


if (program.mood) {
  const index = config.moods[program.mood];
  const url = config.content[index].url;
  const MUSICINST = _play(url);
  if (program.args.length) {
    npmInstall(MUSICINST, program.args);
  }
} else {
  const random = require("./lib/songUtil").selectRandom();
  const MUSICINST = _play(random);
  if (program.args.length) {
    npmInstall(MUSICINST, program.args);
  }
}


function _play(url) {
  const COMMAND = `mpv --no-video ${url}`;
    //mpv --no-video https://www.youtube.com/watch?v=0zz85g_7B_g
  const exec = require('child_process').exec;
  const inst = exec(COMMAND, (err, stdout, stderr) => {
    if (err) {
      console.log("ERROR:", err);
      return;
    }
    console.log("stdout", stdout);
  });

  return inst;
}

function npmInstall (specialInst, payload = []) {
  var util  = require('util'),
  spawn = require('child_process').spawn,
  cmd    = spawn('npm', payload);

  cmd.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  cmd.stderr.on('data', function (data) {
    console.log(data.toString());
  });

  cmd.on('exit', function (code) {
    console.log("\n\nDONE!");
    // const pid = specialInst.pid;
    // process.kill(pid);
    specialInst.kill();
  });

}
