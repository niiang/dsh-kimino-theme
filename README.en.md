# dsh-kimino-theme · Kimi no Na wa Theme

[中文](README.md) | English

<p align="center">
  <img src="assets/logo/your-name-movie-logo-blue.svg" alt="Kimi no Na wa" width="460">
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/niiang/dsh-kimino-theme?style=flat-square" alt="License">
  &nbsp;
  <img src="https://img.shields.io/github/v/tag/niiang/dsh-kimino-theme?style=flat-square" alt="Version">
  &nbsp;
  <img src="https://img.shields.io/github/stars/niiang/dsh-kimino-theme?style=flat-square" alt="Stars">
</p>

<p align="center">
  <strong>A Kimi no Na wa (Your Name) theme for the DeepSeek Harness (DSH) Web GUI</strong><br>
  <em>Comet-blue glassmorphism · cinematic wallpaper · logo swap · composer re-skin · unified scrollbars · one-paste agent install</em>
</p>

<div align="center">

[What it is](#what-it-is) · [Theme details](#theme-details) · [Quick start](#quick-start) · [Customizing](#customizing) · [FAQ](#faq) · [Known limitations](#known-limitations) · [License](#license-and-asset-copyright)

</div>

## What it is

dsh-kimino-theme turns the DSH Web GUI into Makoto Shinkai's *Your Name.*: a cinematic wallpaper behind every surface, translucent frosted-glass panels, comet-blue (`#93C5FD`) as the single interaction color, the movie logo in place of the DSH brand, a navy-glass composer card, and the placeholder copy swapped for themed lines.

It ships as a dynamic Cordis plugin: paste one install instruction into a DSH session and the agent does the rest — no DSH source modifications, nothing installed into a profile; disable or remove fully reverts the page.

| Dimension | Native dsh web | dsh-kimino-theme |
| --- | --- | --- |
| Background | Solid / solid gradient | Cinematic wallpaper + global blur veil |
| Surfaces | Opaque layers | Translucent frosted glass (backdrop-filter) |
| Branding | DSH default | Movie logo (expanded + collapsed marks) |
| Composer | Default styling | Navy glass card, themed placeholders |
| Scrollbars | Default | Global blue-glass thin scrollbars |
| Message list bottom | Hard edge | 40px gradient fade-out mask |
| Install | — | One instruction pasted to the agent |
| Revert | — | `cordis_stop` / `cordis_undefine` fully reverts |

![Main view: glassmorphism conversation over the wallpaper](docs/screenshots/chat-main.png)

## Theme details

### Comet-blue glassmorphism

The theme layers roughly 60 design-token overrides through the official `theme.overrideTokens` API: backgrounds become translucent (revealing the wallpaper), borders turn low-saturation blue, interaction states (hover/active/selected) unify around comet blue, and status colors are tuned for dark glass. Light and dark modes share one visual — glass over a wallpaper does not need a light variant. The full token list lives in [docs/theme-tokens.md](docs/theme-tokens.md) (Chinese).

### Wallpaper and logos

- The wallpaper is served by the host half at `/kimino-bg/current.jpg` (`assets/current.jpg` in your clone), with a subtle dark gradient overlay for text legibility;
- The expanded sidebar shows the horizontal movie logo; the collapsed rail shows a letter mark (two SVGs, also plugin-served);
- The hero headline is replaced with a large centered logo.

![Sidebar: expanded movie brand mark](docs/screenshots/sidebar.png)

### Composer and placeholder copy

The composer card is redrawn as a navy (`rgba(37,58,125,*)`) glass capsule — 20px radius, 20px backdrop blur, blue border; the session stats bar becomes a centered slim pill. Placeholders are swapped in both UI languages:

- Message input: `黄昏之时，我在这里等你。`
- New-session prompt: `君の名は。想构建怎样的世界？`

### Message scrolling and gradient mask

DSH's conversation scroll container holds both the message list and the sticky composer, so a naive mask would clip the input box. The theme sinks the scroll viewport down to the pure message container: the last 40px of the message list fades out smoothly with zero clipping on the composer; a scroll-event relay restores the "scroll to bottom" button under the inner scroller; a wheel guard stops the wallpaper layer from scrolling while the composer is focused.

### Unified scrollbars

Every scrollbar adopts the blue-glass style: 10px wide, rounded, translucent blue thumb (deepening on hover), with WebKit/Blink and Firefox standard properties both covered.

## Quick start

> **Browser recommendation**: the theme leans heavily on backdrop-filter glass, custom scrollbars and CSS masks — **Microsoft Edge** or **Google Chrome** recommended; Firefox renders some of these effects inconsistently (scrollbars, gradient masks may degrade).

### One-paste install (recommended)

Copy the whole block below into a DSH session; the agent clones the repo, rewrites the paths, defines and activates the plugin:

```text
Install the DSH theme plugin dsh-kimino-theme for me (dynamic-plugin route):
1. Clone https://github.com/niiang/dsh-kimino-theme to
   ~/.dsh/themes/dsh-kimino-theme (create the directory if missing;
   if it already exists, git pull first).
2. Read plugin/host.js and plugin/client.js from the clone.
3. Rewrite the <CLONE_DIR> placeholders in the bgFile / logoFile /
   letterFile constants at the top of host.js to the absolute path of
   the clone directory (on Windows, escape backslashes as \\).
   No placeholder may remain.
4. Pass the two files as code.host / code.client to cordis_define: if a
   plugin named "Kimi no Na wa Theme" already exists, append a new
   Package to the same pluginId and cordis_run mode:"update"; otherwise
   create a new plugin (idPrefix "kimino") and cordis_run mode:"run".
5. Remind me to hard-refresh the browser with Ctrl+F5 afterwards.
```

Assets are read straight from the clone; re-run the same block after theme updates to sync.

### Manual install

```bash
git clone https://github.com/niiang/dsh-kimino-theme ~/.dsh/themes/dsh-kimino-theme
```

1. Open `plugin/host.js` and replace the `<CLONE_DIR>` placeholders in the top three constants with the absolute path of your clone:

   ```js
   // Linux / macOS
   const bgFile = '/home/you/.dsh/themes/dsh-kimino-theme/assets/current.jpg';
   const logoFile = '/home/you/.dsh/themes/dsh-kimino-theme/assets/logo/your-name-movie-logo-blue.svg';
   const letterFile = '/home/you/.dsh/themes/dsh-kimino-theme/assets/logo/logo-letter.svg';

   // Windows (mind the backslash escaping)
   const bgFile = 'C:\\Users\\you\\.dsh\\themes\\dsh-kimino-theme\\assets\\current.jpg';
   const logoFile = 'C:\\Users\\you\\.dsh\\themes\\dsh-kimino-theme\\assets\\logo\\your-name-movie-logo-blue.svg';
   const letterFile = 'C:\\Users\\you\\.dsh\\themes\\dsh-kimino-theme\\assets\\logo\\logo-letter.svg';
   ```

2. In a DSH session, call `cordis_define` with `code.host` = the contents of `plugin/host.js` and `code.client` = the contents of `plugin/client.js` (new plugin, idPrefix `"kimino"`).
3. Activate with `cordis_run` (`mode: "run"` the first time, `mode: "update"` afterwards).
4. Hard-refresh the browser with **Ctrl + F5**.

### Update / disable / remove

| Action | How |
| --- | --- |
| Update | `git pull` in the clone, then re-run the one-paste install (or `cordis_define` again + `cordis_run mode:"update"`) |
| Pause | `cordis_stop <pluginId>` |
| Remove | `cordis_undefine <pluginId>` |

## Customizing

### Wallpaper

Replace `assets/current.jpg` in your clone (keep the filename) and hard-refresh (Ctrl+F5) — no redefinition needed. Any high-resolution 16:9 image works; the bundled wallpaper is about 5MB and the route caches it for one hour.

### Logos

Replace `assets/logo/your-name-movie-logo-blue.svg` (expanded, landscape recommended) and `assets/logo/logo-letter.svg` (collapsed mark, square recommended), then hard-refresh.

### Colors

All colors live in two places inside `plugin/client.js`: the `overrideTokens` call (design tokens) and the stylesheet string inside `styles.insert` (component styles). After editing, `cordis_define` again + `cordis_run mode:"update"` and hard-refresh. [docs/theme-tokens.md](docs/theme-tokens.md) has a grouped cheat sheet (Chinese).

## Architecture

The theme ships as a dynamic Cordis plugin: the repository carries only two closure sources plus assets; DSH's dynamic Cordis runtime defines and activates them inside a session — no profile-install machinery, no DSH source changes.

```
plugin/host.js      # dynamic-plugin host half (Node): 3 asset routes /kimino-bg/* (paths rewritten at install)
plugin/client.js    # dynamic-plugin browser half: token overrides + component styles + DOM patch-ups (styles.insert)
assets/             # wallpaper and logos
```

Every side effect (token layer, style tags, event listeners, DOM attributes, routes) is registered on the plugin fiber; `cordis_stop` / `cordis_undefine` fully reclaims them.

## FAQ

<details>
<summary><strong>Wallpaper / logos 404?</strong></summary>

A: The `<CLONE_DIR>` placeholders at the top of `plugin/host.js` were not rewritten to absolute local paths, or the clone was moved/deleted. Fix the three constants, then `cordis_define` again + `cordis_run mode:"update"` and hard-refresh.

</details>

<details>
<summary><strong>Activated successfully but the page did not change?</strong></summary>

A: Confirm `cordis_run` reported success (approve the request if one is pending); hard-refresh once with Ctrl+F5; if it still fails, ask the agent in the session to inspect the plugin's runtime status and diagnostics with `cordis_inspect_self`.

</details>

<details>
<summary><strong>The theme vanished after a DSH restart?</strong></summary>

A: Dynamic plugins are process-scoped; that is expected. Re-run the one-paste install to restore.

</details>

<details>
<summary><strong>After a DSH upgrade some styling broke?</strong></summary>

A: A few selectors rely on build-time hash class names (`.Md3f7G_*`, `.wSkVaW_*`, `.hHd-Xa_*` — message scrolling, sidebar brand, composer highlights); hashes may shift when the DSH frontend upgrades. The token layer and most styles (keyed on stable data attributes) are unaffected; affected selectors need updating against the new class names. Issues with screenshots are welcome.

</details>

<details>
<summary><strong>Text hard to read in light mode?</strong></summary>

A: The theme is designed as dark glass over a wallpaper, shared across light/dark modes. If it feels too dark in light mode, that is by design; you can lighten the glass tokens yourself (see Customizing - Colors).

</details>

<details>
<summary><strong>Can it coexist with other skin/theme plugins?</strong></summary>

A: Token layers stack, but visuals will fight each other. Enable only one theme plugin at a time.

</details>

## Known limitations

- Dynamic plugins are process-scoped and need the one-paste install re-run after a DSH restart.
- The glass, scrollbar and gradient-mask effects are tuned for Chromium engines (Edge / Chrome); Firefox renders some of them inconsistently — Edge or Chrome recommended.
- Selectors for the message-scroll rework, sidebar logo swap, and composer highlights depend on DSH frontend build-time hash class names; major DSH upgrades may require a theme update (see FAQ).
- The theme enforces one dark-glass visual across light and dark modes; there is no separate light variant (see FAQ).
- Wallpaper and logo routes cache for one hour; hard-refresh after replacing assets.

## License and asset copyright

Code is licensed under the [MIT License](LICENSE).

The wallpaper and logo assets under `assets/` derive from promotional material of the film *Your Name.* (君の名は。, Kimi no Na wa, 2016); copyright belongs to CoMix Wave Films, Toho, and other rights holders. This repository distributes them solely for personal desktop customization, claims no ownership, and derives no revenue from them; the assets will be removed immediately upon a rights holder's request.

## Contributing

- Follow Conventional Commits (e.g. `feat(client): fix xxx`); no emoji in code, docs, or commit messages;
- Attach screenshots or verification evidence for user-visible changes;
- Keep [docs/theme-tokens.md](docs/theme-tokens.md) in sync when theme tokens change.

<div align="center">

**Like the theme? Leave a Star.**

[Report an issue](https://github.com/niiang/dsh-kimino-theme/issues) · [Suggest a feature](https://github.com/niiang/dsh-kimino-theme/issues)

</div>
