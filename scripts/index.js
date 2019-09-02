#!/usr/bin/env node

/**
 * @desc 组件创建工具
 * @author ranguangyu
 * @date 2019-8-8
 * @use `npm run new`
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const Handlebars = require('handlebars');
const dateFormat = require('dateformat');
const {
  camel2line,
  delDir,
} = require('./utils');
const chalk = require('chalk');
const inquirer = require('inquirer');

const defaultProps = {
  componentName: '',
  componentDesc: '',
  author: os.userInfo().username,
  date: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
}

console.log(chalk.black.bgGreen('            欢迎使用nice-ui组件创建工具              '));

/**
 * 提示并验证输入内容
 */
inquirer.prompt([
  {
    type: 'input',
    name: 'componentName',
    message: '请输入组件类名（首字母大写, with高阶组件除外）：',
    validate: function(input) {
      const done = this.async();
      if (!input) {
        done('组件类名不能为空');
        return;
      } else {
        if (fs.existsSync(path.resolve(__dirname, `../components/${input}`))) {
          done('组件类名已存在，请重新输入');
          return;
        }
        if (/\bwith[A-Z][a-zA-Z]+\b/.test(input)) {
          done(null, true);
          return;
        }
        if (!/\b[A-Z][a-zA-Z]+\b$/.test(input)) {
          done('组件类名首字母需大写，请重新输入');
          return;
        }
      }
      done(null, true);
    }
  },
  {
    type: 'input',
    name: 'componentDesc',
    message: '请输入组件功能描述：',
    validate: function(input) {
      const done = this.async();
      if (!input) {
        done('组件功能描述不能为空');
        return;
      }
      done(null, true);
    }
  }
]).then((answers) => handleAnswers(answers));

/**
 * 处理用户输入
 * @param {*} answers 
 */
const handleAnswers = (answers) => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'isCorrent',
      choices: ['是', '否'],
      message: chalk.red('请确认您输入的信息是否正确'),
      default: '是',
    }
  ]).then(({ isCorrent }) => {
    if (isCorrent === '是') {
      const comp = {...defaultProps, ...answers};
      handleCreate(comp);
    }
    console.log(chalk.black.bgGreen('            感谢使用nice-ui组件创建工具              '));
    process.exit();
  });
}

/**
 * 创建组件及组件预览所需的文件夹及文件
 * @param {*} comp 
 */
const handleCreate = (comp) => {
  const {
    componentName,
    componentDesc,
    author,
    date,
  } = comp;
  let className = camel2line(componentName);
  let componentClassName = `comp${className}-wrapper`;
  let previewClassName = `page${className}-wrapper`;
  // 写 component jsx
  let compJsxSource = fs.readFileSync(path.resolve(__dirname, './template/comp.jsx.hbs'), 'utf-8');
  let compJsxTemplate = Handlebars.compile(compJsxSource);
  delDir(path.resolve(__dirname, `../components/${componentName}`));
  fs.mkdirSync(path.resolve(__dirname, `../components/${componentName}`));
  fs.writeFileSync(path.resolve(__dirname, `../components/${componentName}/index.jsx`), compJsxTemplate({
    componentName,
    author,
    date,
    componentClassName,
  }));
  
  // 写 component less
  let compStyleContent =
`.${componentClassName} {

}`;
  fs.writeFileSync(path.resolve(__dirname, `../components/${componentName}/index.less`), compStyleContent);

  // 写 component README.md
  let compMdSource = fs.readFileSync(path.resolve(__dirname, `./template/comp.md.hbs`), 'utf-8');
  let readmeTemplate = Handlebars.compile(compMdSource);
  let result = readmeTemplate({
    componentName,
    componentDesc,
  });
  fs.writeFileSync(path.resolve(__dirname, `../components/${componentName}/README.md`), result);

  // 写 preview jsx
  let viewJsxSource = fs.readFileSync(path.resolve(__dirname, './template/view.jsx.hbs'), 'utf-8');
  let viewJsxTemplate = Handlebars.compile(viewJsxSource);
  delDir(path.resolve(__dirname, `../src/preview/${componentName}`));
  fs.mkdirSync(path.resolve(__dirname, `../src/preview/${componentName}`));
  fs.writeFileSync(path.resolve(__dirname, `../src/preview/${componentName}/index.jsx`), viewJsxTemplate({
    componentName,
    author,
    date,
    previewClassName,
  }));

  // 写 preview less
  let pageStyleContent =
`.${previewClassName} {
  .inner {
    position: relative;
  }
}`;
  fs.writeFileSync(path.resolve(__dirname, `../src/preview/${componentName}/index.less`), pageStyleContent);

  // 写 README.md
  let componentInfo = `\n| [${componentName}](./components/${componentName}/README.md)  | ${componentDesc} | ${author} | ${date} |`;
  fs.appendFileSync(path.resolve(__dirname, '../README.md'), componentInfo);
}
