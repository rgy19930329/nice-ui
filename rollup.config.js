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

const cModuleNames = fs.readdirSync(path.resolve(__dirname, "src/components"));
const cModuleMap = cModuleNames.reduce((prev, name) => {
  prev[name] = path.resolve(__dirname, "src/components", name, "index.jsx");
  return prev;
}, {});

export default [
  {
    input: {
      index: "src/index.js",
      ...cModuleMap,
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
  },
];
