#!/usr/bin/env node

/**
 * @desc 组件创建工具
 * @author ranguangyu
 * @date 2020-02-14
 */

const fs = require("fs");
const os = require("os");
const path = require("path");
const Handlebars = require("handlebars");
const dateFormat = require("dateformat");
const { camel2line, delDir, traceDir } = require("./utils");
const chalk = require("chalk");
const inquirer = require("inquirer");

/* 获取执行当前命令的文件夹名称字符串 */
const workplaceRoot = process.cwd();
const json = require(path.resolve(workplaceRoot, "./package.json"));

const defaultProps = {
  componentName: "",
  componentDesc: "",
  author: os.userInfo().username,
  date: dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
  libraryName: json.name,
};

const COMP_TEMPLATE_FOLDER = "comp-template";
const DEMO_TEMPLATE_FOLDER = "demo-template";

console.log(
  chalk.black.bgGreen("            欢迎使用nice-ui组件创建工具              ")
);

/**
 * 提示并验证输入内容
 */
inquirer
  .prompt([
    {
      type: "input",
      name: "componentName",
      message: "请输入组件类名（大驼峰，如EnumSelect，with高阶组件除外）：",
      validate: function (input) {
        const done = this.async();

        if (!input) {
          done("组件类名不能为空");
          return;
        } else {
          if (
            fs.existsSync(path.resolve(workplaceRoot, "src", camel2line(input)))
          ) {
            done("组件类名已存在，请重新输入");
            return;
          }
          if (/^with[A-Z][a-zA-Z]+\b/.test(input)) {
            done(null, true);
            return;
          }
          if (!/\b[A-Z][a-zA-Z]+\b$/.test(input)) {
            done("组件类名首字母需大写，请重新输入");
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
        message: chalk.red("请确认您输入的信息是否正确"),
        default: "是",
      },
    ])
    .then(({ isCorrent }) => {
      if (isCorrent === "是") {
        const comp = {
          ...defaultProps,
          ...answers,
        };
        handleCreate(comp);
      }
      console.log(
        chalk.black.bgGreen(
          "            感谢使用nice-ui组件创建工具              "
        )
      );
      process.exit();
    });
};

/**
 * 创建组件及组件预览所需的文件夹及文件
 * @param {*} comp
 */
const handleCreate = (comp) => {
  const { componentName } = comp;

  const componentFolderName = camel2line(componentName);

  /* 注入模板的参数集合 */
  const options = {
    ...comp,
    componentClassName: componentFolderName,
  };

  /* 创建示例 */
  const pagesRoot = path.resolve(
    workplaceRoot,
    "website/app/pages",
    componentName
  );
  delDir(pagesRoot);
  fs.mkdirSync(pagesRoot);

  const demoFolder = path.resolve(__dirname, DEMO_TEMPLATE_FOLDER);

  const pagesPath = path.resolve(demoFolder, "index.jsx");
  const pagesSource = fs.readFileSync(pagesPath, "utf-8");
  const pagesTemplate = Handlebars.compile(pagesSource);

  const routerPath = path.resolve(demoFolder, "router.js");
  const routerSource = fs.readFileSync(routerPath, "utf-8");
  const routerTemplate = Handlebars.compile(routerSource);

  fs.writeFileSync(
    path.resolve(path.resolve(pagesRoot, "index.jsx")),
    pagesTemplate(options)
  );

  fs.writeFileSync(
    path.resolve(path.resolve(pagesRoot, "router.js")),
    routerTemplate(options)
  );
};
