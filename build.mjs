console.log("Initialising...\n");
import { readFile, writeFile, readdir } from "fs/promises";
import { extname } from "path";
import { createHash } from "crypto";

import { rollup } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import swc from "@swc/core";

const extensions = [".js", ".jsx", ".mjs", ".ts", ".tsx", ".cts", ".mts"];
const repoPluginName = "PluginRepo";
const minifyBlacklist = [
];
const ignoredWarnings = [
	"MISSING_NAME_OPTION_FOR_IIFE_EXPORT",
	(minify, { code }) => !minify && code === "EVAL",
	(minify, { code, exporter }) => code === "UNRESOLVED_IMPORT" && exporter && exporter.includes("@vendetta"),
];
let onlyBuild = process.argv.slice(2, process.argv.length);
if (onlyBuild[0] === "all") {
	onlyBuild = [];
} else if (onlyBuild.length === 0) {
	onlyBuild = []// ["eval", "PluginRepo", "FakeIt", "BlockWebhooks"];
}
/** @type import("rollup").InputPluginOption */
const plugins = [
	nodeResolve(),
	commonjs(),
	{
		name: "swc",
		async transform(code, id) {
			const ext = extname(id);
			if (!extensions.includes(ext)) return null;

			const ts = ext.includes("ts");
			const tsx = ts ? ext.endsWith("x") : undefined;
			const jsx = !ts ? ext.endsWith("x") : undefined;

			const result = await swc.transform(code, {
				filename: id,
				jsc: {
					externalHelpers: true,
					parser: {
						syntax: ts ? "typescript" : "ecmascript",
						tsx,
						jsx,
					},
				},
				env: {
					targets: "defaults",
					include: ["transform-classes", "transform-arrow-functions"],
				},
			});
			return result.code;
		},
	},
];
const built = {
	total: 0,
	succeeded: 0,
	failed: 0,
	failedNames: [],
};
const prefix = `[Builder]`;
let pluggers = await readdir("./plugins");
if (onlyBuild.length > 0) pluggers = pluggers.filter((p) => onlyBuild.includes(p));
if (pluggers.length === 0) {
	console.log("No plugins found");
	process.exit(1);
}
for (let plug of pluggers) {
	built.total++;
	const manifest = JSON.parse(await readFile(`./plugins/${plug}/manifest.json`));
	const outPath = `./dist/${plug === repoPluginName ? "" : plug + "/"}index.js`;
	const minify = !minifyBlacklist.includes(plug);
	try {
		console.log(prefix, `Building ${plug}...`);
		plugins[3] = esbuild({ minify });
		const bundle = await rollup({
			input: `./plugins/${plug}/${manifest.main}`,
			onwarn: (warning, defaultOnWarn) => {
				if (ignoredWarnings.some(($) => (typeof $ === "function" ? $(minify, warning) : $ === warning.code))) return;
				if (warning.code === "UNRESOLVED_IMPORT" && warning?.exporter.includes("@vendetta")) return;

				console.warn(`[${plug}: ${warning.code}]`, warning.toString());
			},
			plugins,
		});

		await bundle.write({
			file: outPath,
			globals(id) {
				if (id.startsWith("@vendetta")) return id.substring(1).replace(/\//g, ".");
				const map = {
					react: "window.React",
				};

				return map[id] || null;
			},
			format: "iife",
			compact: minify,
			exports: "named",
		});
		await bundle.close();

		const toHash = await readFile(outPath);
		manifest.hash = createHash("sha256").update(toHash).digest("hex");
		manifest.main = "index.js";
		await writeFile(`./dist/${plug === repoPluginName ? "" : plug + "/"}manifest.json`, JSON.stringify(manifest));

		console.log(prefix, `Successfully built ${manifest.name !== plug ? `"${manifest.name}"` : ``}@${plug}!\n`);
		built.succeeded++;
	} catch (e) {
		built.failed++;
		built.failedNames.push(plug);
		console.error(prefix, `Failed to build "${plug}"...\n`, e);
	}
}
console.log(
	`\nBuilt ${
		built.total === built.succeeded
			? "all plugins with no errors"
			: `${built.succeeded} out of ${built.total} plugin${built.total === 1 ? "" : "s"}, ${built.failed} error${built.failed === 1 ? "" : "s"}. Failed: ${built.failedNames.join(", ")}`
	}`
);
process.exit(built.total === built.succeeded ? 0 : 1);