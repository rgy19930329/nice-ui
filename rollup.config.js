import path from 'path'

import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import alias from 'rollup-plugin-alias'
import { terser } from 'rollup-plugin-terser'

const isProd = process.env.NODE_ENV === 'production'

const module = process.env.MODULE

/* 插件 */
let plugins = [
  resolve(),
  commonjs(),
  json(),
  babel({
    exclude: 'node_modules/**'
  }),
  alias({
    '@src': path.resolve(__dirname, 'src')
  })
]

isProd && (plugins = plugins.concat([terser()]))

/* 输出 */
let output = [
  {
    file: 'es/index.js',
    format: 'es'
  },
  {
    file: 'cjs/index.js',
    format: 'cjs'
  }
]

if (module === 'es') {
  output = [
    {
      file: 'es/index.js',
      format: 'es'
    }
  ]
} else if (module === 'cjs') {
  output = [
    {
      file: 'cjs/index.js',
      format: 'cjs'
    }
  ]
}

export default {
  input: 'index.js',
  output,
  plugins,
  sourceMap: isProd,
  external: ['axios'],
}
