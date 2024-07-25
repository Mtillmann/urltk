import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {readFileSync, writeFileSync, readdirSync} from 'fs';

//change here if you want to deploy to a different path, then run `npm run build` again
const base = '/urltk/';
export default defineConfig({
    plugins: [vue(), {
        name: 'fix-base-in-manifest',
        closeBundle() {
            const manifest = readFileSync(import.meta.resolve('./dist/manifest.json').replace('file://', ''), 'utf-8');
            const fixedManifest = manifest.replace(/\/urltk\//g, base);
            writeFileSync(import.meta.resolve('./dist/manifest.json').replace('file://', ''), fixedManifest, 'utf-8');


            //find name of css file in dist/assets
            const assetsDir = import.meta.resolve('./dist/assets').replace('file://', '');
            const cssFiles = readdirSync(assetsDir).filter(file => file.endsWith('.css'));

            //insert link tag in share-target.html
            const shareTargetPath = import.meta.resolve('./dist/share-target.html').replace('file://', '');
            let shareTarget = readFileSync(shareTargetPath, 'utf-8');
            const linkTag = `<link rel="stylesheet" href="./assets/${cssFiles[0]}">`;
            shareTarget = shareTarget.replace(/<\/head>/, `${linkTag}\n</head>`);
            writeFileSync(shareTargetPath, shareTarget, 'utf-8');


        }
    }],
    base
})
