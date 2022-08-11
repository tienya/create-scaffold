const { statSync } = require('fs');
const { basename } = require('path');
const Generator = require('yeoman-generator');
const glob = require('glob');
const debug = require('debug')('generator:BasicGenerator');

function noop() {
  return true;
}

class BasicGenerator extends Generator {
  constructor(opts) {
    super(opts);
    this.opts = opts;
    this.name = basename(opts.env.cwd);
  }

  isTsFile(f) {
    return (
      f.endsWith('.ts')
      || f.endsWith('.tsx')
      || ['tsconfig.json', 'tslint.yml'].includes(f)
    );
  }

  // 是否属于模板
  isTplFile(path) {
    return true;
  }

  writeFiles({ context, filterFiles = noop }) {
    debug(`context: ${JSON.stringify(context)}`);
    glob
      .sync('**/*', {
        cwd: this.templatePath(),
        dot: true,
      })
      .filter(filterFiles)
      .forEach((file) => {
        debug(`copy ${file}`);
        const filePath = this.templatePath(file);
        if (statSync(filePath).isFile()) {
          if (this.isTplFile(file)) {
            this.fs.copyTpl(
              this.templatePath(filePath),
              this.destinationPath(file.replace(/^_/, '.')),
              context,
            );
          } else {
            this.fs.copy(
              this.templatePath(filePath),
              this.destinationPath(file.replace(/^_/, '.')),
            );
          }
        }
      });
  }
}

module.exports = BasicGenerator;
