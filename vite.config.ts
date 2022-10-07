import path from 'path';
import { defineConfig } from 'vite';
import packageJson from './package.json';
import dts from 'vite-plugin-dts';

const getPackageName = () => {
    return packageJson.name.split('/').slice(-1)[0];
};

const getPackageNameCamelCase = () => {
    try {
        return getPackageName().replace(/-./g, (char) => char[1].toUpperCase());
    } catch (err) {
        throw new Error('Name property in package.json is missing.');
    }
};

const fileName = {
    es: `${getPackageName()}.mjs`,
    cjs: `${getPackageName()}.cjs`,
    iife: `${getPackageName()}.iife.js`,
};

module.exports = defineConfig(() => ({
    base: './',
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: getPackageNameCamelCase(),
            formats: ['es', 'cjs', 'iife'],
            fileName: (format) => fileName[format],
        },
        sourcemap: true,
    },
    plugins: [
        dts({
            outputDir: ['dist' /*, 'types'*/],
            // include: ['src/index.ts'],
            // exclude: ['src/ignore'],
            // aliasesExclude: [/^@components/],
            copyDtsFiles: false,
            staticImport: true,
            skipDiagnostics: false,
            logDiagnostics: true,
            rollupTypes: true,
            insertTypesEntry: true,
        }),
    ],
}));
