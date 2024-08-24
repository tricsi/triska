import typescript from "@rollup/plugin-typescript"
import image from "@rollup/plugin-image"
import json from "@rollup/plugin-json"
import glsl from "rollup-plugin-glsl"
import bundle from "rollup-plugin-html-bundle"
import terser from "@rollup/plugin-terser"
import roadroller from "./bin/roadroller"
import del from "rollup-plugin-delete"

const isDev = process.env.npm_lifecycle_event !== "build"
const plugins = [
    del({
        targets: "build/index.html.zip",
    }),
    json(),
    typescript({
        exclude: "**/*.tsx",
        noEmitOnError: false,
        sourceMap: isDev,
    }),
    image(),
    glsl({
        include: /\.(frag|vert)$/,
    }),
]

if (!isDev) {
    plugins.push(
        terser({
            ecma: 2020,
            module: true,
            toplevel: true,
        }),
        roadroller(),
    )
}

plugins.push(
    bundle({
        template: "src/index.html",
        target: "build/dev.html",
        inline: !isDev,
    }),
)

export default {
    input: "src/main.ts",
    output: {
        dir: "build",
        format: "iife",
        sourcemap: isDev,
    },
    plugins,
}
