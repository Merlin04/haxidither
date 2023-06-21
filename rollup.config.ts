import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
    input: "./index.ts",
    output: {
        dir: "dist",
        format: "iife"
    },
    plugins: [
        typescript(),
        nodeResolve(),
        commonjs(),
        // very simple plugin to make the iife async
        {
            name: "async",
            renderChunk(code: string) {
                return code.replaceAll("(function () {\n", "await (async function () {\n").replaceAll("/*await*/ (async function () {", "await (async function () {");
            }
        }
    ]
};