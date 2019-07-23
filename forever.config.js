/**
 * @module forever.config
 * @fileoverview
 */

const path = require('path');

// Basic configuration options

module.exports = {
  silent: false, // Silences the output from stdout and stderr in the parent process
  uid: 'retail-app', // Custom uid for this forever process. (default: autogen)
  max: 5, // Sets the maximum number of times a given script should run
  killTree: true, // Kills the entire child process tree on `exit`

  //
  // These options control how quickly forever restarts a child process
  // as well as when to kill a "spinning" process
  //
  minUptime: 2000, // Minimum time a child process has to be up. Forever will exit otherwise.
  spinSleepTime: 1000, // Interval between restarts if a child is spinning (i.e. alive < minUptime).

  //
  // Command to spawn as well as options and other vars
  // (env, cwd, etc) to pass along
  //
  command: 'node', // Binary to run (default: node)
  sourceDir: path.join(__dirname, 'bin/prod'), // Directory that the source script is in

  //
  // Options for restarting on watched files.
  //
  watch: false, // Value indicating if we should watch files.
  watchIgnoreDotFiles: null, // Whether to ignore file starting with a .
  watchIgnorePatterns: null, // Ignore patterns to use when watching files.
  watchDirectory: null, // Top-level directory to watch from. You can provide multiple
  // watchDirectory options to watch multiple directories (e.g. for cli:
  // forever start -w=app -w=some_other_directory app\index.js)

  //
  // All or nothing options passed along to `child_process.spawn`.
  //
  spawnWith: {
    // customFds: [-1, -1, -1], // that forever spawns.
    setsid: false,
    uid: 0, // Custom UID
    gid: 0, // Custom GID
  },

  //
  // More specific options to pass along to `child_process.spawn` which
  // will override anything passed to the `spawnWith` option
  //
  // env: { ADDITIONAL: CHILD ENV VARS },
  // cwd: /path/to/child/working/directory,

  //
  // Log files and associated logging options for this instance
  //
  outFile: path.join(__dirname, '/logs/stdout.log'), // Path to log output from child stdout
  errFile: path.join(__dirname, './logs/stderr.log'), // Path to log output from child stderr

  //
  // ### function parseCommand (command, args)
  // #### @command {String} Command string to parse
  // #### @args    {Array}  Additional default arguments
  //
  // Returns the `command` and the `args` parsed from
  // any command. Use this to modify the default parsing
  // done by forever-monitor around spaces.
  //
  parser: (command, args) => ({ command, args }),
};
