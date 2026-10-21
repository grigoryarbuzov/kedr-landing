import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'node:fs/promises';

const vite = await createServer({
  configFile: './vite.config.mjs',
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { default: KedrLanding } = await vite.ssrLoadModule('/src/App.jsx');
  const markup = renderToString(React.createElement(KedrLanding));
  const htmlPath = new URL('../dist/index.html', import.meta.url);
  const html = await readFile(htmlPath, 'utf8');
  const root = '<div id="root"></div>';
  if (!html.includes(root)) throw new Error('Build output has no empty React root to prerender.');
  await writeFile(htmlPath, html.replace(root, `<div id="root">${markup}</div>`));
} finally {
  await vite.close();
}
