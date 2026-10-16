// 为所有策略组添加图标（Qure / bgpeer 图标库，经 gh-proxy 加速）。
// 规则集改为按 fancha0 仓库文件名命名，便于对照维护。
// fancha0 全部规则分类已合并；JSON/SRS/客户端重复版本不重复加载。
// apple 与 cn-direct-merged 含不支持的 USER-AGENT，已移除并内嵌其余规则快照。
// 这两个内嵌规则集不会远程自动更新；其余 .list 每24小时更新。
// 我的 FlClash / Mihomo 个人覆写脚本 v1.1 — fancha0 规则合集
// 入口：main(config)。使用已有订阅节点/代理提供者，不包含订阅链接或凭据。
// 用于单个机场订阅配置或已有多机场配置，不会自动添加机场。
// 覆写分组和分流规则；保留 DNS、TUN、端口、原始节点参数。
// 规则来源：bgpeer Mihomo-fx.js v5.10，并保留 YouTube/Spotify 独立分流。
// 优化版：内网优先、服务优先、国内合并集后移；默认组改名为兜底。
// Gemini 使用精简内嵌规则，不自动更新；Google公共资源仍由原服务规则处理。
// 修改开关后保存，再重新加载配置。
const OPTIONS = {
  adBlock: true,       // 广告拦截，误拦或内存紧张时设为 false
  telegramSingapore: true,
  openaiSingapore: true,
};

const TEMPLATE = {
  "groups": [
    {
      "name": "兜底",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Final.png",
      "type": "select",
      "proxies": [
        "自动选择",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "直连"
      ]
    },
    {
      "name": "全部节点",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Available.png",
      "type": "select",
      "exclude-filter": "剩余流量|套餐到期|长期有效|到期时间|流量重置",
      "include-all": true,
      "exclude-type": "direct"
    },
    {
      "name": "自动选择",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Auto.png",
      "type": "url-test",
      "exclude-filter": "剩余流量|套餐到期|长期有效|到期时间|流量重置",
      "url": "https://www.gstatic.com/generate_204",
      "interval": 300,
      "tolerance": 50,
      "include-all": true,
      "exclude-type": "direct"
    },
    {
      "name": "Google",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Google.png",
      "type": "select",
      "proxies": [
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择",
        "直连"
      ]
    },
    {
      "name": "Telegram",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Telegram.png",
      "type": "select",
      "proxies": [
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择",
        "直连"
      ]
    },
    {
      "name": "Github",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/GitHub.png",
      "type": "select",
      "proxies": [
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择",
        "直连"
      ]
    },
    {
      "name": "ChatGPT",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/ChatGPT.png",
      "type": "select",
      "proxies": [
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择",
        "直连"
      ]
    },
    {
      "name": "Claude",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/claude_1.png",
      "type": "select",
      "proxies": [
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择",
        "直连"
      ]
    },
    {
      "name": "Gemini",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/AI.png",
      "type": "select",
      "proxies": [
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择",
        "DIRECT"
      ]
    },
    {
      "name": "Emby",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Emby.png",
      "type": "select",
      "proxies": [
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择",
        "DIRECT"
      ]
    },
    {
      "name": "Twitter",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/X.png",
      "type": "select",
      "proxies": [
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择",
        "直连"
      ]
    },
    {
      "name": "YouTube",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/YouTube.png",
      "type": "select",
      "proxies": [
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择",
        "直连"
      ]
    },
    {
      "name": "NETFLIX",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Netflix.png",
      "type": "select",
      "proxies": [
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择",
        "直连"
      ]
    },
    {
      "name": "Spotify",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Spotify.png",
      "type": "select",
      "proxies": [
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择",
        "直连"
      ]
    },
    {
      "name": "抖音",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/douyin_1.png",
      "type": "select",
      "proxies": [
        "直连",
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择"
      ]
    },
    {
      "name": "TikTok",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/TikTok.png",
      "type": "select",
      "proxies": [
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择",
        "直连"
      ]
    },
    {
      "name": "国际游戏",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Game.png",
      "type": "select",
      "proxies": [
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择",
        "直连"
      ]
    },
    {
      "name": "微软服务",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Microsoft.png",
      "type": "select",
      "proxies": [
        "直连",
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择"
      ]
    },
    {
      "name": "苹果服务",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Apple.png",
      "type": "select",
      "proxies": [
        "直连",
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择"
      ]
    },
    {
      "name": "Discord",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Discord.png",
      "type": "select",
      "proxies": [
        "兜底",
        "🇺🇸 US",
        "🇭🇰 HK",
        "🇹🇼 TW",
        "🇸🇬 SG",
        "🇯🇵 JP",
        "🇰🇷 KR",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🌍 Others",
        "全部节点",
        "自动选择",
        "DIRECT"
      ]
    },
    {
      "name": "🇺🇸 US",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/United_States.png",
      "type": "url-test",
      "filter": "(?i)🇺🇸|美国|美國|\\bUS\\b|united[ -]?states",
      "exclude-filter": "剩余流量|套餐到期|长期有效|到期时间|流量重置",
      "include-all": true,
      "exclude-type": "direct",
      "url": "https://www.gstatic.com/generate_204",
      "interval": 300,
      "tolerance": 30,
      "hidden": true,
      "empty-fallback": "REJECT",
      "lazy": true,
      "timeout": 5000,
      "max-failed-times": 5,
      "expected-status": 204
    },
    {
      "name": "🇭🇰 HK",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Hong_Kong.png",
      "type": "url-test",
      "filter": "(?i)🇭🇰|香港|\\bHK\\b|hong[ -]?kong",
      "exclude-filter": "剩余流量|套餐到期|长期有效|到期时间|流量重置",
      "include-all": true,
      "exclude-type": "direct",
      "url": "https://www.gstatic.com/generate_204",
      "interval": 300,
      "tolerance": 30,
      "hidden": true,
      "empty-fallback": "REJECT",
      "lazy": true,
      "timeout": 5000,
      "max-failed-times": 5,
      "expected-status": 204
    },
    {
      "name": "🇹🇼 TW",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Taiwan.png",
      "type": "url-test",
      "filter": "(?i)🇹🇼|台湾|台灣|\\bTW\\b|taiwan",
      "exclude-filter": "剩余流量|套餐到期|长期有效|到期时间|流量重置",
      "include-all": true,
      "exclude-type": "direct",
      "url": "https://www.gstatic.com/generate_204",
      "interval": 300,
      "tolerance": 30,
      "hidden": true,
      "empty-fallback": "REJECT",
      "lazy": true,
      "timeout": 5000,
      "max-failed-times": 5,
      "expected-status": 204
    },
    {
      "name": "🇸🇬 SG",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Singapore.png",
      "type": "url-test",
      "filter": "(?i)🇸🇬|新加坡|狮城|獅城|\\bSG\\b|singapore",
      "exclude-filter": "剩余流量|套餐到期|长期有效|到期时间|流量重置",
      "include-all": true,
      "exclude-type": "direct",
      "url": "https://www.gstatic.com/generate_204",
      "interval": 300,
      "tolerance": 30,
      "hidden": true,
      "empty-fallback": "REJECT",
      "lazy": true,
      "timeout": 5000,
      "max-failed-times": 5,
      "expected-status": 204
    },
    {
      "name": "🇯🇵 JP",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Japan.png",
      "type": "url-test",
      "filter": "(?i)🇯🇵|日本|\\bJP\\b|japan",
      "exclude-filter": "剩余流量|套餐到期|长期有效|到期时间|流量重置",
      "include-all": true,
      "exclude-type": "direct",
      "url": "https://www.gstatic.com/generate_204",
      "interval": 300,
      "tolerance": 30,
      "hidden": true,
      "empty-fallback": "REJECT",
      "lazy": true,
      "timeout": 5000,
      "max-failed-times": 5,
      "expected-status": 204
    },
    {
      "name": "🇰🇷 KR",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Korea.png",
      "type": "url-test",
      "filter": "(?i)🇰🇷|韩国|韓國|\bKR\b|korea",
      "exclude-filter": "剩余流量|套餐到期|长期有效|到期时间|流量重置",
      "include-all": true,
      "exclude-type": "direct",
      "url": "https://www.gstatic.com/generate_204",
      "interval": 300,
      "tolerance": 30,
      "hidden": true,
      "empty-fallback": "REJECT",
      "lazy": true,
      "timeout": 5000,
      "max-failed-times": 5,
      "expected-status": 204
    },
    {
      "name": "🇬🇧 UK",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/United_Kingdom.png",
      "type": "url-test",
      "filter": "(?i)🇬🇧|英国|英國|\bUK\b|\bGB\b|united[ -]?kingdom|britain|england",
      "exclude-filter": "剩余流量|套餐到期|长期有效|到期时间|流量重置",
      "include-all": true,
      "exclude-type": "direct",
      "url": "https://www.gstatic.com/generate_204",
      "interval": 300,
      "tolerance": 30,
      "hidden": true,
      "empty-fallback": "REJECT",
      "lazy": true,
      "timeout": 5000,
      "max-failed-times": 5,
      "expected-status": 204
    },
    {
      "name": "🇩🇪 DE",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/Germany.png",
      "type": "url-test",
      "filter": "(?i)🇩🇪|德国|德國|\bDE\b|germany",
      "exclude-filter": "剩余流量|套餐到期|长期有效|到期时间|流量重置",
      "include-all": true,
      "exclude-type": "direct",
      "url": "https://www.gstatic.com/generate_204",
      "interval": 300,
      "tolerance": 30,
      "hidden": true,
      "empty-fallback": "REJECT",
      "lazy": true,
      "timeout": 5000,
      "max-failed-times": 5,
      "expected-status": 204
    },
    {
      "name": "🌍 Others",
      "icon": "https://gh-proxy.com/https://raw.githubusercontent.com/lishiyaa0/FlClash-icons/main/color/World_Map.png",
      "type": "url-test",
      "filter": "(?i)^(?!.*(?:🇭🇰|🇹🇼|🇯🇵|🇺🇸|🇸🇬|🇰🇷|🇬🇧|🇩🇪|香港|台湾|台灣|日本|美国|美國|新加坡|韩国|韓國|英国|英國|德国|德國|\b(?:HK|TW|JP|US|SG|KR|UK|GB|DE)\b|hong[ -]?kong|taiwan|japan|united[ -]?states|singapore|korea|united[ -]?kingdom|britain|england|germany)).*",
      "exclude-filter": "剩余流量|套餐到期|长期有效|到期时间|流量重置",
      "include-all": true,
      "exclude-type": "direct",
      "url": "https://www.gstatic.com/generate_204",
      "interval": 300,
      "tolerance": 30,
      "hidden": true,
      "empty-fallback": "REJECT",
      "lazy": true,
      "timeout": 5000,
      "max-failed-times": 5,
      "expected-status": 204
    }
  ],
  "rules": [
    "RULE-SET,private,直连",
    "RULE-SET,private-ip,直连,no-resolve",
    "AND,((DST-PORT,123),(NETWORK,udp)),DIRECT",
    "IP-CIDR,223.5.5.5/32,直连,no-resolve",
    "RULE-SET,direct,DIRECT",
    "RULE-SET,reject,REJECT",
    "RULE-SET,chatgpt,ChatGPT",
    "RULE-SET,claude,Claude",
    "RULE-SET,gemini,Gemini",
    "RULE-SET,discord,Discord",
    "RULE-SET,emby,Emby",
    "RULE-SET,youxi,国际游戏",
    "RULE-SET,apple-merged,苹果服务",
    "RULE-SET,TikTok-zj,TikTok",
    "RULE-SET,douyin-zj,抖音",
    "RULE-SET,OpenAI-zj,ChatGPT",
    "RULE-SET,Claude-zj,Claude",
    "RULE-SET,games-!cn,国际游戏",
    "RULE-SET,Telegram-zj,Telegram",
    "RULE-SET,Netflix,NETFLIX",
    "RULE-SET,youtube_domain,YouTube",
    "RULE-SET,spotify_domain,Spotify",
    "RULE-SET,Google-zj,Google",
    "RULE-SET,google-ip,Google,no-resolve",
    "RULE-SET,GitHub-zj,Github",
    "RULE-SET,Microsoft,微软服务",
    "RULE-SET,icloud,苹果服务",
    "RULE-SET,Apple,苹果服务",
    "RULE-SET,twitter,Twitter",
    "RULE-SET,games-cn,直连",
    "RULE-SET,cn-domain,直连",
    "RULE-SET,proxy,兜底",
    "RULE-SET,greatfire,兜底",
    "RULE-SET,gfw,兜底",
    "RULE-SET,geolocation-!cn,兜底",
    "RULE-SET,cloudflare-ip,兜底,no-resolve",
    "RULE-SET,cloudfront-ip,兜底,no-resolve",
    "RULE-SET,fastly-ip,兜底,no-resolve",
    "RULE-SET,cn-ip,直连,no-resolve",
    "MATCH,兜底"
  ],
  "providers": {
    "reject": {
      "type": "http",
      "behavior": "domain",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/category-ads-all.mrs",
      "path": "./bgpeer/geo_geosite_category-ads-all.mrs"
    },
    "TikTok-zj": {
      "type": "http",
      "behavior": "domain",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/tiktok.mrs",
      "path": "./bgpeer/geo_geosite_tiktok.mrs"
    },
    "douyin-zj": {
      "type": "http",
      "behavior": "domain",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/bytedance.mrs",
      "path": "./bgpeer/geo_geosite_bytedance.mrs"
    },
    "OpenAI-zj": {
      "type": "http",
      "behavior": "classical",
      "format": "yaml",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/openai.yaml",
      "path": "./bgpeer/geo_geosite_openai.yaml"
    },
    "Claude-zj": {
      "type": "http",
      "behavior": "classical",
      "format": "yaml",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/anthropic.yaml",
      "path": "./bgpeer/geo_geosite_anthropic.yaml"
    },
    "games-!cn": {
      "type": "http",
      "behavior": "classical",
      "format": "yaml",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/category-games-!cn.yaml",
      "path": "./bgpeer/geo_geosite_category-games-_cn.yaml"
    },
    "Telegram-zj": {
      "type": "http",
      "behavior": "classical",
      "format": "yaml",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/telegram.yaml",
      "path": "./bgpeer/geo_geosite_telegram.yaml"
    },
    "Netflix": {
      "type": "http",
      "behavior": "classical",
      "format": "yaml",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/netflix.yaml",
      "path": "./bgpeer/geo_geosite_netflix.yaml"
    },
    "youtube_domain": {
      "type": "http",
      "interval": 86400,
      "behavior": "domain",
      "format": "mrs",
      "path": "./rules/youtube_domain.mrs",
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.mrs"
    },
    "spotify_domain": {
      "type": "http",
      "interval": 86400,
      "behavior": "domain",
      "format": "mrs",
      "path": "./rules/spotify_domain.mrs",
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/spotify.mrs"
    },
    "Google-zj": {
      "type": "http",
      "behavior": "classical",
      "format": "yaml",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/google.yaml",
      "path": "./bgpeer/geo_geosite_google.yaml"
    },
    "google-ip": {
      "type": "http",
      "behavior": "ipcidr",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geoip/google.mrs",
      "path": "./bgpeer/geo_geoip_google.mrs"
    },
    "GitHub-zj": {
      "type": "http",
      "behavior": "domain",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/github.mrs",
      "path": "./bgpeer/geo_geosite_github.mrs"
    },
    "Microsoft": {
      "type": "http",
      "behavior": "domain",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/microsoft.mrs",
      "path": "./bgpeer/geo_geosite_microsoft.mrs"
    },
    "icloud": {
      "type": "http",
      "behavior": "domain",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/icloud.mrs",
      "path": "./bgpeer/geo_geosite_icloud.mrs"
    },
    "Apple": {
      "type": "http",
      "behavior": "classical",
      "format": "yaml",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/apple.yaml",
      "path": "./bgpeer/geo_geosite_apple.yaml"
    },
    "twitter": {
      "type": "http",
      "behavior": "domain",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/twitter.mrs",
      "path": "./bgpeer/geo_geosite_twitter.mrs"
    },
    "cloudflare-ip": {
      "type": "http",
      "behavior": "ipcidr",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geoip/cloudflare.mrs",
      "path": "./bgpeer/geo_geoip_cloudflare.mrs"
    },
    "cloudfront-ip": {
      "type": "http",
      "behavior": "ipcidr",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geoip/cloudfront.mrs",
      "path": "./bgpeer/geo_geoip_cloudfront.mrs"
    },
    "fastly-ip": {
      "type": "http",
      "behavior": "ipcidr",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geoip/fastly.mrs",
      "path": "./bgpeer/geo_geoip_fastly.mrs"
    },
    "greatfire": {
      "type": "http",
      "behavior": "domain",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/greatfire.mrs",
      "path": "./bgpeer/geo_geosite_greatfire.mrs"
    },
    "gfw": {
      "type": "http",
      "behavior": "domain",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/gfw.mrs",
      "path": "./bgpeer/geo_geosite_gfw.mrs"
    },
    "geolocation-!cn": {
      "type": "http",
      "behavior": "domain",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/geolocation-!cn.mrs",
      "path": "./bgpeer/geo_geosite_geolocation-_cn.mrs"
    },
    "games-cn": {
      "type": "http",
      "behavior": "domain",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/category-games-cn.mrs",
      "path": "./bgpeer/geo_geosite_category-games-cn.mrs"
    },
    "private": {
      "type": "http",
      "behavior": "domain",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/private.mrs",
      "path": "./bgpeer/geo_geosite_private.mrs"
    },
    "cn-domain": {
      "type": "http",
      "behavior": "domain",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geosite/cn.mrs",
      "path": "./bgpeer/geo_geosite_cn.mrs"
    },
    "private-ip": {
      "type": "http",
      "behavior": "ipcidr",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geoip/private.mrs",
      "path": "./bgpeer/geo_geoip_private.mrs"
    },
    "cn-ip": {
      "type": "http",
      "behavior": "ipcidr",
      "format": "mrs",
      "interval": 86400,
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/bgpeer/rules/main/geo/geoip/cn.mrs",
      "path": "./bgpeer/geo_geoip_cn.mrs"
    },
    "direct": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/fancha0/Proxy-rules/main/direct/direct.list",
      "path": "./fancha/direct.list",
      "interval": 3600
    },
    "chatgpt": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/fancha0/Proxy-rules/main/ChatGPT/ChatGPT.list",
      "path": "./fancha/chatgpt.list",
      "interval": 3600
    },
    "claude": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/fancha0/Proxy-rules/main/claude/claude.list",
      "path": "./fancha/claude.list",
      "interval": 3600
    },
    "gemini": {
      "type": "inline",
      "behavior": "classical",
      "payload": [
        "DOMAIN-SUFFIX,gemini.google.com",
        "DOMAIN-SUFFIX,bard.google.com",
        "DOMAIN-SUFFIX,aistudio.google.com",
        "DOMAIN-SUFFIX,ai.google.dev",
        "DOMAIN-SUFFIX,makersuite.google.com",
        "DOMAIN-SUFFIX,alkalimakersuite-pa.clients6.google.com",
        "DOMAIN-SUFFIX,generativelanguage.googleapis.com",
        "DOMAIN-SUFFIX,aiplatform.googleapis.com",
        "DOMAIN-SUFFIX,vertexai.googleapis.com",
        "DOMAIN-SUFFIX,deepmind.com",
        "DOMAIN-SUFFIX,googledeepmind.com"
      ]
    },
    "discord": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/fancha0/Proxy-rules/main/discord/Discord.list",
      "path": "./fancha/discord.list",
      "interval": 3600
    },
    "emby": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/fancha0/Proxy-rules/main/emby/emby.list",
      "path": "./fancha/emby.list",
      "interval": 3600
    },
    "youxi": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/fancha0/Proxy-rules/main/youxi/youxi.list",
      "path": "./fancha/youxi.list",
      "interval": 3600
    },
    "apple-merged": {
      "type": "inline",
      "behavior": "classical",
      "payload": [
        "DOMAIN-KEYWORD,buy.itunes.apple.com",
        "DOMAIN-KEYWORD,apple-support.akadns.net",
        "DOMAIN-KEYWORD,apple.com.akadns.net",
        "DOMAIN-KEYWORD,icloud.com.akadns.net",
        "DOMAIN-KEYWORD,apple.com.edgekey.net",
        "DOMAIN-KEYWORD,smp-device",
        "DOMAIN-KEYWORD,testflight",
        "IP-CIDR,139.178.128.0/18,no-resolve",
        "IP-CIDR,144.178.0.0/19,no-resolve",
        "IP-CIDR,144.178.36.0/22,no-resolve",
        "IP-CIDR,144.178.48.0/20,no-resolve",
        "IP-CIDR,17.0.0.0/8,no-resolve",
        "IP-CIDR,192.35.50.0/24,no-resolve",
        "IP-CIDR,198.183.17.0/24,no-resolve",
        "IP-CIDR,205.180.175.0/24,no-resolve",
        "IP-CIDR,63.92.224.0/19,no-resolve",
        "IP-CIDR,65.199.22.0/23,no-resolve",
        "IP-CIDR6,2403:300::/32,no-resolve",
        "IP-CIDR6,2620:149::/32,no-resolve",
        "IP-CIDR6,2a01:b740::/32,no-resolve",
        "PROCESS-NAME,CoreLocationAgent",
        "PROCESS-NAME,LookupViewService",
        "PROCESS-NAME,Music",
        "PROCESS-NAME,TV",
        "PROCESS-NAME,WeatherWidget",
        "PROCESS-NAME,apsd",
        "PROCESS-NAME,com.apple.Maps",
        "PROCESS-NAME,com.apple.geod",
        "PROCESS-NAME,findmydevice-user-agent",
        "PROCESS-NAME,fmfd",
        "PROCESS-NAME,mapspushd",
        "PROCESS-NAME,netbiosd",
        "PROCESS-NAME,trustd"
      ]
    },
    "proxy": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "url": "https://gh-proxy.com/https://raw.githubusercontent.com/fancha0/Proxy-rules/main/proxy/proxy.list",
      "path": "./fancha/proxy.list",
      "interval": 3600
    }
  }
};

function main(config) {
  if (!config || typeof config !== "object") {
    throw new Error("覆写需要有效的订阅配置对象");
  }
  // 兼容机场直接提供的 proxies，以及配置已有的 proxy-providers。
  // 用内建 DIRECT，不向订阅节点中添加 direct 类型节点。
  function replaceDirect(v) {
    if (v === "直连") return "DIRECT";
    if (Array.isArray(v)) return v.map(replaceDirect);
    if (v && typeof v === "object") {
      const result = {};
      Object.keys(v).forEach(function(k) { result[k] = replaceDirect(v[k]); });
      return result;
    }
    return v;
  }
  // 记住面板手动选择与 fake-ip 缓存；订阅已设置的项以订阅为准
  config.profile = Object.assign(
    { "store-selected": true, "store-fake-ip": true },
    config.profile && typeof config.profile === "object" ? config.profile : {}
  );
  // 强制开启 provider 健康检查，否则地区测速组拿不到延迟
  Object.keys(config["proxy-providers"] || {}).forEach(function (name) {
    const p = config["proxy-providers"][name];
    if (p && typeof p === "object") {
      p["health-check"] = Object.assign(
        { enable: true, url: "https://www.gstatic.com/generate_204", interval: 300 },
        p["health-check"] && typeof p["health-check"] === "object" ? p["health-check"] : {},
        { enable: true }
      );
    }
  });
  // ===== 网络层（移植自 kanwox Clash_rule.js）：DNS 完整处理 / sniffer / 节点指纹 =====
  const CN_DNS_DOH = ["https://223.5.5.5/dns-query", "https://doh.pub/dns-query"];
  const CN_DNS_PLAIN = ["223.5.5.5", "119.29.29.29"];
  const FP_OK_TYPES = ["vless", "vmess", "trojan"];

  // -- sniffer：纯 IP 流量从 TLS SNI / HTTP Host 还原域名，避免兜底误判 --
  config.sniffer = {
    enable: true,
    "force-dns-mapping": true,
    "parse-pure-ip": true,
    "override-destination": true,
    sniff: {
      HTTP: { ports: [80, "8080-8880"], "override-destination": true },
      TLS: { ports: [443, 8443] },
      QUIC: { ports: [443, 8443] }
    },
    "skip-domain": [
      "Mijia Cloud",
      "+.apple.com",
      "+.openai.com",
      "+.oaistatic.com",
      "+.oaiusercontent.com",
      "+.chatgpt.com"
    ]
  };

  // -- 节点指纹：补 ip-version 与 client-fingerprint，不覆盖订阅已有值 --
  delete config["global-client-fingerprint"];
  (Array.isArray(config.proxies) ? config.proxies : []).forEach(function (proxy) {
    if (!proxy || typeof proxy !== "object") return;
    if (proxy.type !== "direct" && !("ip-version" in proxy)) {
      proxy["ip-version"] = "dual";
    }
    if (FP_OK_TYPES.indexOf(proxy.type) !== -1 && !proxy["client-fingerprint"]) {
      const usesTLS = proxy.type === "trojan" || proxy.tls === true || proxy["reality-opts"];
      if (usesTLS) proxy["client-fingerprint"] = "chrome";
    }
  });

  // -- 基础选项 --
  config["unified-delay"] = true;
  config["tcp-concurrent"] = true;
  config["find-process-mode"] = "off";

  // -- DNS 完整处理（整体重建，继承订阅可迁移项，适配本脚本规则集名）--
  {
    const dnsRaw = config.dns && typeof config.dns === "object" ? config.dns : {};
    const toList = function (v) {
      if (v === undefined || v === null) return [];
      const arr = Array.isArray(v) ? v : [v];
      return arr.map(function (x) { return String(x).trim(); }).filter(Boolean);
    };
    const subNS = toList(dnsRaw.nameserver);
    const subPSN = toList(dnsRaw["proxy-server-nameserver"]);
    const filterMode = String(dnsRaw["fake-ip-filter-mode"] || "").trim().toLowerCase();
    const subFilter = (filterMode === "" || filterMode === "blacklist")
      ? toList(dnsRaw["fake-ip-filter"]).filter(function (x) { return !/^(rule-set|geosite|geoip):/i.test(x); })
      : [];
    const dnsIPv6 = typeof dnsRaw.ipv6 === "boolean" ? dnsRaw.ipv6 : (config.ipv6 === true);

    // 继承订阅的 nameserver-policy 但清洗 rule-set/geosite/geoip 通吃键
    const nameserverPolicy = {};
    if (dnsRaw["nameserver-policy"] && typeof dnsRaw["nameserver-policy"] === "object") {
      Object.keys(dnsRaw["nameserver-policy"]).forEach(function (key) {
        if (/^(rule-set|geosite|geoip):/i.test(key) || key === "+." || key === "*" || key === "+") return;
        nameserverPolicy[key] = toList(dnsRaw["nameserver-policy"][key]);
      });
    }
    Object.assign(nameserverPolicy, {
      "rule-set:private": ["system://"],
      "rule-set:reject": ["rcode://name_error"],
      "rule-set:cn-domain": CN_DNS_DOH
    });

    const baseFilter = [
      "+.lan", "+.local", "localhost.ptlogin2.qq.com",
      "+.msftconnecttest.com", "+.msftncsi.com", "+.ntp.org",
      "time.windows.com", "time.apple.com",
      "+.stun.*", "+.stun.*.*", "+.stun.*.*.*", "+.stun.*.*.*.*",
      "rule-set:cn-domain", "rule-set:private"
    ];

    config.dns = {
      enable: true,
      listen: "127.0.0.1:1053",
      ipv6: dnsIPv6,
      "enhanced-mode": "fake-ip",
      "fake-ip-range": "198.18.0.1/16",
      ...(dnsIPv6 ? { "fake-ip-range6": "fdfe:dcba:9876::/64" } : {}),
      "cache-algorithm": "arc",
      "fake-ip-filter-mode": "blacklist",
      "use-hosts": typeof dnsRaw["use-hosts"] === "boolean" ? dnsRaw["use-hosts"] : true,
      "use-system-hosts": typeof dnsRaw["use-system-hosts"] === "boolean" ? dnsRaw["use-system-hosts"] : true,
      "fake-ip-filter": baseFilter.concat(subFilter.filter(function (x) { return baseFilter.indexOf(x) < 0; })),
      "default-nameserver": CN_DNS_PLAIN,
      "proxy-server-nameserver": subPSN.length > 0 ? subPSN : CN_DNS_DOH,
      "nameserver": subNS.length > 0 ? subNS : ["https://1.1.1.1/dns-query#RULES", "https://8.8.8.8/dns-query#RULES"],
      "direct-nameserver": CN_DNS_PLAIN,
      "direct-nameserver-follow-policy": true,
      "nameserver-policy": nameserverPolicy
    };
  }

  const groups = replaceDirect(TEMPLATE.groups);
  const regionGroups = groups.filter(function(g) { return g["include-all"] === true; });
  const locals = Array.isArray(config.proxies) ? config.proxies : [];
  const hasProviders = config["proxy-providers"] && Object.keys(config["proxy-providers"]).length > 0;
  const excludedTypes = ["direct", "reject", "reject-drop", "dns", "pass"];
  const nodes = locals.filter(function(p) {
    return p && typeof p.name === "string" && excludedTypes.indexOf(p.type) < 0;
  });
  // 纯静态订阅：显式筛选节点；匹配为零的地区组保持 include-all 不变，交由
  // 内核按 empty-fallback 处理（避免塞入 DIRECT 后测速必然失败）
  // provider 配置：保留运行时 include-all 筛选，不提前下载订阅。
  if (!hasProviders) {
    regionGroups.forEach(function(g) {
      let candidates = nodes;
      const exclude = new RegExp(g["exclude-filter"] || "剩余流量|套餐到期|长期有效", "i");
      candidates = candidates.filter(function(p) { return !exclude.test(p.name); });
      if (g.filter) {
        const filter = new RegExp(g.filter.replace(/^\(\?i\)/, ""), "i");
        candidates = candidates.filter(function(p) { return filter.test(p.name); });
      }
      if (!candidates.length) {
        // 该地区无节点：不改动，交给内核与 empty-fallback
        return;
      }
      g.proxies = candidates.map(function(p) { return p.name; });
      delete g["include-all"];
      delete g["exclude-type"];
      delete g["exclude-filter"];
      delete g.filter;
    });
  }
  groups.forEach(function(g) {
    if ((g.name === "Telegram" && !OPTIONS.telegramSingapore) ||
        (g.name === "ChatGPT" && !OPTIONS.openaiSingapore)) {
      g.proxies = ["兜底"].concat(g.proxies.filter(function(n) { return n !== "兜底"; }));
    }
  });
  // 防止机场节点与策略组同名造成冲突；不修改节点名称或凭据。
  const nodeNames = {};
  nodes.forEach(function(p) { nodeNames[p.name] = true; });
  const renamed = {};
  const taken = Object.assign({}, nodeNames);
  groups.forEach(function(g) {
    let name = g.name;
    while (taken[name]) name = "分流·" + name;
    taken[name] = true;
    if (name !== g.name) renamed[g.name] = name;
  });
  groups.forEach(function(g) {
    const originalName = g.name;
    g.name = renamed[originalName] || originalName;
    // 节点筛选组的 proxies 是节点名；仅转换策略组间的引用。
    if (regionGroups.indexOf(g) < 0 && g.proxies) {
      g.proxies = g.proxies.map(function(n) { return renamed[n] || n; });
    }
  });
  const providers = JSON.parse(JSON.stringify(TEMPLATE.providers));
  if (!OPTIONS.adBlock) delete providers.reject;
  const rules = TEMPLATE.rules.filter(function(r) {
    return OPTIONS.adBlock || r.indexOf("RULE-SET,reject,") !== 0;
  }).map(function(r) {
    const fields = r.split(",");
    const i = fields[0] === "MATCH" ? 1 : 2;
    if (fields[i] === "直连") fields[i] = "DIRECT";
    else fields[i] = renamed[fields[i]] || fields[i];
    return fields.join(",");
  });
  config["proxy-groups"] = groups;
  config["rule-providers"] = providers;
  config.rules = rules;
  config.mode = "rule";
  return config;
}
