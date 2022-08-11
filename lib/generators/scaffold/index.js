const BasicGenerator = require('../../BasicGenerator');

class Generator extends BasicGenerator {
  prompting() {
    const prompts = [
      {
        name: 'name',
        message: '项目名称',
        default: this.name,
      },
      {
        name: 'description',
        message: '项目描述',
      },
      {
        name: 'author',
        message: '作者',
        default: process.env.USER,
      },
      {
        name: 'repo',
        message: 'Git地址',
      },
    ];
    return this.prompt(prompts).then((props) => {
      this.prompts = props;
    });
  }

  writing() {
    this.writeFiles({
      context: this.prompts,
      filterFiles: () => true,
    });
  }
}

module.exports = Generator;
