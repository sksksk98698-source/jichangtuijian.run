---
title: Clash Verge Rev 电脑端配置完全指南 (Windows/Mac新手教程)
description: 2026年最新Clash Verge Rev新手保姆级安装与使用教程：涵盖GitHub官方下载、机场订阅导入、系统代理开启与规则分流设置。
head:
  - - meta
    - name: keywords
      content: Clash Verge, Clash Verge Rev, Clash下载, Clash教程, 电脑科学上网, 订阅导入
---

<script setup>
import TopicCluster from '../.vitepress/theme/components/TopicCluster.vue';
</script>

# Clash Verge Rev 电脑端使用完全指南 (Windows / Mac)

**Clash Verge Rev** 是目前 Windows 与 macOS 平台上最主流、维护最活跃的跨平台代理客户端。它基于 Tauri 框架打造，界面优美且深度集成了 Mihomo (Clash Meta) 内核，全面支持 Shadowsocks、Trojan、Vless、Hysteria2 等新一代加密协议。

---

## 📥 步骤一：软件下载与安装

- **开源仓库**：建议前往 GitHub 官方 Release 页面下载最新版本。
- **Windows 用户**：
  - 64 位系统推荐下载：`Clash.Verge_x.x.x_x64-setup.exe`
- **macOS 苹果电脑用户**：
  - M 系列芯片 (M1/M2/M3/M4) 下载：`Clash.Verge_x.x.x_aarch64.dmg`
  - Intel 芯片老款 Mac 下载：`Clash.Verge_x.x.x_x64.dmg`

---

## 🔗 步骤二：导入机场订阅链接

1. 登录你的机场后台（例如 [飞猫云](/brands/feimaoyun) 或 [速鹰666](/brands/suying666)）；
2. 找到“便捷导入”区域，点击 **“复制 Clash 订阅链接”**；
3. 打开已安装的 Clash Verge Rev 软件，点击左侧菜单栏的 **“订阅 (Profiles)”**；
4. 将复制的订阅 URL 粘贴到顶部的输入框中，点击右侧的 **“导入 (Import)”** 按钮；
5. 导入成功后，选中该配置卡片使其处于高亮激活状态。

---

## 🚀 步骤三：选择节点与开启代理

1. 点击左侧菜单的 **“代理 (Proxies)”** 界面；
2. 建议模式选择 **“规则 (Rule)”** 模式（实现国内直连不耗流量、海外走代理）；
3. 在节点列表中展开并选择一个延迟较低的节点（如“香港专线”或“日本”）；
4. 点击左侧菜单的 **“设置 (Settings)”**，打开 **“系统代理 (System Proxy)”** 开关。

此时，打开浏览器访问 [Google](https://www.google.com) 或 [YouTube](https://www.youtube.com)，即可畅快上网！

---

## ⚠️ 常见使用注意事项

- **无法上网或浏览器报错**：检查系统时间是否精准同步，若电脑本地时间偏差超过 90 秒，TLS 加密握手将直接失败。
- **需要极佳稳定性的节点？**：建议搭配全 IEPL 内网专线机场使用，可参考 [2026 稳定机场推荐](/recommend/2026)。

<TopicCluster title="Clash Verge 完全指南" />
