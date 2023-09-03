import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import { terser } from 'rollup-plugin-terser';
import { dts } from 'rollup-plugin-dts';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
const pkgName = packageJson.umdModuleName;
const input = 'src/index.ts';
export default defineConfig([
  {
    input,
    output: [
      {
        file: 'dist/esm/index.js',
        format: 'esm',
      },
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/umd/index.js',
        format: 'umd',
        name: pkgName,
        globals: {
          // 配置依赖中的UMD全局变量名
          'event-message-center': 'MessageCenter',
          'task-queue-lib': 'TaskQueue',
        },
      },
      {
        file: 'dist/bundle/index.js',
        format: 'iife',
        name: pkgName,
        plugins: [terser()],
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
      }),
      alias({
        resolve: ['.js', '.ts'],
      }),
      resolve(),
    ],
  },
  /* 单独生成声明文件 */
  {
    input,
    plugins: [dts()],
    output: {
      format: 'esm',
      file: 'dist/index.d.ts',
    },
  },
]);
