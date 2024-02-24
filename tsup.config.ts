import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'es2020',
  format: ['cjs', 'esm'],
  minify: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  entry: {
    finitio: "src/finitio.ts",
    cli: "src/cli.ts",
  },
  loader: {
    '.fio': 'copy',
    '.pegjs': 'copy',
  },
  external: ['finitio']
})
