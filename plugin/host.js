return {
  apply(ctx) {
    const fs = ctx.get('fs');
    const webServer = ctx.get('webServer');
    if (fs === undefined || webServer === undefined) return;
    const bgFile = 'C:\\Users\\25431\\Documents\\kimi-no-na-wa-wallpapers\\current.jpg';
    const logoFile = 'C:\\Users\\25431\\Documents\\kimi-no-na-wa-wallpapers\\logo\\your-name-movie-logo-blue.svg';
    const letterFile = 'C:\\Users\\25431\\Documents\\kimi-no-na-wa-wallpapers\\logo\\logo-letter.svg';
    const routeBg = webServer.register({
      kind: 'exact',
      path: '/kimino-bg/current.jpg',
      handler: async (req, res) => {
        try {
          const target = await fs.resolve(bgFile);
          const bytes = await fs.readBytes(target, undefined, 16 * 1024 * 1024);
          res.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Content-Length': bytes.length,
            'Cache-Control': 'public, max-age=3600',
          });
          res.end(bytes);
        } catch (err) {
          console.error('kimino-bg route failed:', err);
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('kimi bg not found');
        }
      },
    });
    const routeLogo = webServer.register({
      kind: 'exact',
      path: '/kimino-bg/logo-blue.svg',
      handler: async (req, res) => {
        try {
          const target = await fs.resolve(logoFile);
          const bytes = await fs.readBytes(target, undefined, 2 * 1024 * 1024);
          res.writeHead(200, {
            'Content-Type': 'image/svg+xml',
            'Content-Length': bytes.length,
            'Cache-Control': 'public, max-age=3600',
          });
          res.end(bytes);
        } catch (err) {
          console.error('kimino-logo route failed:', err);
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('kimi logo not found');
        }
      },
    });
    const routeLetter = webServer.register({
      kind: 'exact',
      path: '/kimino-bg/logo-letter.svg',
      handler: async (req, res) => {
        try {
          const target = await fs.resolve(letterFile);
          const bytes = await fs.readBytes(target, undefined, 2 * 1024 * 1024);
          res.writeHead(200, {
            'Content-Type': 'image/svg+xml',
            'Content-Length': bytes.length,
            'Cache-Control': 'public, max-age=3600',
          });
          res.end(bytes);
        } catch (err) {
          console.error('kimino-letter route failed:', err);
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('kimi letter not found');
        }
      },
    });
    ctx.effect(() => routeBg);
    ctx.effect(() => routeLogo);
    ctx.effect(() => routeLetter);
  },
};