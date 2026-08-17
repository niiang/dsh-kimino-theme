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

它是一个标准的 dsh 插件包（bundle）：通过官方 profile 机制挂载，不修改任何 DSH 源码；一条 `dsh plugin` 命令安装，重启即生效，停用/卸载后页面完全还原。

| 维度 | 原生 dsh web | dsh-kimino-theme |
| --- | --- | --- |
| 背景 | 纯色 / 纯色渐变 | 电影壁纸 + 全局模糊遮罩 |
| 界面表面 | 不透明分层 | 半透明毛玻璃（backdrop-filter） |
| 品牌标识 | DSH 默认 | 电影 Logo（展开态 + 折叠态） |
| 输入卡 | 默认样式 | 藏蓝玻璃卡片，占位文案主题化 |
| 滚动条 | 默认 | 全局蓝紫玻璃细滚动条 |
| 消息列底部 | 直切 | 40px 渐变淡出蒙版 |
| 安装 | — | `dsh plugin --profile web add github:niiang/dsh-kimino-theme` |
| 还原 | — | 停用/卸载即完全还原 |

![主界面：壁纸上的玻璃拟态会话视图](docs/screenshots/chat-main.png)

## 主题细节

### 彗星蓝玻璃拟态

主题通过官方 `theme.overrideTokens` API 叠加一层约 60 项的 design token 覆盖：背景层全部半透明化（露出壁纸）、边框换成低饱和蓝描边、交互态（悬停/激活/选中）统一为彗星蓝系、状态色（错误/成功/警告）微调至与深色玻璃协调。亮色与暗色模式共用同一套视觉——壁纸底上的玻璃拟态本身不区分明暗。完整 token 清单见 [docs/theme-tokens.md](docs/theme-tokens.md)。

### 壁纸与 Logo

- 壁纸由插件宿主半区以 `/kimino-bg/current.jpg` 路由提供（`assets/current.jpg`），叠加一层轻微的深色渐变保证文字可读性；
- 侧边栏展开态显示横向电影 Logo，折叠态显示字母标记（两个 SVG，同样由插件路由提供）；
- 首页（hero）标题替换为居中大尺寸 Logo。

![侧边栏：展开态的电影品牌标识](docs/screenshots/sidebar.png)

### 输入卡与占位文案

输入卡重绘为藏蓝（`rgba(37,58,125,*)`）玻璃胶囊：圆角 20px、20px 背景模糊、蓝色描边；会话统计栏变成居中的细胶囊。占位文案替换为：

- 输入框：`黄昏之时，我在这里等你。`
- 新会话描述：`君の名は。想构建怎样的世界？`

中英文界面均替换。

### 消息滚动与渐变蒙版

DSH 的会话滚动容器同时包含消息区和输入框（sticky 吸底），直接加蒙版会裁到输入框。主题把滚动视口下沉到纯消息容器：消息列最后 40px 平滑淡出、输入框零裁切；配套的滚动事件接力修复了「回到底部」按钮在内层滚动器下不出现的问题；输入卡聚焦时的滚轮隔离防止壁纸层跟着滚动。

### 统一滚动条

全局滚动条统一为蓝紫玻璃风格：10px 宽、圆角、半透明蓝拇指（悬停加深），同时适配 WebKit/Blink 与 Firefox 标准属性。

## 快速开始

### 系统要求

- 已安装 DeepSeek Harness，`dsh web` 可正常启动；
- 通过 GitHub 安装需要 pnpm（`dsh plugin` 内部使用）。

### 三步上手

```sh
# 1. 安装主题包
dsh plugin --profile web add github:niiang/dsh-kimino-theme

# 2. 重启 dsh web
dsh web

# 3. 浏览器打开（强刷一次 Ctrl+F5 清掉旧缓存）
```

壁纸出现、侧边栏 Logo 变化，即安装成功。

### 更新 / 停用 / 卸载

| 操作 | 命令 |
| --- | --- |
| 更新 | `dsh plugin --profile web update dsh-kimino-theme`，重启 `dsh web` |
| 停用 | `dsh plugin --profile web remove dsh-kimino-theme`，重启 `dsh web`（或临时在 profile 配置中禁用该行） |
| 换回原生 | 同「停用」；页面完全还原，无残留 |

### 从本地克隆安装（开发调试）

```sh
git clone https://github.com/niiang/dsh-kimino-theme.git
dsh plugin --profile web add link:<克隆目录的绝对路径>
dsh web
```

本包为纯 JavaScript（无构建步骤、无依赖），`link:` 安装即时可用；改完 `plugin/` 下的代码重启 `dsh web` 即可看到效果。

<details>
<summary><strong>备选：动态插件方式（不装包、不重启）</strong></summary>

<br>

不想往 profile 里装包时，也可以把本主题作为动态 Cordis 插件直接激活（进程级，DSH 重启后消失）：

1. 读取 `plugin/host.js` 与 `plugin/client.js` 的内容；
2. 在 DSH 会话里把它们作为 `code.host` / `code.client` 调用 `cordis_define`（新插件，idPrefix 用 `kimino`）；
3. `cordis_run` 激活，浏览器 Ctrl+F5。

对 Agent 说「按 dsh-kimino-theme 仓库 README 的动态插件方式安装我」即可完成上述步骤。

</details>

## 自定义

### 换壁纸

替换克隆目录中的 `assets/current.jpg`（保持文件名不变），浏览器强刷（Ctrl+F5）即可，无需重启或重装。任何 16:9 的高清图都合适；仓库默认壁纸约 5MB，路由缓存 1 小时。

### 换 Logo

替换 `assets/logo/your-name-movie-logo-blue.svg`（展开态，建议横向）与 `assets/logo/logo-letter.svg`（折叠态标记，建议方形），强刷生效。

### 调色

全部颜色集中在两处：token 覆盖在 `plugin/client.js` 的 `overrideTokens` 调用里，组件样式在同一个文件的样式表字符串里。改完重启 `dsh web`。`docs/theme-tokens.md` 有按用途分组的速查表。

## 架构

一个包，两个半区，一条插件行：

```
package.json            # dsh.bundle.patch 声明 + dsh.client 声明（官方 bundle 形态）
├── cordis.patch.yml    # 插件行：id kimino-theme / name dsh-kimino-theme
├── plugin/host.js      # 宿主半区（Node）：注册 3 个资产路由 /kimino-bg/*
├── plugin/client.js    # 浏览器半区：token 覆盖 + 组件样式 + DOM 补丁
└── assets/             # 壁纸与 Logo，路径相对包解析，克隆即用
```

`dsh plugin add` 把包装进 profile 并挂上插件行；宿主半区随 `dsh web` 进程启动，浏览器半区由客户端模块系统经 `/plugins/dsh-kimino-theme/client.js` 下发。所有副作用（token 层、样式元素、事件监听、DOM 属性、路由）都注册在插件 fiber 上，停用即全部回收。

## 常见问题

<details>
<summary><strong>装完重启了，页面没变化？</strong></summary>

A: 确认命令里带 `--profile web`（装进了正确的 profile）；浏览器 Ctrl+F5 强刷一次；仍不行时看 `dsh web` 启动日志里有没有 `[kimino-theme] host half active`。

</details>

<details>
<summary><strong>背景图 / Logo 404？</strong></summary>

A: 宿主半区按包内相对路径读 `assets/`，正常安装不会出现。若以动态插件方式安装且只激活了 client 半区（没有 host 半区的路由），壁纸与 Logo 会 404——按「备选：动态插件方式」把两个半区一起定义。

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

- 消息滚动重构、侧边栏 Logo 替换、输入卡高亮等处的选择器依赖 DSH 前端构建期哈希类名，DSH 大版本升级后可能需要跟随更新（见常见问题）。
- 主题强制深色玻璃视觉，亮色模式不做单独适配（见常见问题）。
- 壁纸与 Logo 路由缓存 1 小时，替换素材后需强刷浏览器。
- 动态插件方式（备选安装）是进程级的，DSH 重启后需重新激活；包安装方式无此问题。

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
