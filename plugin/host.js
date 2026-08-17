// Kimi no Na wa theme — host half of the dsh-kimino-theme bundle.
// Owns the three asset routes the browser half's CSS references:
//   /kimino-bg/current.jpg      cinematic wallpaper (body background)
//   /kimino-bg/logo-blue.svg    sidebar brand + hero headline logo
//   /kimino-bg/logo-letter.svg  collapsed-sidebar mark
// Asset paths resolve relative to this file, so the bundle works from any
// clone location without editing constants.
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const assets = join(here, '..', 'assets');

const ROUTES = [
  {
    path: '/kimino-bg/current.jpg',
    file: join(assets, 'current.jpg'),
    type: 'image/jpeg',
  },
  {
    path: '/kimino-bg/logo-blue.svg',
    file: join(assets, 'logo', 'your-name-movie-logo-blue.svg'),
    type: 'image/svg+xml',
  },
  {
    path: '/kimino-bg/logo-letter.svg',
    file: join(assets, 'logo', 'logo-letter.svg'),
    type: 'image/svg+xml',
  },
];

export default {
  inject: ['webServer'],
  apply(ctx) {
    let registered = 0;
    for (const route of ROUTES) {
      // Tolerate an already-registered /kimino-bg route (e.g. a legacy
      // dynamic-plugin instance of this theme in the same profile): skip
      // instead of failing the whole profile load.
      let dispose;
      try {
        dispose = ctx.webServer.register({
          kind: 'exact',
          path: route.path,
          handler: async (req, res) => {
            try {
              const bytes = await readFile(route.file);
              res.writeHead(200, {
                'Content-Type': route.type,
                'Content-Length': bytes.length,
                'Cache-Control': 'public, max-age=3600',
              });
              res.end(bytes);
            } catch (err) {
              console.error(`[kimino-theme] asset route failed: ${route.path}`, err);
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('kimino asset not found');
            }
          },
        });
        registered += 1;
      } catch (e) {
        console.warn(`[kimino-theme] route ${route.path} already served elsewhere, skipping:`, e?.message ?? e);
        continue;
      }
      ctx.effect(() => dispose);
    }
    console.log(`[kimino-theme] host half active (${registered}/${ROUTES.length} asset routes registered)`);
  },
};
