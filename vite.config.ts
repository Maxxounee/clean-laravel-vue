// @ts-ignore
import vue from '@vitejs/plugin-vue';
import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import laravel from 'laravel-vite-plugin';
import { defineConfig, lazyPlugins } from 'vite-plus';
import * as path from 'node:path';

const isStaticBuild = process.env.STATIC_BUILD === 'true';

export default defineConfig({
	base: 'localhost', // не убирать. Ломается hmr
	build: {
		outDir: 'dist',
	},
	plugins: [
		...lazyPlugins(() => [
			laravel({
				input: [
					'resources/js/app.ts',
					'resources/style/style.scss',
				],
				refresh: true,
				...(isStaticBuild ? [] : [wayfinder({ formVariants: true })]),
			}),

			inertia(),
			wayfinder({
				formVariants: true,
			}),
		]),
		vue({
			template: {
				transformAssetUrls: {
					base: null,
					includeAbsolute: false,
				},
			},
		}),
	],
	server: {
		host: 'localhost',
		// port: 5173,
		strictPort: true,
		hmr: {
			host: 'localhost',
			protocol: 'ws',
		},
		watch: {
			ignored: [
				'**/.agents/**',
				'**/.claude/**',
				'**/.cursor/**',
				'**/.junie/**',
				'**/vendor/**',
			],
		},
	},
	lint: {
		ignorePatterns: [
			'vendor/**',
			'node_modules/**',
			'public/**',
			'bootstrap/ssr/**',
			'resources/js/actions/**',
			'resources/js/components/ui/*',
			'resources/js/routes/**',
			'resources/js/wayfinder/**',
		],
		options: {
			denyWarnings: true,
			typeAware: true,
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "imports" as *;`,
				loadPaths: [
					path.resolve(process.cwd(), 'resources/style'),
				],
				quietDeps: true,
			},
		},
	},
	fmt: {
		printWidth: 80,
		tabWidth: 4,
		singleQuote: true,
		semi: true,
		singleAttributePerLine: false,
		htmlWhitespaceSensitivity: 'css',
		ignorePatterns: [
			'.github/**',
			'composer.json',
			'resources/js/components/ui/*',
			'resources/views/mail/*',
		],
	},
});
