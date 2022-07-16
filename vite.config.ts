import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite"

import vavite from "vavite";

export default defineConfig({
	plugins: [
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      dts: true,
      dirs: [
        './src/routes',
        './src/trpc',
        './src/utils',
        './src/schemas',
      ],
    }),

		vavite({
			serverEntry: "/src/server.ts",
			reloadOn: "static-deps-change",
			serveClientAssetsInDev: true,
		}),
	],
});
