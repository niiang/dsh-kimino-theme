# DSH Kimi no Na wa Theme

《你的名字。》主题皮肤，用于 DeepSeek Harness (DSH) Web GUI。

![Hero 大屏](docs/screenshots/hero-screen.png)

## 一句话安装（推荐）

把下面整段复制粘贴给 DSH 会话中的 Agent，它会完成克隆、路径改写、插件定义与激活：

```text
请为我安装 DSH 主题插件 dsh-kimino-theme：
1. 将 https://github.com/niiang/dsh-kimino-theme 克隆到用户主目录下的
   ~/.dsh/themes/dsh-kimino-theme（目录不存在则创建；已存在则先 git pull）。
2. 读取克隆中的 plugin/host.js 与 plugin/client.js。
3. 将 host.js 顶部的 bgFile / logoFile / letterFile 三个常量改写为该克隆
   assets/ 目录下对应文件的绝对路径，不得保留仓库中的示例路径。
4. 以这两段代码为 code.host / code.client 调用 cordis_define
   （新插件，idPrefix 用 "kimino"），随后 cordis_run 激活。
5. 完成后提醒我 Ctrl+F5 强制刷新浏览器。
```

素材直接取自克隆目录，无需复制到其他位置；主题更新后重跑上面这段即可同步。

## 手动安装

```bash
git clone https://github.com/niiang/dsh-kimino-theme ~/.dsh/themes/dsh-kimino-theme
```

1. 打开 `plugin/host.js`，把顶部三个常量改成本机克隆目录中 `assets/` 下对应文件的绝对路径：

   ```js
   const bgFile = 'C:\\Users\\<你>\\.dsh\\themes\\dsh-kimino-theme\\assets\\current.jpg';
   const logoFile = 'C:\\Users\\<你>\\.dsh\\themes\\dsh-kimino-theme\\assets\\logo\\your-name-movie-logo-blue.svg';
   const letterFile = 'C:\\Users\\<你>\\.dsh\\themes\\dsh-kimino-theme\\assets\\logo\\logo-letter.svg';
   ```

2. 在 DSH 会话中调用 `cordis_define`：`code.host` 为 `plugin/host.js` 的内容，`code.client` 为 `plugin/client.js` 的内容（新插件，idPrefix 用 `"kimino"`）。
3. `cordis_run` 激活（首次 `mode: "run"`，之后 `mode: "update"`）。
4. 浏览器 **Ctrl + F5** 强制刷新。

## 使用

安装后自动生效，无需操作。换壁纸：直接替换克隆中的 `assets/current.jpg` 并强刷浏览器即可，无需重新定义插件。

## 更新 / 暂停 / 卸载

| 操作 | 命令 |
| --- | --- |
| 更新 | 克隆目录 `git pull` → 重新 `cordis_define` → `cordis_run mode:"update"` |
| 暂停 | `cordis_stop <pluginId>` |
| 卸载 | `cordis_undefine <pluginId>` |

## 故障排查

| 现象 | 处理 |
| --- | --- |
| 背景图 / Logo 404 | `host.js` 路径未改写为本机绝对路径，或克隆目录被移动/删除；修正路径后重新 define |
| 改了代码没生效 | 必须重新 `cordis_define` + `cordis_run update`，并 Ctrl+F5 |
| DSH 重启后主题消失 | 动态插件是进程级的，重新 `cordis_run` 即可；想开机自动生效需把插件写入 host composition（`~/.dsh/profiles/web/cordis.patch.yml`）并重启 DSH |
| DSH 升级后样式错乱 | 插件依赖构建期 hash 类名（`.hHd-Xa_*`、`.uV2eYG_*` 等），需对照新版源码更新选择器 |
