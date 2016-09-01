/**
 * @author: @AngularClass
 */
import * as fs from 'fs';
import * as path from 'path';

// Helper functions
export const ROOT = path.resolve(__dirname, '..');

export function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

export function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server$/.exec(process.argv[1]));
}

export function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

export function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}

// dll helpers
export function getManifest(__path) {
  let __fs = fs || require('fs');
  let manifest = tryDll(() => JSON.parse(__fs.readFileSync(root('./dist/dll/' + __path + '-manifest.json'), 'utf8')
      // TODO(gdi2290): workaround until webpack fixes dll generation
        .replace(/}(.*[\n\r]\s*)}(.*[\n\r]\s*)}"activeExports": \[\]/, '')))
  return manifest;
}

export function getDllAssets(chunk) {
  let assets =  tryDll(() => require(root('./dist/dll/webpack-assets.json')));
  // {"vendors":{"js":"vendors.js"},"polyfills":{"js":"polyfills.js"}}
  return assets[chunk]['js'];
}

export function getAssets(chunk) {
  let assets =  tryDll(() => require(root('./dist/webpack-assets.json')));
  // {"vendors":{"js":"vendors.js"},"polyfills":{"js":"polyfills.js"}}
  return assets[chunk]['js'];
}

export function tryDll(cb) {
  try {
    return cb()
  } catch(e) {
    console.info("Initializing `%s`...", "DLL files");
    let spawn: any = require('cross-spawn');
    spawn.sync('npm', ['run', 'dll'], { stdio: 'inherit' });
    return cb();
    // throw new Error('Please run `npm run dll` first before building or running the server');
  }
}
