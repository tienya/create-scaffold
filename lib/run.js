const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const inquirer = require('inquirer');
const clipboardy = require('clipboardy');

const sequences = [];

const generators = fs
  .readdirSync(`${__dirname}/generators`)
  .filter((f) => !f.startsWith('.'))
  .sort((previous, next) => (sequences.indexOf(previous) > sequences.indexOf(next) ? 1 : -1))
  .map((f) => ({
    name: `${f.padEnd(15)} - ${chalk.gray(require(`./generators/${f}/meta.json`).description)}`,
    value: f,
    short: f,
  }));

const runGenerator = (
  generatorPath,
  { name = '', cwd = process.cwd(), args = {} },
) => new Promise((resolve) => {
  if (name) {
    mkdirp.sync(name);
    cwd = path.join(cwd, name);
  }

  const Generator = require(generatorPath);
  const generator = new Generator({
    name,
    env: {
      cwd,
    },
    resolved: require.resolve(generatorPath),
    args,
  });

  return generator.run(() => {
    console.log('✨ File Generate Done');
    console.log('== NEXT ==');

    const cmds = [];

    if (name) {
      cmds.push(`cd ${name}`);
    }

    if (!fs.existsSync(`${name || '.'}/.git`)) {
      cmds.push('git init');
    }

    cmds.push('npm i');

    console.log('');
    console.log(chalk.green(cmds.join('\n')));
    console.log('');

    if (process.platform !== 'linux' || process.env.DISPLAY) {
      clipboardy.writeSync(cmds.join(' && '));
      console.log('📋 Copied to clipboard, just use Ctrl+V');
    }

    resolve(true);
  });
});

const run = (config) => inquirer
  .prompt([
    {
      name: 'type',
      message: '选择一种模板',
      type: 'list',
      choices: generators,
    },
  ])
  .then((answers) => runGenerator(`./generators/${answers.type}`, config))
  .catch((error) => {
    console.error(chalk.red('> Generate failed'), error);
    process.exit(1);
  });

module.exports = run;
