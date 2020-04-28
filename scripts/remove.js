#!/usr/bin/env node

/**
 * @desc 组件创建工具
 * @author ranguangyu
 * @date 2019-8-8
 * @use `npm run remove`
 */

const fs = require("fs");
const path = require("path");
const { delDir, camel2line } = require("./utils");
const chalk = require("chalk");
const inquirer = require("inquirer");

/* 获取执行当前命令的文件夹名称字符串 */
const workplaceRoot = process.cwd();

console.log(
  chalk.black.bgGreen("            欢迎使用nice-ui组件移除工具              ")
);

/**
 * 提示并验证输入内容
 */
inquirer
  .prompt([
    {
      type: "input",
      name: "componentName",
      message: "请输入组件类名：",
      validate: function (input) {
        const done = this.async();

        if (!input) {
          done("组件类名不能为空");
          return;
        } else {
          if (
            !fs.existsSync(
              path.resolve(workplaceRoot, "src/components", camel2line(input))
            )
          ) {
            done("组件不存在，请重新输入");
            return;
          }
        }
        done(null, true);
      },
    },
  ])
  .then((answers) => handleAnswers(answers));

/**
 * 处理用户输入
 * @param {*} answers
 */
const handleAnswers = (answers) => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "isCorrent",
        choices: ["是", "否"],
        message: chalk.red(`请您确认是否要删除组件：${answers.componentName}`),
        default: "是",
      },
    ])
    .then(({ isCorrent }) => {
      if (isCorrent === "是") {
        handleRemove(answers);
        console.log(
          chalk.black.bgGreen(
            `            组件【${answers.componentName}】已移除              `
          )
        );
      }
      process.exit();
    });
};

/**
 * 删除组件及组件预览所关联的文件夹及文件
 * @param {*} comp
 */
const handleRemove = (comp) => {
  const { componentName } = comp;
  const componentFolderName = camel2line(componentName);

  delDir(path.resolve(workplaceRoot, "src/components", componentFolderName));
  delDir(path.resolve(workplaceRoot, "website/src/pages", componentName));
};
