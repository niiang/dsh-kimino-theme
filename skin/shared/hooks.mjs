/**
 * kimino skin — behavioral hooks (SkinHooks contract v1alpha1).
 *
 * Delivers the parts a declarative skin cannot: themed placeholder copy
 * (Japanese film lines, language-aware), the chat-scroll companions for the
 * L3 viewport rework, and the composer/popup wheel isolation. Logos and the
 * wallpaper live entirely in the manifest/patches (relative asset URLs), so
 * they work even where hooks are refused (manual installs without
 * provenance) — only the enhancements below need this file.
 *
 * Contract constraints honored: default-exported factory, no top-level side
 * effects, no module-level mutable state, cleanup idempotent.
 */

export default function defineSkinHooks() {
  return {
    apply(ctx) {
      const { onCleanup } = ctx;

      // 1) Themed placeholder copy, language-aware. Film lines stay in
      //    Japanese; the Chinese UI keeps its Chinese rendition.
      const replacements = {
        '给智能体发消息': '黄昏之时，我在这里等你。',
        'Message the agent': '黄昏の時、私はここにいるよ。',
        '描述你想要构建的内容': '君の名は。想构建怎样的世界？',
        'Describe what you want to build': '君の名は。どんな世界を構築する？',
      };
      const walk = () => {
        document.querySelectorAll('textarea').forEach((ta) => {
          const cur = ta.placeholder;
          if (cur && replacements[cur] !== undefined && ta.placeholder !== replacements[cur]) {
            ta.placeholder = replacements[cur];
          }
        });
      };
      walk();
      const placeholderObserver = new MutationObserver(walk);
      placeholderObserver.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['placeholder'] });
      onCleanup(() => placeholderObserver.disconnect());

      // 2) Chat scroll companions for the L3 viewport rework: mark the pure
      //    message scroller so the component's scrollerOf() resolves inward.
      const markChatScrollers = () => {
        document.querySelectorAll('.Md3f7G_scroll:not([data-conversation-scroll])').forEach((el) => {
          el.setAttribute('data-conversation-scroll', '');
        });
      };
      markChatScrollers();
      const chatScrollerObserver = new MutationObserver(markChatScrollers);
      chatScrollerObserver.observe(document.body, { subtree: true, childList: true });
      onCleanup(() => {
        chatScrollerObserver.disconnect();
        document.querySelectorAll('.Md3f7G_scroll[data-conversation-scroll]').forEach((el) => {
          el.removeAttribute('data-conversation-scroll');
        });
      });

      // 3) Scroll-event relay: the component anchors its scroll listener at
      //    mount time; relay inner scrolls to the outer body so the
      //    "scroll to bottom" button state stays correct.
      const relayChatScroll = (event) => {
        const inner = event.target;
        if (!(inner instanceof Element)) return;
        if (!inner.classList.contains('Md3f7G_scroll')) return;
        const outer = inner.closest('.wSkVaW_scrollBody');
        if (outer instanceof HTMLElement) outer.dispatchEvent(new Event('scroll'));
      };
      document.addEventListener('scroll', relayChatScroll, true);
      onCleanup(() => document.removeEventListener('scroll', relayChatScroll, true));

      // 4) Wheel guards: composer focus isolation + card-chrome forwarding +
      //    in-card popover ownership (model menu scrolls itself, never the
      //    chat behind it).
      const composerWheel = (event) => {
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
      document.addEventListener('wheel', composerWheel, { capture: true, passive: false });
      document.addEventListener('wheel', cardChromeWheel, { capture: true, passive: false });
      onCleanup(() => {
        document.removeEventListener('wheel', composerWheel, { capture: true });
        document.removeEventListener('wheel', cardChromeWheel, { capture: true });
      });
    },
  };
}
