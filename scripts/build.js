const babel = require('rollup-plugin-babel')
const rollup = require('rollup')
const version = process.env.VERSION || require('../package.json').version
const year = new Date().getFullYear()
const banner = `/**\n * Element form-builder v${version}\n * (c) ${year} Felix Yang\n */`

const inputOptions = {
  input: 'src/index.js',
  external: ['vue', 'element-ui'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    })
  ]
}
const outputOptions = {
  file: 'dist/index.js',
  format: 'es',
  banner
}

async function build () {
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(outputOptions)
}

build()
