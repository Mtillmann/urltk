import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {readFileSync, writeFileSync} from 'fs';

//change here if you want to deploy to a different path, then run `npm run build` again
const base = '/urltk/';
export default defineConfig({
    plugins: [vue(), {
        name: 'fix-base-in-manifest',
        closeBundle() {
            const manifest = readFileSync(import.meta.resolve('./dist/manifest.json').replace('file://', ''), 'utf-8');
            const fixedManifest = manifest.replace(/\/urltk\//g, base);
            writeFileSync(import.meta.resolve('./dist/manifest.json').replace('file://', ''), fixedManifest, 'utf-8');
        }
    }],
    base
})
