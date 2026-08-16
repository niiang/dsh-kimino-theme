# DSH Kimi no Na wa Theme

《你的名字。》(Your Name / 君の名は。) 主题皮肤 —— DeepSeek Harness (DSH) Web GUI 动态 Cordis 插件。

## 功能

- 壁纸背景（3840×2160 电影场景，叠加暗化渐变 + 毛玻璃）
- 深空蓝/彗星蓝（`#93C5FD`）主题 token 体系
- 输入框：彗星蓝 `rgba(37,58,125,0.85)` + `#98b6fc` 内部元素
- 下拉菜单/权限选择/模型选择：彗星蓝 `rgba(37,58,125,0.94)`
- 底部统计胶囊：暗夜暮色 `rgba(20,20,38,0.75)`，紧贴文字
- 侧边栏 Logo + Hero 屏 Logo（标题 SVG）
- 折叠态侧栏单字 Logo（`logo-letter.svg`，viewBox 裁剪）
- 输入框 placeholder 改为原著台词「黄昏之时，我在这里等你。」

## 文件结构

```
├── plugin/
│   ├── host.js        # Host 半边（静态资源路由）
│   └── client.js      # Client 半边（token override + CSS + placeholder 补丁）
├── assets/
│   ├── current.jpg    # 背景壁纸
│   └── logo/
│       ├── your-name-movie-logo-blue.svg   # 标题 Logo（渐变版）
│       └── logo-letter.svg                 # 单字裁剪版
└── README.md
```

## 安装

DSH 的动态插件通过 `cordis_define` 定义。将 `plugin/host.js` 与 `plugin/client.js` 的内容作为 `code.host` / `code.client` 传入：

1. 在 DSH 会话中调用 `cordis_define`（`plugin.kind: "existing"`，`pluginId: "kimino-6"`），粘贴两份源码；
2. `cordis_run` 以 `update` 模式激活；
3. 浏览器 **Ctrl+F5** 强刷。

资源文件由 Host 半边通过 `webServer.register` 提供：
- `/kimino-bg/current.jpg`
- `/kimino-bg/logo-blue.svg`
- `/kimino-bg/logo-letter.svg`

Host 源码中的文件路径按本机实际路径调整（`assets/` 目录的绝对路径）。

## 版本历史

| 版本 | 说明 |
| --- | --- |
| v56 | 折叠态侧栏单字 Logo；下拉菜单彗星蓝；placeholder 原著台词 |
| v51 | 输入框彗星蓝（去紫） |
| v47–v50 | 统计胶囊紧贴文字 |
| v1+ | 基础主题（背景 + token + 毛玻璃 + Logo） |
