import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import typescript2 from 'rollup-plugin-typescript2';
import packageJson from './package.json';

const PEER_DEPENDENCIES = new Set(Object.keys(packageJson.peerDependencies));

export default [
  {
    input: 'src/index.ts',
    external(id) {
      if (PEER_DEPENDENCIES.has(id)) {
        return true;
      }

      for (const peerDependency of PEER_DEPENDENCIES) {
        if (new RegExp(`^${peerDependency}\/`).test(id)) {
          return true;
        }
      }

      return false;
    },
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
      },
      {
        file: packageJson.module,
        format: 'es',
      },
    ],
    plugins: [
      typescript2({
        useTsconfigDeclarationDir: true,
      }),
      postcss({
        autoModules: true,
        extract: false,
        use: ['sass'],
      }),
      nodeResolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
    ],
  },
];
