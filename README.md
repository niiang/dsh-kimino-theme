# dsh-kimino-theme · Kimi no Na wa Theme

中文 | [English](README.en.md)

<p align="center">
  <img src="assets/logo/your-name-movie-logo-blue.svg" alt="Kimi no Na wa" width="460">
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/niiang/dsh-kimino-theme?style=flat-square" alt="License">
  &nbsp;
  <img src="https://img.shields.io/github/v/tag/niiang/dsh-kimino-theme?style=flat-square" alt="Version">
  &nbsp;
  <img src="https://img.shields.io/github/stars/niiang/dsh-kimino-theme?style=flat-square" alt="Stars">
  &nbsp;
  <a href="https://awesome-dsh-plugin.com"><img src="https://awesome-dsh-plugin.com/badge.svg" alt="Awesome DSH Plugin" style="vertical-align: top;"></a>
</p>

<p align="center">
  <strong>《你的名字。》(Kimi no Na wa) 主题，为 DeepSeek Harness (DSH) Web GUI 而作</strong><br>
  <em>彗星蓝玻璃拟态 · 电影壁纸 · Logo 替换 · 输入卡重绘 · 统一滚动条 · 一条命令安装</em>
</p>

<div align="center">

[是什么](#是什么) · [主题细节](#主题细节) · [快速开始](#快速开始) · [自定义](#自定义) · [常见问题](#常见问题) · [已知限制](#已知限制) · [许可证](#许可证与素材版权)

</div>

## 是什么

dsh-kimino-theme 把 DSH Web GUI 变成新海诚《你的名字。》的模样：一张电影壁纸垫底，全部界面表面换成半透明毛玻璃，交互色统一为彗星蓝（`#93C5FD`），侧边栏品牌与首页标题替换为电影 Logo，输入卡重绘为藏蓝玻璃胶囊，占位文案换成「黄昏之时，我在这里等你。」。

它是一个标准的 dsh 插件包：一条 `dsh plugin` 命令装进 profile，随 DSH 启动常驻，不修改任何 DSH 源码；卸载后页面完全还原。

| 维度 | 原生 dsh web | dsh-kimino-theme |
| --- | --- | --- |
| 背景 | 纯色 / 纯色渐变 | 电影壁纸 + 全局模糊遮罩 |
| 界面表面 | 不透明分层 | 半透明毛玻璃（backdrop-filter） |
| 品牌标识 | DSH 默认 | 电影 Logo（展开态 + 折叠态） |
| 输入卡 | 默认样式 | 藏蓝玻璃卡片，占位文案主题化 |
| 滚动条 | 默认 | 全局蓝紫玻璃细滚动条 |
| 消息列底部 | 直切 | 40px 渐变淡出蒙版 |
| 安装 | — | `dsh plugin --profile web add ...` 一条命令 |
| 还原 | — | 卸载即完全还原 |

<p align="center">
  <img src="docs/screenshots/home-hero.png" alt="主页：居中大尺寸电影 Logo" width="760">
</p>

## 主题细节

### 彗星蓝玻璃拟态

主题通过官方 `theme.overrideTokens` API 叠加一层约 60 项的 design token 覆盖：背景层全部半透明化（露出壁纸）、边框换成低饱和蓝描边、交互态（悬停/激活/选中）统一为彗星蓝系、状态色（错误/成功/警告）微调至与深色玻璃协调。亮色与暗色模式共用同一套视觉——壁纸底上的玻璃拟态本身不区分明暗。完整 token 清单见 [docs/theme-tokens.md](docs/theme-tokens.md)。

### 壁纸与 Logo

- 壁纸由插件宿主半区以 `/kimino-bg/current.jpg` 路由提供（包内 `assets/current.jpg`），叠加一层轻微的深色渐变保证文字可读性；
- 侧边栏展开态显示横向电影 Logo，折叠态显示字母标记（两个 SVG，同样由插件路由提供）；
- 首页（hero）标题替换为居中大尺寸 Logo。

<p align="center">
  <img src="docs/screenshots/sidebar.png" alt="侧边栏：展开态的电影品牌标识" width="123">
  <img src="docs/screenshots/chat-main.png" alt="主界面：壁纸上的玻璃拟态会话视图" width="676">
</p>

### 输入卡与占位文案

输入卡重绘为藏蓝玻璃胶囊，占位文案按界面语言自动替换：

| 界面语言 | 输入框 | 新会话描述 |
| --- | --- | --- |
| 中文 | `黄昏之时，我在这里等你。` | `君の名は。想构建怎样的世界？` |
| 英文 | `黄昏の時、私はここにいるよ。` | `君の名は。どんな世界を構築する？` |

### 消息滚动与渐变蒙版

消息列底部 40px 平滑淡出，输入框零裁切；修复了「回到底部」按钮不出现的问题。

### 统一滚动条

全局滚动条统一为蓝紫玻璃风格，适配主流浏览器。

## 快速开始

> **浏览器建议**：主题大量使用 backdrop-filter 毛玻璃、滚动条定制与 CSS 蒙版，推荐使用 **Microsoft Edge** 或 **Google Chrome**；Firefox 下部分显示效果不兼容（滚动条、渐变蒙版等可能打折）。

### 系统要求

- 已安装 DeepSeek Harness，`dsh web` 可正常启动；
- 机器上有 pnpm（`dsh plugin` 内部使用；Node.js 自带的 corepack 可提供）。

### 安装

```sh
dsh plugin --profile web add dsh-kimino-theme
dsh web   # 重启 DSH 生效
```

也可以直接从 GitHub 安装：

```sh
dsh plugin --profile web add github:niiang/dsh-kimino-theme
```

壁纸出现、侧边栏 Logo 变化，即安装成功。安装后随 DSH 启动常驻，无需每次重装。

### 更新

```sh
dsh plugin --profile web update dsh-kimino-theme
dsh web   # 重启生效
```

### 暂时关闭（不卸载）

编辑 `~/.dsh/profiles/web/package.json`，删掉 `dsh.profile.bundles` 数组中的 `"dsh-kimino-theme"` 一行，重启 `dsh web` 即关闭；加回该行再重启即恢复。长期不用请直接卸载。

### 卸载

```sh
dsh plugin --profile web remove dsh-kimino-theme
dsh web   # 重启后页面完全还原
```

### 皮肤中心方式（可选）

若使用 dsh-web-ui 的皮肤中心（skin-center），可改以皮肤包形式安装：把仓库 `skin/kimino/` 整个目录拷到 `~/.dsh/skins/kimino/`，刷新页面即出现在「设置 → 皮肤中心」，支持试穿 / 一键切换 / 互斥管理。

> 说明：手工投放的皮肤因皮肤中心的溯源安全门不带 `hooks.mjs` 行为增强（占位文案、滚动优化）——壁纸、配色、Logo、玻璃样式等视觉完整；经 dsh-market 安装则功能全量。与插件安装方式二选一。

## 自定义

需本地克隆并改用 `link:` 安装：

```sh
git clone https://github.com/niiang/dsh-kimino-theme <你的目录>
dsh plugin --profile web add link:<你的目录的绝对路径>
dsh web
```

### 换壁纸

替换克隆目录中的 `assets/current.jpg`（保持文件名不变），浏览器强刷（Ctrl+F5）即可。

### 换 Logo

替换 `assets/logo/` 下的两个 SVG，强刷生效。

### 调色

颜色集中在 `bundle/client.js`：token 覆盖与组件样式两处，改完重启 `dsh web` 并强刷。速查表见 [docs/theme-tokens.md](docs/theme-tokens.md)。

## 架构

主题是一个标准的 dsh 插件包（bundle）：`package.json` 声明 `dsh.bundle` 与 `dsh.client`，`dsh plugin add` 装进 profile 并挂上插件行——不修改 DSH 源码。

```
bundle/host.js       # 插件宿主半区（Node）：3 个资产路由 /kimino-bg/*（路径相对包内解析，装哪都能用）
bundle/client.js     # 插件浏览器半区：token 覆盖 + 组件样式 + DOM 补丁
cordis.patch.yml     # 插件行清单：dsh plugin add 挂载的入口
assets/              # 壁纸与 Logo
plugin/              # 会话内动态注入用的同源闭包源码（高级用法，一般无需关心）
skin/kimino/         # 皮肤中心（skin-center）皮肤包：skin.json v2 + skin.css + patches.css + hooks.mjs
```

所有副作用（token 层、样式标签、事件监听、DOM 属性、路由）都注册在插件 fiber 上，禁用/卸载即完全还原。

## 常见问题

<details>
<summary><strong>装完重启了，页面没变化？</strong></summary>

A: 确认命令里带 `--profile web`（装进了正确的 profile）；浏览器 Ctrl+F5 强刷一次；仍不行时看 `dsh web` 启动日志有没有 `[kimino-theme] host half active` 与安装时的警告信息。

</details>

<details>
<summary><strong>安装时警告 declares no dsh.bundle？</strong></summary>

A: 说明装到的版本不含静态安装声明（v65 之前的旧 tag）。确认仓库地址为 `github:niiang/dsh-kimino-theme`（不带 `#版本号` 时默认装最新 main），按「安装」小节的命令重装。

</details>

<details>
<summary><strong>背景图 / Logo 404？</strong></summary>

A: 静态安装的资产路径相对包内解析，正常不会发生。多为 profile 的 node_modules 被手动清理或链接损坏所致：重新执行一次安装命令即可修复。

</details>

<details>
<summary><strong>DSH 升级后样式错乱 / 某些部分没生效？</strong></summary>

A: 主题依赖少量构建期哈希类名（如 `.Md3f7G_*`、`.wSkVaW_*`、`.hHd-Xa_*`，涉及消息滚动、侧边栏品牌、输入卡高亮），DSH 前端升级后哈希可能变化。token 层与大多数样式（基于稳定 data 属性）不受影响；受影响的选择器需对照新版类名更新。欢迎提 issue 附截图。

</details>

<details>
<summary><strong>亮色模式下文字看不清？</strong></summary>

A: 主题按「壁纸上的深色玻璃」设计，亮/暗模式共用同一套视觉。若在亮色模式下觉得整体偏暗，属预期行为；可自行调亮 token 中的玻璃底色（见「自定义 - 调色」）。

</details>

<details>
<summary><strong>和其他皮肤/主题插件能共存吗？</strong></summary>

A: token 层是叠加式的，但视觉上会互相覆盖。建议同一时间只启用一个主题类插件。

</details>

## 已知限制

- 主题的毛玻璃、滚动条与渐变蒙版按 Chromium 内核（Edge / Chrome）打磨，Firefox 下部分显示效果不兼容，推荐使用 Edge 或 Chrome。
- 消息滚动重构、侧边栏 Logo 替换、输入卡高亮等处的选择器依赖 DSH 前端构建期哈希类名，DSH 大版本升级后可能需要跟随更新（见常见问题）。
- 主题强制深色玻璃视觉，亮色模式不做单独适配（见常见问题）。
- 壁纸与 Logo 路由缓存 1 小时，替换素材后需强刷浏览器。

## 许可证与素材版权

代码以 [MIT](LICENSE) 授权。

`assets/` 中的壁纸与 Logo 素材源自电影《你的名字。》（君の名は。, Kimi no Na wa, 2016）的宣传物料，版权归 CoMix Wave Films、东宝等原权利方所有。本仓库仅作个人桌面美化之用，不主张任何素材版权，也不从中获利；如权利方提出异议，将立即移除相关素材。

## 参与贡献

- 提交信息遵循 Conventional Commits（如 `feat(client): 修复 xxx`），代码、文档与提交信息不使用 emoji；
- 用户可见的变更请在 PR 中附截图或验证证据；
- 改动主题 token 时同步更新 [docs/theme-tokens.md](docs/theme-tokens.md)。

<div align="center">

**喜欢这个主题？点个 Star。**

[报告问题](https://github.com/niiang/dsh-kimino-theme/issues) · [功能建议](https://github.com/niiang/dsh-kimino-theme/issues)

</div>
