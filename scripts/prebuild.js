const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const srcAppDir = path.join(rootDir, 'src', 'app');
const nextDir = path.join(rootDir, '.next');

// Base directories needed by Next.js and Webpack
const baseDirs = [
  path.join(nextDir, 'server'),
  path.join(nextDir, 'server', 'app'),
  path.join(nextDir, 'server', 'pages'),
  path.join(nextDir, 'server', 'app', 'index.segments'),
  path.join(nextDir, 'server', 'app', 'index.segments', '!KHB1YmxpYyk'),
  path.join(nextDir, 'server', 'app', '_global-error.segments'),
  path.join(nextDir, 'server', 'app', '_global-error.segments', '_global-error'),
  path.join(nextDir, 'static'),
  path.join(nextDir, 'static', 'chunks'),
  path.join(nextDir, 'static', 'chunks', 'app'),
  path.join(nextDir, 'static', 'chunks', 'pages'),
  path.join(nextDir, 'static', 'chunks', 'next'),
  path.join(nextDir, 'static', 'chunks', 'next', 'dist'),
  path.join(nextDir, 'types'),
  path.join(nextDir, 'cache'),
];

for (const d of baseDirs) {
  fs.mkdirSync(d, { recursive: true });
}

// Recursively traverse src/app and mirror directories into .next/server/app and .next/static/chunks/app
function mirrorDirs(currentDir) {
  if (!fs.existsSync(currentDir)) return;
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(currentDir, entry.name);
      const relative = path.relative(srcAppDir, fullPath);
      
      const serverTarget = path.join(nextDir, 'server', 'app', relative);
      const staticTarget = path.join(nextDir, 'static', 'chunks', 'app', relative);
      const typesTarget = path.join(nextDir, 'types', 'app', relative);
      
      fs.mkdirSync(serverTarget, { recursive: true });
      fs.mkdirSync(staticTarget, { recursive: true });
      fs.mkdirSync(typesTarget, { recursive: true });

      mirrorDirs(fullPath);
    }
  }
}

mirrorDirs(srcAppDir);
console.log('Prebuild directory tree initialized.');
