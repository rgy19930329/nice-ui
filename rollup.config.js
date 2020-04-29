import fs from "fs";
import path from "path";

import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import alias from "rollup-plugin-alias";
import postcss from "rollup-plugin-postcss";
// import copy from "rollup-plugin-copy";
import clear from "rollup-plugin-clear";

const moduleNames = fs.readdirSync(path.resolve(__dirname, "src/components"));
const moduleMap = moduleNames.reduce((prev, name) => {
  prev[name] = path.resolve(__dirname, "src/components", name, "index.jsx");
  return prev;
}, {});

const createStyleConfig = moduleName => {
  return {
    input: `src/components/${moduleName}/style/index.js`,
    output: {
      file: `node_modules/_garbage/index.js`,
      format: "es",
    },
    plugins: [
      clear({
        targets: ["node_modules/_garbage"]
      }),
      postcss({
        extensions: [".less", ".css"],
        extract: `es/${moduleName}/style/index.css`,
        use: [
          ["less", {
            javascriptEnabled: true
          }]
        ],
      }),
    ]
  }
}

const stylesConfig = moduleNames.map(moduleName => createStyleConfig(moduleName)); // 数组

const moduleConfig = { // 对象
  input: {
    index: "src/index.js",
    ...moduleMap,
  },
  output: {
    dir: "es",
    format: "es",
    sourceMap: true,
    entryFileNames: "[name]/index.js",
    chunkFileNames: "_common/[name].js",
  },
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true,
    }),
    alias({
      "@src": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
    }),
    postcss({
      extensions: [".less", ".css"],
      extract: "es/index/style.css",
      inject: false,
      use: [
        [
          "less",
          {
            javascriptEnabled: true,
          },
        ],
      ],
    }),
    clear({
      targets: ["es"],
    }),
  ],
  external: [
    "react",
    "antd",
    "lodash",
    "prop-types",
    "classnames",
    "stream",
  ],
}

export default [
  ...stylesConfig,
  moduleConfig
];
