// Kimi no Na wa theme — browser half of the dsh-kimino-theme bundle.
// Registered with the web module loader via the package's ./client export;
// the cordis loader adopts `exports` (apply/inject) as the plugin object.
// Delivers: comet-blue token layer, wallpaper + glassmorphism component
// styles, logo swap, composer re-skin, placeholder copy, unified
// scrollbars, and the message-scroll patch-ups. Every side effect is
// registered through ctx.effect so disable/remove fully reverts the page.
window.__ModuleLoader__.load({
  id: 'dsh-kimino-theme',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

    const inject = ['theme'];

    const apply = (ctx) => {
      const patchPlaceholders = () => {
        const replacements = {
          '给智能体发消息': '黄昏之时，我在这里等你。',
          'Message the agent': '黄昏の時、私はここにいるよ。',
          '描述你想要构建的内容': '君の名は。想构建怎样的世界？',
          'Describe what you want to build': '君の名は。想构建怎样的世界？',
          // DSH 0.1.7+ generation
          '发消息或创建任务, / 调用指令, @ 文件或对话': '黄昏之时，我在这里等你。',
          'Message or run a task, / commands, @ files or sessions': '黄昏の時、私はここにいるよ。',
          '描述你想要构建的内容, / 调用指令, @ 文件或对话': '君の名は。想构建怎样的世界？',
          'Describe what you want to build, / commands, @ files or sessions': '君の名は。どんな世界を構築する？',
        };
        const walk = () => {
        document.querySelectorAll('textarea, [data-placeholder], [data-composer-placeholder]').forEach((el) => {
          // The visible composer placeholder is a div whose TEXT CONTENT is the
          // string (0.1.7 DraftEditor); textarea/data-placeholder forms use attrs.
          if (el.hasAttribute('data-composer-placeholder')) {
            const text = el.textContent;
            if (text && replacements[text] !== undefined && el.textContent !== replacements[text]) {
              el.textContent = replacements[text];
            }
            return;
          }
          const attr = el.hasAttribute('data-placeholder') ? 'data-placeholder' : 'placeholder';
          const current = el.getAttribute(attr);
          if (current && replacements[current] !== undefined && el.getAttribute(attr) !== replacements[current]) {
            el.setAttribute(attr, replacements[current]);
          }
        });
      };
        walk();
        const observer = new MutationObserver(walk);
        observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['placeholder', 'data-placeholder'] });
        return () => observer.disconnect();
      };
      const disposePlaceholders = patchPlaceholders();
      const pair = (v) => ({ light: v, dark: v });
      const dispose = ctx.theme.overrideTokens('kimino-bg', {
        '--dsw-alias-bg-base': pair('rgba(5,8,20,0)'),
        '--dsw-alias-bg-layer-1': pair('rgba(15,23,42,0.88)'),
        '--dsw-alias-bg-layer-2': pair('rgba(15,23,42,0.9)'),
        '--dsw-alias-bg-layer-3': pair('rgba(15,23,42,0.92)'),
        '--dsw-alias-bg-overlay': pair('rgba(10,14,26,0.9)'),
        '--dsw-alias-bg-module-platform': pair('rgba(255,255,255,0.08)'),
        '--dsw-alias-bg-multi-select': pair('rgba(147,197,253,0.15)'),
        '--dsw-alias-border-l1': pair('rgba(147,197,253,0.14)'),
        '--dsw-alias-border-l2': pair('rgba(147,197,253,0.22)'),
        '--dsw-alias-border-l3': pair('rgba(147,197,253,0.28)'),
        '--dsw-alias-border-l2-darkmode-thin': pair('rgba(147,197,253,0.16)'),
        '--dsw-alias-brand-primary': pair('#93C5FD'),
        '--dsw-alias-brand-primary-invert': pair('#0f172a'),
        '--dsw-alias-brand-text': pair('#e2e8f0'),
        '--dsw-alias-button-contrast-fill': pair('#0f172a'),
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
        '--dsw-alias-button-primary-fill': pair('#93C5FD'),
        '--dsw-alias-button-primary-hover': pair('#7CAEFD'),
        '--dsw-alias-interactive-bg-hover': pair('rgba(255,255,255,0.08)'),
        '--dsw-alias-interactive-bg-hover-solid': pair('rgba(255,255,255,0.1)'),
        '--dsw-alias-interactive-bg-active': pair('rgba(147,197,253,0.16)'),
        '--dsw-alias-interactive-bg-hover-accent': pair('rgba(147,197,253,0.2)'),
        '--dsw-alias-interactive-bg-hover-danger': pair('rgba(248,113,113,0.12)'),
        '--dsw-alias-label-primary': pair('#F8FAFC'),
        '--dsw-alias-label-secondary': pair('#CBD5E1'),
        '--dsw-alias-label-tertiary': pair('#93C5FD'),
        '--dsw-alias-label-caption': pair('#94A3B8'),
        '--dsw-alias-label-dimmed': pair('#64748B'),
        '--dsw-alias-label-primary-dimmed': pair('#A5B4FC'),
        '--dsw-alias-label-primary-foreground': pair('#0f172a'),
        '--dsw-alias-label-primary-inverted': pair('#0f172a'),
        '--dsw-alias-markdown-inline-code': pair('rgba(147,197,253,0.12)'),
        '--dsw-alias-markdown-code-block': pair('rgba(13,17,23,0.55)'),
        '--dsw-alias-markdown-code-block-banner': pair('rgba(147,197,253,0.08)'),
        '--dsw-alias-markdown-tag': pair('rgba(147,197,253,0.1)'),
        '--dsw-alias-markdown-citation': pair('rgba(147,197,253,0.1)'),
        '--dsw-alias-markdown-code-segment-unselected': pair('rgba(255,255,255,0.06)'),
        '--dsw-alias-markdown-code-segment-selected': pair('rgba(147,197,253,0.2)'),
        '--dsw-alias-markdown-placeholder': pair('rgba(255,255,255,0.5)'),
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
        '--dsw-specific-menu': pair('rgba(15,23,42,0.94)'),
        '--dsw-specific-selector': pair('rgba(255,255,255,0.1)'),
        '--dsw-alias-scrollbar-bg-l1': pair('rgba(15,23,42,0.35)'),
        '--dsw-alias-scrollbar-bg-l2': pair('rgba(147,197,253,0.32)'),
        '--dsw-alias-scrollbar-hover-l1': pair('rgba(147,197,253,0.42)'),
        '--dsw-alias-scrollbar-hover-l2': pair('rgba(147,197,253,0.55)'),
        '--dsw-alias-tooltip-bg': pair('rgba(15,23,42,0.94)'),
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
        // NOTE: no .wSkVaW_viewArea companion. The 0.1.7+ sinking CSS is
        // active (fade mask kept deliberately — see the stylesheet note),
        // and attach() caches its resolved scroller at mount time, before
        // any observer can mark viewArea, so a post-hoc bridge loses the
        // race and only adds noise. Measured and rolled back; do not re-add.
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
      //    例外：输入卡内的弹出面板（模型选择 / effort 菜单等）自带滚动区——
      //    目标与卡根之间若存在中间滚动容器，滚轮归它所有：面板滚得动就滚
      //    面板，滚到边界就吞掉，绝不转发给外层会话（否则会出现
      //    「在模型菜单上滚动 → 背后聊天区跟着滚」）。
      const cardChromeWheel = (event) => {
        if (event.deltaY === 0) return;
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (target.closest('[data-input-scroll]')) return;
        const card = target.closest('[data-composer-card]');
        if (!card) return;
        let node = target;
        while (node instanceof HTMLElement && node !== card) {
          const oy = getComputedStyle(node).overflowY;
          if (oy === 'auto' || oy === 'scroll') {
            const canConsume = node.scrollHeight > node.clientHeight + 1
              && !((event.deltaY < 0 && node.scrollTop <= 0)
                || (event.deltaY > 0 && node.scrollTop + node.clientHeight >= node.scrollHeight - 1));
            if (canConsume) node.scrollTop += event.deltaY;
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
          }
          node = node.parentElement;
        }
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
      // ── 控制中心 + 动态壁纸引擎 ─────────────────────────────────────
      // 技术移植自 @linxin666/dsh-client-ui-skin-center（Apache-2.0）：
      // body 级 fixed 图层（z-index:-2，垫在 body::before 模糊层之下）承载
      // 无缝循环视频；开启时 body 自身背景退化为纯渐变蒙版（html[data-kimino-live]）。
      // 胶片按钮打开「控制中心」面板：动态壁纸开关 + 背景模糊 / 背景加深 /
      // 输入卡模糊三个滑杆，全部经 CSS 变量即时生效，偏好存 localStorage
      // （kimino-controls，兼容旧 kimino-live 键）；减弱动效用户与后台标签页
      // 不解码视频帧（回落静态 / 暂停）。
      const CONTROLS_KEY = 'kimino-controls';
      const LIVE_KEY = 'kimino-live';
      const CONTROL_DEFAULTS = { live: true, bgBlur: 1, veil: 0, cardBlur: 0 };
      const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
      const clampNum = (v, min, max, dflt) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : dflt);
      const loadControls = () => {
        let saved = {};
        try { saved = JSON.parse(localStorage.getItem(CONTROLS_KEY) || '{}'); } catch { saved = {}; }
        return {
          live: typeof saved.live === 'boolean' ? saved.live : (localStorage.getItem(LIVE_KEY) === null ? CONTROL_DEFAULTS.live : localStorage.getItem(LIVE_KEY) === '1'),
          bgBlur: clampNum(saved.bgBlur, 0, 20, CONTROL_DEFAULTS.bgBlur),
          veil: clampNum(saved.veil, 0, 100, CONTROL_DEFAULTS.veil),
          cardBlur: clampNum(saved.cardBlur, 0, 20, CONTROL_DEFAULTS.cardBlur),
        };
      };
      let ctrl = loadControls();
      const saveControls = () => localStorage.setItem(CONTROLS_KEY, JSON.stringify(ctrl));
      const wantsLive = () => ctrl.live && !reducedMotion.matches;
      const applyControls = () => {
        const root = document.documentElement;
        root.style.setProperty('--kimino-bg-blur', `${ctrl.bgBlur}px`);
        root.style.setProperty('--kimino-veil', (ctrl.veil / 100).toFixed(2));
        root.style.setProperty('--kimino-card-blur', `${ctrl.cardBlur}px`);
        applyLive(wantsLive());
      };
      const bgLayer = document.createElement('div');
      bgLayer.setAttribute('data-kimino-backdrop', '');
      bgLayer.setAttribute('aria-hidden', 'true');
      bgLayer.style.cssText = 'position:fixed;top:0;right:0;bottom:0;left:0;z-index:-2;pointer-events:none;overflow:hidden;';
      const liveVideo = document.createElement('video');
      liveVideo.src = '/kimino-bg/live.mp4';
      liveVideo.muted = true;
      liveVideo.loop = true;
      liveVideo.autoplay = true;
      liveVideo.playsInline = true;
      liveVideo.setAttribute('aria-hidden', 'true');
      liveVideo.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;';
      bgLayer.append(liveVideo);
      const setLiveAttr = (on) => {
        if (on) document.documentElement.setAttribute('data-kimino-live', '');
        else document.documentElement.removeAttribute('data-kimino-live');
      };
      const applyLive = (on) => {
        if (on) {
          document.body.append(bgLayer);
          liveVideo.play().catch(() => {});
          // 只在视频真的解出第一帧后才把 body 背景切到纯渐变；
          // 路由缺失 / 解码失败时保持静态图，绝不白屏。
          if (liveVideo.readyState >= 2) setLiveAttr(true);
          else {
            liveVideo.addEventListener('loadeddata', () => { if (bgLayer.isConnected) setLiveAttr(true); }, { once: true });
            liveVideo.addEventListener('error', () => { if (bgLayer.isConnected) applyLive(false); }, { once: true });
          }
        } else {
          setLiveAttr(false);
          bgLayer.remove();
          liveVideo.pause();
        }
      };
      const onVisibility = () => {
        if (document.hidden) liveVideo.pause();
        else if (bgLayer.isConnected) liveVideo.play().catch(() => {});
      };
      document.addEventListener('visibilitychange', onVisibility);
      const toggleIcon = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" stroke-width="1.3"><rect x="1.5" y="2.5" width="13" height="11" rx="2" stroke="currentColor"/><path d="M5.5 2.5v11M10.5 2.5v11" stroke="currentColor"/></svg>';
      let ccPanel = null;
      const buildPanel = () => {
        const panel = document.createElement('div');
        panel.setAttribute('data-kimino-panel', '');
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'kimino 控制中心');
        const head = document.createElement('div');
        head.className = 'kimino-cc-head';
        head.textContent = '君の名は · 控制中心';
        panel.append(head);
        const switchRow = document.createElement('div');
        switchRow.className = 'kimino-cc-row';
        const switchLabel = document.createElement('span');
        switchLabel.textContent = '动态壁纸';
        const switchBtn = document.createElement('button');
        switchBtn.type = 'button';
        switchBtn.className = 'kimino-cc-toggle';
        switchBtn.setAttribute('aria-label', '切换动态壁纸');
        switchRow.append(switchLabel, switchBtn);
        panel.append(switchRow);
        const sep = document.createElement('div');
        sep.className = 'kimino-cc-sep';
        panel.append(sep);
        const inputs = [];
        for (const s of [
          { key: 'bgBlur', label: '背景模糊', min: 0, max: 20, step: 1, unit: 'px' },
          { key: 'veil', label: '背景加深', min: 0, max: 100, step: 5, unit: '%' },
          { key: 'cardBlur', label: '输入卡模糊', min: 0, max: 20, step: 1, unit: 'px' },
        ]) {
          const row = document.createElement('div');
          row.className = 'kimino-cc-row';
          const lab = document.createElement('span');
          lab.textContent = s.label;
          const input = document.createElement('input');
          input.type = 'range';
          input.min = String(s.min);
          input.max = String(s.max);
          input.step = String(s.step);
          input.setAttribute('aria-label', s.label);
          const val = document.createElement('span');
          val.className = 'kimino-cc-val';
          row.append(lab, input, val);
          panel.append(row);
          inputs.push({ ...s, input, val });
        }
        const foot = document.createElement('div');
        foot.className = 'kimino-cc-foot';
        const resetBtn = document.createElement('button');
        resetBtn.type = 'button';
        resetBtn.className = 'kimino-cc-reset';
        resetBtn.textContent = '重置';
        foot.append(resetBtn);
        panel.append(foot);
        const syncUi = () => {
          switchBtn.setAttribute('aria-pressed', String(ctrl.live));
          for (const it of inputs) {
            it.input.value = String(ctrl[it.key]);
            it.val.textContent = `${ctrl[it.key]}${it.unit}`;
          }
        };
        switchBtn.addEventListener('click', () => {
          ctrl.live = !ctrl.live;
          saveControls();
          applyControls();
          syncUi();
        });
        for (const it of inputs) {
          it.input.addEventListener('input', () => {
            ctrl[it.key] = Number(it.input.value);
            saveControls();
            applyControls();
            it.val.textContent = `${ctrl[it.key]}${it.unit}`;
          });
        }
        // 重置只回视觉参数，不打扰动态壁纸的开关状态。
        resetBtn.addEventListener('click', () => {
          ctrl = { ...CONTROL_DEFAULTS, live: ctrl.live };
          saveControls();
          applyControls();
          syncUi();
        });
        syncUi();
        return panel;
      };
      const closePanel = () => {
        if (ccPanel !== null) ccPanel.removeAttribute('data-open');
        const b = document.querySelector('[data-kimino-toggle]');
        if (b !== null) b.setAttribute('aria-expanded', 'false');
      };
      const openPanel = (btn) => {
        if (ccPanel === null) return;
        ccPanel.setAttribute('data-open', '');
        const rect = btn.getBoundingClientRect();
        ccPanel.style.top = '0px';
        ccPanel.style.left = `${Math.max(8, Math.min(rect.left, window.innerWidth - 284))}px`;
        ccPanel.style.top = `${Math.max(8, rect.top - ccPanel.offsetHeight - 8)}px`;
        btn.setAttribute('aria-expanded', 'true');
      };
      const mountControlCenter = () => {
        const slot = document.querySelector('[data-slot="conversation.input.left"]');
        if (slot === null) return;
        if (document.querySelector('[data-kimino-toggle]') === null) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.setAttribute('data-kimino-toggle', '');
          btn.title = 'kimino 控制中心';
          btn.setAttribute('aria-label', '打开 kimino 控制中心');
          btn.setAttribute('aria-haspopup', 'dialog');
          btn.setAttribute('aria-expanded', 'false');
          btn.innerHTML = toggleIcon;
          btn.addEventListener('click', () => {
            const open = ccPanel !== null && ccPanel.hasAttribute('data-open');
            if (open) closePanel();
            else openPanel(btn);
          });
          slot.append(btn);
        }
        if (ccPanel === null || !ccPanel.isConnected) {
          ccPanel = buildPanel();
          document.body.append(ccPanel);
        }
      };
      mountControlCenter();
      applyControls();
      // 面板外点击 / Esc 关闭。
      const onCcPointer = (event) => {
        if (ccPanel === null || !ccPanel.hasAttribute('data-open')) return;
        const t = event.target;
        if (t instanceof Node && ccPanel.contains(t)) return;
        if (t instanceof Element && t.closest('[data-kimino-toggle]') !== null) return;
        closePanel();
      };
      const onCcKey = (event) => { if (event.key === 'Escape') closePanel(); };
      document.addEventListener('mousedown', onCcPointer, true);
      document.addEventListener('keydown', onCcKey, true);
      // React 重挂输入卡（切换会话）后补挂按钮与面板、对齐引擎状态。
      const liveToggleObserver = new MutationObserver(() => {
        mountControlCenter();
        if (wantsLive() !== bgLayer.isConnected) applyLive(wantsLive());
      });
      liveToggleObserver.observe(document.body, { subtree: true, childList: true });
      reducedMotion.addEventListener?.('change', () => applyLive(wantsLive()));
      ctx.effect(() => () => {
        liveToggleObserver.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        document.removeEventListener('mousedown', onCcPointer, true);
        document.removeEventListener('keydown', onCcKey, true);
        document.querySelectorAll('[data-kimino-toggle], [data-kimino-panel]').forEach((el) => el.remove());
        ccPanel = null;
        const root = document.documentElement;
        for (const p of ['--kimino-bg-blur', '--kimino-veil', '--kimino-card-blur']) root.style.removeProperty(p);
        applyLive(false);
      });
      // ── 自绘「回到底部」按钮 ─────────────────────────────────────────
      // 视口下沉布局下，组件原生回底按钮依赖的 atBottom 状态锚定在已退化
      // 为布局的 scrollBody 上而永不出现（保留渐变蒙版的已知代价之一）。
      // 这里自绘一枚悬浮按钮：直接观测真实滚动器（.Md3f7G_scroll 或下沉的
      // .wSkVaW_viewArea）的离底距离，点击平滑回底——不依赖组件任何内部状态。
      const resolveScroller = () => {
        const root = document.querySelector('.wSkVaW_root[data-phase="active"]');
        if (root === null) return null;
        const inner = root.querySelector('.Md3f7G_scroll');
        if (inner instanceof HTMLElement) return inner;
        const view = root.querySelector('.wSkVaW_viewArea');
        return view instanceof HTMLElement ? view : null;
      };
      const ccToBottom = document.createElement('button');
      ccToBottom.type = 'button';
      ccToBottom.setAttribute('data-kimino-tobottom', '');
      ccToBottom.setAttribute('aria-label', '回到底部');
      ccToBottom.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" stroke-width="1.5"><path d="M8 2.5V13.5M3.5 9L8 13.5L12.5 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      let ccScroller = null;
      let pinUntil = 0;
      const syncTobottom = () => {
        const sc = resolveScroller();
        if (sc === null) {
          ccScroller = null;
          ccToBottom.remove();
          return;
        }
        if (sc !== ccScroller) {
          ccScroller = sc;
          document.body.append(ccToBottom);
          // 新会话挂载：自动落底，恢复「进对话停在最新消息」的手感
          // （下沉布局下原生位置恢复已失效的替代）。挂载后内容仍可能
          // 渐进渲染，900ms 窗口内持续跟底；用户滚轮/触摸立即让位。
          pinUntil = Date.now() + 900;
          sc.scrollTop = sc.scrollHeight;
        }
        if (pinUntil > Date.now()) sc.scrollTop = sc.scrollHeight;
        // 锚定输入卡右缘：按钮贴着会话内容列（居中列），而非窗口边缘。
        const card = document.querySelector('[data-composer-card]') ?? document.querySelector('[data-composer-seat]');
        if (card !== null) {
          const r = card.getBoundingClientRect();
          ccToBottom.style.right = `${Math.max(8, Math.round(window.innerWidth - r.right + 12))}px`;
        }
        const away = sc.scrollHeight - sc.scrollTop - sc.clientHeight > 120;
        if (away) ccToBottom.setAttribute('data-show', '');
        else ccToBottom.removeAttribute('data-show');
      };
      ccToBottom.addEventListener('click', () => {
        if (ccScroller !== null) ccScroller.scrollTo({ top: ccScroller.scrollHeight, behavior: 'smooth' });
      });
      syncTobottom();
      document.addEventListener('scroll', syncTobottom, true);
      window.addEventListener('resize', syncTobottom);
      const cancelPin = () => { pinUntil = 0; };
      document.addEventListener('wheel', cancelPin, { passive: true, capture: true });
      document.addEventListener('touchstart', cancelPin, { passive: true, capture: true });
      // 内容增长（流式输出）不必然触发 scroll，用 childList 观测兜底。
      const toBottomObserver = new MutationObserver(syncTobottom);
      toBottomObserver.observe(document.body, { subtree: true, childList: true });
      ctx.effect(() => () => {
        document.removeEventListener('scroll', syncTobottom, true);
        window.removeEventListener('resize', syncTobottom);
        document.removeEventListener('wheel', cancelPin, { capture: true });
        document.removeEventListener('touchstart', cancelPin, { capture: true });
        toBottomObserver.disconnect();
        ccToBottom.remove();
      });
      const styleEl = document.createElement('style');
      styleEl.id = 'kimino-theme';
      styleEl.setAttribute('data-plugin', 'dsh-kimino-theme');
      styleEl.textContent = `html { background-color: transparent !important; }
body {
  background-image:
    linear-gradient(180deg, rgba(4,7,18,0.12) 0%, rgba(8,11,28,0.06) 45%, rgba(14,8,26,0.10) 100%),
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
    linear-gradient(180deg, rgba(4,7,18,0.12) 0%, rgba(8,11,28,0.06) 45%, rgba(14,8,26,0.10) 100%),
    url('/kimino-bg/current.jpg') !important;
}
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  backdrop-filter: blur(var(--kimino-bg-blur, 1px)) saturate(140%);
  -webkit-backdrop-filter: blur(var(--kimino-bg-blur, 1px)) saturate(140%);
}
/* 控制中心「背景加深」遮罩：0 = 全透明（零视觉/零 GPU 差异）。 */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: rgba(4, 7, 18, var(--kimino-veil, 0));
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
.wSkVaW_root[data-phase="active"] .wSkVaW_scrollBody:has(.Md3f7G_scroll) {
  overflow: hidden !important;
}
.wSkVaW_root[data-phase="active"] .wSkVaW_scrollBody:has(.Md3f7G_scroll) > [data-slot="conversation.session"] {
  flex: 1 1 0 !important;
  min-height: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
}
.wSkVaW_root[data-phase="active"] .wSkVaW_scrollBody:has(.Md3f7G_scroll) .wSkVaW_viewArea {
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

/* 0.1.7+ layout: sink the viewport into viewArea so the bottom fade mask
 * never clips the sticky composer. KNOWN TRADE-OFF (kept deliberately,
 * 2026-10-20): on this build the official scrollBody is the scroller and
 * the component caches its resolved scrollport at mount time, so sinking
 * costs position restore / auto-follow / back-to-bottom (sessions reopen
 * at the top). The fade mask was judged worth it — retiring the sinking
 * was tried and rolled back the same night. Do NOT re-attempt a viewArea
 * marking bridge: it loses the mount-time race (see markChatScrollers).
 * Guards: :not(:has(.Md3f7G_scroll)) = new layout only (rc.6 block above
 * owns the old one); :not(:has([data-conversation-composer-overlay])) =
 * plain mode only. */
.wSkVaW_root[data-phase="active"] .wSkVaW_scrollBody:not(:has(.Md3f7G_scroll)):not(:has([data-conversation-composer-overlay])) {
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
}
.wSkVaW_root[data-phase="active"] .wSkVaW_scrollBody:not(:has(.Md3f7G_scroll)):not(:has([data-conversation-composer-overlay])) > [data-slot="conversation.session"] {
  flex: 1 1 0 !important;
  min-height: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
}
.wSkVaW_root[data-phase="active"] .wSkVaW_scrollBody:not(:has(.Md3f7G_scroll)):not(:has([data-conversation-composer-overlay])) .wSkVaW_viewArea {
  flex: 1 1 0 !important;
  min-height: 0 !important;
  overflow-y: auto !important;
  padding-bottom: 24px !important;
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black calc(100% - 40px), transparent 100%) !important;
  mask-image: linear-gradient(to bottom, black 0%, black calc(100% - 40px), transparent 100%) !important;
}

/* 会话统计栏：居中胶囊式轻毛玻璃。文字蓝紫，fit-content 胶囊宽度由内容
 * 决定（完整显示），暗色半透明底 + blur 把文字从壁纸中托出（解决"糊着"）；
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
  backdrop-filter: blur(var(--kimino-card-blur, 0px)) saturate(130%) !important;
  -webkit-backdrop-filter: blur(var(--kimino-card-blur, 0px)) saturate(130%) !important;
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
  backdrop-filter: blur(var(--kimino-card-blur, 0px)) saturate(130%) !important;
  -webkit-backdrop-filter: blur(var(--kimino-card-blur, 0px)) saturate(130%) !important;
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
  background: rgba(15, 23, 42, 0.94) !important;
  background-color: rgba(15, 23, 42, 0.94) !important;
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

/* ── Slash trigger menu (composer "/" palette, data-trigger-menu) ──
 * Neither a radix popover nor role="menu" (it is role="listbox"), so the
 * popover rules above never matched it and the official translucent
 * MenuSurface fill clashed with the glass theme. The surface material
 * layer reads --dsw-menu-surface-fill / --dsw-menu-backdrop-filter, so
 * override those two tokens on the menu root (hash-class-free) and dress
 * the rows with the same comet-blue slate as every other popup. */
[data-trigger-menu] {
  --dsw-menu-surface-fill: var(--kg-pop-bg) !important;
  --dsw-menu-backdrop-filter: blur(16px) saturate(130%) !important;
  border: 1px solid var(--kg-pop-border) !important;
  border-radius: 12px !important;
  box-shadow: inset 0 1px 0 var(--kg-hi), 0 10px 30px rgba(0, 0, 0, 0.3) !important;
}
[data-trigger-menu] [role="option"] {
  color: var(--kg-menuitem-fg) !important;
  border-radius: 8px !important;
}
[data-trigger-menu] [role="option"]:hover {
  background: rgba(147, 197, 253, 0.12) !important;
}
[data-trigger-menu] [role="option"][aria-selected="true"] {
  background: rgba(147, 197, 253, 0.2) !important;
  color: #ffffff !important;
}
[data-trigger-menu] ._3e4SsG_sectionTitle {
  color: #94A3B8 !important;
}
[data-trigger-menu] ._3e4SsG_itemIcon {
  color: #BFDBFE !important;
}
[data-trigger-menu] ._3e4SsG_itemAlias {
  color: rgba(147, 197, 253, 0.75) !important;
}
[data-trigger-menu] ._3e4SsG_itemDescription {
  color: #94A3B8 !important;
}
[data-phase="hero"] .pXSMma_fish,
[data-phase="hero"] .pXSMma_headlineText, [data-phase="hero"] .pXSMma_titleGroup,
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
  width: min(480px, 82vw) !important;
  aspect-ratio: 2500 / 630 !important; height: auto !important;
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
.hHd-Xa_collapsed .hHd-Xa_toggle > * {
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
  scrollbar-width: thin;
  scrollbar-color: rgba(147, 197, 253, 0.42) rgba(15, 23, 42, 0.35);
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
}

/* ═══ v68 · dual-mode glass + 0.1.7 polish — synced from skin/shared/patches.css ═══ */

/* ── mode variables: one comet palette for both modes ─────────────── */
:root {
  --kg-accent: #93C5FD;
  --kg-accent-border: rgba(147, 197, 253, 0.5);
  --kg-composer-bg: rgba(37, 58, 125, 0.85);
  --kg-composer-border: rgba(147, 197, 253, 0.45);
  --kg-pop-bg: rgba(15, 23, 42, 0.94);
  --kg-pop-border: rgba(147, 197, 253, 0.35);
  --kg-tb-bg: rgba(37, 58, 125, 0.9);
  --kg-think-bg: rgba(8, 13, 26, 0.78);
  --kg-think-border: rgba(147, 197, 253, 0.2);
  --kg-user-bubble-bg: rgba(37, 58, 125, 0.62);
  --kg-user-bubble-border: rgba(147, 197, 253, 0.35);
  --kg-menuitem-fg: #e2e8f0;
  --kg-hi: rgba(255, 255, 255, 0.14);
  --kg-focus: rgba(147, 197, 253, 0.35);
  --kg-sel-bg: rgba(147, 197, 253, 0.4);
  --kg-sel-color: #0B1220;
}

/* ── 2 · think / reasoning row (0.1.7 lcKema_) ─────────────────────── */
.lcKema_root {
  background: var(--kg-think-bg) !important;
  border: 1px solid var(--kg-think-border) !important;
  border-radius: 12px !important;
  transition: background 0.2s ease !important;
}
.lcKema_root:hover {
  background: var(--kg-think-bg) !important;
  filter: brightness(1.06) !important;
}
.lcKema_title {
  color: #93C5FD !important;
  font-weight: 700 !important;
}
.lcKema_summary, .lcKema_summaryText {
  color: #BFDBFE !important;
  opacity: 1 !important;
}
.lcKema_thinkBody {
  color: #DBEAFE !important;
  opacity: 1 !important;
}
.lcKema_chevron, .lcKema_leading {
  color: var(--kg-accent) !important;
}

/* ── 3 · scroll-to-bottom button (0.1.7 EvIC1a_toBottom) ───────────── */
.EvIC1a_toBottom {
  background: var(--kg-tb-bg) !important;
  border: 1px solid var(--kg-accent-border) !important;
  border-radius: 999px !important;
  backdrop-filter: blur(12px) saturate(130%) !important;
  -webkit-backdrop-filter: blur(12px) saturate(130%) !important;
  box-shadow: inset 0 1px 0 var(--kg-hi), 0 6px 18px rgba(0, 0, 0, 0.3) !important;
}

/* ── 4 · dual-mode glass + edge highlight for composer / seat / popovers */
[data-composer-card] {
  background: var(--kg-composer-bg) !important;
  border-color: var(--kg-composer-border) !important;
  box-shadow: inset 0 1px 0 var(--kg-hi) !important;
}
[data-composer-card]:focus-within {
  border-color: var(--kg-accent) !important;
}
[data-composer-seat] > * {
  background: var(--kg-composer-bg) !important;
  border-color: var(--kg-composer-border) !important;
  box-shadow: inset 0 1px 0 var(--kg-hi), 0 10px 25px rgba(0, 0, 0, 0.25) !important;
}
[data-radix-popper-content-wrapper] > div,
div[role="menu"],
div[role="dialog"][class*="popover"],
div[class*="popover"],
div[class*="dropdown-menu"] {
  background: var(--kg-pop-bg) !important;
  background-color: var(--kg-pop-bg) !important;
  border-color: var(--kg-pop-border) !important;
  box-shadow: inset 0 1px 0 var(--kg-hi), 0 10px 30px rgba(0, 0, 0, 0.3) !important;
}
[role="menuitem"] {
  color: var(--kg-menuitem-fg) !important;
}
[role="menuitem"]:hover,
[role="menuitem"][data-highlighted] {
  background: rgba(147, 197, 253, 0.12) !important;
}
/* ── 5 · composer focus ring ───────────────────────────────────────── */
[data-composer-card]:focus-within {
  box-shadow: inset 0 1px 0 var(--kg-hi), 0 0 0 2px var(--kg-focus) !important;
}

/* ── 6 · user vs assistant bubbles ─────────────────────────────────── */
.Sixlwa_userRow .Sixlwa_bubble {
  background: var(--kg-user-bubble-bg) !important;
  border: 1px solid var(--kg-user-bubble-border) !important;
}

/* ── 7 · selection color ───────────────────────────────────────────── */
::selection {
  background: var(--kg-sel-bg) !important;
  color: var(--kg-sel-color) !important;
}

/* ── 8 · unified hover transitions ─────────────────────────────────── */
button, [role="menuitem"], .hHd-Xa_iconButton, .hHd-Xa_trigger {
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease !important;
}

/* ── 9 · comet streak on the hero screen ───────────────────────────── */
[data-phase="hero"] .pXSMma_body {
  position: relative;
  overflow: hidden;
}
[data-phase="hero"] .pXSMma_body::after {
  content: '';
  position: absolute;
  top: 8%;
  right: -6%;
  width: 320px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(270deg, rgba(197, 171, 252, 0.95), rgba(147, 197, 253, 0.5) 40%, transparent);
  filter: drop-shadow(0 0 6px rgba(165, 180, 252, 0.8));
  transform: rotate(-16deg);
  opacity: 0;
  animation: kimino-comet 11s ease-in 2.5s infinite;
  pointer-events: none;
}
[data-phase="hero"] .pXSMma_body::before {
  content: '';
  position: absolute;
  top: 26%;
  right: -4%;
  width: 200px;
  height: 1px;
  background: linear-gradient(270deg, rgba(147, 197, 253, 0.8), transparent);
  filter: drop-shadow(0 0 4px rgba(147, 197, 253, 0.6));
  transform: rotate(-13deg);
  opacity: 0;
  animation: kimino-comet 11s ease-in 8s infinite;
  pointer-events: none;
}
@keyframes kimino-comet {
  0% { transform: translate(0, 0) rotate(-16deg); opacity: 0; }
  3% { opacity: 1; }
  13% { transform: translate(-46vw, 22vh) rotate(-16deg); opacity: 0; }
  100% { transform: translate(-46vw, 22vh) rotate(-16deg); opacity: 0; }
}

/* ── 11 · weak-GPU degrade: less translucency ──────────────────────── */
@media (prefers-reduced-transparency: reduce) {
  [data-composer-card], [data-composer-seat] > *,
  [data-radix-popper-content-wrapper] > div, div[role="menu"],
  .lcKema_root, .EvIC1a_toBottom {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}
/* File viewer (CodeMirror 6): dark glass base so code/text stays readable. */

/* ── Menu item icons: brighten (dark glyphs vanish on dark glass) ── */
[role="menuitem"] svg,
[role="menuitem"] svg * {
  color: #BFDBFE !important;
  fill: #BFDBFE !important;
}
.cm-editor {
  background: rgba(15, 23, 42, 0.88) !important;
  border-radius: 12px !important;
}
.cm-scroller {
  background: transparent !important;
}

/* ── Right sidebar / workspace panels: dark glass readability ──
 * .P3OORG_panel (ui-sidebar-right) is an always-mounted, full-height,
 * right-anchored container whose children hide via visibility when the
 * sidebar is closed — painting the container unconditionally leaves a
 * permanent dark slab over the right side (the "cover" bug). Guard with
 * the official [data-sidebar-right-open] state attribute so the glass
 * shows only while the sidebar is open. */
.P3OORG_panel[data-sidebar-right-open] {
  background: rgba(15, 23, 42, 0.94) !important;
  border: 1px solid rgba(147, 197, 253, 0.18) !important;
  border-radius: 14px !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 10px 30px rgba(0, 0, 0, 0.25) !important;
}
/* The workspace files tree (bhn1Oq_root) deliberately carries NO custom
 * rule here — c7f9bfe removed the old 0.88+blur override so the panel
 * rides the token layer (--dsw-alias-bg-layer-*: near-opaque slate),
 * which is the readable look the skin form ships. Do not re-add it. */
/* Newer builds rename the tree panel host; inert where absent. */
.nArs4W_editorTreePanel {
  background: rgba(15, 23, 42, 0.55) !important;
  border-radius: 10px !important;
}

/* ── Deliverables change-summary card (hz8-rW_, "已编辑 N 个文件") ──
 * The official tile recipe branches on body[data-ds-dark-theme]: light
 * mode paints color-mix(neutral-00 50%) — a pure-white square on this
 * theme's forced dark glass (the theme keeps one visual across modes
 * without flipping the dark attribute). Normalize both modes to the
 * dark slate recipe with comet-blue accents. */
.hz8-rW_header {
  background: rgba(15, 23, 42, 0.55) !important;
}
button.hz8-rW_header:hover:not(:disabled),
button.hz8-rW_header:focus-visible {
  background: rgba(15, 23, 42, 0.72) !important;
}
.hz8-rW_tile {
  background: rgba(147, 197, 253, 0.14) !important;
  border: 1px solid rgba(147, 197, 253, 0.28) !important;
}
/* ── Deliverables presented-file card (nyYjTG_, the file rows under a
 * message) ── Same leak as hz8-rW: official --deliverable-fill resolves
 * to neutral-50 (near-white row) and the icon chip mixes neutral-00 50%
 * (half-white square) in light mode; the theme keeps one dark visual
 * without flipping body[data-ds-dark-theme]. Normalize both modes. */
.nyYjTG_file {
  background: rgba(15, 23, 42, 0.55) !important;
}
.nyYjTG_file:hover {
  background: rgba(15, 23, 42, 0.72) !important;
}
.nyYjTG_fileIcon {
  background: rgba(147, 197, 253, 0.14) !important;
  border-color: rgba(147, 197, 253, 0.28) !important;
}
.bhn1Oq_searchInput {
  color: #F8FAFC !important;
}
/* Document preview panel body: same glass treatment. */
.Ku8BfW_body {
  background: rgba(15, 23, 42, 0.88) !important;
  border-radius: 14px !important;
}
.cm-gutters {
  background: rgba(15, 23, 42, 0.6) !important;
  border-right: 1px solid rgba(147, 197, 253, 0.18) !important;
  color: rgba(148, 163, 184, 0.85) !important;
}


/* ── Main-area pages (plugins / schedule / settings …): dark glass base.
 * Only when the conversation view is NOT mounted — the chat screen keeps
 * its bright wallpaper. One rule covers every non-conversation page. ── */
.pI_x6G_centerCol:not(:has(.wSkVaW_root)) {
  background: rgba(10, 16, 30, 0.86) !important;
}
/* Schedule (自动化任务) panel: same glass, belt-and-braces. */
.ovHEHG_panel {
  background: rgba(15, 23, 42, 0.9) !important;
  border-radius: 14px !important;
}

/* ── Live wallpaper engine (html[data-kimino-live]) ──────────────────
 * The video rides a fixed layer at z-index:-2 under the body::before
 * blur; body's own background collapses to the scrim gradient so the
 * film shows through exactly like the static jpg does. */
html[data-kimino-live] body,
html[data-kimino-live] body[data-ds-dark-theme] {
  background-image: linear-gradient(180deg, rgba(4,7,18,0.12) 0%, rgba(8,11,28,0.06) 45%, rgba(14,8,26,0.10) 100%) !important;
  background-size: cover !important;
}

/* ── Live wallpaper toggle ────────────────────────────────────────────
 * Sized/styled to match the official uV2eYG_add tool button (28x28
 * pill, token-tinted); pressed state = comet blue. */
button[data-kimino-toggle] {
  width: 28px !important;
  height: 28px !important;
  padding: 0 !important;
  border: none !important;
  border-radius: 999px !important;
  flex: none !important;
  display: inline-grid !important;
  place-items: center !important;
  background: rgba(255, 255, 255, 0.1) !important;
  color: #98b6fc !important;
  cursor: pointer !important;
}
button[data-kimino-toggle]:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}
button[data-kimino-toggle][aria-pressed="true"] {
  background: rgba(147, 197, 253, 0.22) !important;
  color: #93C5FD !important;
  box-shadow: inset 0 0 0 1px rgba(147, 197, 253, 0.45) !important;
}

/* ── kimino 控制中心面板 ─────────────────────────────────────────────
 * 弹层语言与主题其他浮层一致（slate 0.94 + 彗星蓝描边 + 边缘高光）；
 * position:fixed 由 JS 按按钮位置定位（body 级，规避卡内 containing block）。 */
[data-kimino-panel] {
  position: fixed;
  z-index: 1200;
  width: 268px;
  display: none;
  flex-direction: column;
  gap: 10px;
  padding: 12px 14px;
  background: rgba(15, 23, 42, 0.94);
  border: 1px solid rgba(147, 197, 253, 0.35);
  border-radius: 12px;
  backdrop-filter: blur(16px) saturate(130%);
  -webkit-backdrop-filter: blur(16px) saturate(130%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 10px 30px rgba(0, 0, 0, 0.4);
  color: #e2e8f0;
  font-size: 12px;
}
[data-kimino-panel][data-open] { display: flex; }
.kimino-cc-head {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #93C5FD;
  padding-bottom: 2px;
}
.kimino-cc-row { display: flex; align-items: center; gap: 10px; }
.kimino-cc-row > span:first-child { flex: none; color: #cbd5e1; }
.kimino-cc-val {
  flex: none;
  min-width: 38px;
  text-align: right;
  color: #94A3B8;
  font-variant-numeric: tabular-nums;
}
.kimino-cc-sep {
  height: 1px;
  background: rgba(147, 197, 253, 0.18);
  margin: 2px 0;
}
.kimino-cc-toggle {
  position: relative;
  margin-left: auto;
  width: 34px;
  height: 18px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  cursor: pointer;
  transition: background 0.15s ease;
  padding: 0;
}
.kimino-cc-toggle::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: #cbd5e1;
  transition: left 0.15s ease, background 0.15s ease;
}
.kimino-cc-toggle[aria-pressed="true"] { background: rgba(147, 197, 253, 0.5); }
.kimino-cc-toggle[aria-pressed="true"]::after { left: 18px; background: #ffffff; }
[data-kimino-panel] input[type="range"] {
  flex: 1;
  appearance: none;
  -webkit-appearance: none;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  accent-color: #93C5FD;
  cursor: pointer;
}
[data-kimino-panel] input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #93C5FD;
  box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.22);
}
[data-kimino-panel] input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 999px;
  background: #93C5FD;
}
.kimino-cc-foot { display: flex; justify-content: flex-end; }
.kimino-cc-reset {
  border: 1px solid rgba(147, 197, 253, 0.35);
  background: rgba(147, 197, 253, 0.12);
  color: #BFDBFE;
  border-radius: 999px;
  padding: 3px 12px;
  font-size: 11px;
  cursor: pointer;
}
.kimino-cc-reset:hover { background: rgba(147, 197, 253, 0.22); }

/* ── 自绘「回到底部」按钮 ─────────────────────────────────────────────
 * 视觉沿用 v68 回底圆钮语言（藏蓝玻璃 + 彗星蓝描边 + 边缘高光）；
 * 底部避让输入席位（--dsh-composer-height）。 */
[data-kimino-tobottom] {
  position: fixed;
  right: 28px;
  bottom: calc(var(--dsh-composer-height, 160px) + 20px);
  z-index: 90;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid rgba(147, 197, 253, 0.5);
  background: rgba(37, 58, 125, 0.9);
  backdrop-filter: blur(12px) saturate(130%);
  -webkit-backdrop-filter: blur(12px) saturate(130%);
  color: #DBEAFE;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 6px 18px rgba(0, 0, 0, 0.3);
}
[data-kimino-tobottom][data-show] { display: flex; }
[data-kimino-tobottom]:hover { background: rgba(58, 84, 158, 0.95); }
`;
      document.head.append(styleEl);
      ctx.effect(() => () => styleEl.remove());
    };

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  },
});
