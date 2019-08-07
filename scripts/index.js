#!/usr/bin/env node

/**
 * @desc 组件创建工具
 * @author ranguangyu
 * @date 2019-8-8
 * @use `npm run new`
 */

const fs = require("fs");
const os = require("os");
const path = require("path");
const program = require("commander");
const config = require("../package.json");
const Handlebars = require("handlebars");
const dateFormat = require("dateformat");
const {
  camel2line,
  line2camel,
  firstLetterUpper
} = require("./utils");

program.version(config.version, "-v, --version")
  .option("-s, --style [value]", "less文件")
  .parse(process.argv);

// let componentName = path.basename(process.cwd()) // 获取执行当前命令的文件夹名称字符串
let componentName = "Header";
componentName = line2camel(componentName);
componentName = firstLetterUpper(componentName);

let componentDesc = ""; // 组件描述

let author = os.userInfo().username;

let date = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

let compJsxSource = fs.readFileSync(path.resolve(__dirname, "./template/comp.jsx.hbs"), "utf-8");
let compJsxTemplate = Handlebars.compile(compJsxSource);

// 写 component jsx
fs.writeFileSync(path.resolve(__dirname, `../components/${componentName}/index.jsx`), compJsxTemplate({
  componentName,
  author,
  date,
}));

let compStyleContent =
`.comp${camel2line(componentName)}-wrapper {

}`;
// 写 component less
fs.writeFileSync(path.resolve(__dirname, `../components/${componentName}/index.less`), compStyleContent);

let compMdSource = fs.readFileSync(path.resolve(__dirname, `./template/comp.md.hbs`), "utf-8");
let readmeTemplate = Handlebars.compile(compMdSource);
let result = readmeTemplate({
  componentName,
  componentDesc,
});
// 写 component README.md
fs.writeFileSync(path.resolve(__dirname, `../components/${componentName}/README.md`), result);

let viewJsxSource = fs.readFileSync(path.resolve(__dirname, "./template/view.jsx.hbs"), "utf-8");
let viewJsxTemplate = Handlebars.compile(viewJsxSource);

// 写 preview jsx
fs.writeFileSync(path.resolve(__dirname, `../preview/${componentName}/index.jsx`), viewJsxTemplate({
  componentName,
  author,
  date,
}));

let pageStyleContent =
`.page${camel2line(componentName)}-wrapper {

}`;
// 写 preview less
fs.writeFileSync(path.resolve(__dirname, `../preview/${componentName}/index.less`), pageStyleContent);

