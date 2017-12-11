const fs = require('fs')
const resolve = require('path').resolve
const join = require('path').join
const spawn = require('child_process').spawn;

// Go through each directory under examples and install all of their
// dependencies from their nested package.json files

const examples = resolve(__dirname, '../examples/');

fs.readdirSync(examples)
  .forEach((sub) => {
    const subPath = join(examples, sub);

    if (fs.existsSync(join(subPath, 'package.json'))) {
      spawn('npm', ['i'], { env: process.env, cwd: subPath, stdio: 'inherit' });
    }
  });
