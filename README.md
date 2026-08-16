# DSH Kimi no Na wa Theme

《你的名字。》主题皮肤，用于 DeepSeek Harness (DSH) Web GUI。

![Hero 大屏](docs/screenshots/hero-screen.png)

## 环境要求

- DSH Web GUI 正在运行（默认 `http://127.0.0.1:3080`）
- 一个已打开的 DSH 会话（能调用 `cordis_define` / `cordis_run` 工具）

## 安装步骤

### 1. 放置素材文件

把仓库中 `assets/` 整个目录复制到本机任意位置，例如：

```
C:\Users\<你>\Documents\kimi-no-na-wa-wallpapers\
├── current.jpg                        # 背景壁纸
└── logo\
    ├── your-name-movie-logo-blue.svg  # 标题 Logo
    └── logo-letter.svg                # 折叠态单字 Logo
```

### 2. 修改 host.js 中的路径

打开 `plugin/host.js`，把顶部三个文件路径改成你上一步的实际位置：

```js
const bgFile = 'C:\\Users\\<你>\\Documents\\kimi-no-na-wa-wallpapers\\current.jpg';
const logoFile = 'C:\\Users\\<你>\\...\\your-name-movie-logo-blue.svg';
const letterFile = 'C:\\Users\\<你>\\...\\logo-letter.svg';
```

### 3. 在 DSH 会话中定义插件

对 DSH 的 AI 说：

> 帮我安装一个主题插件：读取 `plugin/host.js` 和 `plugin/client.js` 的内容，作为 `code.host` 和 `code.client` 调用 `cordis_define`，pluginId 用 `kimino-6`，然后 `cordis_run` 激活。

或者你自己在会话中调用 `cordis_define`：

| 参数 | 值 |
| --- | --- |
| `plugin` | `{ kind: "existing", pluginId: "kimino-6" }` |
| `code.host` | `plugin/host.js` 文件内容 |
| `code.client` | `plugin/client.js` 文件内容 |
| `name` | `Kimi no Na wa Theme` |

### 4. 激活并刷新

- `cordis_run`（首次 `mode: "run"`，之后更新用 `mode: "update"`）
- 浏览器 **Ctrl + F5** 强制刷新

完成。主题生效。

## 使用

安装后无需任何操作，主题自动作用于整个界面：

| 区域 | 效果 |
| --- | --- |
| 背景 | 壁纸 + 暗化渐变 + 毛玻璃 |
| 输入框 | 彗星蓝毛玻璃，文字纯白，placeholder 为「黄昏之时，我在这里等你。」 |
| 下拉菜单（权限/模型/供应商） | 彗星蓝 |
| 底部统计栏 | 暗夜暮色胶囊 |
| 侧边栏 / Hero 屏 | 电影标题 Logo |

## 更新 / 卸载

```text
更新：改 plugin/*.js → 重新 cordis_define → cordis_run mode:"update"
暂停：cordis_stop kimino-6
删除：cordis_undefine kimino-6
```

## 更新日志

| 版本 | 变更 |
| --- | --- |
| v59 | 修复输入框光标（竖线）与文字重叠：移除仅作用于输入镜像层的 `padding-right: 28px` 差异化规则，并统一 composer 内 textarea / mirror / backdrop 各文字层的 `font-weight` / `letter-spacing` / `font-variant-ligatures`，使光标与可见文字度量严格一致 |
| v58 | 输入框毛玻璃卡片、placeholder 配色等细化 |
| v57 | 输入框滚动条隐藏修复 |
| v56 | 首个公开版本：彗星蓝主题、壁纸、电影标题 Logo、placeholder 文案 |

## 故障排查

| 现象 | 处理 |
| --- | --- |
| 背景图 / Logo 404 | `host.js` 路径与素材实际位置不一致，改路径后重新 define |
| 改了代码没生效 | 必须重新 `cordis_define` + `cordis_run update`，并 Ctrl+F5 |
| DSH 重启后主题消失 | 动态插件是进程级的，重新 `cordis_run` 即可；想开机自动生效需把插件写入 host composition（`~/.dsh/profiles/web/cordis.patch.yml`）并重启 DSH |
| DSH 升级后样式错乱 | 插件依赖构建期 hash 类名（`.hHd-Xa_*`、`.uV2eYG_*` 等），需对照新版源码更新选择器 |
