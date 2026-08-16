return {
  apply(ctx) {
    const theme = ctx.get('theme');
    if (theme === undefined) return;
    const patchPlaceholders = () => {
      const replacements = {
        '给智能体发消息': '黄昏之时，我在这里等你。',
        'Message the agent': '黄昏之时，我在这里等你。',
        '描述你想要构建的内容': '君の名は。想构建怎样的世界？',
        'Describe what you want to build': '君の名は。想构建怎样的世界？',
      };
      const walk = () => {
        document.querySelectorAll('textarea').forEach((ta) => {
          const current = ta.placeholder;
          if (current && replacements[current] !== undefined && ta.placeholder !== replacements[current]) {
            ta.placeholder = replacements[current];
          }
        });
      };
      walk();
      const observer = new MutationObserver(walk);
      observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['placeholder'] });
      return () => observer.disconnect();
    };
    const disposePlaceholders = patchPlaceholders();
    const pair = (v) => ({ light: v, dark: v });
    const dispose = theme.overrideTokens('kimino-bg', {
      '--dsw-alias-bg-base': pair('rgba(5,8,20,0)'),
      '--dsw-alias-bg-layer-1': pair('rgba(15,23,42,0.75)'),
      '--dsw-alias-bg-layer-2': pair('rgba(15,23,42,0.8)'),
      '--dsw-alias-bg-layer-3': pair('rgba(15,23,42,0.85)'),
      '--dsw-alias-bg-overlay': pair('rgba(10,14,26,0.9)'),
      '--dsw-alias-bg-module-platform': pair('rgba(255,255,255,0.08)'),
      '--dsw-alias-bg-multi-select': pair('rgba(147,197,253,0.15)'),
      '--dsw-alias-border-l1': pair('rgba(147,197,253,0.14)'),
      '--dsw-alias-border-l2': pair('rgba(147,197,253,0.22)'),
      '--dsw-alias-border-l3': pair('rgba(147,197,253,0.28)'),
      '--dsw-alias-border-l2-darkmode-thin': pair('rgba(147,197,253,0.16)'),
      '--dsw-alias-brand-primary': pair('#93C5FD'),
      '--dsw-alias-button-elevated-fill': pair('rgba(255,255,255,0.08)'),
      '--dsw-alias-button-floating-fill': pair('rgba(255,255,255,0.1)'),
      '--dsw-alias-button-floating-hover': pair('rgba(255,255,255,0.15)'),
      '--dsw-alias-button-primary-dimmed': pair('rgba(147,197,253,0.18)'),
      '--dsw-alias-button-ghost-active-fill': pair('rgba(147,197,253,0.16)'),
      '--dsw-alias-button-ghost-active-hover': pair('rgba(147,197,253,0.22)'),
      '--dsw-alias-button-ghost-active-border': pair('rgba(147,197,253,0.5)'),
      '--dsw-alias-button-tool-bar-fill': pair('rgba(255,255,255,0.1)'),
      '--dsw-alias-button-tool-bar-hover': pair('rgba(255,255,255,0.15)'),
      '--dsw-alias-button-tool-bar-fill-invisible': pair('rgba(255,255,255,0.1)'),
      '--dsw-alias-button-info-fill': pair('#93C5FD'),
      '--dsw-alias-button-info-hover': pair('#7CAEFD'),
      '--dsw-alias-interactive-bg-hover': pair('rgba(255,255,255,0.08)'),
      '--dsw-alias-interactive-bg-hover-solid': pair('rgba(255,255,255,0.1)'),
      '--dsw-alias-interactive-bg-active': pair('rgba(147,197,253,0.16)'),
      '--dsw-alias-interactive-bg-hover-accent': pair('rgba(147,197,253,0.2)'),
      '--dsw-alias-interactive-bg-hover-danger': pair('rgba(248,113,113,0.12)'),
      '--dsw-alias-label-primary': pair('#F8FAFC'),
      '--dsw-alias-label-secondary': pair('#CBD5E1'),
      '--dsw-alias-label-tertiary': pair('#93C5FD'),
      '--dsw-alias-label-caption': pair('#94A3B8'),
      '--dsw-alias-label-primary-dimmed': pair('#A5B4FC'),
      '--dsw-alias-markdown-inline-code': pair('rgba(147,197,253,0.12)'),
      '--dsw-alias-markdown-code-block': pair('rgba(13,17,23,0.55)'),
      '--dsw-alias-markdown-code-block-banner': pair('rgba(147,197,253,0.08)'),
      '--dsw-alias-markdown-tag': pair('rgba(147,197,253,0.1)'),
      '--dsw-alias-markdown-citation': pair('rgba(147,197,253,0.1)'),
      '--dsw-alias-markdown-code-segment-unselected': pair('rgba(255,255,255,0.06)'),
      '--dsw-alias-markdown-code-segment-selected': pair('rgba(147,197,253,0.2)'),
      '--dsw-alias-markdown-placeholder': pair('rgba(255,255,255,0.05)'),
      '--dsw-alias-state-error-primary': pair('#F87171'),
      '--dsw-alias-state-error-secondary': pair('#FCA5A5'),
      '--dsw-alias-state-error-tertiary': pair('rgba(248,113,113,0.14)'),
      '--dsw-alias-state-success-primary': pair('#7FE0C8'),
      '--dsw-alias-state-success-tertiary': pair('rgba(127,224,200,0.14)'),
      '--dsw-alias-state-warn-primary': pair('#FBBF24'),
      '--dsw-alias-state-warn-secondary': pair('#FCD34D'),
      '--dsw-alias-state-warn-tertiary': pair('rgba(251,191,36,0.14)'),
      '--dsw-alias-state-business-primary': pair('#93C5FD'),
      '--dsw-alias-state-business-tertiary': pair('rgba(147,197,253,0.14)'),
      '--dsw-specific-sidebar-fill': pair('rgba(15,23,42,0.42)'),
      '--dsw-specific-sidebar-nav-item-hover': pair('rgba(255,255,255,0.08)'),
      '--dsw-specific-sidebar-nav-item-active': pair('rgba(147,197,253,0.16)'),
      '--dsw-specific-sidebar-nav-item-active-accent': pair('rgba(147,197,253,0.85)'),
      '--dsw-specific-input-major': pair('rgba(15,23,42,0.85)'),
      '--dsw-specific-bubble': pair('rgba(15,23,42,0.75)'),
      '--dsw-specific-tip': pair('rgba(13,17,23,0.75)'),
      '--dsw-specific-menu': pair('rgba(37,58,125,0.94)'),
      '--dsw-specific-selector': pair('rgba(255,255,255,0.1)'),
      '--dsw-shadow-lv2': pair('0 8px 24px rgba(0,0,0,0.28)'),
    });
    ctx.effect(() => dispose);
    ctx.effect(() => disposePlaceholders);
    styles.insert(`html { background-color: transparent !important; }
body {
  background-image:
    linear-gradient(180deg, rgba(4,7,18,0.28) 0%, rgba(8,11,28,0.16) 45%, rgba(14,8,26,0.26) 100%),
    url('/kimino-bg/current.jpg') !important;
  background-size: cover, cover !important;
  background-position: center, center !important;
  background-attachment: fixed, fixed !important;
  background-repeat: no-repeat, no-repeat !important;
  -webkit-font-smoothing: antialiased !important;
  text-rendering: optimizeLegibility !important;
  font-weight: 500 !important;
}
body[data-ds-dark-theme] {
  background-image:
    linear-gradient(180deg, rgba(4,7,18,0.28) 0%, rgba(8,11,28,0.16) 45%, rgba(14,8,26,0.26) 100%),
    url('/kimino-bg/current.jpg') !important;
}
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  backdrop-filter: blur(6px) saturate(140%);
  -webkit-backdrop-filter: blur(6px) saturate(140%);
}
[data-chat-flow] {
  background: rgba(13,17,23,0.45);
  backdrop-filter: blur(8px) saturate(140%);
  -webkit-backdrop-filter: blur(8px) saturate(140%);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 20px;
  padding: 12px 14px 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
body[data-ds-dark-theme] [data-chat-flow] {
  background: rgba(13,17,23,0.45);
  border-color: rgba(255,255,255,0.12);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
[data-composer-card] {
  background: rgba(37, 58, 125, 0.85) !important;
  backdrop-filter: blur(20px) saturate(130%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(130%) !important;
  border: 1px solid rgba(147, 197, 253, 0.45) !important;
  border-radius: 20px !important;
  box-shadow: none !important;
}
[data-composer-card] ::placeholder {
  color: rgba(152, 182, 252, 0.62) !important;
  -webkit-text-fill-color: rgba(152, 182, 252, 0.62) !important;
  opacity: 1 !important;
}
[data-composer-card] textarea {
  color: transparent !important;
  -webkit-text-fill-color: transparent !important;
  caret-color: #f1f5f9 !important;
  text-shadow: none !important;
  -webkit-text-stroke: 0 !important;
}
[data-composer-card] [data-input-backdrop] {
  color: #ffffff !important;
}
[data-composer-card] [data-input-backdrop] * {
  text-shadow: none !important;
  -webkit-text-stroke: 0 !important;
}
[data-composer-card] .uV2eYG_hlToken {
  color: #ffffff !important;
  background: transparent !important;
}
[data-composer-card] .uV2eYG_hint {
  color: rgba(255, 255, 255, 0.45) !important;
}
[data-composer-card] .uV2eYG_scroll {
  scrollbar-width: none !important;
}
[data-composer-card] .uV2eYG_scroll::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
[data-composer-card] .uV2eYG_input,
[data-composer-card] .uV2eYG_mirror,
[data-composer-card] .uV2eYG_backdrop {
  padding-right: 28px !important;
}
[data-composer-card] button {
  background: rgba(255, 255, 255, 0.12) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #98b6fc !important;
}
[data-composer-card] button:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}
[data-composer-card] [data-input-mirror] {
  visibility: hidden !important;
}
[data-composer-seat] > * {
  background: rgba(37, 58, 125, 00.85) !important;
  backdrop-filter: blur(20px) saturate(130%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(130%) !important;
  border: 1px solid rgba(147, 197, 253, 0.5) !important;
  border-radius: 20px !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35) !important;
  z-index: 100 !important;
}
[data-slot="conversation.composer.dock"] {
  background: rgba(20, 20, 38, 0.75) !important;
  backdrop-filter: blur(16px) saturate(140%) !important;
  -webkit-backdrop-filter: blur(16px) saturate(140%) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 9999px !important;
  font-size: 11px !important;
  color: rgba(226, 232, 240, 0.85) !important;
  padding: 2px 3px !important;
  margin: 6px auto 0 !important;
  width: fit-content !important;
  max-width: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 4px !important;
  overflow-x: auto !important;
  white-space: nowrap !important;
  scrollbar-width: none !important;
}
[data-slot="conversation.composer.dock"] .FJxK0a_root {
  width: auto !important;
  max-width: none !important;
  padding: 0 !important;
  margin: 0 !important;
  text-align: center !important;
  overflow: visible !important;
}
[data-slot="conversation.composer.dock"] .FJxK0a_sep {
  margin: 0 2px !important;
}
[data-slot="conversation.composer.dock"]::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
[data-slot="conversation.composer.dock"] * {
  text-overflow: clip !important;
  overflow: visible !important;
  white-space: nowrap !important;
  max-width: none !important;
  font-size: 11px !important;
  color: rgba(226, 232, 240, 0.85) !important;
}
[data-radix-popper-content-wrapper] > div,
div[role="menu"],
div[role="dialog"][class*="popover"],
div[class*="popover"],
div[class*="dropdown-menu"] {
  background: rgba(37, 58, 125, 0.94) !important;
  background-color: rgba(37, 58, 125, 0.94) !important;
  backdrop-filter: blur(16px) saturate(130%) !important;
  -webkit-backdrop-filter: blur(16px) saturate(130%) !important;
  border: 1px solid rgba(147, 197, 253, 0.35) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
  border-radius: 12px !important;
}
div[role="menu"] > div {
  background: transparent !important;
}
[role="menuitem"] {
  border: none !important;
  background: transparent !important;
  color: #e2e8f0 !important;
  border-radius: 8px !important;
  margin-bottom: 2px !important;
  transition: background 0.2s ease !important;
}
[role="menuitem"]:hover,
[role="menuitem"][data-highlighted] {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #ffffff !important;
}
[data-phase="hero"] .pXSMma_fish,
[data-phase="hero"] .pXSMma_headlineText,
[data-phase="hero"] .pXSMma_previewBadge {
  display: none !important;
}
[data-phase="hero"] .pXSMma_headline {
  display: block !important;
  text-align: center !important;
}
[data-phase="hero"] .pXSMma_headline::before {
  content: '' !important;
  display: inline-block !important;
  width: 360px !important;
  height: 90px !important;
  background-image: url('/kimino-bg/logo-blue.svg') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35));
}
.hHd-Xa_brand {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: relative !important;
}
.hHd-Xa_brand svg {
  display: none !important;
}
.hHd-Xa_brand::before {
  content: '' !important;
  display: inline-block !important;
  width: 144px !important;
  height: 36px !important;
  background-image: url('/kimino-bg/logo-blue.svg') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  flex: none !important;
  transform: translateX(10px) !important;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}
.hHd-Xa_brand::after {
  display: none !important;
}
.hHd-Xa_collapsed .hHd-Xa_toggle {
  position: relative !important;
}
.hHd-Xa_collapsed .hHd-Xa_toggle .hHd-Xa_railFish {
  display: none !important;
}
.hHd-Xa_collapsed .hHd-Xa_toggle::before {
  content: '' !important;
  display: block !important;
  width: 24px !important;
  height: 24px !important;
  flex: none !important;
  background-image: url('/kimino-bg/logo-letter.svg') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}
.hHd-Xa_collapsed .hHd-Xa_toggle:hover::before {
  display: none !important;
}
[data-cordis-panel] {
  position: fixed !important;
  background: rgba(15, 23, 42, 0.92) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6) !important;
  z-index: 9999 !important;
  color-scheme: dark !important;
}
[data-cordis-panel] select {
  background: rgba(15, 23, 42, 0.9) !important;
  color: #F8FAFC !important;
  border: 1px solid rgba(147, 197, 253, 0.2) !important;
  border-radius: 6px !important;
  padding: 2px 8px !important;
}
[data-cordis-panel] option {
  background-color: #0f172a !important;
  color: #F8FAFC !important;
}
[data-cordis-row] {
  margin: 6px 2px !important;
  padding: 4px !important;
}`);
  },
};