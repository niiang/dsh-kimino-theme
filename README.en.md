# dsh-kimino-theme · Kimi no Na wa Theme

[中文](README.md) | English

<p align="center">
  <img src="docs/screenshots/hero-screen.png" alt="dsh-kimino-theme" width="100%">
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
  <em>Comet-blue glassmorphism · cinematic wallpaper · logo swap · composer re-skin · unified scrollbars · one-command install</em>
</p>

<div align="center">

[What it is](#what-it-is) · [Theme details](#theme-details) · [Quick start](#quick-start) · [Customizing](#customizing) · [FAQ](#faq) · [Known limitations](#known-limitations) · [License](#license-and-asset-copyright)

</div>

## What it is

dsh-kimino-theme turns the DSH Web GUI into Makoto Shinkai's *Your Name.*: a cinematic wallpaper behind every surface, translucent frosted-glass panels, comet-blue (`#93C5FD`) as the single interaction color, the movie logo in place of the DSH brand, a navy-glass composer card, and the placeholder copy swapped for themed lines.

It ships as a standard dsh plugin bundle: mounted through the official profile mechanism, zero DSH source modifications, installed with one `dsh plugin` command, effective after a restart, and fully reverted when disabled or removed.

| Dimension | Native dsh web | dsh-kimino-theme |
| --- | --- | --- |
| Background | Solid / solid gradient | Cinematic wallpaper + global blur veil |
| Surfaces | Opaque layers | Translucent frosted glass (backdrop-filter) |
| Branding | DSH default | Movie logo (expanded + collapsed marks) |
| Composer | Default styling | Navy glass card, themed placeholders |
| Scrollbars | Default | Global blue-glass thin scrollbars |
| Message list bottom | Hard edge | 40px gradient fade-out mask |
| Install | — | `dsh plugin --profile web add github:niiang/dsh-kimino-theme` |
| Revert | — | Disable/remove fully reverts the page |

## Theme details

### Comet-blue glassmorphism

The theme layers roughly 60 design-token overrides through the official `theme.overrideTokens` API: backgrounds become translucent (revealing the wallpaper), borders turn low-saturation blue, interaction states (hover/active/selected) unify around comet blue, and status colors are tuned for dark glass. Light and dark modes share one visual — glass over a wallpaper does not need a light variant. The full token list lives in [docs/theme-tokens.md](docs/theme-tokens.md) (Chinese).

### Wallpaper and logos

- The wallpaper is served by the host half at `/kimino-bg/current.jpg` (`assets/current.jpg`), with a subtle dark gradient overlay for text legibility;
- The expanded sidebar shows the horizontal movie logo; the collapsed rail shows a letter mark (two SVGs, also plugin-served);
- The hero headline is replaced with a large centered logo.

### Composer and placeholder copy

The composer card is redrawn as a navy (`rgba(37,58,125,*)`) glass capsule — 20px radius, 20px backdrop blur, blue border; the session stats bar becomes a centered slim pill. Placeholders are swapped in both UI languages:

- Message input: `黄昏之时，我在这里等你。`
- New-session prompt: `君の名は。想构建怎样的世界？`

### Message scrolling and gradient mask

DSH's conversation scroll container holds both the message list and the sticky composer, so a naive mask would clip the input box. The theme sinks the scroll viewport down to the pure message container: the last 40px of the message list fades out smoothly with zero clipping on the composer; a scroll-event relay restores the "scroll to bottom" button under the inner scroller; a wheel guard stops the wallpaper layer from scrolling while the composer is focused.

### Unified scrollbars

Every scrollbar adopts the blue-glass style: 10px wide, rounded, translucent blue thumb (deepening on hover), with WebKit/Blink and Firefox standard properties both covered.

## Quick start

### Requirements

- DeepSeek Harness installed and `dsh web` working;
- Installing from GitHub requires pnpm (used internally by `dsh plugin`).

### Three steps

```sh
# 1. Install the theme package
dsh plugin --profile web add github:niiang/dsh-kimino-theme

# 2. Restart dsh web
dsh web

# 3. Open the GUI (hard-refresh once with Ctrl+F5 to bust old caches)
```

The wallpaper appearing and the sidebar logo changing confirm the install.

### Update / disable / remove

| Action | Command |
| --- | --- |
| Update | `dsh plugin --profile web update dsh-kimino-theme`, restart `dsh web` |
| Disable / remove | `dsh plugin --profile web remove dsh-kimino-theme`, restart `dsh web` |
| Back to native | Same as remove; the page fully reverts, nothing left behind |

### Install from a local clone (development)

```sh
git clone https://github.com/niiang/dsh-kimino-theme.git
dsh plugin --profile web add link:/absolute/path/to/dsh-kimino-theme
dsh web
```

The package is plain JavaScript (no build step, no dependencies), so `link:` installs work instantly; edit files under `plugin/` and restart `dsh web` to see changes.

<details>
<summary><strong>Alternative: as a dynamic plugin (no package install, no restart)</strong></summary>

<br>

You can also activate the theme as a dynamic Cordis plugin (process-scoped, gone on DSH restart):

1. Read `plugin/host.js` and `plugin/client.js`;
2. In a DSH session, pass them as `code.host` / `code.client` to `cordis_define` (new plugin, idPrefix `kimino`);
3. `cordis_run` to activate, then Ctrl+F5 the browser.

Telling the agent "install me via the dynamic-plugin route in the dsh-kimino-theme README" performs these steps.

</details>

## Customizing

### Wallpaper

Replace `assets/current.jpg` in your clone (keep the filename) and hard-refresh (Ctrl+F5) — no restart or reinstall needed. Any high-resolution 16:9 image works; the bundled wallpaper is about 5MB and the route caches it for one hour.

### Logos

Replace `assets/logo/your-name-movie-logo-blue.svg` (expanded, landscape recommended) and `assets/logo/logo-letter.svg` (collapsed mark, square recommended), then hard-refresh.

### Colors

All colors live in two places inside `plugin/client.js`: the `overrideTokens` call (design tokens) and the stylesheet string (component styles). Edit and restart `dsh web`. [docs/theme-tokens.md](docs/theme-tokens.md) has a grouped cheat sheet (Chinese).

## Architecture

One package, two halves, one plugin row:

```
package.json            # dsh.bundle.patch declaration + dsh.client declaration (official bundle shape)
├── cordis.patch.yml    # plugin row: id kimino-theme / name dsh-kimino-theme
├── plugin/host.js      # host half (Node): registers 3 asset routes /kimino-bg/*
├── plugin/client.js    # browser half: token overrides + component styles + DOM patch-ups
└── assets/             # wallpaper and logos, resolved relative to the package
```

`dsh plugin add` installs the package into the profile and mounts the row; the host half starts with the `dsh web` process, and the browser half is delivered by the client module system via `/plugins/dsh-kimino-theme/client.js`. Every side effect (token layer, style element, event listeners, DOM attributes, routes) is registered on the plugin fiber and fully reclaimed on disable.

## FAQ

<details>
<summary><strong>Installed and restarted, but nothing changed?</strong></summary>

A: Make sure the command included `--profile web` (installed into the right profile); hard-refresh once with Ctrl+F5; if it still fails, check the `dsh web` startup log for `[kimino-theme] host half active`.

</details>

<details>
<summary><strong>Wallpaper / logos 404?</strong></summary>

A: The host half reads `assets/` by package-relative paths, so this should not happen with a package install. If you used the dynamic-plugin alternative and activated only the client half (no host-half routes), wallpaper and logos will 404 — define both halves as described in the alternative section.

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

- Selectors for the message-scroll rework, sidebar logo swap, and composer highlights depend on DSH frontend build-time hash class names; major DSH upgrades may require a theme update (see FAQ).
- The theme enforces one dark-glass visual across light and dark modes; there is no separate light variant (see FAQ).
- Wallpaper and logo routes cache for one hour; hard-refresh after replacing assets.
- The dynamic-plugin alternative is process-scoped and must be re-activated after a DSH restart; the package install has no such limitation.

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
