import fs from "fs";
import path from "path";

import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import alias from "rollup-plugin-alias";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import clear from "rollup-plugin-clear";

const moduleNames = fs.readdirSync(path.resolve(__dirname, "src/components"));
const moduleMap = moduleNames.reduce((prev, name) => {
  prev[name] = path.resolve(__dirname, "src/components", name, "index.jsx");
  return prev;
}, {});

// const createStyleConfig = moduleName => {
//   return {
//     input: `src/components/${moduleName}/style/index.js`,
//     output: {
//       file: "node_modules/_aniceui_garbage/index.js",
//       format: "es",
//     },
//     plugins: [
//       clear({
//         targets: ["node_modules/_aniceui_garbage"]
//       }),
//       postcss({
//         extensions: [".less", ".css"],
//         extract: `es/${moduleName}/style/index.css`,
//         use: [
//           ["less", {
//             javascriptEnabled: true
//           }]
//         ],
//       }),
//     ]
//   }
// }

const createStyleConfig = moduleName => {
  return {
    input: `src/components/${moduleName}/style/index.js`,
    output: {
      file: `es/${moduleName}/style/index.js`,
      format: "es",
    },
    plugins: [
      copy({
        targets: [
          { src: `src/${moduleName}/style/*`, dest: `es/${moduleName}/style` },
        ]
      }),
      postcss({
        extensions: [".less", ".css"],
        // extract: `es/${moduleName}/style/index.css`,
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

const styleCluster = { // 对象
  input: "src/style.js",
  output: {
    file: "node_modules/_aniceui_garbage_style/index.js",
    format: "es",
  },
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true,
    }),
    // postcss({
    //   extensions: [".less", ".css"],
    //   extract: "es/index/anice-ui.css",
    //   use: [
    //     [
    //       "less",
    //       {
    //         javascriptEnabled: true,
    //       },
    //     ],
    //   ],
    // }),
    clear({
      targets: ["node_modules/_aniceui_garbage_style"]
    }),
  ]
}

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
      "@": path.resolve(__dirname, "src"),
    }),
    copy({
      targets: [
        { src: "src/assets/*", dest: "assets" },
      ]
    }),
    clear({
      targets: ["es", "assets"],
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
  // styleCluster,
  ...stylesConfig,
  moduleConfig
];
