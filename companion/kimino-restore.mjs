// Kimi no Na wa theme — auto-restore companion (optional).
// A static profile plugin: on every DSH start it re-defines and activates
// the theme as a DYNAMIC plugin (via dynamicCordisRunner), reading the
// latest source straight from your clone. Keeps the theme available across
// DSH restarts with zero manual steps.
//
// SETUP (see README "开机自恢复 / Auto-restore"):
//   1. copy this file into your profile directory (e.g. ~/.dsh/profiles/web/);
//   2. rewrite THEME_DIR below to your clone's absolute path;
//   3. add an insert row to that profile's cordis.patch.yml; restart dsh web.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const THEME_DIR = '<CLONE_DIR>';
const NAME = 'Kimi no Na wa Theme';
const PURPOSE = 'Kimi no Na wa 主题：自动恢复（从克隆目录读取最新源码重建动态插件）';

export default {
  inject: ['dynamicCordisRunner'],
  apply(ctx) {
    const runner = ctx.get('dynamicCordisRunner');
    if (runner === undefined) return;
    console.log('[kimino-restore] companion active');
    const escaped = THEME_DIR.replaceAll('\\', '\\\\');
    const hostCode = readFileSync(join(THEME_DIR, 'plugin', 'host.js'), 'utf8').replaceAll('<CLONE_DIR>', escaped);
    const clientCode = readFileSync(join(THEME_DIR, 'plugin', 'client.js'), 'utf8');
    let restoring = false;
    const ensureTheme = async (agent) => {
      if (restoring) return;
      restoring = true;
      try {
        const existing = runner.listPlugins(agent);
        if (existing.some((p) => p.name === NAME)) return;
        const receipt = runner.define({
          sessionId: agent.id,
          plugin: { kind: 'new', idPrefix: 'kimino' },
          name: NAME,
          purpose: PURPOSE,
          code: { host: hostCode, client: clientCode },
        });
        await runner.runHostHalf(agent, receipt.pluginId, receipt.packageId, 'run', null, false);
        console.log(`[kimino-auto] theme restored for session ${agent.id}: ${receipt.pluginId}/${receipt.packageId}`);
      } catch (error) {
        console.error('[kimino-auto] restore failed:', error?.message ?? String(error));
      } finally {
        restoring = false;
      }
    };
    ctx.on('agent/created', ({ agent }) => {
      if (agent?.id === undefined) return;
      Promise.resolve(ensureTheme(agent)).catch(() => {});
    });
    // Boot-time sweep: agents that already exist (e.g. sessions resumed
    // before this plugin's inject gate released) never fired agent/created
    // for us — restore for them too.
    const agentsSvc = ctx.get('agents');
    if (agentsSvc !== undefined) {
      for (const existing of agentsSvc.list()) {
        Promise.resolve(ensureTheme(existing)).catch(() => {});
      }
    }
  },
};
