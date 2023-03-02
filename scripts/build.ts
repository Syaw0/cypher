#!/usr/bin/env node
const rollup = require("rollup");
const path = require("path");
const resolve = require("@rollup/plugin-node-resolve").default;
const babel = require("@rollup/plugin-babel").default;
const typescript = require("@rollup/plugin-typescript");

// import rollup from 'rollup'
// import

const cwd = process.cwd();
const inputPath = path.join(cwd + "/src/index.ts");
const inputOpt = {
  input: inputPath,
  plugins: [
    typescript({
      typescript: require("typescript"),
      compilerOptions: {
        sourceMap: true,
        declarationDir: "/dist",
      },
    }),
    resolve(),
    babel({
      presets: ["@babel/preset-env", "@babel/preset-react"],
      babelHelpers: "bundled",
    }),
  ],
};

const outputOpt = [
  { file: `dist/index.cjs.js`, format: "cjs", sourcemap: true },
  { file: `dist/index.esm.js`, format: "esm", sourcemap: true },
];

async function build() {
  const bundle = await rollup.rollup(inputOpt);
  outputOpt.forEach(async (op) => {
    await bundle.write(op);
  });
}

build();
