# FlClash.js

一个给 FlClash / Mihomo 用的 **JS 覆写脚本**，把机场订阅一键改造成分组清晰、分流完善、自动测速的配置。

> 适用客户端：FlClash、Clash Verge Rev、Mihomo Party 等基于 mihomo 内核、支持 JS 覆写的客户端。

## 快速开始

在客户端的「覆写 / 脚本」处，填入下面的 URL：

```
https://raw.githubusercontent.com/lishiyaa0/FlClashjs/main/FlClash.js
```

> 国内网络可加镜像前缀：`https://gh-proxy.com/` + 上面的地址。

导入后重新加载配置即可，首次启动会自动下载规则集。

## 内核要求

本脚本使用了较新的内核对特性，**需要 mihomo 内核 ≥ 1.19**：

- `empty-fallback`（空组兜底）
- `hidden`（隐藏策略组）
- `expected-status`（测速期望状态码）
- `AND / OR / NOT` 逻辑规则
- sniffer 的 `parse-pure-ip`、`force-dns-mapping`
- `fake-ip-filter` 里的 `rule-set:` 引用

旧内核会直接加载失败，请先将客户端内核升级到最新版。

## 功能

### 策略组（29 个）

- **兜底**：所有未匹配流量的出口
- **全部节点 / 自动选择**：全量节点与全局自动测速
- **19 个服务组**：Google、Telegram、Github、ChatGPT、Claude、Gemini、Emby、Twitter、YouTube、NETFLIX、Spotify、抖音、TikTok、国际游戏、微软服务、苹果服务、Discord 等
- **9 个地区自动测速组**（隐藏，旗帜 + 代码命名）：🇺🇸 US、🇭🇰 HK、🇹🇼 TW、🇸🇬 SG、🇯🇵 JP、🇰🇷 KR、🇬🇧 UK、🇩🇪 DE、🌍 Others

### 分流规则（40 条，规则集 37 个）

- **广告拦截**、内网直连、时间同步（UDP 123）直连
- **AI 服务**：ChatGPT / Claude / Gemini 独立分组
- **流媒体**：YouTube / Netflix / Spotify
- **国内域名与 IP 直连**、国外域名走代理、最终兜底

规则集来源：

| 来源 | 说明 | 更新周期 |
|---|---|---|
| bgpeer/rules | 服务、广告、直连、国内外规则 | 24 小时 |
| MetaCubeX/meta-rules-dat | YouTube、Spotify | 24 小时 |
| fancha0/Proxy-rules | 个人维护的直连/AI/Emby/游戏等 | **1 小时** |

### 网络层（继承自 kanwox Clash_rule.js 的思路）

- **DNS 完整处理**：fake-ip、国内直连走国内 DNS、海外走 DoH、广告域名直接拒绝解析
- **sniffer**：纯 IP 流量也能还原域名参与分流
- **节点指纹补全**：自动补 `client-fingerprint: chrome`、`ip-version: dual`

## 图标

策略组图标来自自建的图标库：

```
https://github.com/lishiyaa0/FlClash-icons
```

含 3000+ 图标（Qure / 离歌 / Oasisic AI / mihomo-icons 等），详见该仓库的 `icons.json` 索引。

## 更新机制

- **规则集**：按各自 `interval` 自动更新，无需手动操作
- **脚本本身**：改动后需要你在客户端重新应用一次覆写

## 常见问题

**加载失败 / 报错？**
先检查内核版本是否 ≥ 1.19。

**规则集下载失败？**
本脚本的规则集与 DNS 均通过代理出站，首次启动时需先在客户端有一个可用节点；也可把所有 URL 前缀 `https://gh-proxy.com/` 去掉尝试直连。

**想固定某个服务走固定地区？**
进入对应服务组，选择 🇺🇸 US / 🇭🇰 HK 等地区组，或从「全部节点」手动指定。

## 致谢

- 分流结构、DNS / sniffer / 指纹方案参考 [kanwox/Clash-Rule](https://github.com/kanwox/Clash-Rule)
- 规则集来自 [bgpeer/rules](https://github.com/bgpeer/rules)、[MetaCubeX/meta-rules-dat](https://github.com/MetaCubeX/meta-rules-dat)
- 图标来自 [Koolson/Qure](https://github.com/Koolson/Qure)、[Hawaiine/Oasisic-Icons](https://github.com/Hawaiine/Oasisic-Icons)、[lige47/QuanX-icon-rule](https://github.com/lige47/QuanX-icon-rule) 等

仅供个人学习与配置使用。