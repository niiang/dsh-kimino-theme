return {
  apply(ctx) {
    const theme = ctx.get('theme');
    if (theme === undefined) return;
    const patchPlaceholders = () => {
      const replacements = {
        '给智能体发消息': '黄昏之时，我在这里等你。',
        'Message the agent': '黄昏の時、私はここにいるよ。',
        '描述你想要构建的内容': '君の名は。想构建怎样的世界？',
        'Describe what you want to build': '君の名は。どんな世界を構築する？',
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
      '--dsw-alias-scrollbar-bg-l2': pair('rgba(147,197,253,0.32)'),
      '--dsw-alias-scrollbar-hover-l2': pair('rgba(147,197,253,0.55)'),
      '--dsw-shadow-lv2': pair('0 8px 24px rgba(0,0,0,0.28)'),
    });
    ctx.effect(() => dispose);
    ctx.effect(() => disposePlaceholders);
    document.documentElement.setAttribute('data-kimino-theme', 'on');
    ctx.effect(() => () => document.documentElement.removeAttribute('data-kimino-theme'));
    // Wheel isolation: while the composer textarea has focus, only the input
    // card's own scroll container may consume the wheel. Defaults (InputBar
    // onWheel) forward the delta to the conversation scrollport when the
    // inner scroller is at top/bottom or cannot scroll, which makes the page
    // backdrop scroll through the composer. Capture first and swallow the
    // event whenever there is no inner scroll to perform.
    const composerWheel = (event) => {
      // Hover semantics: decide by where the mouse pointer is (event.target),
      // not by keyboard focus, so moving the pointer back onto the chat area
      // restores backdrop scrolling even while the composer keeps focus.
      const target = event.target;
      if (!(target instanceof Element)) return;
      const card = target.closest('[data-composer-card]');
      const scroller = target.closest('[data-input-scroll]');
      if (!card || !(scroller instanceof HTMLElement)) return;
      const canScroll = scroller.scrollHeight > scroller.clientHeight + 1;
      if (canScroll) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    document.addEventListener('wheel', composerWheel, { capture: true, passive: false });
    ctx.effect(() => () => document.removeEventListener('wheel', composerWheel, { capture: true }));
    // ── 消息滚动重构配套（样式表内有完整注释）──────────────────────
    // 1) 给纯消息滚动容器 .Md3f7G_scroll 补 data-conversation-scroll 标记：
    //    组件 scrollerOf() 用 closest 查找该属性，从消息侧会先命中自身，
    //    自动跟随 / 滚动位置恢复 / 回到底部 / 加载更早消息全部锚定内层
    //    滚动器。React 重建节点时由 MutationObserver 补打标记。
    const markChatScrollers = () => {
      document.querySelectorAll('.Md3f7G_scroll:not([data-conversation-scroll])').forEach((el) => {
        el.setAttribute('data-conversation-scroll', '');
      });
    };
    markChatScrollers();
    const chatScrollerObserver = new MutationObserver(markChatScrollers);
    chatScrollerObserver.observe(document.body, { subtree: true, childList: true });
    ctx.effect(() => () => {
      chatScrollerObserver.disconnect();
      document.querySelectorAll('.Md3f7G_scroll[data-conversation-scroll]').forEach((el) => {
        el.removeAttribute('data-conversation-scroll');
      });
    });
    // 2) 输入卡非文本区（附件行 / 按钮等）滚轮：原生时代由外层 scrollBody
    //    承接，重构后补一条转发到内层消息滚动器，保持既有手感。文本区
    //    （[data-input-scroll]）仍由上面的 composerWheel 守卫全权处理。
    const cardChromeWheel = (event) => {
      if (event.deltaY === 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('[data-input-scroll]')) return;
      const card = target.closest('[data-composer-card]');
      if (!card) return;
      const root = card.closest('.wSkVaW_root');
      const real = root === null ? null : root.querySelector('.Md3f7G_scroll');
      if (!(real instanceof HTMLElement)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      real.scrollTop += event.deltaY;
    };
    document.addEventListener('wheel', cardChromeWheel, { capture: true, passive: false });
    ctx.effect(() => () => document.removeEventListener('wheel', cardChromeWheel, { capture: true }));
    // 3) 滚动事件接力：组件把 scroll 监听器锚定在挂载时解析到的容器上；
    //    若会话先于插件激活挂载，监听器留在已退化为布局的外层 scrollBody，
    //    内层滚动事件到不了它 → atBottom 恒真 → 「回到底部」按钮永不出现。
    //    接力：捕获内层 .Md3f7G_scroll 的 scroll，在外层派发合成 scroll；
    //    组件处理器运行时经 scrollerOf() 重新解析到内层，状态计算恢复正确。
    //    （若监听器本就锚定内层，转发无人接收，无副作用、不成环。）
    const relayChatScroll = (event) => {
      const inner = event.target;
      if (!(inner instanceof Element)) return;
      if (!inner.classList.contains('Md3f7G_scroll')) return;
      const outer = inner.closest('.wSkVaW_scrollBody');
      if (outer instanceof HTMLElement) outer.dispatchEvent(new Event('scroll'));
    };
    document.addEventListener('scroll', relayChatScroll, true);
    ctx.effect(() => () => document.removeEventListener('scroll', relayChatScroll, true));
    
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

/* ── 消息滚动重构 + 底部渐变蒙版（active 会话）────────────────────
 * 结构事实：DSH 的滚动容器 [data-conversation-scroll]（scrollBody）同时包含
 * 消息区与 composerSeat（sticky 吸底），加在它或其祖先上的 mask 必然裁到
 * 输入框。因此把滚动视口【下沉】到纯消息容器 .Md3f7G_scroll：
 *   · composerSeat 是 .Md3f7G_scroll 的兄弟节点——结构上绝对隔离，
 *     mask 只作用于消息列与回到底部按钮，输入框零裁切；
 *   · 外层 scrollBody 退化为纯布局（overflow:hidden，flex 链撑满）；
 *   · slot → viewArea → root → scroll 逐层 flex:1 + min-height:0，
 *     使 .Md3f7G_scroll 成为有界滚动视口，mask 百分比基准 = 可视高度；
 *   · 渐变：最后 40px 平滑淡出至全透明；padding-bottom 24px 保证滚到底时
 *     消息文本全部停在渐变区上方完整显示（卡片自身底部内边距柔和溶解）。
 * JS 配套（apply 内 markChatScrollers）：给 .Md3f7G_scroll 补
 * data-conversation-scroll 属性，组件 scrollerOf() 的 closest 会先命中自身，
 * 自动跟随/位置恢复/回到底部/加载更早消息全部锚定内层滚动器。
 * hero / settling 阶段不生效，保持组件原生布局。 */
.wSkVaW_root[data-phase="active"] .wSkVaW_scrollBody {
  overflow: hidden !important;
}
.wSkVaW_root[data-phase="active"] .wSkVaW_scrollBody > [data-slot="conversation.session"] {
  flex: 1 1 0 !important;
  min-height: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
}
.wSkVaW_root[data-phase="active"] .wSkVaW_viewArea {
  flex: 1 1 0 !important;
  min-height: 0 !important;
}
.wSkVaW_root[data-phase="active"] .Md3f7G_root {
  flex: 1 1 0 !important;
  min-height: 0 !important;
  height: auto !important;
}
.wSkVaW_root[data-phase="active"] .Md3f7G_scroll {
  flex: 1 1 0 !important;
  min-height: 0 !important;
  overflow-y: auto !important;
  padding-bottom: 24px !important;
  /* 回到底部按钮抬出渐变区：内层视口已不含输入框，抵消原生 --dsh-composer-height 补偿 */
  --dsh-composer-height: 28px !important;
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black calc(100% - 40px), transparent 100%) !important;
  mask-image: linear-gradient(to bottom, black 0%, black calc(100% - 40px), transparent 100%) !important;
}

/* 会话统计栏：居中胶囊式轻毛玻璃。文字蓝紫，fit-content 胶囊宽度由内容
 * 决定（完整显示），暗色半透明底 + blur 把文字从壁纸中托出（解决“糊着”）；
 * 视觉克制：无阴影、细边框、小内边距。
 * 注意：.FJxK0a_ 为构建哈希前缀，升级 dsh-client-ui-conversation 后需同步。 */
[data-composer-seat] .FJxK0a_root {
  width: fit-content !important;
  max-width: 100% !important;
  margin: 4px auto 0 !important;
  padding: 3px 14px !important;
  text-align: center !important;
  font-size: 11px !important;
  color: rgba(165, 180, 252, 0.92) !important;
  background: rgba(10, 14, 26, 0.55) !important;
  border: 1px solid rgba(147, 197, 253, 0.18) !important;
  border-radius: 999px !important;
  backdrop-filter: blur(10px) saturate(130%) !important;
  -webkit-backdrop-filter: blur(10px) saturate(130%) !important;
}
[data-composer-seat] .FJxK0a_sep {
  color: rgba(147, 197, 253, 0.42) !important;
  margin: 0 6px !important;
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
[data-composer-card] textarea,
[data-composer-card] .uV2eYG_input,
[data-composer-card] .uV2eYG_mirror,
[data-composer-card] .uV2eYG_backdrop,
[data-composer-card] [data-input-backdrop],
[data-composer-card] [data-input-backdrop] *,
[data-composer-card] [data-input-mirror] {
  font-weight: 500 !important;
  letter-spacing: 0 !important;
  font-variant-ligatures: none !important;
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
}
/* 全局滚动条：kimino 蓝紫玻璃统一风格（webkit/Electron 核心 + Firefox 标准属性兜底） */
* {
  scrollbar-width: thin  !important;
  scrollbar-color: rgba(147, 197, 253, 0.42) rgba(15, 23, 42, 0.35) !important;
}
*::-webkit-scrollbar {
  width: 10px !important;
  height: 10px !important;
}
*::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.35) !important;
  border-radius: 5px !important;
}
*::-webkit-scrollbar-thumb {
  background: rgba(147, 197, 253, 0.42) !important;
  border: 2px solid rgba(15, 23, 42, 0.55) !important;
  border-radius: 5px !important;
  background-clip: padding-box !important;
}
*::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 197, 253, 0.62) !important;
  border: 2px solid rgba(15, 23, 42, 0.55) !important;
  border-radius: 5px !important;
  background-clip: padding-box !important;
}
*::-webkit-scrollbar-corner {
  background: transparent !important;
}`);
  },
};
